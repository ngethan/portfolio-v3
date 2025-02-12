// import { useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "motion/react";

const Hero = () => {
    const [ref, inView] = useInView({ threshold: 0.1 });

    useEffect(() => {
        const navbar = document.getElementById("navbar");
        if (!navbar) return;

        const timeout = setTimeout(() => {
            if (inView) {
                console.log("Hero section in view → Hiding navbar");
                navbar.classList.add("opacity-0", "pointer-events-none");
            } else {
                console.log("Hero section out of view → Showing navbar");
                navbar.classList.remove("opacity-0", "pointer-events-none");
            }
        }, 500);

        return () => clearTimeout(timeout);
    }, [inView]);

    return (
        <div className="h-screen bg-white text-black w-full" ref={ref}>
            <div className="flex w-full text-black justify-center pb-20">
                <motion.div className="flex font-mono justify-between w-[98%]">
                    <p className="uppercase">Creative Portfolio</p>
                    <p className="uppercase">Designed and Built By Ethan Ng</p>
                    <p className="uppercase">v0.1.0</p>
                    <p className="uppercase">All Rights Reserved</p>
                </motion.div>
            </div>
            <div>
                <h1 className="text-center">Ethan Ng</h1>
            </div>
        </div>
    );
};
export default Hero;
