import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { AnimatePresence } from "motion/react";

import { buildSeoTags, siteConfig } from "../site-config";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => {
		const baseSeo = buildSeoTags({
			title: siteConfig.name,
			description: siteConfig.description,
			path: "/",
		});

		return {
			meta: [
				{
					charSet: "utf-8",
				},
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1",
				},
				...baseSeo.meta,
				{
					name: "application-name",
					content: siteConfig.shortName,
				},
				{
					name: "theme-color",
					content: "#0f0f0f",
				},
				{
					name: "apple-mobile-web-app-capable",
					content: "yes",
				},
			],
			links: [
				{
					rel: "preconnect",
					href: "https://fonts.googleapis.com",
				},
				{
					rel: "preconnect",
					href: "https://fonts.gstatic.com",
					crossOrigin: "anonymous",
				},
				{
					rel: "stylesheet",
					href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap",
				},
				{
					rel: "stylesheet",
					href: appCss,
				},
				...baseSeo.links,
				{
					rel: "icon",
					type: "image/png",
					sizes: "16x16",
					href: "/favicon-16x16.png",
				},
				{
					rel: "icon",
					type: "image/png",
					sizes: "32x32",
					href: "/favicon-32x32.png",
				},
				{
					rel: "icon",
					href: "/favicon.ico",
				},
				{
					rel: "apple-touch-icon",
					sizes: "180x180",
					href: "/apple-touch-icon.png",
				},
				{
					rel: "manifest",
					href: "/site.webmanifest",
				},
			],
		};
	},

	shellComponent: RootDocument,
	component: RootComponent,
});

function RootComponent() {
	return (
		<AnimatePresence initial={false}>
			<Outlet />
		</AnimatePresence>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
				<SpeedInsights />
				<Analytics />
				<link
					rel="preload"
					as="image"
					href="/shadow.avif"
					fetchPriority="high"
					type="image/avif"
				/>
				<link
					rel="preload"
					as="image"
					href="/grain.avif"
					fetchPriority="high"
					type="image/avif"
				/>
			</head>
			<body>
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
					dangerouslySetInnerHTML={{
						__html: `
							(function() {
								var loadingScreen = document.createElement('div');
								loadingScreen.id = 'loading-screen';
								loadingScreen.style.cssText = 'position:fixed;inset:0;background-color:oklch(0.2476 0 0);background-image:radial-gradient(ellipse 80% 50% at 50% -20%, rgba(128, 128, 128, 0.25), transparent 70%);z-index:9999;transition:opacity 0.3s ease-out;pointer-events:none;';
								document.body.appendChild(loadingScreen);

								window.addEventListener('load', function() {
									setTimeout(function() {
										loadingScreen.style.opacity = '0';
										setTimeout(function() {
											loadingScreen.remove();
										}, 300);
									}, 100);
								});
							})();
						`,
					}}
				/>
				{children}
				{process.env.NODE_ENV === "development" && (
					<TanStackDevtools
						config={{
							position: "bottom-left",
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
						]}
					/>
				)}
				<Scripts />
			</body>
		</html>
	);
}
