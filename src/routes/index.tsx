import { createFileRoute } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useState } from "react";
import { Layout } from "../components/Layout";
import { buildSeoTags } from "../site-config";

function FadeIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.2, delay, ease: "easeOut" as const }}
		>
			{children}
		</motion.div>
	);
}

function BeepBoop({ delay = 0 }: { delay?: number }) {
	return (
		<motion.p
			className="font-mono text-dim text-sm absolute"
			initial={{ opacity: 1 }}
			animate={{ opacity: 0 }}
			transition={{ duration: 0.15, delay, ease: "easeOut" as const }}
		>
			beep boop...
		</motion.p>
	);
}

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

interface PreviewImage {
	src: string;
	alt: string;
	caption?: string;
}

interface PreviewItem {
	key: string;
	images: PreviewImage[];
	description: React.ReactNode;
}

const PREVIEW_ITEMS: PreviewItem[] = [
	{
		key: "photography",
		images: [
			{
				src: "/assets/photography/1.webp",
				alt: "California sunset",
				caption: "A rather serene California sunset",
			},
			{
				src: "/assets/photography/2.webp",
				alt: "Iceland golden hour",
				caption: "Shades of Iceland's golden hour",
			},
			{
				src: "/assets/photography/3.webp",
				alt: "Jiufen Old Street",
				caption: "九份老街, New Taipei City",
			},
			{
				src: "/assets/photography/4.webp",
				alt: "Utah mountain",
				caption: "Some mountain in Utah",
			},
			{
				src: "/assets/photography/5.webp",
				alt: "Sacré-Cœur",
				caption: "The Basilique du Sacré-Cœur de Montmartre",
			},
			{
				src: "/assets/photography/6.webp",
				alt: "Clothing rack in Japan",
				caption: "A clothing rack I came across in Japan",
			},
			{
				src: "/assets/photography/7.webp",
				alt: "Houses near WashU",
				caption: "Some houses near WashU",
			},
			{
				src: "/assets/photography/8.webp",
				alt: "Street performer",
				caption: "yo how is he doing that?!",
			},
			{
				src: "/assets/photography/9.webp",
				alt: "Keyboard",
				caption: "Performative shot of this keyboard I built",
			},
		],
		description: (
			<p>
				Some shots from travels and everyday life, all shot on my Fujifilm
				X100V. More on{" "}
				<a
					href="https://www.instagram.com/ethn.raw/"
					target="_blank"
					className="text-white hover:underline"
					rel="noreferrer"
				>
					@ethn.raw
				</a>
				.
			</p>
		),
	},
	{
		key: "chelsea",
		images: [
			{
				src: "/assets/chelseacommons-asset.png",
				alt: "Chelsea Commons",
				caption: "Chelsea Commons — NYC",
			},
		],
		description: (
			<p>
				<a
					href="https://chelseacommons.co"
					target="_blank"
					className="text-white hover:underline"
					rel="noreferrer"
				>
					Chelsea Commons
				</a>{" "}
				is a summer community for ambitious interns in NYC. Built by 12 interns
				living together in Manhattan.
			</p>
		),
	},
	{
		key: "connect",
		images: [
			{
				src: "/assets/connect-landing.png",
				alt: "Connect platform",
				caption: "Connect — EdTech platform",
			},
		],
		description: (
			<p>
				<a
					href="https://connectalum.com"
					target="_blank"
					className="text-white hover:underline"
					rel="noreferrer"
				>
					Connect
				</a>{" "}
				is an EdTech platform I cofounded in my freshman year. We scaled it from
				0 to 250k ARR in the first year, now serving over 10,000 students across
				multiple school districts and universities.
			</p>
		),
	},
	{
		key: "washu",
		images: [
			{
				src: "/assets/washu.png",
				alt: "Washington University",
				caption: "Washington University in St. Louis",
			},
		],
		description: (
			<p>
				Junior at{" "}
				<a
					href="https://washu.edu/"
					target="_blank"
					className="text-white hover:underline"
					rel="noreferrer"
				>
					Washington University
				</a>{" "}
				studying CS and finance. Won the Skandalaris venture competition, worked
				at DevSTAC, won HackWashU, and worked on the WashU Robotics Rover team.
			</p>
		),
	},
	{
		key: "typing",
		images: [
			{
				src: "/assets/monkeytype-record.png",
				alt: "Monkeytype record",
				caption:
					"Not to flex but... here's my current Monkeytype 15 second record",
			},
		],
		description: null,
	},
	{
		key: "350z",
		images: [
			{
				src: "/assets/350z.png",
				alt: "Nissan 350Z",
				caption: "My wonderful 6-speed 2004 Nissan 350Z",
			},
		],
		description: null,
	},
];

