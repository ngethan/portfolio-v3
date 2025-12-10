import type { PlaygroundMedia } from "../components/playground/MediaCard";
import type { PlaygroundProject } from "../components/playground/ProjectCard";

export const PROJECTS: PlaygroundProject[] = [
	{
		id: "meet",
		name: "Meet in the Middle",
		description:
			"Group hangout planner that finds optimal meetup spots based on everyone's location",
		url: "https://github.com/ngethan/meet-in-the-middle",
		position: { x: 350, y: -150 },
		rotation: -2,
		tags: ["React Native", "Maps API", "Algorithms"],
	},
	{
		id: "ai-camera",
		name: "AI Camera Assistant",
		description:
			"iOS camera app with TensorFlow-powered real-time photography suggestions",
		url: undefined,
		position: { x: -300, y: 150 },
		rotation: 3,
		tags: ["Swift", "TensorFlow Lite", "Core ML"],
	},
	{
		id: "murmur",
		name: "Murmur",
		description:
			"Voice note-taking app that smartly prompts you about things to journal about",
		url: "https://github.com/ngethan/hackslu-2025",
		position: { x: 300, y: 180 },
		rotation: 2,
		tags: ["React Native", "NLP", "Voice"],
	},
	{
		id: "statsd",
		name: "@connectalum/statsd-client",
		description: "StatsD client library for Node.js applications",
		url: "https://www.npmjs.com/package/@connectalum/statsd-client",
		position: { x: -50, y: 380 },
		rotation: 4,
		tags: ["Node.js", "TypeScript", "NPM"],
	},
	{
		id: "infisical-aws",
		name: "@connectalum/infisical-jsc-aws-auth",
		description: "AWS authentication module for Infisical JSC",
		url: "https://www.npmjs.com/package/@connectalum/infisical-jsc-aws-auth",
		position: { x: -400, y: 450 },
		rotation: -2,
		tags: ["TypeScript", "AWS", "DevOps"],
	},
	{
		id: "infisical-js",
		name: "@connectalum/infisical-js-client",
		description: "JavaScript client for Infisical secret management",
		url: "https://www.npmjs.com/package/@connectalum/infisical-js-client",
		position: { x: 400, y: 450 },
		rotation: 3,
		tags: ["TypeScript", "AWS", "DevOps"],
	},
];

export const MEDIA: PlaygroundMedia[] = [
	{
		id: "frick",
		type: "image",
		src: [
			"/assets/sandbox/frick-1.jpeg",
			"/assets/sandbox/frick-2.jpeg",
			"/assets/sandbox/frick-3.jpeg",
		],
		title: "Frick",
		description: "iOS app that blocks distracting apps using NFC tags.",
		url: "https://github.com/ngethan/frick",
		position: { x: -350, y: -280 },
		rotation: 4,
		size: { width: 180, height: 320 },
	},
	{
		id: "ocean-beach-birthday",
		type: "image",
		src: "/assets/me.jpeg",
		title: "Ocean Beach, SF",
		description:
			"A picture of me taken in Ocean Beach, San Francisco on my birthday.",
		position: { x: 50, y: -480 },
		rotation: 2,
		size: { width: 280, height: 210 },
	},
	{
		id: "cnn-viz",
		type: "image",
		src: "/assets/sandbox/cnn-viz.png",
		title: "CNN Visualization",
		description:
			"Visualization from my NumPy neural network - 99% MNIST accuracy.",
		position: { x: 650, y: -400 },
		rotation: -3,
		size: { width: 260, height: 200 },
	},
	{
		id: "walk-to-class",
		type: "image",
		src: "/assets/sandbox/malcolm-todd-album-cover.jpeg",
		title: "Walk to Class",
		description: "Malcolm Todd. On repeat lately.",
		url: "https://open.spotify.com/track/3lSOulXs9LWZfhfMdMBUhp",
		position: { x: -700, y: -350 },
		rotation: 4,
		size: { width: 220, height: 220 },
	},
	{
		id: "manhattan-skyline",
		type: "image",
		src: "/assets/sandbox/manhattan-skyline.jpeg",
		title: "Manhattan",
		description: "A shot I took of the skyline.",
		position: { x: 700, y: 300 },
		rotation: -2,
		size: { width: 300, height: 200 },
	},
	{
		id: "washu-campus",
		type: "image",
		src: "/assets/sandbox/washu-campus.jpeg",
		title: "WashU",
		description: "Home for now.",
		position: { x: -650, y: 550 },
		rotation: 3,
		size: { width: 280, height: 200 },
	},
	{
		id: "vibecheck-ide",
		type: "image",
		src: [
			"/assets/sandbox/vibecheck-landing.png",
			"/assets/sandbox/vibecheck-ide.png",
		],
		title: "VibeCheck",
		description:
			"CodeSignal for modern technical interviews - Cursor meets assessment engine in the browser.",
		url: "https://github.com/ngethan/vibecheck",
		position: { x: 700, y: -100 },
		rotation: -1,
		size: { width: 320, height: 200 },
	},
	{
		id: "somnia",
		type: "image",
		src: "/assets/sandbox/somnia.png",
		title: "Somnia",
		description:
			"Sleep-tracking app integrating Apple HealthKit with AI-powered insights.",
		url: "https://github.com/ngethan/somnia",
		position: { x: 150, y: 550 },
		rotation: 2,
		size: { width: 280, height: 180 },
	},
	{
		id: "350z",
		type: "image",
		src: ["/assets/sandbox/350z-1.png", "/assets/sandbox/350z-2.png"],
		title: "350Z",
		description: "My 2004 manual Nissan 350Z. She's a beauty.",
		position: { x: -700, y: 100 },
		rotation: -2,
		size: { width: 300, height: 200 },
	},
];

// Bounds for panning - keeps content within the shadow background
export const MAX_OFFSET = { x: 800, y: 600 };
