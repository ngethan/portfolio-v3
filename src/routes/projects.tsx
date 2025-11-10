import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
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

function HoverPreview({
	content,
	isMobile,
}: { content: React.ReactNode; isMobile: boolean }) {
	if (isMobile) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 20 }}
				transition={{ duration: 0.4, ease: "easeInOut" }}
				className="w-full preview-content"
			>
				{content}
			</motion.div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
			transition={{ duration: 0.2, ease: "easeOut" }}
			className="fixed right-8 2xl:right-24 hidden md:flex preview-content z-50"
			style={{
				top: "6rem",
				height: "auto",
				width: "clamp(400px, calc(100% - 700px), 45%)",
				maxHeight: "calc(100vh - 12rem)",
				overflowY: "auto",
			}}
		>
			<div className="w-full">{content}</div>
		</motion.div>
	);
}

const PROJECT_PREVIEWS = {
	vibecheck: (
		<div
			className="space-y-4 text-muted-foreground"
			style={{ lineHeight: "1.2em" }}
		>
			<p>
				Building a modern coding interview platform that combines AI-powered
				code completion (like Cursor) with an intelligent assessment engine. The
				goal is to create a more natural interview experience that evaluates how
				developers actually work, not just their ability to write code on a
				whiteboard.
			</p>
			<p>
				Tech stack: React, TypeScript, Monaco Editor, WebContainers API, and a
				custom AI integration layer for real-time code suggestions.
			</p>
			<div className="flex gap-2 flex-wrap">
				<span className="px-2 py-1 bg-card rounded text-xs">React</span>
				<span className="px-2 py-1 bg-card rounded text-xs">TypeScript</span>
				<span className="px-2 py-1 bg-card rounded text-xs">AI</span>
				<span className="px-2 py-1 bg-card rounded text-xs">Monaco Editor</span>
			</div>
		</div>
	),
	frick: (
		<div
			className="space-y-4 text-muted-foreground"
			style={{ lineHeight: "1.2em" }}
		>
			<p>
				An iOS app that uses NFC tags to create physical "locks" for digital
				distractions. Place an NFC tag on your desk, nightstand, or anywhere you
				want to focus—tap your phone to it and distracting apps instantly lock
				themselves.
			</p>
			<p>
				Built with SwiftUI and Core NFC. The friction of physically tapping a
				tag create a powerful behavioral intervention.
			</p>
			<div className="flex gap-2 flex-wrap">
				<span className="px-2 py-1 bg-card rounded text-xs">SwiftUI</span>
				<span className="px-2 py-1 bg-card rounded text-xs">Core NFC</span>
				<span className="px-2 py-1 bg-card rounded text-xs">iOS</span>
			</div>
		</div>
	),
	meet: (
		<div
			className="space-y-4 text-muted-foreground"
			style={{ lineHeight: "1.2em" }}
		>
			<p>
				Solves the age-old problem of "where should we meet?" by finding optimal
				gatherings spots based on everyone's location. Uses geographic
				algorithms to minimize total travel distance for the group.
			</p>
			<p>
				Features real-time location sharing, smart venue suggestions, and group
				coordination tools. Great for large friend groups or events.
			</p>
			<div className="flex gap-2 flex-wrap">
				<span className="px-2 py-1 bg-card rounded text-xs">React Native</span>
				<span className="px-2 py-1 bg-card rounded text-xs">Maps API</span>
				<span className="px-2 py-1 bg-card rounded text-xs">Algorithms</span>
			</div>
		</div>
	),
	"ai-camera": (
		<div
			className="space-y-4 text-muted-foreground"
			style={{ lineHeight: "1.2em" }}
		>
			<p>
				An iOS camera app that provides real-time photography suggestions using
				TensorFlow Lite. Analyzes composition, lighting, and framing to give
				instant feedback as you shoot.
			</p>
			<p>
				Runs entirely on-device for privacy. The ML model provides suggestions
				for rule of thirds, portrait framing, and optimal camera settings.
			</p>
			<div className="flex gap-2 flex-wrap">
				<span className="px-2 py-1 bg-card rounded text-xs">Swift</span>
				<span className="px-2 py-1 bg-card rounded text-xs">
					TensorFlow Lite
				</span>
				<span className="px-2 py-1 bg-card rounded text-xs">Core ML</span>
			</div>
		</div>
	),
	cnn: (
		<div
			className="space-y-4 text-muted-foreground"
			style={{ lineHeight: "1.2em" }}
		>
			<p>
				Built a convolutional neural network from scratch using only NumPy—no
				TensorFlow or PyTorch. Implemented forward propagation, backpropagation,
				convolution operations, pooling, and the full training loop.
			</p>
			<p>
				Achieved 99% accuracy on MNIST digit recognition. Great exercise in
				understanding the math behind deep learning.
			</p>
			<div className="flex gap-2 flex-wrap">
				<span className="px-2 py-1 bg-card rounded text-xs">Python</span>
				<span className="px-2 py-1 bg-card rounded text-xs">NumPy</span>
				<span className="px-2 py-1 bg-card rounded text-xs">Deep Learning</span>
			</div>
		</div>
	),
	murmur: (
		<div
			className="space-y-4 text-muted-foreground"
			style={{ lineHeight: "1.2em" }}
		>
			<p>
				A voice note-taking app that intelligently prompts you to journal about
				things in your life. Uses natural language processing to analyze your
				voice notes and suggest meaningful topics to reflect on based on context
				and patterns in your daily life.
			</p>
			<p>
				Won Best UI Design at HackSLU 2025. Built in 24 hours with a focus on
				creating an intuitive, emotionally-aware journaling experience.
			</p>
			<div className="flex gap-2 flex-wrap">
				<span className="px-2 py-1 bg-card rounded text-xs">React Native</span>
				<span className="px-2 py-1 bg-card rounded text-xs">NLP</span>
				<span className="px-2 py-1 bg-card rounded text-xs">Voice</span>
			</div>
		</div>
	),
	somnia: (
		<div
			className="space-y-4 text-muted-foreground"
			style={{ lineHeight: "1.2em" }}
		>
			<p>
				A comprehensive sleep tracking app that integrates with Apple HealthKit
				to gather sleep data, heart rate, and activity metrics. Uses AI to
				provide personalized insights and recommendations.
			</p>
			<p>
				Features sleep stage analysis, trend visualization, and actionable
				suggestions for improving sleep quality based on your data.
			</p>
			<div className="flex gap-2 flex-wrap">
				<span className="px-2 py-1 bg-card rounded text-xs">Swift</span>
				<span className="px-2 py-1 bg-card rounded text-xs">HealthKit</span>
				<span className="px-2 py-1 bg-card rounded text-xs">AI</span>
			</div>
		</div>
	),
	statsd: (
		<div
			className="space-y-4 text-muted-foreground"
			style={{ lineHeight: "1.2em" }}
		>
			<p>
				A lightweight, high-performance StatsD client for Node.js applications.
				Used in production at Connect to track application metrics, user events,
				and performance data.
			</p>
			<p>
				Supports batching, custom tags, and multiple transport backends. Built
				with performance and reliability in mind.
			</p>
			<div className="flex gap-2 flex-wrap">
				<span className="px-2 py-1 bg-card rounded text-xs">Node.js</span>
				<span className="px-2 py-1 bg-card rounded text-xs">TypeScript</span>
				<span className="px-2 py-1 bg-card rounded text-xs">NPM</span>
			</div>
		</div>
	),
	infisical: (
		<div
			className="space-y-4 text-muted-foreground"
			style={{ lineHeight: "1.2em" }}
		>
			<p>
				Authentication modules for Infisical's JavaScript client, enabling
				secure AWS resource access through Infisical's secret management
				platform. Used for managing database credentials and API keys in cloud
				environments.
			</p>
			<p>
				Part of Connect's infrastructure for managing secrets across
				development, staging, and production environments.
			</p>
			<div className="flex gap-2 flex-wrap">
				<span className="px-2 py-1 bg-card rounded text-xs">TypeScript</span>
				<span className="px-2 py-1 bg-card rounded text-xs">AWS</span>
				<span className="px-2 py-1 bg-card rounded text-xs">DevOps</span>
			</div>
		</div>
	),
};

