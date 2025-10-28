import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { TypingTest } from "../components/TypingTest";
import { buildSeoTags } from "../site-config";

const DESCRIPTION =
	"Passionate builder and WashU CS + finance student obsessed with learning, shipping side projects, and turning ideas into reality through technology.";

export const Route = createFileRoute("/")({
	head: () =>
		buildSeoTags({
			title: "Ethan Ng",
			description: DESCRIPTION,
			path: "/",
		}),
	component: App,
});

function HoverPreview({
	content,
	isMobile,
}: { content: React.ReactNode; isMobile: boolean }) {
	if (isMobile) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 20 }}
				transition={{ duration: 0.4, ease: "easeInOut" }}
				className="mt-8 w-full"
			>
				<div className="w-full">{content}</div>
			</motion.div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.6, ease: "easeInOut" }}
			className="fixed right-8 lg:right-24 w-[45%] lg:w-1/2 flex items-start hidden md:flex"
			style={{
				top: "6rem",
				height: "calc(100vh - 12rem)",
			}}
		>
			<div className="w-full">{content}</div>
		</motion.div>
	);
}

const PREVIEW_CONTENT = {
	aligned: (
		<div
			className="space-y-4 text-muted-foreground"
			style={{ lineHeight: "1.2em" }}
		>
			<p>
				I'm tackling the $200B recruiting market, where AI resume scanners
				reject strong candidates and forces applicants to apply to 100s of jobs
				without a single interview. We're replacing it with a system that values
				holistic profiles. I've lived the hiring challenges of growth-stage
				startups and have been building matching algorithms for years.
			</p>
			<p>
				You can learn more at{" "}
				<a href="https://aligned.jobs" target="_blank" rel="noreferrer">
					aligned.jobs
				</a>{" "}
				and <a href="mailto:hi@ethans.site">reach out</a> if you're interested
				in chatting.
			</p>
		</div>
	),
	connect: (
		<div
			className="space-y-4 text-muted-foreground"
			style={{ lineHeight: "1.2em" }}
		>
			<p>
				<a
					href="https://connectalum.com"
					target="_blank"
					className="text-white hover:underline"
					rel="noreferrer"
				>
					Connect
				</a>{" "}
				is an EdTech platform I cofounded it with 2 of my friends in my freshman
				year of college. We scaled it from 0 to 250k ARR in the first year and
				have grown to serve over 10,000 students across multiple school
				districts and universities.
				<br />
				<br />
				Connect provides an alumni mentorship network, real-time hall-pass
				tracking, policy and grant updates, and gamified tools that help
				educators understand their students.
			</p>
			<img
				src="/connect.png"
				alt="Connect platform"
				className="w-full rounded-md"
			/>
		</div>
	),
};

function App() {
	const [hoverPreview, setHoverPreview] = useState<string | null>(null);
	const [pinnedPreview, setPinnedPreview] = useState<string | null>(null);
	const [isMobile, setIsMobile] = useState(false);

	const activePreview = pinnedPreview || hoverPreview;
	const previewContent = activePreview
		? PREVIEW_CONTENT[activePreview as keyof typeof PREVIEW_CONTENT]
		: null;

	const handleLinkClick = (e: React.MouseEvent, key: string) => {
		e.preventDefault();
		// On mobile, redirect to MonkeyType profile instead of opening typing test
		if (isMobile && key === "typing") {
			window.open("https://monkeytype.com/profile/ethan.ng", "_blank");
			return;
		}
		setPinnedPreview((prev) => (prev === key ? null : key));
	};

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape" && pinnedPreview) {
				setPinnedPreview(null);
			}
		};

		const handleClickOutside = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (pinnedPreview && target.closest(".blurred-content")) {
				setPinnedPreview(null);
			}
		};

		document.addEventListener("keydown", handleEscape);
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.removeEventListener("click", handleClickOutside);
		};
	}, [pinnedPreview]);

	const shouldBlur = (pinnedPreview || hoverPreview) && !isMobile;

	return (
		<>
			<div
				className="transition-all duration-600"
				style={{
					filter: shouldBlur ? "blur(1px)" : "none",
					WebkitFilter: shouldBlur ? "blur(1px)" : "none",
				}}
			>
				<Layout activeSection="about">
					<div
						className="space-y-5 text-muted-foreground"
						style={{ lineHeight: "1.2em" }}
					>
						<p>
							I'm currently building{" "}
							<a
								href="https://aligned.jobs"
								target="_blank"
								rel="noopener noreferrer"
								onMouseEnter={() => !isMobile && setHoverPreview("aligned")}
								onMouseLeave={() => !isMobile && setHoverPreview(null)}
								onClick={(e) => handleLinkClick(e, "aligned")}
							>
								Aligned
							</a>{" "}
							- a holistic recruiting platform that informs better hires.
						</p>

						<p>
							I previously cofounded{" "}
							<a
								href="https://connectalum.com"
								target="_blank"
								rel="noopener noreferrer"
								onMouseEnter={() => !isMobile && setHoverPreview("connect")}
								onMouseLeave={() => !isMobile && setHoverPreview(null)}
								onClick={(e) => handleLinkClick(e, "connect")}
							>
								Connect
							</a>
							, an EdTech company serving 10,000+ students & making six figures
							ARR. I'm also an incoming Software Engineering Intern at{" "}
							<a href="https://ramp.com" target="_blank" rel="noreferrer">
								Ramp
							</a>{" "}
							for Summer 2026.
						</p>

						<p>
							I'm a junior at{" "}
							<a
								href="https://washu.edu/"
								target="_blank"
								rel="noopener noreferrer"
							>
								Washington University
							</a>{" "}
							studying CS and finance. I was born and raised in New York, and
							have jumped around STL, NY, and SF more recently.
						</p>

						<p>
							I love building all sorts of things—web/mobile apps, AI systems,
							infrastructure, and more recently hardware. I work primarily with
							TypeScript, React/Next.js, and React Native, but I'm comfortable
							across the stack from Swift to Rust to cloud architecture.
						</p>

						<p>
							I like{" "}
							<a
								href="https://www.instagram.com/ethn.raw/"
								target="_blank"
								rel="noopener noreferrer"
							>
								photography
							</a>
							, type somewhat{" "}
							<a
								href="https://monkeytype.com/profile/ethan.ng"
								className="cursor-pointer"
								onMouseEnter={() => !isMobile && setHoverPreview("typing")}
								onMouseLeave={() => !isMobile && setHoverPreview(null)}
								onClick={(e) => handleLinkClick(e, "typing")}
							>
								fast
							</a>
							, and play tennis. You can reach me at{" "}
							<a href="mailto:hi@ethans.site">
								<code className="text-white hover:underline">
									hey@ethans.site
								</code>
							</a>
							.
						</p>
					</div>
					{isMobile && activePreview && activePreview !== "typing" && (
						<AnimatePresence mode="wait">
							<HoverPreview
								key={activePreview}
								content={previewContent}
								isMobile={isMobile}
							/>
						</AnimatePresence>
					)}
				</Layout>
			</div>
			{!isMobile && activePreview && (
				<AnimatePresence mode="wait">
					{activePreview === "typing" ? (
						<TypingTest key="typing" onClose={() => setPinnedPreview(null)} />
					) : (
						<HoverPreview
							key={activePreview}
							content={previewContent}
							isMobile={isMobile}
						/>
					)}
				</AnimatePresence>
			)}
		</>
	);
}
