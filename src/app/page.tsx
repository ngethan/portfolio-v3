"use client";

import Cursor from "@/components/layout/Cursor";
import Navbar from "@/components/layout/Navbar";
import About from "@/components/sections/About";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";

export default function Home() {
    return (
        <>
            <Cursor />
            <Navbar />
            <div className="mt-[50px]">
                <Hero />
                <About />
                <Work />
            </div>
        </>
    );
}