function ImageCarousel({ images }: { images: PreviewImage[] }) {
	const [index, setIndex] = useState(0);
	const current = images[index];
	const total = images.length;

	return (
		<div>
			<div className="preview-card relative">
				{images.map((img, i) => (
					<div key={img.src} className={i === index ? "block" : "hidden"}>
						<Image src={img.src} alt={img.alt} layout="fullWidth" />
					</div>
				))}
			</div>
			<div className="flex items-center justify-between mt-2">
				<span
					className="text-xs text-muted-foreground font-mono"
					style={{ lineHeight: "1.2em" }}
				>
					{current.caption}
				</span>
				{total > 1 && (
					<div className="flex items-center gap-2 text-xs text-muted-foreground font-mono flex-shrink-0 ml-4">
						<button
							type="button"
							onClick={() => setIndex((i) => (i - 1 + total) % total)}
							className="hover:text-foreground"
						>
							<ChevronLeft className="w-3 h-3" />
						</button>
						<span>
							{index + 1}/{total}
						</span>
						<button
							type="button"
							onClick={() => setIndex((i) => (i + 1) % total)}
							className="hover:text-foreground"
						>
							<ChevronRight className="w-3 h-3" />
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

function PreviewCard({ item }: { item: PreviewItem }) {
	return (
		<div id={`preview-${item.key}`} className="space-y-3">
			<ImageCarousel images={item.images} />
			<div
				className="text-sm text-muted-foreground"
				style={{ lineHeight: "1.2em" }}
			>
				{item.description}
			</div>
		</div>
	);
}

function PreviewGallery() {
	return (
		<div className="relative space-y-10">
			<BeepBoop delay={0.5} />
			{PREVIEW_ITEMS.map((item, i) => (
				<FadeIn key={item.key} delay={0.6 + i * 0.1}>
					<PreviewCard item={item} />
				</FadeIn>
			))}
		</div>
	);
}

function App() {
	return (
		<Layout activeSection="about" previewContent={<PreviewGallery />}>
			<div
				className="relative space-y-10 text-muted-foreground font-mono"
				style={{ lineHeight: "1.5em" }}
			>
				<BeepBoop delay={0.1} />
				<FadeIn delay={0.15}><p>
					I'm an incoming Software Engineering Intern at{" "}
					<a
						href="https://ramp.com"
						target="_blank"
						rel="noopener noreferrer"
						className="whitespace-nowrap"
					>
						<img
							src="/assets/logos/ramp-logo.png"
							alt="Ramp"
							className="inline h-4 w-4 object-contain align-text-bottom"
						/>{" "}
						Ramp
					</a>{" "}
					and{" "}
					<a
						href="https://www.8vc.com/fellowships"
						target="_blank"
						rel="noopener noreferrer"
						className="whitespace-nowrap"
					>
						<img
							src="/assets/logos/8vc-logo.png"
							alt="8VC"
							className="inline h-4 w-4 object-contain align-text-bottom"
						/>{" "}
						8VC fellow
					</a>{" "}
					for Summer 2026. I'm also building{" "}
					<a
						href="https://chelseacommons.co"
						target="_blank"
						rel="noopener noreferrer"
						className="whitespace-nowrap"
					>
						<img
							src="/assets/logos/cc-logo.png"
							alt="Chelsea Commons"
							className="inline h-4 w-4 object-contain align-text-bottom"
						/>{" "}
						Chelsea Commons
					</a>
					, a community for builders in NY.
				</p></FadeIn>

				<FadeIn delay={0.25}><p>
					I previously cofounded{" "}
					<a
						href="https://connectalum.com"
						target="_blank"
						rel="noopener noreferrer"
						className="whitespace-nowrap"
					>
						<img
							src="/assets/logos/connectalum-logo.png"
							alt="Connect"
							className="inline h-4 w-4 object-contain align-text-bottom"
						/>{" "}
						Connect
					</a>
					, an EdTech company serving 10,000+ students & making six figures ARR.
				</p></FadeIn>

				<FadeIn delay={0.35}><p>
					I'm a junior at{" "}
					<a
						href="https://washu.edu/"
						target="_blank"
						rel="noopener noreferrer"
						className="whitespace-nowrap"
					>
						<img
							src="/assets/logos/washu-logo.png"
							alt="WashU"
							className="inline h-4 w-4 object-contain align-text-bottom"
						/>{" "}
						Washington University
					</a>{" "}
					studying CS and finance. Currently on exchange at{" "}
					<a
						href="https://hkust.edu.hk/"
						target="_blank"
						rel="noopener noreferrer"
						className="whitespace-nowrap"
					>
						<img
							src="/assets/logos/hkust-logo.png"
							alt="HKUST"
							className="inline h-4 w-4 object-contain align-text-bottom"
						/>{" "}
						HKUST
					</a>{" "}
					.
				</p></FadeIn>

				<FadeIn delay={0.45}><p>
					I love building all sorts of things—web/mobile apps, AI systems,
					infrastructure, and more recently hardware. I work primarily with
					TypeScript, React/Next.js, and React Native, but I've worked across
					the stack from Swift to Rust to cloud architecture.
				</p></FadeIn>

				<FadeIn delay={0.55}><p>
					Outside of work I like{" "}
					<a
						href="https://www.instagram.com/ethn.raw/"
						target="_blank"
						rel="noopener noreferrer"
					>
						photography
					</a>
					, play piano, love cars, and type kinda{" "}
					<a
						href="https://monkeytype.com/profile/ethan.ng"
						target="_blank"
						rel="noopener noreferrer"
					>
						fast
					</a>
					. Recently been playing a lot of Mahjong, tennis, and badminton.
				</p></FadeIn>

				<FadeIn delay={0.65}><p>
					You can reach me at{" "}
					<a href="mailto:hey@ethans.site">
						<code className="text-white hover:underline">hey@ethans.site</code>
					</a>
					.
				</p></FadeIn>
			</div>
		</Layout>
	);
}
