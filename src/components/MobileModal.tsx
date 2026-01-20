import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

interface MobileModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}

export function MobileModal({ isOpen, onClose, children }: MobileModalProps) {
	return (
		<AnimatePresence>
			{isOpen && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
						onClick={onClose}
					/>

					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 20 }}
						transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
						className="preview-content fixed left-4 right-4 top-1/2 -translate-y-1/2 z-50 max-h-[calc(100vh-64px)] overflow-y-auto border border-muted-foreground/15 bg-background shadow-2xl [&_img]:rounded-none"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="p-6 pb-4">{children}</div>
						<div className="p-6 pt-2">
							<button
								type="button"
								onClick={onClose}
								className="w-full py-3 text-sm text-muted-foreground hover:text-foreground border border-muted-foreground/50 hover:border-foreground transition-colors"
							>
								Close
							</button>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
