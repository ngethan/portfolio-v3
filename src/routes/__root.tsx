import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
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
		<AnimatePresence mode="wait">
			<Outlet />
		</AnimatePresence>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
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
				<Scripts />
			</body>
		</html>
	);
}
