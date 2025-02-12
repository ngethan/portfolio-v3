import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { CursorProvider } from "@/context/CursorContext";
import { PostHogProvider } from "@/components/posthog/PostHogProvider";

const neueMontreal = localFont({
    src: [
        {
            path: "../../public/fonts/NeueMontreal-Bold.otf",
            weight: "700",
            style: "normal",
        },
        {
            path: "../../public/fonts/NeueMontreal-Medium.otf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../../public/fonts/NeueMontreal-Regular.otf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/NeueMontreal-Light.otf",
            weight: "300",
            style: "normal",
        },
        {
            path: "../../public/fonts/NeueMontreal-BoldItalic.otf",
            weight: "700",
            style: "italic",
        },
        {
            path: "../../public/fonts/NeueMontreal-MediumItalic.otf",
            weight: "500",
            style: "italic",
        },
        {
            path: "../../public/fonts/NeueMontreal-Italic.otf",
            weight: "400",
            style: "italic",
        },
        {
            path: "../../public/fonts/NeueMontreal-LightItalic.otf",
            weight: "300",
            style: "italic",
        },
    ],
    variable: "--font-neue-montreal-sans",
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Ethan Ng",
    description: "Ethan Ng is a software engineer who loves designing and building applications.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            suppressHydrationWarning
            className={`${neueMontreal.variable} ${geistMono.variable} font-sans antialiased`}
            lang="en"
        >
            <body suppressHydrationWarning>
                <PostHogProvider>
                    <CursorProvider>{children}</CursorProvider>
                </PostHogProvider>
            </body>
        </html>
    );
}