function Projects() {
	const [hoverPreview, setHoverPreview] = useState<string | null>(null);
	const [pinnedPreview, setPinnedPreview] = useState<string | null>(null);
	const [isMobile, setIsMobile] = useState(false);

	const activePreview = pinnedPreview || hoverPreview;
	const previewContent = activePreview
		? PROJECT_PREVIEWS[activePreview as keyof typeof PROJECT_PREVIEWS]
		: null;

	const handleProjectHover = (key: string) => {
		if (isMobile) return;
		setHoverPreview(key);
	};

	const handleProjectLeave = () => {
		if (isMobile) return;
		setHoverPreview(null);
	};

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 1100);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape" && pinnedPreview) {
				setPinnedPreview(null);
			}
		};

		const handleClickOutside = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (pinnedPreview && !target.closest(".preview-content")) {
				setPinnedPreview(null);
			}
		};

		document.addEventListener("keydown", handleEscape);
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.removeEventListener("click", handleClickOutside);
		};
	}, [pinnedPreview]);

	const shouldBlur = pinnedPreview;

	const projects = [
		{
			name: "VibeCheck",
			description:
				"CodeSignal for modern technical interviews—think Cursor and an assessment engine in the browser",
			url: "https://github.com/ngethan/vibecheck",
			previewKey: "vibecheck",
		},
		{
			name: "Frick",
			description: "iOS app that blocks distracting apps using NFC tags",
			url: "https://github.com/ngethan/frick",
			previewKey: "frick",
		},
		{
			name: "Meet in the Middle",
			description:
				"Group hangout planner that finds optimal meetup spots based on everyone's location",
			url: "https://github.com/ngethan/meet-in-the-middle",
			previewKey: "meet",
		},
		{
			name: "AI Camera Assistant",
			description:
				"iOS camera app with TensorFlow-powered real-time photography suggestions",
			url: null,
			previewKey: "ai-camera",
		},
		{
			name: "Convolutional Neural Network",
			description:
				"Convolutional neural network built in NumPy achieving 99% MNIST accuracy",
			url: "https://github.com/ngethan/cnn",
			previewKey: "cnn",
		},
		{
			name: "Murmur",
			description: "Voice note-taking app that smartly prompts you about things to journal about",
			url: "https://github.com/ngethan/hackslu-2025",
			previewKey: "murmur",
		},
		{
			name: "Somnia",
			description:
				"Sleep-tracking app integrating Apple HealthKit with AI-powered insights",
			url: "https://github.com/ngethan/somnia",
			previewKey: "somnia",
		},
		{
			name: "@connectalum/statsd-client",
			description: "StatsD client library for Node.js applications",
			url: "https://www.npmjs.com/package/@connectalum/statsd-client",
			previewKey: "statsd",
		},
		{
			name: "@connectalum/infisical-jsc-aws-auth",
			description: "AWS authentication module for Infisical JSC",
			url: "https://www.npmjs.com/package/@connectalum/infisical-jsc-aws-auth",
			previewKey: "infisical",
		},
		{
			name: "@connectalum/infisical-js-client",
			description: "JavaScript client for Infisical secret management",
			url: "https://www.npmjs.com/package/@connectalum/infisical-js-client",
			previewKey: "infisical",
		},
	];

	return (
		<>
			<Layout
				activeSection="projects"
				previewContent={
					isMobile && activePreview ? (
						<div className="mt-8">
							<AnimatePresence mode="wait">
								<HoverPreview
									key={activePreview}
									content={previewContent}
									isMobile={isMobile}
								/>
							</AnimatePresence>
						</div>
					) : undefined
				}
			>
				<div
					className="projects-list text-muted-foreground md:max-w-[360px] transition-all duration-200 transition-blur"
					style={{
						filter: shouldBlur ? "blur(1px)" : "none",
						WebkitFilter: shouldBlur ? "blur(1px)" : "none",
					}}
				>
					{projects.map((project) => (
						<div
							key={project.name}
							className="project-item flex flex-col gap-1 p-2"
							onMouseEnter={() => handleProjectHover(project.previewKey)}
							onMouseLeave={handleProjectLeave}
						>
							<div className="flex items-center gap-2">
								{project.url ? (
									<a
										href={project.url}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-1 hover:underline"
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
			{!isMobile && activePreview && (
				<AnimatePresence mode="wait">
					<HoverPreview
						key={activePreview}
						content={previewContent}
						isMobile={isMobile}
					/>
				</AnimatePresence>
			)}
		</>
	);
}
