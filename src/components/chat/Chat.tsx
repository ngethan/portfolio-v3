import { useState } from "react";
import { ChatModal } from "./ChatModal";
import { ChatOrb } from "./ChatOrb";

interface ChatProps {
	isOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	initialMessage?: string;
	showOrb?: boolean;
}

export function Chat({
	isOpen: controlledIsOpen,
	onOpenChange,
	initialMessage,
	showOrb = true,
}: ChatProps) {
	const [internalIsOpen, setInternalIsOpen] = useState(false);

	// Support both controlled and uncontrolled modes
	const isOpen = controlledIsOpen ?? internalIsOpen;
	const setIsOpen = onOpenChange ?? setInternalIsOpen;

	return (
		<>
			<ChatModal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				initialMessage={initialMessage}
			/>
			{showOrb && (
				<ChatOrb isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
			)}
		</>
	);
}
