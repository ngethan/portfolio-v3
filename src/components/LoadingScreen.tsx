import { useEffect, useState } from "react";

const FADE_MS = 200;
const MAX_WAIT_MS = 2000;

export function LoadingScreen() {
	const [hidden, setHidden] = useState(false);
	const [removed, setRemoved] = useState(false);

	useEffect(() => {
		let cancelled = false;

		const decodeImage = (src: string) => {
			const img = new Image();
			img.src = src;
			return img.decode().catch(() => undefined);
		};

		const fontPromise = document.fonts
			? document.fonts.load('1em "Rubik Glitch"').catch(() => undefined)
			: Promise.resolve();

		const ready = Promise.all([
			fontPromise,
			decodeImage("/shadow.avif"),
			decodeImage("/grain.avif"),
		]);

		const timeout = new Promise((resolve) => setTimeout(resolve, MAX_WAIT_MS));

		Promise.race([ready, timeout]).then(() => {
			if (!cancelled) setHidden(true);
		});

		return () => {
			cancelled = true;
		};
	}, []);

	useEffect(() => {
		if (!hidden) return;
		const t = setTimeout(() => setRemoved(true), FADE_MS);
		return () => clearTimeout(t);
	}, [hidden]);

	if (removed) return null;

	return (
		<div
			aria-hidden
			style={{
				position: "fixed",
				inset: 0,
				backgroundColor: "#1a1a1a",
				zIndex: 9999,
				opacity: hidden ? 0 : 1,
				transition: `opacity ${FADE_MS}ms ease-out`,
				pointerEvents: hidden ? "none" : "auto",
			}}
		/>
	);
}
