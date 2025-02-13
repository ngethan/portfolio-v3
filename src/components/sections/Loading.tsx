"use client";

import React, { useEffect, useRef } from "react";
import { NumberTicker } from "../magicui/number-ticker";
import gsap from "gsap";
import { motion } from "motion/react";

const Loading = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.documentElement.classList.add("no-scroll");
        document.body.classList.add("no-scroll");

        setTimeout(() => {
            document.documentElement.classList.remove("no-scroll");
            document.body.classList.remove("no-scroll");
        }, 4000);

        return () => {
            document.documentElement.classList.remove("no-scroll");
            document.body.classList.remove("no-scroll");
        };
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;
        const ctx = gsap.context(() => {
            gsap.to(".loaderBox", {
                duration: 1.5,
                delay: 4.0,
                height: 0,
                stagger: { amount: 0.5 },
                ease: "power4.inOut",
                onComplete: () => {
                    document.getElementById("loading_container")?.classList.add("hidden");
                    document.getElementById("loading_boxes")?.classList.add("hidden");
                },
            });
        }, containerRef);
        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <div id="loading_container" className="absolute inset-0 z-[100] no-scroll" ref={containerRef}>
            <motion.div
                className="absolute right-4 bottom-4 z-[120]"
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: -50, opacity: 0 }}
                transition={{ delay: 3.5, duration: 1 }}
            >
                <NumberTicker value={100} className="font-mono leading-none text-[150px] font-bold text-white" />
            </motion.div>

            <div id="loading_boxes" className="absolute inset-0 flex">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((k) => (
                    <div key={k} className="loaderBox bg-black w-[10vw] h-[105vw]"></div>
                ))}
            </div>
        </div>
    );
};

export default Loading;
