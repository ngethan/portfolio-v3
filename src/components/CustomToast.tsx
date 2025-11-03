import { Check } from "lucide-react";
import { Shadow } from "./shadow";

interface CustomToastProps {
	message: string;
}

export function CustomToast({ message }: CustomToastProps) {
	return (
		<div
			className="relative overflow-hidden bg-background border border-border shadow-lg"
			style={{
				borderRadius: "var(--radius)",
				minWidth: "356px",
				maxWidth: "356px",
				padding: "12px 16px",
				fontSize: "13px",
				lineHeight: "1.3",
			}}
		>
			<div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
				<Shadow
					color="rgba(128, 128, 128, 0.3)"
					animation={{ scale: 30, speed: 60 }}
					noise={{ opacity: 1, scale: 1.5 }}
					sizing="fill"
				/>
			</div>

			<div
				className="absolute inset-0 pointer-events-none"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilterToast'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilterToast)'/%3E%3C/svg%3E")`,
					opacity: 0.1,
					mixBlendMode: "overlay",
				}}
			/>

			<div className="relative z-10 flex items-center gap-3">
				<Check className="w-5 h-5 flex-shrink-0 text-foreground" />
				<span className="text-foreground">{message}</span>
			</div>
		</div>
	);
}
