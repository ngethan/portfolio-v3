"use client";

import React, { useEffect, useRef } from "react";
import { NumberTicker } from "../magicui/number-ticker";
import gsap from "gsap";
import { motion } from "motion/react";

const Loading: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;
        const ctx = gsap.context(() => {
            gsap.to(".loaderBox", {
                duration: 1.5,
                delay: 3.5,
                height: 0,
                stagger: { amount: 0.5 },
                ease: "power4.inOut",
            });
        }, containerRef);
        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <div className="absolute inset-0 z-[100]" ref={containerRef}>
            <motion.div
                className="absolute right-4 bottom-4 z-[120]"
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: -50, opacity: 0 }}
                transition={{ delay: 3, duration: 1 }}
            >
                <NumberTicker value={100} className="font-mono leading-none text-[150px] font-bold text-white" />
            </motion.div>

            <div className="absolute inset-0 flex z-[100]">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((k) => (
                    <div key={k} className="loaderBox bg-black w-[10vw] h-[105vw]"></div>
                ))}
            </div>
        </div>
    );
};

export default Loading;
