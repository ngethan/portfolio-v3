"use client";

import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { VscSymbolInterface, VscSymbolVariable } from "react-icons/vsc";
import { LuBolt, LuTriangleAlert, LuConstruction, LuCodeXml, LuArrowDown } from "react-icons/lu";
import Link from "next/link";

const roles = ["engineer", "founder", "student", "designer"];

const Hero: React.FC = () => {
    const [ref, inView] = useInView({ threshold: 0.1 });
    const [roleIndex, setRoleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const navbar = document.getElementById("navbar");
        if (!navbar) return;
        const timeout = setTimeout(() => {
            if (inView) {
                navbar.classList.add("opacity-0", "pointer-events-none");
            } else {
                navbar.classList.remove("opacity-0", "pointer-events-none");
            }
        }, 500);
        return () => clearTimeout(timeout);
    }, [inView]);

    const variants = {
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: -20, opacity: 0 },
    };

    return (
        <div className="relative h-screen bg-white text-black w-full" ref={ref}>
            <div className="absolute top-0 left-0 right-0 flex justify-center mt-2">
                <motion.div className="flex font-mono justify-between w-[98%]">
                    <p className="uppercase flex gap-2 items-center">
                        <VscSymbolVariable />
                        Creative Portfolio
                        <VscSymbolVariable />
                    </p>
                    <p className="uppercase flex gap-2 items-center">
                        <HiOutlineWrenchScrewdriver />
                        Designed and Built By Ethan Ng
                        <LuBolt />
                    </p>
                    <p className="uppercase flex gap-2 items-center">
                        <LuConstruction />
                        v0.1.0
                        <LuTriangleAlert />
                    </p>
                    <p className="uppercase flex gap-2 items-center">
                        <VscSymbolInterface style={{ transform: "rotate(180deg)" }} />
                        All Rights Reserved
                        <VscSymbolInterface />
                    </p>
                </motion.div>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="flex items-center space-x-20">
                    <p className="uppercase mt-10">Hey I&apos;m</p>
                    <h1 className="text-center text-[12vw] font-bold leading-none">ethan ng</h1>
                    <div className="relative h-8 mt-10 w-20 text-left overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={roles[roleIndex]}
                                variants={variants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.2 }}
                                className="absolute inset-0 text-xl text-primary-600 flex items-center"
                            >
                                {roles[roleIndex]}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-10">
                <div className="flex justify-between w-full mx-10">
                    <div className="flex gap-2 items-center w-[33%] justify-start">
                        <LuArrowDown />
                        <p className="uppercase font-medium">Scroll for more</p>
                    </div>
                    <div className="flex flex-col gap-2 items-center w-[33%] justify-center">
                        <p className="uppercase font-medium font-mono">Delivering Exceptional Experiences</p>
                    </div>
                    <div className="w-[33%] flex justify-end">
                        <Link
                            href="https://github.com/ngethan/portfolio-v3"
                            target="_blank"
                            className="flex w-fit gap-2 items-center group"
                        >
                            <p className="uppercase font-medium group-hover:text-primary-500 duration-150">GitHub</p>
                            <LuCodeXml className="group-hover:text-primary-500 duration-150" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
