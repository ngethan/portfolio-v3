import {
	type ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";

interface PlaygroundCanvasProps {
	children: ReactNode;
	offset: { x: number; y: number };
	onOffsetChange: (offset: { x: number; y: number }) => void;
}

const FRICTION = 0.92; // How quickly momentum decays (0-1, higher = slower decay)
const MIN_VELOCITY = 0.5; // Stop animation when velocity is below this
const RESET_EASING = 0.12; // Easing factor for smooth reset (0-1, lower = smoother)

export function PlaygroundCanvas({
	children,
	offset,
	onOffsetChange,
}: PlaygroundCanvasProps) {
	const [isPanning, setIsPanning] = useState(false);
	const startPointRef = useRef({ x: 0, y: 0 });
	const startOffsetRef = useRef({ x: 0, y: 0 });
	const containerRef = useRef<HTMLDivElement>(null);

	// For momentum tracking
	const lastPointRef = useRef({ x: 0, y: 0 });
	const lastTimeRef = useRef(0);
	const velocityRef = useRef({ x: 0, y: 0 });
	const animationFrameRef = useRef<number | null>(null);
	const currentOffsetRef = useRef(offset);

	// Keep offset ref in sync
	useEffect(() => {
		currentOffsetRef.current = offset;
	}, [offset]);

	// Momentum animation loop
	const animateMomentum = useCallback(() => {
		const vx = velocityRef.current.x;
		const vy = velocityRef.current.y;

		// Stop if velocity is negligible
		if (Math.abs(vx) < MIN_VELOCITY && Math.abs(vy) < MIN_VELOCITY) {
			velocityRef.current = { x: 0, y: 0 };
			animationFrameRef.current = null;
			return;
		}

		// Apply velocity to offset using current ref value
		onOffsetChange({
			x: currentOffsetRef.current.x + vx,
			y: currentOffsetRef.current.y + vy,
		});

		// Apply friction
		velocityRef.current = {
			x: vx * FRICTION,
			y: vy * FRICTION,
		};

		animationFrameRef.current = requestAnimationFrame(animateMomentum);
	}, [onOffsetChange]);

	// Smooth reset animation loop
	const animateReset = useCallback(() => {
		const currentX = currentOffsetRef.current.x;
		const currentY = currentOffsetRef.current.y;

		// Stop if close enough to center
		if (Math.abs(currentX) < 0.5 && Math.abs(currentY) < 0.5) {
			onOffsetChange({ x: 0, y: 0 });
			animationFrameRef.current = null;
			return;
		}

		// Ease towards center
		onOffsetChange({
			x: currentX * (1 - RESET_EASING),
			y: currentY * (1 - RESET_EASING),
		});

		animationFrameRef.current = requestAnimationFrame(animateReset);
	}, [onOffsetChange]);

	// Clean up animation on unmount
	useEffect(() => {
		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, []);

	const handlePointerDown = useCallback(
		(e: React.PointerEvent) => {
			// Only pan on primary button (left click) or touch
			if (e.button !== 0 && e.pointerType === "mouse") return;

			// Don't start panning if clicking on a project or media card
			const target = e.target as HTMLElement;
			if (target.closest("[data-project-card]") || target.closest("[data-media-card]")) return;

			// Stop any ongoing momentum animation
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
				animationFrameRef.current = null;
			}
			velocityRef.current = { x: 0, y: 0 };

			setIsPanning(true);
			startPointRef.current = { x: e.clientX, y: e.clientY };
			startOffsetRef.current = { x: offset.x, y: offset.y };
			lastPointRef.current = { x: e.clientX, y: e.clientY };
			lastTimeRef.current = Date.now();

			// Capture pointer for smooth dragging
			(e.target as HTMLElement).setPointerCapture(e.pointerId);
		},
		[offset],
	);

	const handlePointerMove = useCallback(
		(e: React.PointerEvent) => {
			if (!isPanning) return;

			const now = Date.now();
			const dt = now - lastTimeRef.current;

			// Calculate velocity (pixels per frame, roughly)
			if (dt > 0) {
				const vx = (e.clientX - lastPointRef.current.x) * (16 / dt); // Normalize to ~60fps
				const vy = (e.clientY - lastPointRef.current.y) * (16 / dt);

				// Smooth velocity with previous value
				velocityRef.current = {
					x: vx * 0.4 + velocityRef.current.x * 0.6,
					y: vy * 0.4 + velocityRef.current.y * 0.6,
				};
			}

			lastPointRef.current = { x: e.clientX, y: e.clientY };
			lastTimeRef.current = now;

			const dx = e.clientX - startPointRef.current.x;
			const dy = e.clientY - startPointRef.current.y;

			onOffsetChange({
				x: startOffsetRef.current.x + dx,
				y: startOffsetRef.current.y + dy,
			});
		},
		[isPanning, onOffsetChange],
	);

	const handlePointerUp = useCallback(
		(e: React.PointerEvent) => {
			if (!isPanning) return;

			setIsPanning(false);
			(e.target as HTMLElement).releasePointerCapture(e.pointerId);

			// Start momentum animation if there's velocity
			const vx = velocityRef.current.x;
			const vy = velocityRef.current.y;
			if (Math.abs(vx) > MIN_VELOCITY || Math.abs(vy) > MIN_VELOCITY) {
				animationFrameRef.current = requestAnimationFrame(animateMomentum);
			}
		},
		[isPanning, animateMomentum],
	);

	const handleDoubleClick = useCallback(
		(e: React.MouseEvent) => {
			// Don't reset if double-clicking on a card
			const target = e.target as HTMLElement;
			if (target.closest("[data-project-card]") || target.closest("[data-media-card]")) return;

			// Stop any ongoing momentum animation
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
				animationFrameRef.current = null;
			}
			velocityRef.current = { x: 0, y: 0 };

			// Start smooth reset animation
			animationFrameRef.current = requestAnimationFrame(animateReset);
		},
		[animateReset],
	);

	return (
		<div
			ref={containerRef}
			className={`w-screen h-screen overflow-hidden touch-none select-none ${
				isPanning ? "cursor-grabbing" : "cursor-grab"
			}`}
			onPointerDown={handlePointerDown}
			onPointerMove={handlePointerMove}
			onPointerUp={handlePointerUp}
			onPointerCancel={handlePointerUp}
			onPointerLeave={handlePointerUp}
			onDoubleClick={handleDoubleClick}
		>
			<div
				className="relative w-full h-full"
				style={{
					transform: `translate(${offset.x}px, ${offset.y}px)`,
					willChange: isPanning ? "transform" : "auto",
				}}
			>
				{children}
			</div>
		</div>
	);
}
