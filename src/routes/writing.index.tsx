import { Link, createFileRoute } from "@tanstack/react-router";
import { Layout } from "../components/Layout";
import { buildSeoTags } from "../site-config";

const DESCRIPTION = "Thoughts on building, technology, and design.";

interface BlogFrontmatter {
	title: string;
	date: string;
	excerpt: string;
	tags: string[];
	readTime: string;
}

export const Route = createFileRoute("/writing/")({
	head: () =>
		buildSeoTags({
			title: "Writing | Ethan Ng",
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

		const posts = Object.entries(modules).map(
			([path, content]: [string, unknown]) => {
				const slug = path.replace("../../content/blog/", "").replace(".md", "");
				const { attributes } = fm<BlogFrontmatter>(content as string);

				return {
					slug,
					title: attributes.title,
					date: attributes.date,
					excerpt: attributes.excerpt,
					tags: attributes.tags,
					readTime: attributes.readTime,
				};
			},
		);

		// Sort posts by date (newest first)
		const sortedPosts = posts.sort((a, b) => {
			const dateA = new Date(a.date);
			const dateB = new Date(b.date);
			return dateB.getTime() - dateA.getTime();
		});

		return {
			posts: sortedPosts,
		};
	},
	component: BlogIndex,
});

function BlogIndex() {
	const { posts } = Route.useLoaderData();

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

	return (
		<Layout activeSection="writing">
			<div className="space-y-12">
				<div className="space-y-2">
					<h1 className="text-foreground text-3xl">Writing</h1>
					<p className="text-muted-foreground">
						Thoughts on building, technology, and design.
					</p>
				</div>

				<div className="space-y-8">
					{posts.map((post) => (
						<Link
							key={post.slug}
							to="/writing/$slug"
							params={{ slug: post.slug }}
							className="block group no-underline"
						>
							<article className="space-y-3 py-4 border-b border-foreground/40 transition-all duration-300 group-hover:border-foreground/70">
								<div className="flex items-baseline justify-between gap-4 flex-wrap">
									<h2 className="text-lg md:text-xl font-medium text-foreground group-hover:text-foreground transition-colors flex items-center gap-2">
										{post.title}
									</h2>
									<time className="text-sm text-muted-foreground flex-shrink-0">
										{post.date}
									</time>
								</div>

								<p className="text-sm text-muted-foreground leading-relaxed">
									{post.excerpt}
								</p>

								<div className="flex items-center gap-4 text-xs text-muted-foreground">
									<span>{post.readTime}</span>
									{post.tags && post.tags.length > 0 && (
										<>
											<span>·</span>
											<div className="flex gap-2">
												{post.tags.map((tag: string) => (
													<span
														key={tag}
														className="px-2 py-1 rounded bg-muted/30 text-muted-foreground"
													>
														{tag}
													</span>
												))}
											</div>
										</>
									)}
								</div>
							</article>
						</Link>
					))}
				</div>
			</div>
		</Layout>
	);
}
