"use client";

import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "motion/react";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { VscSymbolInterface, VscSymbolVariable } from "react-icons/vsc";
import { LuBolt, LuTriangleAlert, LuConstruction, LuCodeXml, LuMouse } from "react-icons/lu";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";

const roles = ["engineer", "founder", "student", "designer"];

const Hero = () => {
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

    const textVariants = {
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: -20, opacity: 0 },
    };

    const [displayedImages, setDisplayedImages] = useState<number[]>([]);
    useEffect(() => {
        const available = Array.from({ length: 29 }, (_, i) => i + 1);
        const shuffled = available.sort(() => 0.5 - Math.random());
        setDisplayedImages(shuffled.slice(0, 5));
    }, []);
    useEffect(() => {
        const interval = setInterval(() => {
            setDisplayedImages((prev) => {
                const newImages = [...prev];
                const swapIndex = Math.floor(Math.random() * 5);
                const available = Array.from({ length: 29 }, (_, i) => i + 1).filter((num) => !prev.includes(num));
                if (available.length > 0) {
                    const newImage = available[Math.floor(Math.random() * available.length)];
                    newImages[swapIndex] = newImage;
                }
                return newImages;
            });
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const imagePositions = [
        { top: "15%", left: "1%", transform: "none", baseRotation: 10, size: 220 },
        { top: "17%", right: "8%", transform: "none", baseRotation: 0, size: 180 },
        { bottom: "12%", left: "10%", transform: "none", baseRotation: 0, size: 180 },
        { bottom: "12%", right: "1%", transform: "none", baseRotation: -5, size: 220 },
    ];

    gsap.to(".about", {
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
        },
        y: -window.innerHeight,
    });

    return (
        <div className="relative h-screen bg-white text-black w-full hero" ref={ref}>
            <div className="absolute top-0 left-0 right-0 flex justify-center mt-2">
                <motion.div className="flex font-mono justify-between w-[98%] hero-item">
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

            <div className="absolute inset-0 pointer-events-none hero-item">
                {displayedImages.length === 5 &&
                    imagePositions.map((pos, i) => {
                        const randomOffset = Math.random() * 4 - 2;
                        return (
                            <motion.div
                                key={i}
                                style={{
                                    width: pos.size,
                                    height: pos.size,
                                    position: "absolute",
                                    top: pos.top,
                                    left: pos.left,
                                    right: pos.right,
                                    bottom: pos.bottom,
                                    transform: pos.transform,
                                }}
                                initial={{ rotate: pos.baseRotation + randomOffset }}
                                animate={{ rotate: pos.baseRotation + randomOffset }}
                                whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                                className="drop-shadow-xl cursor-pointer rounded-md"
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={`/assets/photos/${displayedImages[i]}.jpeg`}
                                        alt={`Photo ${displayedImages[i]}`}
                                        fill
                                        style={{ objectFit: "cover" }}
                                        className="rounded-md"
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="flex items-center gap-20">
                    <p className="mt-10 text-2xl w-24 lowercase hero-item">Hey I&apos;m</p>
                    <div className="relative">
                        <p className="text-[1.5vw] sm:mt-2 md:mt-3 lg:mt-5 -ml-1 absolute font-medium w-full text-right">
                            伍义存
                        </p>
                        <h1 className="text-center text-[12vw] font-bold leading-none">ethan ng</h1>
                    </div>
                    <div className="relative h-8 mt-10 w-24 text-left overflow-hidden hero-item">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={roles[roleIndex]}
                                variants={textVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.2 }}
                                className="absolute inset-0 text-2xl text-primary-600 flex items-center justify-end"
                            >
                                {roles[roleIndex]}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-10 hero-item">
                <div className="flex justify-between w-full mx-10">
                    <motion.div
                        className="flex gap-2 items-center w-[33%] justify-start"
                        animate={{ y: ["0", "-15px"] }}
                        transition={{
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 0.5,
                            ease: "easeOut",
                        }}
                    >
                        <LuMouse />
                        <p className="uppercase font-medium">Scroll for more</p>
                    </motion.div>
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
