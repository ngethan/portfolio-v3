import { trpcClient } from "@/integrations/trpc/react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatMessage as ChatMessageType } from "../../lib/chat";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";

interface ChatModalProps {
	isOpen: boolean;
	onClose: () => void;
	initialMessage?: string;
}

export function ChatModal({ isOpen, onClose, initialMessage }: ChatModalProps) {
	const [messages, setMessages] = useState<ChatMessageType[]>([]);
	const [streamingContent, setStreamingContent] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const abortControllerRef = useRef<AbortController | null>(null);

	const scrollToBottom = useCallback(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: scroll when messages change
	useEffect(() => {
		scrollToBottom();
	}, [scrollToBottom, messages, streamingContent]);

	const sendMessage = async (content: string) => {
		setError(null);
		setStreamingContent("");

		const userMessage: ChatMessageType = { role: "user", content };
		const newMessages = [...messages, userMessage];
		setMessages(newMessages);
		setIsLoading(true);

		// Cancel any existing subscription
		abortControllerRef.current?.abort();
		abortControllerRef.current = new AbortController();

		let accumulated = "";

		try {
			const subscription = trpcClient.chat.stream.subscribe(
				{
					messages: newMessages.map((m) => ({
						role: m.role as "user" | "assistant",
						content: m.content,
					})),
				},
				{
					signal: abortControllerRef.current.signal,
					onData: (text) => {
						accumulated += text;
						setStreamingContent(accumulated);
					},
					onComplete: () => {
						if (accumulated) {
							setMessages((prev) => [
								...prev,
								{ role: "assistant", content: accumulated },
							]);
						}
						setStreamingContent("");
						setIsLoading(false);
					},
					onError: (err) => {
						setError(err.message || "Something went wrong");
						setIsLoading(false);
					},
				},
			);

			// Store unsubscribe for cleanup
			return () => subscription.unsubscribe();
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Something went wrong";
			setError(errorMessage);
			setIsLoading(false);
		}
	};

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			abortControllerRef.current?.abort();
		};
	}, []);

	// Close on escape
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isOpen) {
				onClose();
			}
		};
		window.addEventListener("keydown", handleEscape);
		return () => window.removeEventListener("keydown", handleEscape);
	}, [isOpen, onClose]);

	// Send initial message when modal opens with one
	const initialMessageSentRef = useRef<string | null>(null);
	// biome-ignore lint/correctness/useExhaustiveDependencies: sendMessage is stable, only trigger on isOpen/initialMessage change
	useEffect(() => {
		if (
			isOpen &&
			initialMessage &&
			initialMessageSentRef.current !== initialMessage
		) {
			initialMessageSentRef.current = initialMessage;
			sendMessage(initialMessage);
		}
	}, [isOpen, initialMessage]);

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
						onClick={onClose}
					/>

					{/* Modal */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 20 }}
						transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
						className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[480px] max-w-[calc(100vw-32px)] h-[600px] max-h-[calc(100vh-100px)] border text-card-foreground shadow-2xl border-gray-300 bg-gray-50 dark:border-white/10 dark:bg-white/5 dark:backdrop-blur-xl flex flex-col overflow-hidden"
					>
						{/* Header */}
						<div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-white/10">
							<span className="text-sm font-medium text-foreground">
								Ask Ethan
							</span>
							<span className="text-xs text-muted-foreground">BETA</span>
						</div>

						{/* Messages */}
						<div className="flex-1 overflow-y-auto p-5">
							{messages.length === 0 && !isLoading && !streamingContent && (
								<div className="h-full flex flex-col items-center justify-center text-center px-4">
									<p className="text-muted-foreground text-sm mb-5 max-w-[300px]">
										Ask me anything :)
									</p>
									<div className="flex flex-col gap-2 w-full max-w-[300px]">
										{[
											"What is this page?",
											"What have you built?",
											"What are your skills?",
										].map((prompt) => (
											<button
												type="button"
												key={prompt}
												onClick={() => sendMessage(prompt)}
												className="px-4 py-2.5 text-sm bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 text-muted-foreground hover:text-foreground transition-all duration-200 text-left"
											>
												{prompt}
											</button>
										))}
									</div>
								</div>
							)}

							{messages.map((message, index) => (
								<ChatMessage
									key={index}
									sender={message.role}
									content={message.content}
								/>
							))}

							{/* Streaming message */}
							{streamingContent && (
								<ChatMessage sender="assistant" content={streamingContent} />
							)}

							{/* Loading indicator (only show before streaming starts) */}
							{isLoading && !streamingContent && (
								<div className="flex justify-start mb-4">
									<div className="flex items-center gap-1.5 text-muted-foreground">
										<motion.span
											className="w-1.5 h-1.5 bg-muted-foreground rounded-full"
											animate={{ opacity: [0.3, 1, 0.3] }}
											transition={{
												duration: 1,
												repeat: Number.POSITIVE_INFINITY,
												delay: 0,
											}}
										/>
										<motion.span
											className="w-1.5 h-1.5 bg-muted-foreground rounded-full"
											animate={{ opacity: [0.3, 1, 0.3] }}
											transition={{
												duration: 1,
												repeat: Number.POSITIVE_INFINITY,
												delay: 0.2,
											}}
										/>
										<motion.span
											className="w-1.5 h-1.5 bg-muted-foreground rounded-full"
											animate={{ opacity: [0.3, 1, 0.3] }}
											transition={{
												duration: 1,
												repeat: Number.POSITIVE_INFINITY,
												delay: 0.4,
											}}
										/>
									</div>
								</div>
							)}

							{error && (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									className="p-3 mb-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm"
								>
									{error}
								</motion.div>
							)}

							<div ref={messagesEndRef} />
						</div>

						{/* Input */}
						<ChatInput onSend={sendMessage} disabled={isLoading} />
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
