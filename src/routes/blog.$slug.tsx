import { Link, createFileRoute } from "@tanstack/react-router";
import { Streamdown } from "streamdown";
import { Layout } from "../components/Layout";
import { buildSeoTags } from "../site-config";

export const Route = createFileRoute("/blog/$slug")({
	head: ({ params }) => {
		const post = getBlogPost(params.slug);
		return buildSeoTags({
			title: `${post?.title || "Post"} | Ethan Ng`,
			description: post?.excerpt || "Blog post",
			path: `/blog/${params.slug}`,
		});
	},
	component: BlogPost,
});

interface BlogPostData {
	slug: string;
	title: string;
	date: string;
	excerpt: string;
	content: string;
}

const blogPosts: Record<string, BlogPostData> = {
	"first-post": {
		slug: "first-post",
		title: "First Post",
		date: "January 2025",
		excerpt:
			"A sample blog post to demonstrate the layout and markdown rendering.",
		content: `# Welcome to My Blog

This is a sample blog post written in **Markdown**. It demonstrates how content is rendered with streamdown.

## Features

Here are some of the things you can do:

- Write in markdown
- Add images
- Format text with **bold** and *italic*
- Create [links](https://example.com)
- Write code blocks

\`\`\`typescript
const greeting = "Hello, world!";
console.log(greeting);
\`\`\`

## Images

You can also embed images:

![Placeholder](https://via.placeholder.com/800x400/1a1a1a/666666?text=Blog+Post+Image)

## More Content

This is just a placeholder post to show how the layout works. The blog is designed to be wider than other pages, giving more room for content to breathe.

The markdown rendering is powered by [streamdown](https://github.com/vercel/streamdown), which is optimized for AI-powered streaming content.`,
	},
};

function getBlogPost(slug: string): BlogPostData | undefined {
	return blogPosts[slug];
}

function BlogPost() {
	const { slug } = Route.useParams();
	const post = getBlogPost(slug);

	if (!post) {
		return (
			<Layout activeSection="blog">
				<div className="text-center py-12">
					<h1 className="text-2xl mb-4">Post not found</h1>
					<Link
						to="/blog"
						className="text-muted-foreground hover:text-foreground"
					>
						← Back to blog
					</Link>
				</div>
			</Layout>
		);
	}

	return (
		<Layout activeSection="blog" blogTitle={post.title}>
			<article className="space-y-6">
				<header className="space-y-2 border-b border-foreground/70 pb-4">
					<h1 className="text-2xl md:text-3xl font-medium text-foreground">
						{post.title}
					</h1>
					<time className="text-sm text-muted-foreground">{post.date}</time>
				</header>

				<div className="prose prose-invert prose-neutral prose-sm max-w-none text-muted-foreground">
					<Streamdown>{post.content}</Streamdown>
				</div>
			</article>
		</Layout>
	);
}
