import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Layout } from "../components/Layout";
import { buildCanonicalUrl, buildSeoTags } from "../site-config";

const ARTICLES = [
	{
		title: "St. Louis Business Journal 2024",
		url: "https://www.bizjournals.com/stlouis/inno/stories/news/2024/04/08/inno-madness-connect-champion.html",
	},
	{
		title: "Skandalaris Startup Spotlight 2025",
		url: "https://skandalaris.wustl.edu/blog/2025/07/01/skandalaris-startup-spotlight-connect/",
	},
	{
		title: "Skandalaris Venture Competition Fall 2024",
		url: "https://engineering.washu.edu/news/2024/McKelvey-Engineering-students-among-Skandalaris-Venture-Competition-winners.html",
	},
];

const DESCRIPTION =
	"Passionate builder and WashU CS + finance student obsessed with learning, shipping side projects, and turning ideas into reality through technology.";
const PAGE_URL = buildCanonicalUrl("/press");

export const Route = createFileRoute("/press")({
	head: () => {
		const baseSeo = buildSeoTags({
			title: "Press | Ethan Ng",
			description: DESCRIPTION,
			path: "/press",
		});

		const structuredData = {
			"@context": "https://schema.org",
			"@type": "ItemList",
			name: "Press Related to Ethan Ng",
			description: DESCRIPTION,
			url: PAGE_URL,
			itemListElement: ARTICLES.map((article, index) => ({
				"@type": "ListItem",
				position: index + 1,
				name: article.title,
				url: article.url,
			})),
		};

		return {
			...baseSeo,
			scripts: [
				{
					type: "application/ld+json",
					children: JSON.stringify(structuredData),
				},
			],
		};
	},
	component: Press,
});

function Press() {
	const articles = ARTICLES;

	return (
		<Layout activeSection="press">
			<div className="space-y-1">
				{articles.map((article) => (
					<a
						key={article.url}
						href={article.url}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2 text-muted-foreground transition-colors duration-300 hover:text-foreground group"
					>
						<span>{article.title}</span>
						<ArrowUpRight className="w-4 h-4" />
					</a>
				))}
			</div>
		</Layout>
	);
}
