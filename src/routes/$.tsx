import { Link, createFileRoute } from "@tanstack/react-router";
import React from "react";
import { Shadow } from "../components/shadow";
import { buildSeoTags } from "../site-config";

export const Route = createFileRoute("/$")({
	head: () =>
		buildSeoTags({
			title: "404 - Page Not Found | Ethan Ng",
			description: "The page you're looking for doesn't exist.",
			path: "/404",
		}),
	component: NotFound,
});

const MemoizedShadow = React.memo(() => (
	<Shadow
		color="rgba(128, 128, 128, 0.3)"
		animation={{ scale: 50, speed: 80 }}
		noise={{ opacity: 1, scale: 1.5 }}
		sizing="fill"
	/>
));

function NotFound() {
	return (
		<div className="min-h-screen bg-background text-muted-foreground flex items-center justify-center px-6 relative overflow-hidden">
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				<MemoizedShadow />
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter2)'/%3E%3C/svg%3E")`,
						opacity: 0.1,
						mixBlendMode: "overlay",
					}}
				/>
			</div>
			<div className="flex flex-col items-center justify-center space-y-6 text-center max-w-lg relative z-10">
				<div className="space-y-2">
					<h1 className="text-6xl md:text-8xl font-bold text-foreground">
						404
					</h1>
					<p className="text-xl md:text-2xl text-muted-foreground">
						Page not found
					</p>
				</div>
				<p className="text-sm text-muted-foreground">
					The page you're looking for doesn't exist or has been moved.
				</p>
				<Link
					to="/"
					className="text-sm text-foreground hover:text-muted-foreground transition-colors duration-300 border-b border-foreground hover:border-muted-foreground"
				>
					← Back to home
				</Link>
			</div>
		</div>
	);
}
