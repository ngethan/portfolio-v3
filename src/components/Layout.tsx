import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Undo2 } from "lucide-react";
import { motion } from "motion/react";
import React, { type ReactNode, useRef } from "react";
import { Toaster } from "sonner";
import { Shadow } from "./shadow";

interface LayoutProps {
	children: ReactNode;
	activeSection: "about" | "projects" | "press" | "media" | "writing";
	writingTitle?: string;
	previewContent?: ReactNode;
	enableScrollFade?: boolean;
	tableOfContents?: ReactNode;
}

const MemoizedShadow = React.memo(() => (
	<Shadow
		color="rgba(128, 128, 128, 0.3)"
		animation={{ scale: 50, speed: 80 }}
		noise={{ opacity: 1, scale: 1.5 }}
		sizing="fill"
	/>
));

let hasAnimatedShell = false;

function FadeIn({
	children,
	delay = 0,
	className,
	skip,
}: { children: ReactNode; delay?: number; className?: string; skip?: boolean }) {
	if (skip) return <div className={className}>{children}</div>;
	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.2, delay, ease: "easeOut" as const }}
		>
			{children}
		</motion.div>
	);
}

const NAV_ITEMS = [
	{ to: "/", label: "about", section: "about" },
	{ to: "/projects", label: "projects", section: "projects" },
	{ to: "/media", label: "media", section: "media" },
	{ to: "/writing", label: "writing", section: "writing" },
] as const;

const SOCIALS = [
	{ href: "https://github.com/ngethan", label: "github", handle: "@ngethan" },
	{ href: "https://linkedin.com/in/ethan--ng", label: "linkedin", handle: "@ethan--ng" },
	{ href: "https://instagram.com/ethn.ng", label: "instagram", handle: "@ethn.ng" },
	{ href: "https://x.com/ethn_ng/", label: "x", handle: "@ethn_ng" },
];

export function Layout({
	children,
	activeSection,
	writingTitle,
	previewContent,
}: LayoutProps) {
	const skipShell = useRef(hasAnimatedShell);
	hasAnimatedShell = true;

	return (
		<div className="text-muted-foreground relative min-h-dvh md:h-dvh md:overflow-hidden">
			<div
				className="bg-background fixed inset-0 pointer-events-none"
				style={{ backgroundColor: "#212121" }}
			>
				<MemoizedShadow />
			</div>

			<div className="relative z-10 flex flex-col md:flex-row h-full">
				{/* Left column */}
				<div
					className={`flex flex-col ${previewContent ? "md:w-1/2" : "w-full"} ${previewContent ? "border-r border-white/20" : ""}`}
				>
					{/* Header */}
					<div className="p-6 pb-0">
						<FadeIn skip={skipShell.current}>
							<h1
								className="text-foreground text-3xl select-none mb-3"
								style={{ fontFamily: "'Rubik Glitch', cursive" }}
							>
								ETHAN NG
							</h1>
						</FadeIn>
						<nav className="flex items-center gap-4 text-sm flex-wrap">
							{writingTitle ? (
								<FadeIn delay={0.1} skip={skipShell.current}>
									<Link
										to="/writing"
										className="flex items-center gap-2 font-mono text-muted-foreground hover:text-foreground transition-colors duration-300"
									>
										<Undo2 className="w-4 h-4" />
										<span>writing</span>
									</Link>
								</FadeIn>
							) : (
								<>
									{NAV_ITEMS.map((item, i) => (
										<FadeIn key={item.section} delay={0.1 + i * 0.05} skip={skipShell.current}>
											<Link
												to={item.to}
												className={`font-mono transition-colors duration-300 ${
													activeSection === item.section
														? "text-foreground"
														: "text-muted-foreground hover:text-foreground"
												}`}
											>
												{item.label}
											</Link>
										</FadeIn>
									))}
									<FadeIn delay={0.1 + NAV_ITEMS.length * 0.05} skip={skipShell.current}>
										<a
											href="mailto:hey@ethans.site"
											className="inline-flex items-center gap-1 font-mono text-muted-foreground hover:text-foreground transition-colors duration-300"
										>
											<span>contact</span>
											<ArrowUpRight className="w-3 h-3" />
										</a>
									</FadeIn>
								</>
							)}
						</nav>
						<hr className="border-white/20 mt-6 -mx-6" />
					</div>

					{/* Main content */}
					<main className="flex-1 overflow-y-auto p-6">
						{children}

						{previewContent && (
							<div className="md:hidden mt-10">
								<hr className="border-white/20 -mx-6 mb-10" />
								{previewContent}
							</div>
						)}
					</main>

					{/* Footer */}
					<div className="p-6 pt-0">
						<hr className="border-white/20 mb-6 -mx-6" />
						<div className="flex items-center gap-4 text-sm font-mono flex-wrap">
							{SOCIALS.map((s, i) => (
								<FadeIn key={s.label} delay={0.5 + i * 0.05} skip={skipShell.current}>
									<a
										href={s.href}
										target="_blank"
										rel="noopener noreferrer"
										className="text-muted-foreground"
									>
										{s.label}/<span className="text-foreground">{s.handle}</span>
									</a>
								</FadeIn>
							))}
						</div>
						<FadeIn delay={0.75} skip={skipShell.current}>
							<p
								className="text-xs text-muted-foreground select-none mt-3"
								style={{ fontFamily: "'Rubik Glitch', cursive" }}
							>
								MADE WITH ❤️ ETHAN NG
							</p>
						</FadeIn>
					</div>
				</div>

				{/* Right column */}
				{previewContent && (
					<div className="hidden md:block md:w-1/2 overflow-y-auto p-6">
						{previewContent}
					</div>
				)}
			</div>

			<Toaster position="bottom-center" />
		</div>
	);
}
