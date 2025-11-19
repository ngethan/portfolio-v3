import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Undo2 } from "lucide-react";
import { motion } from "motion/react";
import React, {
	type ReactNode,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
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

const stlTimeFormatter = new Intl.DateTimeFormat("en-US", {
	timeZone: "America/Chicago",
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit",
	hour12: false,
});

const getStlTime = () => {
	try {
		return stlTimeFormatter.format(new Date());
	} catch {
		return new Date().toLocaleTimeString("en-US", {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hour12: false,
		});
	}
};

const useIsomorphicLayoutEffect =
	typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function Layout({
	children,
	activeSection,
	writingTitle,
	previewContent,
	enableScrollFade = false,
	tableOfContents,
}: LayoutProps) {
	const [time, setTime] = useState(() => getStlTime());
	const [isScrolled, setIsScrolled] = useState(false);
	const mainRef = useRef<HTMLDivElement | null>(null);

	useIsomorphicLayoutEffect(() => {
		const updateTime = () => {
			setTime(getStlTime());
		};

		updateTime();
		const interval = window.setInterval(updateTime, 1000);

		return () => window.clearInterval(interval);
	}, []);

	useEffect(() => {
		if (!enableScrollFade) return;

		const mainEl = mainRef.current;
		if (!mainEl) return;

		const handleScroll = () => {
			setIsScrolled(mainEl.scrollTop > 0);
		};

		handleScroll();
		mainEl.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			mainEl.removeEventListener("scroll", handleScroll);
		};
	}, [enableScrollFade]);

	return (
		<div
			className={`text-muted-foreground flex flex-col relative ${enableScrollFade ? "h-screen overflow-hidden" : "min-h-screen"}`}
		>
			<div className="bg-background fixed inset-0 pointer-events-none">
				<MemoizedShadow />
			</div>
			{!writingTitle && (
				<code className="fixed top-6 right-6 md:top-12 md:right-24 text-sm text-muted-foreground hidden md:block z-20">
					{time} STL
				</code>
			)}
			{tableOfContents}
			<div className="flex-1 flex flex-col md:flex-row py-12 md:pt-24 md:pb-12 px-6 md:px-24 relative z-10 min-h-0">
				<nav className="w-full md:w-32 mb-8 md:mb-0 text-sm md:flex-shrink-0 md:sticky md:top-24 md:self-start">
					{writingTitle ? (
						<Link
							to="/writing"
							className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
						>
							<Undo2 className="w-4 h-4" />
							<span>Writing</span>
						</Link>
					) : (
						<ul className="flex md:flex-col gap-4 md:gap-0 md:space-y-2">
							<li>
								<Link
									to="/"
									className={`transition-colors duration-300 ${
										activeSection === "about"
											? "text-foreground"
											: "text-muted-foreground hover:text-foreground"
									}`}
								>
									About
								</Link>
							</li>
							<li>
								<Link
									to="/projects"
									className={`transition-colors duration-300 ${
										activeSection === "projects"
											? "text-foreground"
											: "text-muted-foreground hover:text-foreground"
									}`}
								>
									Projects
								</Link>
							</li>
							{/* <li>
								<Link
									to="/press"
									className={`transition-colors duration-300 ${
										activeSection === "press"
											? "text-foreground"
											: "text-muted-foreground hover:text-foreground"
									}`}
								>
									Press
								</Link>
							</li> */}
							<li>
								<Link
									to="/media"
									className={`transition-colors duration-300 ${
										activeSection === "media"
											? "text-foreground"
											: "text-muted-foreground hover:text-foreground"
									}`}
								>
									Media
								</Link>
							</li>
							<li>
								<div className="flex flex-col gap-1">
									<Link
										to="/writing"
										className={`transition-colors duration-300 ${
											activeSection === "writing"
												? "text-foreground"
												: "text-muted-foreground hover:text-foreground"
										}`}
									>
										Writing
									</Link>
								</div>
							</li>
							<li>
								<a
									href="/Ethan_Ng_Resume.pdf"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
								>
									<span>Resume</span>
									<ArrowUpRight className="w-3 h-3" />
								</a>
							</li>
						</ul>
					)}
				</nav>

				<main
					ref={mainRef}
					className={`flex-1 w-full md:ml-12 ${enableScrollFade ? "overflow-y-auto min-h-0 relative" : ""} ${enableScrollFade ? (isScrolled ? "mask-fade-offset--scrolled" : "mask-fade-offset") : ""}`}
				>
					<div className="pb-20">
						<motion.div
							initial={{ opacity: 1, y: 0 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -3 }}
							transition={{ duration: 0.4, ease: "easeInOut" }}
						>
							{children}
						</motion.div>
					</div>
				</main>
			</div>

			{previewContent && (
				<div className="px-6 md:px-24 pb-12 -mt-20 relative z-10">
					{previewContent}
				</div>
			)}

			{writingTitle ? (
				<div className="pb-8 md:pb-16 px-6 md:px-24 relative z-10 md:absolute md:bottom-0 md:left-0">
					<div className="text-muted-foreground text-sm md:w-32">Made by Ethan Ng</div>
				</div>
			) : (
				<footer className="pb-8 md:pb-16 px-6 md:px-24 flex flex-col md:flex-row gap-4 md:gap-0 md:justify-between md:items-center text-sm relative z-10 md:flex-shrink-0">
					<div className="text-muted-foreground">Made by Ethan Ng</div>
					<code className="text-muted-foreground md:hidden">{time} STL</code>
					<div className="flex gap-6 md:gap-10">
						<a
							href="https://github.com/ngethan"
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted-foreground hover:text-foreground"
						>
							GitHub
						</a>
						<a
							href="https://linkedin.com/in/ethan--ng"
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted-foreground hover:text-foreground"
						>
							LinkedIn
						</a>
						<a
							href="https://instagram.com/ethn.ng"
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted-foreground hover:text-foreground"
						>
							Instagram
						</a>
						<a
							href="https://x.com/ethn_ng/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted-foreground hover:text-foreground"
						>
							X
						</a>
					</div>
				</footer>
			)}

			<Toaster position="bottom-center" />
		</div>
	);
}
