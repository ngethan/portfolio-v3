import { Brain, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface ChatOrbProps {
	isOpen: boolean;
	onToggle: () => void;
}

export function ChatOrb({ isOpen, onToggle }: ChatOrbProps) {
	return (
		<AnimatePresence mode="wait">
			{isOpen ? (
				<motion.button
					key="close"
					onClick={onToggle}
					className="fixed bottom-6 left-1/2 z-50 flex items-center justify-center w-11 h-11 -ml-[22px] rounded-full bg-gray-50 dark:bg-white/5 backdrop-blur-xl border border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 cursor-pointer transition-colors"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 10 }}
					transition={{ duration: 0.2 }}
					aria-label="Close chat"
				>
					<X className="w-4 h-4 text-muted-foreground" />
				</motion.button>
			) : (
				<motion.button
					key="trigger"
					onClick={onToggle}
					className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 cursor-pointer group"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.3, ease: "easeOut" }}
					aria-label="Open chat"
				>
					{/* Subtle glow on hover */}
					<motion.div
						className="absolute inset-0 rounded-full bg-foreground/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
						style={{ transform: "scale(1.8)" }}
					/>

					{/* Main button */}
					<motion.div
						className="relative flex items-center justify-center w-11 h-11 rounded-full bg-gray-50 dark:bg-white/5 backdrop-blur-xl border border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 shadow-lg transition-colors"
						whileHover={{ y: -2, scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						transition={{ duration: 0.2 }}
					>
						{/* Sparkles icon with subtle rotation on hover */}
						<motion.div
							className="text-muted-foreground group-hover:text-foreground transition-colors"
							whileHover={{ rotate: 15 }}
							transition={{ duration: 0.3 }}
						>
							<Brain className="w-5 h-5" />
						</motion.div>
					</motion.div>
				</motion.button>
			)}
		</AnimatePresence>
	);
}
