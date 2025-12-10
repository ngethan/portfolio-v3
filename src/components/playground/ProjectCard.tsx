import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";

export interface PlaygroundProject {
	id: string;
	name: string;
	description: string;
	url?: string;
	position: { x: number; y: number };
	rotation: number;
	tags: string[];
}

interface ProjectCardProps {
	project: PlaygroundProject;
	onPositionChange?: (id: string, position: { x: number; y: number }) => void;
	onFocus?: (id: string) => void;
	zIndex?: number;
}

export function ProjectCard({
	project,
	onPositionChange,
	onFocus,
	zIndex = 0,
}: ProjectCardProps) {
	const [isDragging, setIsDragging] = useState(false);
	const [localPosition, setLocalPosition] = useState(project.position);
	const dragStartRef = useRef({ x: 0, y: 0 });
	const positionStartRef = useRef({ x: 0, y: 0 });
	const hasDraggedRef = useRef(false);

	const handleClick = () => {
		// Only open URL if we didn't just drag
		if (project.url && !hasDraggedRef.current) {
			window.open(project.url, "_blank", "noopener,noreferrer");
		}
		hasDraggedRef.current = false;
	};

	const handlePointerDown = (e: React.PointerEvent) => {
		e.stopPropagation();
		setIsDragging(true);
		hasDraggedRef.current = false;
		dragStartRef.current = { x: e.clientX, y: e.clientY };
		positionStartRef.current = { x: localPosition.x, y: localPosition.y };
		(e.target as HTMLElement).setPointerCapture(e.pointerId);
		onFocus?.(project.id);
	};

	const handlePointerMove = (e: React.PointerEvent) => {
		if (!isDragging) return;

		const dx = e.clientX - dragStartRef.current.x;
		const dy = e.clientY - dragStartRef.current.y;

		// Mark as dragged if moved more than 5px
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

		// Notify parent of position change
		if (onPositionChange && hasDraggedRef.current) {
			onPositionChange(project.id, localPosition);
		}
	};

	return (
		<motion.div
			data-project-card
			className={`absolute w-72 bg-card/80 backdrop-blur-sm border border-muted-foreground/10 rounded-lg p-4 shadow-lg ${
				isDragging ? "cursor-grabbing" : "cursor-grab"
			}`}
			style={{
				left: `calc(50% + ${localPosition.x}px)`,
				top: `calc(50% + ${localPosition.y}px)`,
				x: "-50%",
				y: "-50%",
				rotate: project.rotation,
				zIndex: isDragging ? 100 : zIndex,
			}}
			animate={{
				scale: isDragging ? 1.08 : 1,
				boxShadow: isDragging
					? "0 20px 40px -5px rgba(255, 255, 255, 0.15), 0 10px 20px -5px rgba(255, 255, 255, 0.1)"
					: "0 8px 20px -3px rgba(255, 255, 255, 0.08), 0 3px 8px -2px rgba(255, 255, 255, 0.05)",
			}}
			whileHover={
				isDragging
					? {}
					: {
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
			role={project.url ? "button" : undefined}
			tabIndex={project.url ? 0 : undefined}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					handleClick();
				}
			}}
		>
			<div className="flex items-start justify-between gap-2 mb-2">
				<h3 className="text-foreground font-medium text-sm leading-tight">
					{project.name}
				</h3>
				{project.url && (
					<ArrowUpRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
				)}
			</div>
			<p className="text-muted-foreground text-xs leading-relaxed mb-3">
				{project.description}
			</p>
			<div className="flex gap-1.5 flex-wrap">
				{project.tags.map((tag) => (
					<span
						key={tag}
						className="px-2 py-0.5 bg-background/50 rounded text-[10px] text-muted-foreground"
					>
						{tag}
					</span>
				))}
			</div>
		</motion.div>
	);
}
