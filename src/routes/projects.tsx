import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Layout } from "../components/Layout";
import { buildSeoTags } from "../site-config";

const DESCRIPTION =
	"Passionate builder and WashU CS + finance student obsessed with learning, shipping side projects, and turning ideas into reality through technology.";

export const Route = createFileRoute("/projects")({
	head: () =>
		buildSeoTags({
			title: "Projects | Ethan Ng",
			description: DESCRIPTION,
			path: "/projects",
		}),
	component: Projects,
});

function Projects() {
	const projects = [
		{
			name: "VibeCheck",
			description:
				"CodeSignal for modern technical interviews—think Cursor and an assessment engine in the browser",
			url: "https://github.com/ngethan/vibecheck",
		},
		{
			name: "Frick",
			description: "iOS app that blocks distracting apps using NFC tags",
			url: "https://github.com/ngethan/frick",
		},
		{
			name: "Meet in the Middle",
			description:
				"Group hangout planner that finds optimal meetup spots based on everyone's location",
			url: "https://github.com/ngethan/meet-in-the-middle",
		},
		{
			name: "AI Camera Assistant",
			description:
				"iOS camera app with TensorFlow-powered real-time photography suggestions",
			url: null,
		},
		{
			name: "Convolutional Neural Network",
			description:
				"Convolutional neural network built in NumPy achieving 99% MNIST accuracy",
			url: "https://github.com/ngethan/cnn",
		},
		{
			name: "Murmur",
			description: "Mobile app that won Best UI Design at HackSLU 2025",
			url: "https://github.com/ngethan/hackslu-2025",
		},
		{
			name: "Somnia",
			description:
				"Sleep-tracking app integrating Apple HealthKit with AI-powered insights",
			url: "https://github.com/ngethan/somnia",
		},
		{
			name: "@connectalum/statsd-client",
			description: "StatsD client library for Node.js applications",
			url: "https://www.npmjs.com/package/@connectalum/statsd-client",
		},
		{
			name: "@connectalum/infisical-jsc-aws-auth",
			description: "AWS authentication module for Infisical JSC",
			url: "https://www.npmjs.com/package/@connectalum/infisical-jsc-aws-auth",
		},
		{
			name: "@connectalum/infisical-js-client",
			description: "JavaScript client for Infisical secret management",
			url: "https://www.npmjs.com/package/@connectalum/infisical-js-client",
		},
	];

	return (
		<Layout activeSection="projects">
			<div className="space-y-4 text-muted-foreground">
				{projects.map((project) => (
					<div key={project.name} className="flex flex-col gap-1">
						<div className="flex items-center gap-2">
							{project.url ? (
								<a
									href={project.url}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-1"
								>
									<span>{project.name}</span>
									<ArrowUpRight className="w-3 h-3" />
								</a>
							) : (
								<span className="text-foreground">{project.name}</span>
							)}
						</div>
						<p className="text-sm">{project.description}</p>
					</div>
				))}
			</div>
		</Layout>
	);
}
