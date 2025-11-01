import { Link, createFileRoute } from "@tanstack/react-router";
import { Streamdown } from "streamdown";
import { Layout } from "../components/Layout";
import { buildSeoTags } from "../site-config";

interface BlogFrontmatter {
	title: string;
	date: string;
	excerpt: string;
	tags: string[];
	readTime: string;
}

export const Route = createFileRoute("/writing/$slug")({
	loader: async ({ params }) => {
		const fm = (await import("front-matter")).default;
		const modules = import.meta.glob("../../content/blog/*.md", {
			query: "?raw",
			import: "default",
			eager: true,
		});

		const path = `../../content/blog/${params.slug}.md`;
		const content = modules[path] as string | undefined;

		if (!content) {
			return { post: undefined };
		}

		const { attributes, body } = fm<BlogFrontmatter>(content);

		return {
			post: {
				slug: params.slug,
				title: attributes.title,
				date: attributes.date,
				excerpt: attributes.excerpt,
				tags: attributes.tags,
				readTime: attributes.readTime,
				content: body,
			},
		};
	},
	head: ({ loaderData }) => {
		return buildSeoTags({
			title: `${loaderData?.post?.title || "Post"} | Ethan Ng`,
			description: loaderData?.post?.excerpt || "Blog post",
			path: `/writing/${loaderData?.post?.slug || ""}`,
		});
	},
	component: BlogPost,
});

function BlogPost() {
	const { post } = Route.useLoaderData();

	if (!post) {
		return (
			<Layout activeSection="writing">
				<div className="text-center py-12">
					<h1 className="text-2xl mb-4">Post not found</h1>
					<Link
						to="/writing"
						className="text-muted-foreground hover:text-foreground"
					>
						← Back to writing
					</Link>
				</div>
			</Layout>
		);
	}

	return (
		<Layout activeSection="writing" writingTitle={post.title}>
			<article className="space-y-6 max-w-5xl mx-auto">
				<header className="space-y-2 border-b border-foreground/40 pb-4">
					<h1 className="text-2xl md:text-3xl font-medium text-foreground">
						{post.title}
					</h1>
					<time className="text-sm text-muted-foreground">{post.date}</time>
				</header>

				<div className="prose prose-invert prose-neutral prose-sm max-w-none prose-headings:text-foreground prose-strong:text-foreground">
					<Streamdown
						components={{
							strong: ({ children }) => (
								<strong
									className="font-semibold"
									style={{ color: "var(--semi-foreground)" }}
								>
									{children}
								</strong>
							),
							h1: ({ children }) => (
								<h1
									className="mt-6 mb-2 font-semibold text-3xl text-foreground"
									data-streamdown="heading-1"
								>
									{children}
								</h1>
							),
							h2: ({ children }) => (
								<h2
									className="mt-6 mb-2 font-semibold text-2xl text-foreground"
									data-streamdown="heading-2"
								>
									{children}
								</h2>
							),
							h3: ({ children }) => (
								<h3
									className="mt-6 mb-2 font-semibold text-xl text-foreground"
									data-streamdown="heading-3"
								>
									{children}
								</h3>
							),
							h4: ({ children }) => (
								<h4
									className="mt-6 mb-2 font-semibold text-lg text-foreground"
									data-streamdown="heading-4"
								>
									{children}
								</h4>
							),
							h5: ({ children }) => (
								<h5
									className="mt-6 mb-2 font-semibold text-base text-foreground"
									data-streamdown="heading-5"
								>
									{children}
								</h5>
							),
							h6: ({ children }) => (
								<h6
									className="mt-6 mb-2 font-semibold text-sm text-foreground"
									data-streamdown="heading-6"
								>
									{children}
								</h6>
							),
						}}
					>
						{post.content}
					</Streamdown>
				</div>
			</article>
		</Layout>
	);
}
