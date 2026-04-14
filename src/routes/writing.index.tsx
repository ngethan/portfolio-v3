import { Link, createFileRoute, useRouter } from "@tanstack/react-router";
import { Link2, Maximize2, Scan, SquareArrowOutUpRight } from "lucide-react";
import { memo, useState } from "react";
import { toast } from "sonner";
import { Streamdown } from "streamdown";
import { CustomToast } from "../components/CustomToast";
import { Layout } from "../components/Layout";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuTrigger,
} from "../components/ui/context-menu";
import { buildSeoTags, siteConfig } from "../site-config";
import { generateSlug } from "../utils/markdown";

const DESCRIPTION = "Thoughts on building, technology, and design.";

interface BlogFrontmatter {
	title: string;
	date: string;
	excerpt: string;
	tags: string[];
	readTime: string;
}

interface BlogPost {
	slug: string;
	title: string;
	date: string;
	excerpt: string;
	tags: string[];
	readTime: string;
	content: string;
}

export const Route = createFileRoute("/writing/")({
	head: () =>
		buildSeoTags({
			title: "WRITING | ETHAN NG",
			description: DESCRIPTION,
			path: "/writing",
		}),
	loader: async () => {
		const fm = (await import("front-matter")).default;
		const modules = import.meta.glob("../../content/blog/*.md", {
			query: "?raw",
			import: "default",
			eager: true,
		});

		const posts: BlogPost[] = Object.entries(modules).map(
			([path, content]: [string, unknown]) => {
				const slug = path.replace("../../content/blog/", "").replace(".md", "");
				const { attributes, body } = fm<BlogFrontmatter>(content as string);

				return {
					slug,
					title: attributes.title,
					date: attributes.date,
					excerpt: attributes.excerpt,
					tags: attributes.tags,
					readTime: attributes.readTime,
					content: body,
				};
			},
		);

		const parseDate = (dateStr: string): Date => {
			const months: { [key: string]: number } = {
				Jan: 0,
				Feb: 1,
				Mar: 2,
				Apr: 3,
				May: 4,
				Jun: 5,
				Jul: 6,
				Aug: 7,
				Sep: 8,
				Oct: 9,
				Nov: 10,
				Dec: 11,
			};

			const parts = dateStr.split(" ");
			if (parts.length === 2) {
				const month = months[parts[0]];
				const year = Number.parseInt(parts[1], 10);
				if (month !== undefined && !Number.isNaN(year)) {
					return new Date(year, month, 1);
				}
			}

			return new Date(dateStr);
		};

		const sortedPosts = posts.sort((a, b) => {
			const dateA = parseDate(a.date);
			const dateB = parseDate(b.date);
			return dateB.getTime() - dateA.getTime();
		});

		return {
			posts: sortedPosts,
		};
	},
	component: BlogIndex,
});

const streamdownComponents = {
	img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
		<img
			{...props}
			alt={props.alt || ""}
			className="max-w-full rounded-lg my-4"
		/>
	),
	hr: () => <hr className="my-6 border-foreground/40" />,
	strong: ({ children }: { children?: React.ReactNode }) => (
		<strong
			className="font-semibold"
			style={{ color: "var(--semi-foreground)" }}
		>
			{children}
		</strong>
	),
	h1: ({ children }: { children?: React.ReactNode }) => {
		const text = typeof children === "string" ? children : "";
		return (
			<h1
				id={generateSlug(text)}
				className="mt-6 mb-2 font-semibold text-2xl text-foreground"
			>
				{children}
			</h1>
		);
	},
	h2: ({ children }: { children?: React.ReactNode }) => {
		const text = typeof children === "string" ? children : "";
		return (
			<h2
				id={generateSlug(text)}
				className="mt-6 mb-2 font-semibold text-xl text-foreground"
			>
				{children}
			</h2>
		);
	},
	h3: ({ children }: { children?: React.ReactNode }) => (
		<h3 className="mt-6 mb-2 font-semibold text-lg text-foreground">
			{children}
		</h3>
	),
};

