// Primary orange — 5 intensity levels from dark to bright
// Level 0 = no contributions, Level 4 = highest activity
const TILE_LEVELS = [
	"oklch(0.42 0.05 39.95)",
	"oklch(0.55 0.09 39.95)",
	"oklch(0.66 0.12 39.95)",
	"oklch(0.75 0.14 39.95)",
	"oklch(0.83 0.16 39.95)",
] as const;

export const EMPTY_TILE_COLOR = "oklch(0.28 0.005 39.95)";

export function getTileColor(level: number): string {
	return TILE_LEVELS[Math.max(0, Math.min(4, level))];
}

export function getIntensityLevel(count: number, maxCount: number): number {
	if (count === 0 || maxCount <= 0) return 0;
	const ratio = Math.sqrt(count / maxCount);
	if (ratio <= 0.25) return 1;
	if (ratio <= 0.5) return 2;
	if (ratio <= 0.75) return 3;
	return 4;
}
