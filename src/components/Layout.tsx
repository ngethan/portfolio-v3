import { Link } from "@tanstack/react-router";
import { ArrowUpRight, CornerDownRight } from "lucide-react";
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

export function Layout({ children, activeSection, writingTitle }: LayoutProps) {
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
		const mainEl = mainRef.current;
		if (!mainEl) {
			return;
		}

		const handleScroll = () => {
			setIsScrolled(mainEl.scrollTop > 0);
		};

		handleScroll();
		mainEl.addEventListener("scroll", handleScroll);

		return () => {
			mainEl.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div className="h-screen bg-background text-muted-foreground flex flex-col relative overflow-hidden">
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
			<code className="fixed top-6 right-6 md:top-12 md:right-24 text-sm text-muted-foreground hidden md:block z-20">
				{time} STL
			</code>
			<div className="flex-1 flex flex-col md:flex-row py-12 md:pt-24 md:pb-12 px-6 md:px-24 relative z-10 min-h-0">
				<nav className="w-full md:w-32 mb-8 md:mb-0 text-sm md:flex-shrink-0">
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
						<li>
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
						</li>
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
								{writingTitle && (
									<div className="hidden md:flex items-start gap-1.5 pl-1">
										<CornerDownRight className="w-3 h-3 text-muted-foreground flex-shrink-0 mt-0.5" />
										<span className="text-xs text-foreground leading-tight line-clamp-2">
											{writingTitle}
										</span>
									</div>
								)}
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
				</nav>

				<main
					ref={mainRef}
					className={`flex-1 w-full md:ml-12 ${writingTitle ? "overflow-y-auto min-h-0 relative" : ""} ${writingTitle ? (isScrolled ? "mask-fade-offset--scrolled" : "mask-fade-offset") : ""}`}
				>
					<div className="pb-20">
						<motion.div
							initial={{ opacity: 0, y: 3 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -3 }}
							transition={{ duration: 0.4, ease: "easeInOut" }}
						>
							{children}
						</motion.div>
					</div>
				</main>
			</div>

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
			<Toaster position="bottom-center" />
		</div>
	);
}
