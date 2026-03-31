// Tsim Sha Tsui yellow — 5 intensity levels from dark to bright
// Level 0 = no contributions, Level 4 = highest activity
const TILE_LEVELS = [
	"oklch(0.32 0.02 85)",
	"oklch(0.48 0.10 90)",
	"oklch(0.62 0.17 88)",
	"oklch(0.78 0.19 86)",
	"oklch(0.90 0.20 84)",
] as const;

export const EMPTY_TILE_COLOR = "oklch(0.28 0.005 85)";

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
