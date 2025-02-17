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
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import Projects from "@/components/sections/Projects";
import Loading from "@/components/sections/Loading";

export default function Home() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <>
            <Loading />
            <Cursor />
            <div className="relative">
                <Hero />
                <Navbar />
                <div className="relative">
                    <About />
                    <Work />
                    <Projects />
                    <Skills />
                    <Contact />
                    <Footer />
                </div>
            </div>
        </>
    );
}
