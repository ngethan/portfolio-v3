import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { type ReactNode, useRef, useState } from "react";
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
}: {
	children: ReactNode;
	delay?: number;
	className?: string;
	skip?: boolean;
}) {
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
	{
		href: "https://linkedin.com/in/ethan--ng",
		label: "linkedin",
		handle: "@ethan--ng",
	},
	{
		href: "https://instagram.com/ethn.ng",
		label: "instagram",
		handle: "@ethn.ng",
	},
	{ href: "https://x.com/ethn_ng/", label: "x", handle: "@ethn_ng" },
];

const MOBILE_NAV_ITEMS = [
	...NAV_ITEMS,
	{
		to: "mailto:hey@ethans.site" as const,
		label: "contact",
		section: "contact" as const,
	},
];

function MobileMenu({
	activeSection,
	onClose,
}: { activeSection: string; onClose: () => void }) {
	return (
		<motion.div
			className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-lg md:hidden"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.15 }}
		>
			<div className="flex items-center justify-between p-6 pb-0">
				<h1
					className="text-foreground text-3xl select-none"
					style={{ fontFamily: "'Rubik Glitch', cursive" }}
				>
					ETHAN NG
				</h1>
				<button
					type="button"
					onClick={onClose}
					className="text-muted-foreground hover:text-foreground font-mono text-sm cursor-pointer"
				>
					[esc]
				</button>
			</div>
			<hr className="border-white/20 mt-6" />
			<nav className="flex flex-col gap-1 px-6 pt-6 font-mono">
				{MOBILE_NAV_ITEMS.map((item, i) => {
					const isExternal = item.to.startsWith("mailto:");
					return (
						<motion.div
							key={item.section}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.15, delay: 0.05 + i * 0.05 }}
						>
							{isExternal ? (
								<a
									href={item.to}
									onClick={onClose}
									className="block py-3 text-2xl text-muted-foreground hover:text-foreground transition-colors no-underline"
								>
									{item.label}
								</a>
							) : (
								<Link
									to={item.to}
									onClick={onClose}
									className={`block py-3 text-2xl transition-colors no-underline ${
										activeSection === item.section
											? "text-foreground"
											: "text-muted-foreground hover:text-foreground"
									}`}
								>
									{item.label}
								</Link>
							)}
						</motion.div>
					);
				})}
			</nav>
			<div className="mt-auto px-6 pb-6 font-mono">
				<hr className="border-white/20 mb-4 -mx-6" />
				<div className="flex flex-wrap gap-4 text-sm">
					{SOCIALS.map((s, i) => (
						<motion.a
							key={s.label}
							href={s.href}
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted-foreground no-underline"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.15, delay: 0.3 + i * 0.03 }}
						>
							{s.label}/<span className="text-foreground">{s.handle}</span>
						</motion.a>
					))}
				</div>
			</div>
		</motion.div>
	);
}

export function Layout({
	children,
	activeSection,
	writingTitle,
	previewContent,
}: LayoutProps) {
	const skipShell = useRef(hasAnimatedShell);
	hasAnimatedShell = true;
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<div className="text-muted-foreground relative min-h-dvh md:h-dvh md:overflow-hidden">
			<div
				className="bg-background fixed inset-0 pointer-events-none"
				style={{ backgroundColor: "#212121" }}
			>
				<MemoizedShadow />
			</div>

			<AnimatePresence>
				{mobileMenuOpen && (
					<MobileMenu
						activeSection={activeSection}
						onClose={() => setMobileMenuOpen(false)}
					/>
				)}
			</AnimatePresence>

			<div className="relative z-10 flex flex-col md:flex-row h-full">
				{/* Left column */}
				<div
					className={`flex flex-col ${previewContent ? "md:w-1/2" : "w-full"} ${previewContent ? "border-r border-white/20" : ""}`}
				>
					{/* Header */}
					<div className="p-6 pb-0 sticky top-0 z-20 backdrop-blur-md bg-background/80 md:static md:backdrop-blur-none md:bg-transparent">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-6 flex-wrap">
								<FadeIn skip={skipShell.current}>
									{writingTitle ? (
										<Link to="/" className="no-underline">
											<h1
												className="text-foreground text-3xl select-none"
												style={{ fontFamily: "'Rubik Glitch', cursive" }}
											>
												ETHAN NG
											</h1>
										</Link>
									) : (
										<h1
											className="text-foreground text-3xl select-none"
											style={{ fontFamily: "'Rubik Glitch', cursive" }}
										>
											ETHAN NG
										</h1>
									)}
								</FadeIn>
								{/* Desktop nav */}
								<nav className="hidden md:flex items-center gap-4 text-sm flex-wrap">
									{NAV_ITEMS.map((item, i) => (
										<FadeIn
											key={item.section}
											delay={0.1 + i * 0.05}
											skip={skipShell.current}
										>
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
									<FadeIn
										delay={0.1 + NAV_ITEMS.length * 0.05}
										skip={skipShell.current}
									>
										<a
											href="mailto:hey@ethans.site"
											className="inline-flex items-center gap-1 font-mono text-muted-foreground hover:text-foreground transition-colors duration-300 no-underline"
										>
											contact
											<ArrowUpRight className="w-3 h-3" />
										</a>
									</FadeIn>
								</nav>
							</div>
							{/* Mobile menu button */}
							<button
								type="button"
								onClick={() => setMobileMenuOpen(true)}
								className="md:hidden text-muted-foreground hover:text-foreground font-mono text-sm cursor-pointer"
							>
								./menu
							</button>
						</div>
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

						{writingTitle && (
							<div className="pt-6 mt-8">
								<hr className="border-white/20 mb-6 -mx-6" />
								<div className="flex items-center gap-4 text-sm font-mono flex-wrap">
									{SOCIALS.map((s, i) => (
										<FadeIn
											key={s.label}
											delay={0.5 + i * 0.05}
											skip={skipShell.current}
										>
											<a
												href={s.href}
												target="_blank"
												rel="noopener noreferrer"
												className="text-muted-foreground"
											>
												{s.label}/
												<span className="text-foreground">{s.handle}</span>
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
						)}
					</main>

					{/* Footer - only sticky for non-blog pages */}
					{!writingTitle && (
						<div className="p-6 pt-0">
							<hr className="border-white/20 mb-6 -mx-6" />
							<div className="flex items-center gap-4 text-sm font-mono flex-wrap">
								{SOCIALS.map((s, i) => (
									<FadeIn
										key={s.label}
										delay={0.5 + i * 0.05}
										skip={skipShell.current}
									>
										<a
											href={s.href}
											target="_blank"
											rel="noopener noreferrer"
											className="text-muted-foreground"
										>
											{s.label}/
											<span className="text-foreground">{s.handle}</span>
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
					)}
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