const PostPanel = memo(function PostPanel({
	post,
	visible,
}: { post: BlogPost; visible: boolean }) {
	return (
		<div
			className={`space-y-4 font-mono ${visible ? "" : "hidden"}`}
			aria-hidden={!visible}
		>
			<div className="flex items-start justify-between gap-4">
				<div className="space-y-1">
					<h2 className="text-xl md:text-2xl font-medium text-foreground leading-tight">
						{post.title}
					</h2>
					<p className="text-xs text-dim">
						{post.date} · {post.readTime}
					</p>
				</div>
				<Link
					to="/writing/$slug"
					params={{ slug: post.slug }}
					className="p-2 rounded-md hover:bg-foreground/10 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
					title="Open full page"
				>
					<Scan className="w-4 h-4" />
				</Link>
			</div>
			<hr className="border-white/20 -mx-6" />
			<div className="prose prose-invert prose-neutral prose-sm max-w-none prose-headings:text-foreground prose-strong:text-foreground">
				<Streamdown components={streamdownComponents}>
					{post.content}
				</Streamdown>
			</div>
		</div>
	);
});

function BlogIndex() {
	const { posts } = Route.useLoaderData();
	const router = useRouter();
	const [activeSlug, setActiveSlug] = useState<string | undefined>(
		posts[0]?.slug,
	);

	if (!Array.isArray(posts)) {
		console.error("Posts is not an array:", posts);
		return (
			<Layout activeSection="writing">
				<div className="text-muted-foreground">
					Error loading blog posts. Posts data: {JSON.stringify(posts)}
				</div>
			</Layout>
		);
	}

	const activePost = posts.find((p) => p.slug === activeSlug) ?? posts[0];

	const listContent = (
		<div className="space-y-6 font-mono">
			<p
				className="text-muted-foreground text-sm"
				style={{ lineHeight: "1.5em" }}
			>
				thoughts on building, technology, and design. bug me to write more.
			</p>

			<div className="divide-y divide-white/10 -mx-6">
				{posts.map((post) => {
					const isActive = post.slug === activePost?.slug;
					return (
						<ContextMenu key={post.slug}>
							<ContextMenuTrigger asChild>
								<button
									type="button"
									onClick={() => setActiveSlug(post.slug)}
									className={`block w-full text-left no-underline cursor-pointer px-6 py-3 border-l-2 transition-colors ${
										isActive
											? "border-l-primary bg-primary/10"
											: "border-l-transparent hover:bg-white/5"
									}`}
								>
									<div className="flex items-center justify-between gap-3">
										<span
											className={`text-sm truncate ${
												isActive ? "text-primary" : "text-foreground"
											}`}
										>
											{post.title}
										</span>
										<span className="text-xs text-dim flex-shrink-0">
											{post.date}
										</span>
									</div>
									<p className="text-xs text-muted-foreground leading-snug mt-1 line-clamp-2">
										{post.excerpt}
									</p>
								</button>
							</ContextMenuTrigger>
							<ContextMenuContent>
								<ContextMenuItem
									onSelect={() =>
										router.navigate({
											to: "/writing/$slug",
											params: { slug: post.slug },
										})
									}
								>
									<Maximize2 className="w-3.5 h-3.5" />
									Enlarge
								</ContextMenuItem>
								<ContextMenuItem
									onSelect={() =>
										window.open(
											`/writing/${post.slug}`,
											"_blank",
											"noopener,noreferrer,width=1200,height=900",
										)
									}
								>
									<SquareArrowOutUpRight className="w-3.5 h-3.5" />
									Open in New Window
								</ContextMenuItem>
								<ContextMenuSeparator />
								<ContextMenuItem
									onSelect={() => {
										navigator.clipboard.writeText(
											`${siteConfig.url}/writing/${post.slug}`,
										);
										toast.custom(() => (
											<CustomToast message="Link copied to clipboard!" />
										));
									}}
								>
									<Link2 className="w-3.5 h-3.5" />
									Copy Link
								</ContextMenuItem>
							</ContextMenuContent>
						</ContextMenu>
					);
				})}
			</div>
		</div>
	);

	const previewContent = (
		<>
			{posts.map((post) => (
				<PostPanel
					key={post.slug}
					post={post}
					visible={post.slug === activePost?.slug}
				/>
			))}
		</>
	);

	return (
		<Layout activeSection="writing" previewContent={previewContent}>
			{listContent}
		</Layout>
	);
}
