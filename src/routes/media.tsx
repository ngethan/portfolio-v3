import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Layout } from "../components/Layout";
import { buildSeoTags } from "../site-config";

const DESCRIPTION =
	"Things I've been reading, watching, and listening to - books, articles, podcasts, and videos.";

export const Route = createFileRoute("/media")({
	head: () =>
		buildSeoTags({
			title: "Media | Ethan Ng",
			description: DESCRIPTION,
			path: "/media",
		}),
	component: Media,
});

interface MediaItem {
	title: string;
	author?: string;
	type: "book" | "article" | "podcast" | "video";
	url?: string;
	date?: string;
	description?: string;
}

function Media() {
	const mediaItems: MediaItem[] = [
		{
			title: "Thinking, Fast and Slow",
			author: "Daniel Kahneman",
			type: "book",
			description: "Helps me think about how people make decisions.",
		},
		{
			title: "The Innovation Stack",
			author: "Jim McKelvey",
			type: "book",
			description:
				"Square's origin story and solving problems no one else can copy.",
		},
		{
			title: "Foundation",
			author: "Isaac Asimov",
			type: "book",
			description:
				"Sci-fi classic about the fall and rise of galactic civilizations. Fascinating exploration of psychohistory and large-scale problem solving.",
		},
		{
			title: "The Anatomy of Ramp's Hyper-Growth | Karim Atiyeh Interview",
			type: "video",
			url: "https://www.youtube.com/watch?v=Rt7_Uk4yVnk",
			description:
				"A gold mine of advice on UX, scaling companies, hiring, and product. Understanding the thought that went into Ramp's engineering cultlure.",
		},
		{
			title:
				"ThePrimeagen: Programming, AI, ADHD, Productivity, Addiction, and God | Lex Fridman Podcast",
			type: "video",
			url: "https://www.youtube.com/watch?v=tNZnLkRBYA8",
			description: "Insanely inspiring story that continues to motivate me.",
		},
		{
			title: "On the Biology of a Large Language Model",
			author: "Anthropic",
			type: "article",
			url: "https://transformer-circuits.pub/2025/attribution-graphs/biology.html",
			description: "Dissecting how models actually work under the hood.",
		},
		{
			title: "How to Scale Your Model",
			author: "JAX Team",
			type: "article",
			url: "https://jax-ml.github.io/scaling-book/",
			description:
				"Examining how TPUs communicate with each other and parallelize model training at scale.",
		},
		{
			title:
				"When Models Manipulate Manifolds: The Geometry of a Counting Task",
			author: "Anthropic",
			type: "article",
			url: "https://transformer-circuits.pub/2025/linebreaks/index.html",
			description: `How do models perceive visual properties of text when their only "sensory" input is integers?`,
		},
		{
			title: "Lex Fridman Podcast",
			type: "podcast",
			url: "https://lexfridman.com/podcast/",
			description:
				"Deep conversations about AI, consciousness, and what it means to be human.",
		},
		{
			title: "How Did This Get Made?",
			type: "podcast",
			url: "https://www.earwolf.com/show/how-did-this-get-made/",
			description:
				"Hilarious deep dives into bad movies with Paul Scheer, June Diane Raphael, and Jason Mantzoukas.",
		},
		{
			title: "My First Million",
			type: "podcast",
			url: "https://www.mfmpod.com/",
			description:
				"Brainstorming business ideas, discussing trends, and sharing entrepreneurial insights.",
		},
	];

	const groupedMedia = {
		books: mediaItems.filter((item) => item.type === "book"),
		articles: mediaItems.filter((item) => item.type === "article"),
		podcasts: mediaItems.filter((item) => item.type === "podcast"),
		videos: mediaItems.filter((item) => item.type === "video"),
	};

	const renderMediaItem = (item: MediaItem) => (
		<div key={item.title} className="flex flex-col gap-2">
			<div>
				{item.url ? (
					<a
						href={item.url}
						target="_blank"
						rel="noopener noreferrer"
						className="inline"
					>
						<span className="text-foreground">{item.title}</span>
						<ArrowUpRight className="w-3 h-3 inline ml-1" />
					</a>
				) : (
					<span className="text-foreground">{item.title}</span>
				)}
				{item.author && (
					<span className="text-sm text-muted-foreground ml-2">
						by {item.author}
					</span>
				)}
				{item.date && (
					<span className="text-sm text-muted-foreground ml-1">
						· {item.date}
					</span>
				)}
			</div>
			{item.description && (
				<p className="text-sm text-muted-foreground">{item.description}</p>
			)}
		</div>
	);

	return (
		<Layout activeSection="media">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
				{groupedMedia.books.length > 0 && (
					<div className="space-y-3">
						<h2 className="text-foreground text-sm font-medium">Books</h2>
						<div className="space-y-3">
							{groupedMedia.books.map(renderMediaItem)}
						</div>
					</div>
				)}

				{groupedMedia.articles.length > 0 && (
					<div className="space-y-3">
						<h2 className="text-foreground text-sm font-medium">Papers</h2>
						<div className="space-y-3">
							{groupedMedia.articles.map(renderMediaItem)}
						</div>
					</div>
				)}

				{groupedMedia.podcasts.length > 0 && (
					<div className="space-y-3">
						<h2 className="text-foreground text-sm font-medium">Podcasts</h2>
						<div className="space-y-3">
							{groupedMedia.podcasts.map(renderMediaItem)}
						</div>
					</div>
				)}

				{groupedMedia.videos.length > 0 && (
					<div className="space-y-3">
						<h2 className="text-foreground text-sm font-medium">Videos</h2>
						<div className="space-y-3">
							{groupedMedia.videos.map(renderMediaItem)}
						</div>
					</div>
				)}
			</div>
		</Layout>
	);
}
