import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ChatInputProps {
	onSend: (message: string) => void;
	disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
	const [value, setValue] = useState("");
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const handleSubmit = () => {
		const trimmed = value.trim();
		if (trimmed && !disabled) {
			onSend(trimmed);
			setValue("");
			if (textareaRef.current) {
				textareaRef.current.style.height = "auto";
			}
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}
	};

	useEffect(() => {
		const textarea = textareaRef.current;
		if (textarea) {
			textarea.style.height = "auto";
			textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
		}
	});

	return (
		<div className="p-4 border-t border-gray-200 dark:border-white/10">
			<div className="flex items-end gap-2 bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 p-1.5">
				<textarea
					ref={textareaRef}
					value={value}
					onChange={(e) => setValue(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Poke around my mind..."
					disabled={disabled}
					rows={1}
					className="flex-1 resize-none bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
				/>
				<button
					type="button"
					onClick={handleSubmit}
					disabled={disabled || !value.trim()}
					className="flex items-center justify-center w-8 h-8 bg-foreground text-background disabled:opacity-30 disabled:cursor-not-allowed hover:bg-foreground/90 transition-all duration-200"
					aria-label="Send message"
				>
					<ArrowUp className="w-4 h-4" strokeWidth={2.5} />
				</button>
			</div>
		</div>
	);
}
