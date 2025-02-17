"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import Porsche from "../glbs/porsche";
import { SpinningText } from "../magicui/spinning-text";
import { motion, useAnimation } from "motion/react";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const About = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.5 });
    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    useEffect(() => {
        ScrollTrigger.create({
            trigger: "#bio",
            start: "top bottom",
            end: "top top",
            snap: {
                snapTo: 0,
                duration: 0.8,
                delay: 0,
                ease: "power2.inOut",
            },
        });

        gsap.fromTo(
            "#bio",
            {
                opacity: 0,
                y: 100,
            },
            {
                opacity: 1,
                y: 0,
                scrollTrigger: {
                    trigger: "",
                    start: "top center",
                    end: "top center",
                    scrub: 1,
                },
            }
        );
    }, []);

    const list = {
        visible: {
            opacity: 1,
            transition: {
                delay: 0.1,
                when: "beforeChildren",
                staggerChildren: 0.05,
            },
        },
        hidden: {
            opacity: 0,
            transition: {
                when: "afterChildren",
            },
        },
    };

    const item = {
        hidden: { y: -20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    };

    return (
        <motion.div
            className="bg-black text-white w-full pb-20 about"
            id="bio"
            initial="hidden"
            animate={controls}
            variants={list}
            ref={ref}
        >
            <div className="mx-[1rem]">
                <div className="relative grid grid-cols-8 pb-14">
                    <div className="lg:text-[9rem] text-[5rem] md:text-[7rem] col-span-8 flex items-center">
                        <motion.h1
                            variants={item}
                            className="mr-20 text-left uppercase font-bold largeTablet:!text-[7rem] largeTablet:leading-[1] tablet:!text-[5rem] phone:!text-[4rem] smallPhone:!text-[2.8rem]"
                        >
                            A Little
                        </motion.h1>

                        <div className="w-40">
                            <SpinningText duration={10} radius={5} className="text-2xl font-medium">
                                NICE TO MEET YOU • NICE TO MEET YOU •
                            </SpinningText>
                        </div>
                    </div>
                    <div className="lg:text-[9rem] text-[5rem] md:text-[7rem] col-start-2 col-span-8 phone:col-start-2 phone:col-span-7">
                        <motion.h1
                            variants={item}
                            className="text-left uppercase font-bold largeTablet:!text-[7rem] largeTablet:leading-[1] tablet:!text-[5rem] phone:!text-[4rem] smallPhone:!text-[2.8rem]"
                        >
                            About Me
                        </motion.h1>
                    </div>
                </div>
                <div className="relative">
                    <div className="absolute right-0 top-1/2 transform -translate-y-[50%] md:-translate-y-[75%] w-[400px] h-[400px]">
                        <Porsche />
                    </div>
                </div>

                <div className="flex md:justify-between w-full md:flex-row flex-col md:max-w-[80vw] lg:max-w-[75vw] max-w-[95vw]">
                    <motion.div variants={item} className="font-bold md:py-0 py-6 text-md space-x-6 flex">
                        <p>1.</p> <p className="uppercase">Bio</p>
                    </motion.div>
                    <motion.p variants={item} className="md:max-w-[55vw] font-medium lg:max-w-[50vw] text-xl">
                        Hey, my name is Ethan! I&apos;m currently a student at{" "}
                        <Link className="hover-animation-400 text-primary-400" href="https://washu.edu/" target="_blank">
                            Washington University in St. Louis
                        </Link>{" "}
                        studying CS and entrepreneurship. I&apos;m a fullstack engineer and I love architecting exceptional
                        user experiences. I&apos;ve also recently started getting more interested in AI/ML and robotics.
                        I&apos;m currently building{" "}
                        <Link className="hover-animation-400 text-primary-400" href="https://connectalum.com" target="_blank">
                            Connect
                        </Link>
                        , an alumni outreach platform. <br />
                        <br />
                        Raised in New York. I also like{" "}
                        <Link className="hover-animation-400 text-primary-400" href="/photos">
                            photography 📸
                        </Link>
                        , piano 🎹, cars 🏎️, tennis 🎾, and film 🎥.
                    </motion.p>
                </div>
            </div>
        </motion.div>
    );
};

export default About;
