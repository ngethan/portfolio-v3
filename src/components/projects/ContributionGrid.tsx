import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ContributionWeek } from "../../lib/github";
import {
	EMPTY_TILE_COLOR,
	getIntensityLevel,
	getTileColor,
} from "../../lib/mtr-colors";

interface ContributionGridProps {
	weeks: ContributionWeek[];
	baseDelay?: number;
}

const TILE_SIZE = 14;
const GAP = 3;
const COL_WIDTH = TILE_SIZE + GAP;
const HOVER_RADIUS = 50;

export function ContributionGrid({
	weeks,
	baseDelay = 0,
}: ContributionGridProps) {
	if (!weeks?.length) return null;

	const maxCount = Math.max(
		...weeks.flatMap((w) => w.contributionDays.map((d) => d.contributionCount)),
		1,
	);

	const fullWeeks = useMemo(
		() => weeks.filter((w) => w.contributionDays.length === 7),
		[weeks],
	);

	const pulseDelays = useMemo(
		() =>
			fullWeeks.map((week) =>
				week.contributionDays.map(() => `${3 + Math.random() * 6}s`),
			),
		[fullWeeks],
	);

	const containerRef = useRef<HTMLDivElement>(null);
	const gridRef = useRef<HTMLDivElement>(null);
	const [visibleCols, setVisibleCols] = useState(fullWeeks.length);
	const hasAnimated = useRef(false);
	const rafId = useRef<number>(0);

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;

		const update = () => {
			const cols = Math.floor(el.clientWidth / COL_WIDTH);
			setVisibleCols(Math.min(cols, fullWeeks.length));
		};

		update();
		const timeout = setTimeout(
			() => {
				hasAnimated.current = true;
			},
			(baseDelay + fullWeeks.length * 0.008 + 0.2) * 1000,
		);

		const observer = new ResizeObserver(update);
		observer.observe(el);
		return () => {
			observer.disconnect();
			clearTimeout(timeout);
		};
	}, [fullWeeks.length, baseDelay]);

	const handleMouseMove = useCallback((e: React.MouseEvent) => {
		cancelAnimationFrame(rafId.current);
		rafId.current = requestAnimationFrame(() => {
			const grid = gridRef.current;
			if (!grid) return;

			const cx = e.clientX;
			const cy = e.clientY;
			const tiles = grid.querySelectorAll<HTMLElement>(".contrib-tile");

			for (const tile of tiles) {
				const r = tile.getBoundingClientRect();
				const tx = r.left + r.width / 2;
				const ty = r.top + r.height / 2;
				const dist = Math.sqrt((cx - tx) ** 2 + (cy - ty) ** 2);

				if (dist < HOVER_RADIUS) {
					const intensity = 1 - dist / HOVER_RADIUS;
					tile.style.filter = `brightness(${1 + intensity * 0.35})`;
					tile.style.transform = `scale(${1 + intensity * 0.08})`;
				} else {
					tile.style.filter = "";
					tile.style.transform = "";
				}
			}
		});
	}, []);

	const handleMouseLeave = useCallback(() => {
		cancelAnimationFrame(rafId.current);
		const grid = gridRef.current;
		if (!grid) return;
		for (const tile of grid.querySelectorAll<HTMLElement>(".contrib-tile")) {
			tile.style.filter = "";
			tile.style.transform = "";
		}
	}, []);

	const visibleWeeks = fullWeeks.slice(fullWeeks.length - visibleCols);
	const animated = hasAnimated.current;

	return (
		<>
			<style>
				{`
					@keyframes tile-enter {
						from { opacity: 0; transform: scale(0.5); }
						to { opacity: 1; transform: scale(1); }
					}
					@keyframes tile-pulse {
						0%, 100% { opacity: 1; }
						50% { opacity: 0.7; }
					}
					.contrib-tile {
						border-radius: 2px;
						width: ${TILE_SIZE}px;
						height: ${TILE_SIZE}px;
						transition: filter 0.15s ease-out, transform 0.15s ease-out;
					}
					.contrib-tile.entering {
						opacity: 0;
						transform: scale(0.5);
						animation: tile-enter 0.2s ease-out forwards;
					}
					.contrib-tile.entering[data-active] {
						animation: tile-enter 0.2s ease-out forwards,
							tile-pulse 5s ease-in-out infinite;
					}
					.contrib-tile.settled {
						opacity: 1;
					}
					.contrib-tile.settled[data-active] {
						animation: tile-pulse 5s ease-in-out infinite;
					}
				`}
			</style>
			<div
				ref={containerRef}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
			>
				<div ref={gridRef} className="flex" style={{ gap: GAP }}>
					{visibleWeeks.map((week, weekIdx) => (
						<div
							key={`week-${weekIdx}`}
							className="flex flex-col"
							style={{ gap: GAP }}
						>
							{week.contributionDays.map((day, dayIdx) => {
								const level = getIntensityLevel(
									day.contributionCount,
									maxCount,
								);
								const entranceDelay = `${baseDelay + weekIdx * 0.008}s`;
								const pulseDelay =
									pulseDelays[fullWeeks.length - visibleCols + weekIdx]?.[
										dayIdx
									] ?? "4s";

								return (
									<div
										key={day.date}
										className={`contrib-tile ${animated ? "settled" : "entering"}`}
										data-active={level > 0 ? "" : undefined}
										style={{
											animationDelay: animated
												? pulseDelay
												: `${entranceDelay}, ${pulseDelay}`,
											backgroundColor:
												level === 0 ? EMPTY_TILE_COLOR : getTileColor(level),
										}}
									/>
								);
							})}
						</div>
					))}
				</div>
			</div>
		</>
	);
}
