"use client";

import Cursor from "@/components/layout/Cursor";
import Navbar from "@/components/layout/Navbar";
import About from "@/components/sections/About";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Home() {
    useEffect(() => {
        const lenis = new Lenis();

        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    gsap.registerPlugin(ScrollTrigger);

    return (
        <>
            <Cursor />
            <Hero />
            <Navbar />
            <div className="mt-[80px]">
                <About />
                <Work />
            </div>
        </>
    );
}
