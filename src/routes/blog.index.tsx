import { Link, createFileRoute } from "@tanstack/react-router";
import { Layout } from "../components/Layout";
import { buildSeoTags } from "../site-config";
import { ArrowRight } from "lucide-react";

const DESCRIPTION = "Thoughts on building, technology, and design.";

export const Route = createFileRoute("/blog/")({
	head: () =>
		buildSeoTags({
			title: "Blog | Ethan Ng",
			description: DESCRIPTION,
			path: "/blog",
		}),
	component: BlogIndex,
});

interface BlogPost {
	slug: string;
	title: string;
	date: string;
	excerpt: string;
	readTime: string;
	tags?: string[];
}

function BlogIndex() {
	const posts: BlogPost[] = [
		{
			slug: "first-post",
			title: "First Post",
			date: "Jan 2025",
			readTime: "3 min read",
			excerpt:
				"A sample blog post to demonstrate the layout and markdown rendering.",
			tags: ["Web", "Design"],
		},
	];

	return (
		<Layout activeSection="blog">
			<div className="space-y-12">
				<div className="space-y-2">
					<h1 className="text-2xl md:text-3xl font-medium text-foreground">
						Writing
					</h1>
					<p className="text-muted-foreground">
						Thoughts on building, technology, and design.
					</p>
				</div>

				<div className="space-y-8">
					{posts.map((post) => (
						<Link
							key={post.slug}
							to="/blog/$slug"
							params={{ slug: post.slug }}
							className="block group no-underline"
						>
							<article className="space-y-3 py-4 border-b border-border/40 transition-all duration-300 group-hover:border-border">
								<div className="flex items-baseline justify-between gap-4 flex-wrap">
									<h2 className="text-lg md:text-xl font-medium text-foreground group-hover:text-foreground transition-colors flex items-center gap-2">
										{post.title}
										<ArrowRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
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
												{post.tags.map((tag) => (
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
