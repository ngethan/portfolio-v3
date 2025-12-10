import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Hand } from "lucide-react";
import React, { useState } from "react";
import { Chat } from "../components/chat";
import {
	MediaCard,
	type PlaygroundMedia,
} from "../components/playground/MediaCard";
import { PlaygroundCanvas } from "../components/playground/PlaygroundCanvas";
import { PlaygroundGrid } from "../components/playground/PlaygroundGrid";
import { ProjectCard } from "../components/playground/ProjectCard";
import { MAX_OFFSET, MEDIA, PROJECTS } from "../data/playground";
import { Shadow } from "../components/shadow";
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

const MemoizedShadow = React.memo(function MemoizedShadow() {
	return (
		<Shadow
			color="rgba(128, 128, 128, 0.3)"
			animation={{ scale: 50, speed: 80 }}
			noise={{ opacity: 1, scale: 1.5 }}
			sizing="fill"
		/>
	);
});

function Projects() {
	const [offset, setOffset] = useState({ x: 0, y: 0 });
	const [focusedId, setFocusedId] = useState<string | null>(null);
	const [chatOpen, setChatOpen] = useState(false);
	const [chatInitialMessage, setChatInitialMessage] = useState<string>();

	const handleAskAI = (media: PlaygroundMedia) => {
		setChatInitialMessage(`Tell me about "${media.title}"`);
		setChatOpen(true);
	};

	const handleChatOpenChange = (open: boolean) => {
		setChatOpen(open);
		if (!open) {
			setChatInitialMessage(undefined);
		}
	};

	const handleOffsetChange = (newOffset: { x: number; y: number }) => {
		setOffset({
			x: Math.max(-MAX_OFFSET.x, Math.min(MAX_OFFSET.x, newOffset.x)),
			y: Math.max(-MAX_OFFSET.y, Math.min(MAX_OFFSET.y, newOffset.y)),
		});
	};

	return (
		<div className="fixed inset-0 bg-background overflow-hidden">
			{/* Background shadow effect - moves with offset for cohesion */}
			<div
				className="absolute pointer-events-none"
				style={{
					left: `calc(50% + ${offset.x}px)`,
					top: `calc(50% + ${offset.y}px)`,
					width: "300vw",
					height: "300vh",
					transform: "translate(-50%, -50%)",
				}}
			>
				<MemoizedShadow />
			</div>

			{/* Grid pattern - fixed position, pattern shifts with offset */}
			<PlaygroundGrid offset={offset} />

			{/* Canvas with projects */}
			<PlaygroundCanvas offset={offset} onOffsetChange={handleOffsetChange}>
				{/* Center anchor with drag hint */}
				<div
					className="absolute flex flex-col items-center gap-4 text-muted-foreground/50 pointer-events-none select-none max-w-md text-center"
					style={{
						left: "50%",
						top: "50%",
						transform: "translate(-50%, -50%)",
					}}
				>
					<p className="font-serif italic text-lg">
						A growing archive of the things I make, discover, and enjoy.
					</p>
					<div className="flex items-center gap-2 text-xs">
						<Hand className="w-4 h-4" />
						<span>Drag to explore</span>
					</div>
				</div>

				{/* Project cards */}
				{PROJECTS.map((project) => (
					<ProjectCard
						key={project.id}
						project={project}
						onFocus={setFocusedId}
						zIndex={focusedId === project.id ? 10 : 1}
					/>
				))}

				{/* Media cards */}
				{MEDIA.map((media) => (
					<MediaCard
						key={media.id}
						media={media}
						onFocus={setFocusedId}
						zIndex={focusedId === media.id ? 10 : 1}
						onAskAI={handleAskAI}
					/>
				))}
			</PlaygroundCanvas>

			{/* Back navigation - fixed, doesn't move with canvas */}
			<Link
				to="/"
				className="fixed top-6 left-6 md:top-12 md:left-12 z-50 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
			>
				<ArrowLeft className="w-4 h-4" />
				<span>Back</span>
			</Link>

			{/* Chat */}
			<Chat
				isOpen={chatOpen}
				onOpenChange={handleChatOpenChange}
				initialMessage={chatInitialMessage}
			/>
		</div>
	);
}
