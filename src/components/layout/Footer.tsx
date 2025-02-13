"use client";

import React, { useEffect } from "react";
import { Marquee } from "../magicui/marquee";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";
import { motion, useAnimation } from "motion/react";
import { useInView } from "react-intersection-observer";

const Footer = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.3 });
    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    const list = {
        visible: {
            opacity: 1,
            transition: {
                delay: 0.1,
                when: "beforeChildren",
                staggerChildren: 0.1,
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
        <div className="relative text-white">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <h1
                    className="font-bold bg-gradient-to-r from-[#111] via-[#303030] to-[#111] bg-clip-text text-transparent whitespace-nowrap overflow-hidden uppercase select-none drop-shadow-[0_0_1.2px_rgba(255,255,255,1)]"
                    style={{ fontSize: "16vw" }}
                >
                    MY SOCIALS
                </h1>
            </div>

            <div className="flex justify-center">
                <motion.hr
                    className="mb-8 w-[91vw]"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeIn" }}
                    style={{ originX: 0 }}
                />
            </div>

            <div className="relative z-10">
                <div className="w-full flex justify-center mb-[250px]">
                    <div className="w-[90vw]">
                        <motion.ul
                            className="flex justify-between"
                            initial="hidden"
                            animate={controls}
                            variants={list}
                            ref={ref}
                        >
                            <motion.li variants={item} className="list-none flex gap-1 items-center text-lg">
                                <Link className="hover-animation-400" href="mailto:hello@ethans.site" target="_blank">
                                    hello@ethans.site
                                </Link>
                                <LuArrowUpRight />
                            </motion.li>
                            <br />
                            <motion.li variants={item} className="list-none flex gap-1 items-center text-lg">
                                <Link className="hover-animation-400" href="https://github.com/ngethan" target="_blank">
                                    Github
                                </Link>
                                <LuArrowUpRight />
                            </motion.li>
                            <motion.li variants={item} className="list-none flex gap-1 items-center text-lg">
                                <Link
                                    className="hover-animation-400"
                                    href="https://linkedin.com/in/ethan--ng"
                                    target="_blank"
                                >
                                    LinkedIn
                                </Link>
                                <LuArrowUpRight />
                            </motion.li>
                            <motion.li variants={item} className="list-none flex gap-1 items-center text-lg">
                                <Link className="hover-animation-400" href="https://instagram.com/ethn.ng" target="_blank">
                                    Instagram
                                </Link>
                                <LuArrowUpRight />
                            </motion.li>
                            <motion.li variants={item} className="list-none flex gap-1 items-center text-lg">
                                <Link
                                    className="hover-animation-400"
                                    href="https://monkeytype.com/profile/ethan.ng"
                                    target="_blank"
                                >
                                    Monkeytype
                                </Link>
                                <LuArrowUpRight />
                            </motion.li>
                        </motion.ul>

                        <motion.p variants={item} className="text-gray-400 uppercase">
                            Copyright {new Date().getFullYear()} Ethan Ng
                        </motion.p>
                    </div>
                </div>

                <Marquee className="[--duration:15s] py-4 duration-300 text-white overflow-hidden">
                    {[1, 2, 3, 4, 5].map((k) => (
                        <p key={k} className="gap-2 text-xl font-medium flex items-center">
                            <span>MADE WITH</span>
                            <FaHeart className="text-primary-500" />
                            <span>BY ETHAN NG</span>
                            <span className="ml-2">•</span>
                        </p>
                    ))}
                </Marquee>
            </div>
        </div>
    );
};

export default Footer;
