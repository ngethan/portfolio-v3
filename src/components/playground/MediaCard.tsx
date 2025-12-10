import { ArrowUpRight, ChevronLeft, ChevronRight, MessageCircle, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export interface PlaygroundMedia {
	id: string;
	type: "image" | "video";
	src: string | string[];
	thumbnail?: string;
	title: string;
	description: string;
	url?: string;
	position: { x: number; y: number };
	rotation: number;
	size: { width: number; height: number };
}

interface MediaCardProps {
	media: PlaygroundMedia;
	onPositionChange?: (id: string, position: { x: number; y: number }) => void;
	onAskAI?: (media: PlaygroundMedia) => void;
	onFocus?: (id: string) => void;
	zIndex?: number;
}

// Scale factor for expanded view
const EXPANDED_SCALE = 1.05;

export function MediaCard({
	media,
	onPositionChange,
	onAskAI,
	onFocus,
	zIndex = 0,
}: MediaCardProps) {
	const [isDragging, setIsDragging] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);
	const [localPosition, setLocalPosition] = useState(media.position);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const cardRef = useRef<HTMLDivElement>(null);
	const dragStartRef = useRef({ x: 0, y: 0 });
	const positionStartRef = useRef({ x: 0, y: 0 });
	const hasDraggedRef = useRef(false);

	// Normalize src to always be an array
	const images = Array.isArray(media.src) ? media.src : [media.src];
	const hasMultipleImages = images.length > 1;
	const currentImage = images[currentImageIndex];

	// Calculate expanded dimensions - scale up from original size
	const expandedWidth = media.size.width * EXPANDED_SCALE;
	const expandedImageHeight = media.size.height * EXPANDED_SCALE;

	const handlePrevImage = (e: React.MouseEvent) => {
		e.stopPropagation();
		setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
	};

	const handleNextImage = (e: React.MouseEvent) => {
		e.stopPropagation();
		setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
	};

	// Close when clicking outside
	useEffect(() => {
		if (!isExpanded) return;

		const handleClickOutside = (e: MouseEvent) => {
			if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
				setIsExpanded(false);
			}
		};

		// Use setTimeout to avoid the same click that opened it from closing it
		const timeoutId = setTimeout(() => {
			document.addEventListener("click", handleClickOutside);
		}, 0);

		return () => {
			clearTimeout(timeoutId);
			document.removeEventListener("click", handleClickOutside);
		};
	}, [isExpanded]);

	const handleClick = (e: React.MouseEvent) => {
		// When expanded, don't toggle on click (allows text selection)
		if (isExpanded) {
			e.stopPropagation();
			return;
		}
		if (!hasDraggedRef.current) {
			setIsExpanded(true);
		}
		hasDraggedRef.current = false;
	};

	const handlePointerDown = (e: React.PointerEvent) => {
		if (isExpanded) return;
		e.stopPropagation();
		setIsDragging(true);
		hasDraggedRef.current = false;
		dragStartRef.current = { x: e.clientX, y: e.clientY };
		positionStartRef.current = { x: localPosition.x, y: localPosition.y };
		// Only capture pointer on the card itself, not on interactive children
		if (e.currentTarget === e.target || (e.target as HTMLElement).closest("[data-media-card]") === e.currentTarget) {
			(e.target as HTMLElement).setPointerCapture(e.pointerId);
		}
		onFocus?.(media.id);
	};

	const handlePointerMove = (e: React.PointerEvent) => {
		if (!isDragging) return;

		const dx = e.clientX - dragStartRef.current.x;
		const dy = e.clientY - dragStartRef.current.y;

		if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
			hasDraggedRef.current = true;
		}

		const newPosition = {
			x: positionStartRef.current.x + dx,
			y: positionStartRef.current.y + dy,
		};
		setLocalPosition(newPosition);
	};

	const handlePointerUp = (e: React.PointerEvent) => {
		if (!isDragging) return;
		setIsDragging(false);
		(e.target as HTMLElement).releasePointerCapture(e.pointerId);

		if (onPositionChange && hasDraggedRef.current) {
			onPositionChange(media.id, localPosition);
		}
	};

	const handleClose = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsExpanded(false);
	};

	const handleAskAI = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (onAskAI) {
			onAskAI(media);
		}
	};

	const handleViewProject = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (media.url) {
			window.open(media.url, "_blank", "noopener,noreferrer");
		}
	};

	return (
		<motion.div
			ref={cardRef}
			data-media-card
			className={`absolute overflow-hidden border border-muted-foreground/10 shadow-lg bg-card transition-[width] duration-300 ease-out ${
				isDragging ? "cursor-grabbing select-none" : isExpanded ? "cursor-auto" : "cursor-grab select-none"
			}`}
			style={{
				left: `calc(50% + ${localPosition.x}px)`,
				top: `calc(50% + ${localPosition.y}px)`,
				x: "-50%",
				y: "-50%",
				zIndex: isDragging ? 100 : isExpanded ? 90 : zIndex,
				width: isExpanded ? expandedWidth : media.size.width,
			}}
			animate={{
				rotate: isExpanded ? 0 : media.rotation,
				scale: isDragging ? 1.08 : isExpanded ? 1.05 : 1,
				boxShadow:
					isDragging || isExpanded
						? "0 20px 40px -5px rgba(255, 255, 255, 0.15), 0 10px 20px -5px rgba(255, 255, 255, 0.1)"
						: "0 8px 20px -3px rgba(255, 255, 255, 0.08), 0 3px 8px -2px rgba(255, 255, 255, 0.05)",
			}}
			whileHover={
				isDragging || isExpanded
					? {}
					: {
							rotate: 0,
							scale: 1.05,
							boxShadow:
								"0 15px 30px -5px rgba(255, 255, 255, 0.12), 0 8px 15px -5px rgba(255, 255, 255, 0.08)",
						}
			}
			transition={{ duration: 0.2 }}
			onPointerDown={handlePointerDown}
			onPointerMove={handlePointerMove}
			onPointerUp={handlePointerUp}
			onPointerCancel={handlePointerUp}
			onClick={handleClick}
			role={isExpanded ? undefined : "button"}
			tabIndex={isExpanded ? undefined : 0}
			onKeyDown={(e) => {
				if (!isExpanded && (e.key === "Enter" || e.key === " ")) {
					setIsExpanded(true);
				}
				if (e.key === "Escape" && isExpanded) {
					setIsExpanded(false);
				}
			}}
		>
			{/* Image/Video */}
			<div
				className="relative overflow-hidden transition-[height] duration-300 ease-out"
				style={{
					height: isExpanded ? expandedImageHeight : media.size.height,
				}}
			>
				{media.type === "image" ? (
					<img
						src={currentImage}
						alt={media.title}
						className="absolute inset-0 w-full h-full object-cover pointer-events-none"
						draggable={false}
					/>
				) : (
					<>
						<img
							src={media.thumbnail || currentImage}
							alt={media.title}
							className="absolute inset-0 w-full h-full object-cover pointer-events-none"
							draggable={false}
						/>
						{!isExpanded && (
							<div className="absolute inset-0 flex items-center justify-center bg-black/20">
								<div className="w-12 h-12 bg-white/90 flex items-center justify-center">
									<svg
										className="w-5 h-5 text-black ml-1"
										fill="currentColor"
										viewBox="0 0 24 24"
										aria-hidden="true"
									>
										<path d="M8 5v14l11-7z" />
									</svg>
								</div>
							</div>
						)}
					</>
				)}

				{/* Image navigation for multiple images */}
				<AnimatePresence>
					{isExpanded && hasMultipleImages && (
						<>
							<motion.button
								type="button"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.15 }}
								onClick={handlePrevImage}
								className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center bg-background/80 border border-muted-foreground/20 text-muted-foreground hover:text-foreground transition-colors"
							>
								<ChevronLeft className="w-4 h-4" />
							</motion.button>
							<motion.button
								type="button"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.15 }}
								onClick={handleNextImage}
								className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center bg-background/80 border border-muted-foreground/20 text-muted-foreground hover:text-foreground transition-colors"
							>
								<ChevronRight className="w-4 h-4" />
							</motion.button>
							{/* Image indicators */}
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1"
							>
								{images.map((_, idx) => (
									<button
										type="button"
										key={idx}
										onClick={(e) => {
											e.stopPropagation();
											setCurrentImageIndex(idx);
										}}
										className={`w-1.5 h-1.5 rounded-full transition-colors ${
											idx === currentImageIndex
												? "bg-white"
												: "bg-white/40 hover:bg-white/60"
										}`}
									/>
								))}
							</motion.div>
						</>
					)}
				</AnimatePresence>

				{/* Close button when expanded */}
				<AnimatePresence>
					{isExpanded && (
						<motion.button
							type="button"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.15 }}
							onClick={handleClose}
							className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-background/80 border border-muted-foreground/20 text-muted-foreground hover:text-foreground transition-colors"
						>
							<X className="w-3 h-3" />
						</motion.button>
					)}
				</AnimatePresence>
			</div>

			{/* Expanded content */}
			{isExpanded && (
				<div className="p-4 space-y-3 animate-in fade-in duration-200 select-text">
					<h3 className="text-sm font-medium text-foreground">{media.title}</h3>
					<p className="text-xs text-muted-foreground leading-relaxed">
						{media.description}
					</p>
					<div className="flex gap-2 pt-1">
						{media.url && (
							<button
								type="button"
								onClick={handleViewProject}
								className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-foreground text-background hover:bg-foreground/90 transition-colors"
							>
								View
								<ArrowUpRight className="w-3 h-3" />
							</button>
						)}
						<button
							type="button"
							onClick={handleAskAI}
							className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-muted-foreground/20 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
						>
							<MessageCircle className="w-3 h-3" />
							Ask AI
						</button>
					</div>
				</div>
			)}
		</motion.div>
	);
}
