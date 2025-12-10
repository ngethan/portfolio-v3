interface PlaygroundGridProps {
	offset: { x: number; y: number };
}

export function PlaygroundGrid({ offset }: PlaygroundGridProps) {
	const gridSize = 60;

	// Use patternTransform to shift the pattern based on offset
	// This creates the illusion of infinite scrolling grid
	const patternOffsetX = offset.x % gridSize;
	const patternOffsetY = offset.y % gridSize;

	return (
		<svg
			className="absolute inset-0 w-full h-full pointer-events-none"
			aria-hidden="true"
		>
			<defs>
				<pattern
					id="grid-pattern"
					width={gridSize}
					height={gridSize}
					patternUnits="userSpaceOnUse"
					patternTransform={`translate(${patternOffsetX}, ${patternOffsetY})`}
				>
					<text
						x={gridSize / 2}
						y={gridSize / 2}
						textAnchor="middle"
						dominantBaseline="middle"
						fill="currentColor"
						className="text-muted-foreground/25"
						fontSize="14"
						fontFamily="monospace"
					>
						+
					</text>
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill="url(#grid-pattern)" />
		</svg>
	);
}
