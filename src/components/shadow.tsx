"use client";

import { type AnimationPlaybackControls, animate, motionValue } from "motion";
import { type CSSProperties, useEffect, useId, useRef } from "react";

interface ResponsiveImage {
	src: string;
	alt?: string;
	srcSet?: string;
}

interface AnimationConfig {
	preview?: boolean;
	scale: number;
	speed: number;
}

interface NoiseConfig {
	opacity: number;
	scale: number;
}

interface ShadowsProps {
	type?: "preset" | "custom";
	presetIndex?: number;
	customImage?: ResponsiveImage;
	sizing?: "fill" | "stretch";
	color?: string;
	animation?: AnimationConfig;
	noise?: NoiseConfig;
	style?: CSSProperties;
	className?: string;
}

function mapRange(
	value: number,
	fromLow: number,
	fromHigh: number,
	toLow: number,
	toHigh: number,
): number {
	if (fromLow === fromHigh) {
		return toLow;
	}
	const percentage = (value - fromLow) / (fromHigh - fromLow);
	return toLow + percentage * (toHigh - toLow);
}

const useInstanceId = (): string => {
	const id = useId();
	const cleanId = id.replace(/:/g, "");
	const instanceId = `shadowoverlay-${cleanId}`;
	return instanceId;
};

export function Shadow({
	sizing = "fill",
	color = "rgba(128, 128, 128, 1)",
	animation,
	noise,
	style,
	className,
}: ShadowsProps) {
	const id = useInstanceId();
	const animationEnabled = animation && animation.scale > 0;
	const feColorMatrixRef = useRef<SVGFEColorMatrixElement>(null);
	const hueRotateAnimation = useRef<AnimationPlaybackControls | null>(null);
	const hueRotateMotionValueRef = useRef(motionValue(0));

	const displacementScale = animation
		? mapRange(animation.scale, 1, 100, 20, 100)
		: 0;

	useEffect(() => {
		if (!feColorMatrixRef.current || !animationEnabled || !animation) return;

		if (hueRotateAnimation.current) {
			hueRotateAnimation.current.stop();
		}

		const hueRotateMotionValue = hueRotateMotionValueRef.current;
		const duration = mapRange(animation.speed, 1, 100, 20, 2);

		// Restore animation state from sessionStorage
		const savedState = sessionStorage.getItem('shadow-animation-state');
		let startValue = 0;
		let startTime = Date.now();

		if (savedState) {
			try {
				const { value, timestamp } = JSON.parse(savedState);
				const elapsed = (Date.now() - timestamp) / 1000; // seconds
				const cycles = elapsed / duration;
				startValue = (value + (cycles * 360)) % 360;
			} catch (e) {
				// Invalid state, start from 0
			}
		}

		hueRotateMotionValue.set(startValue);

		hueRotateAnimation.current = animate(hueRotateMotionValue, startValue + 360, {
			duration,
			repeat: Number.POSITIVE_INFINITY,
			ease: "linear",
			onUpdate: (value: number) => {
				if (feColorMatrixRef.current) {
					const normalizedValue = value % 360;
					feColorMatrixRef.current.setAttribute("values", String(normalizedValue));

					// Periodically save state (every 100ms)
					const now = Date.now();
					if (now - startTime > 100) {
						startTime = now;
						sessionStorage.setItem('shadow-animation-state', JSON.stringify({
							value: normalizedValue,
							timestamp: now,
						}));
					}
				}
			},
		});

		return () => {
			if (hueRotateAnimation.current) {
				hueRotateAnimation.current.stop();
			}
		};
	}, [animationEnabled, animation]);

	return (
		<div
			className={className}
			style={{
				overflow: "hidden",
				position: "absolute",
				inset: 0,
				width: "100%",
				height: "100%",
				...style,
			}}
		>
			<div
				style={{
					position: "absolute",
					inset: -displacementScale,
					filter: animationEnabled ? `url(#${id}) blur(4px)` : "none",
					opacity: 1,
				}}
			>
				{animationEnabled && (
					<svg style={{ position: "absolute" }} aria-label="Shadows">
						<title>Decorative shadow effects</title>
						<defs>
							<filter id={id}>
								<feTurbulence
									result="undulation"
									numOctaves="2"
									baseFrequency={`${mapRange(animation.scale, 0, 100, 0.001, 0.0005)},${mapRange(animation.scale, 0, 100, 0.004, 0.002)}`}
									seed="0"
									type="turbulence"
								/>
								<feColorMatrix
									ref={feColorMatrixRef}
									in="undulation"
									type="hueRotate"
									values="180"
								/>
								<feColorMatrix
									in="dist"
									result="circulation"
									type="matrix"
									values="4 0 0 0 1  4 0 0 0 1  4 0 0 0 1  1 0 0 0 0"
								/>
								<feDisplacementMap
									in="SourceGraphic"
									in2="circulation"
									scale={displacementScale}
									result="dist"
								/>
								<feDisplacementMap
									in="dist"
									in2="undulation"
									scale={displacementScale}
									result="output"
								/>
							</filter>
						</defs>
					</svg>
				)}
				<div
					style={{
						backgroundColor: color,
						maskImage: `url('/shadow.avif')`,
						maskSize: sizing === "stretch" ? "100% 100%" : "cover",
						maskRepeat: "no-repeat",
						maskPosition: "center",
						width: "100%",
						height: "100%",
					}}
				/>
			</div>

			{noise && noise.opacity > 0 && (
				<div
					style={{
						position: "absolute",
						inset: 0,
						backgroundImage: `url("/grain.avif")`,
						backgroundSize: noise.scale * 200,
						backgroundRepeat: "repeat",
						opacity: noise.opacity / 2,
					}}
				/>
			)}
		</div>
	);
}
