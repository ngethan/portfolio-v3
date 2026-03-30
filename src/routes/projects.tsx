import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Layout } from "../components/Layout";
import { buildSeoTags } from "../site-config";

const DESCRIPTION =
	"Passionate builder and WashU CS + finance student obsessed with learning, shipping side projects, and turning ideas into reality through technology.";

export const Route = createFileRoute("/projects")({
	head: () =>
		buildSeoTags({
			title: "PROJECTS | ETHAN NG",
			description: DESCRIPTION,
			path: "/projects",
		}),
	component: Projects,
});

const projects = [
	{
		name: "VibeCheck",
		description:
			"CodeSignal for modern technical interviews—think Cursor and an assessment engine in the browser",
		url: "https://github.com/ngethan/vibecheck",
		tags: ["React", "TypeScript", "AI", "Monaco Editor"],
	},
	{
		name: "Frick",
		description: "iOS app that blocks distracting apps using NFC tags",
		url: "https://github.com/ngethan/frick",
		tags: ["SwiftUI", "Core NFC", "iOS"],
	},
	{
		name: "Meet in the Middle",
		description:
			"Group hangout planner that finds optimal meetup spots based on everyone's location",
		url: "https://github.com/ngethan/meet-in-the-middle",
		tags: ["React Native", "Maps API", "Algorithms"],
	},
	{
		name: "AI Camera Assistant",
		description:
			"iOS camera app with TensorFlow-powered real-time photography suggestions",
		url: null,
		tags: ["Swift", "TensorFlow Lite", "Core ML"],
	},
	{
		name: "Convolutional Neural Network",
		description:
			"Convolutional neural network built in NumPy achieving 99% MNIST accuracy",
		url: "https://github.com/ngethan/cnn",
		tags: ["Python", "NumPy", "Deep Learning"],
	},
	{
		name: "Murmur",
		description:
			"Voice note-taking app that smartly prompts you about things to journal about",
		url: "https://github.com/ngethan/hackslu-2025",
		tags: ["React Native", "NLP", "Voice"],
	},
	{
		name: "Somnia",
		description:
			"Sleep-tracking app integrating Apple HealthKit with AI-powered insights",
		url: "https://github.com/ngethan/somnia",
		tags: ["Swift", "HealthKit", "AI"],
	},
	{
		name: "@connectalum/statsd-client",
		description: "StatsD client library for Node.js applications",
		url: "https://www.npmjs.com/package/@connectalum/statsd-client",
		tags: ["Node.js", "TypeScript", "NPM"],
	},
	{
		name: "@connectalum/infisical-jsc-aws-auth",
		description: "AWS authentication module for Infisical JSC",
		url: "https://www.npmjs.com/package/@connectalum/infisical-jsc-aws-auth",
		tags: ["TypeScript", "AWS", "DevOps"],
	},
	{
		name: "@connectalum/infisical-js-client",
		description: "JavaScript client for Infisical secret management",
		url: "https://www.npmjs.com/package/@connectalum/infisical-js-client",
		tags: ["TypeScript", "AWS", "DevOps"],
	},
];

function Projects() {
	return (
		<Layout activeSection="projects">
			<div className="space-y-6 font-mono">
				{projects.map((project) => (
					<div key={project.name} className="space-y-1">
						<div className="flex items-center gap-2">
							{project.url ? (
								<a
									href={project.url}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-1 text-foreground no-underline"
								>
									<span className="link-text">{project.name}</span>
									<ArrowUpRight className="w-3 h-3" />
								</a>
							) : (
								<span className="text-foreground">{project.name}</span>
							)}
						</div>
						<p className="text-sm text-muted-foreground">
							{project.description}
						</p>
						<div className="flex gap-2 flex-wrap pt-1">
							{project.tags.map((tag) => (
								<span
									key={tag}
									className="px-2 py-0.5 text-xs text-dim border border-white/10 rounded"
								>
									{tag}
								</span>
							))}
						</div>
					</div>
				))}
			</div>
		</Layout>
	);
}
