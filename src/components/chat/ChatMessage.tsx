import { motion } from "motion/react";

interface ChatMessageProps {
	sender: "user" | "assistant";
	content: string;
}

export function ChatMessage({ sender, content }: ChatMessageProps) {
	const isUser = sender === "user";

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.15 }}
			className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
		>
			<div
				className={`max-w-[85%] ${
					isUser
						? "bg-foreground text-background px-4 py-2.5"
						: "text-foreground"
				}`}
			>
				<p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
					{content}
				</p>
			</div>
		</motion.div>
	);
}
