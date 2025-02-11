"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Spin as Hamburger } from "hamburger-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { Button } from "../ui/button";

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const handleClick = () => setNav(!nav);
    const router = useRouter();
    const pathname = usePathname();

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
        visible: { y: 0, opacity: 1 },
    };

    const variants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: "-100%" },
    };

    const handleViewSection = async (e: React.MouseEvent<HTMLElement>) => {
        const section = (e.target as HTMLElement).dataset.section;
        if (section === "writing") {
            await router.push("/writing");
        } else {
            if (pathname !== "/") await router.push("/");
            document.getElementById(section!)!.scrollIntoView();

            if (window.innerWidth < 768) {
                setNav(false);
            }
        }
    };

    return (
        <motion.div
            id="navbar"
            className="fixed top-0 left-0 w-[100vw] bg-black text-white duration-300 z-50"
            initial="hidden"
            animate={controls}
            variants={list}
            ref={ref}
        >
            <div className="mx-8 py-4 flex items-center justify-between border-b border-white">
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    variants={item}
                    className="flex items-center"
                >
                    <Link href="/">ETHAN NG</Link>
                </motion.div>

                <ul className="hidden items-center gap-4 text-[12px] md:flex">
                    <motion.li variants={item}>
                        <h1
                            className="hover-animation-dark font-semibold duration-300 hover:text-primary-400"
                            data-section="about"
                            onClick={handleViewSection}
                        >
                            ABOUT
                        </h1>
                    </motion.li>
                    <motion.li variants={item}>
                        <h1
                            className="hover-animation-dark font-semibold duration-300 hover:text-primary-400"
                            data-section="skills"
                            onClick={handleViewSection}
                        >
                            SKILLS
                        </h1>
                    </motion.li>
                    <motion.li variants={item}>
                        <h1
                            className="hover-animation-dark font-semibold duration-300 hover:text-primary-400"
                            data-section="work"
                            onClick={handleViewSection}
                        >
                            WORK
                        </h1>
                    </motion.li>
                    <motion.li variants={item}>
                        <h1
                            className="hover-animation-dark font-semibold duration-300 hover:text-primary-400"
                            data-section="writing"
                        >
                            <Link href="/Ethan%20Ng%20Resume.pdf" target="_blank">
                                RESUME
                            </Link>
                        </h1>
                    </motion.li>
                    <motion.li variants={item}>
                        <Link
                            href="/photos"
                            target="_blank"
                            className="hover-animation-dark font-semibold duration-300 hover:text-primary-400"
                        >
                            PHOTOS
                        </Link>
                    </motion.li>
                    <motion.li variants={item}>
                        <Button
                            data-section="contact"
                            onClick={handleViewSection}
                            type="button"
                            aria-label="Contact"
                            className="font-semibold"
                        >
                            <span className="text-[12px]">CONTACT</span>
                        </Button>
                    </motion.li>
                </ul>

                <div className="z-50 md:hidden" onClick={handleClick}>
                    <Hamburger toggled={nav} toggle={setNav} size={18} label="Menu" />
                </div>
            </div>

            <hr className="hidden md:inline w-full" />

            {nav && (
                <motion.ul
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-800 font-mono text-lg"
                    variants={variants}
                >
                    <li className="fixed top-[15%]">
                        <p
                            className="hover-animation-dark py-6 text-4xl duration-300 hover:text-primary-400"
                            data-section="about"
                            onClick={handleViewSection}
                        >
                            ABOUT
                        </p>
                    </li>
                    <li className="fixed top-[27%]">
                        <p
                            className="hover-animation-dark py-6 text-4xl duration-300 hover:text-primary-400"
                            data-section="skills"
                            onClick={handleViewSection}
                        >
                            SKILLS
                        </p>
                    </li>
                    <li className="fixed top-[39%]">
                        <p
                            className="hover-animation-dark py-6 text-4xl duration-300 hover:text-primary-400"
                            data-section="work"
                            onClick={handleViewSection}
                        >
                            WORK
                        </p>
                    </li>
                    <li className="fixed top-[51%]">
                        <p
                            className="hover-animation-dark py-6 text-4xl duration-300 hover:text-primary-400"
                            onClick={handleViewSection}
                        >
                            <Link href="/Ethan_Ng_Resume" target="_blank">
                                RESUME
                            </Link>
                        </p>
                    </li>
                    <li className="fixed top-[63%]">
                        <p className="hover-animation-dark py-6 text-4xl duration-300 hover:text-primary-400">
                            <Link href="/photos" target="_blank">
                                PHOTOS
                            </Link>
                        </p>
                    </li>
                    <li className="fixed top-[75%]">
                        <p
                            className="hover-animation-dark py-6 text-4xl duration-300 hover:text-primary-400"
                            data-section="contact"
                            onClick={handleViewSection}
                        >
                            CONTACT
                        </p>
                    </li>
                </motion.ul>
            )}
        </motion.div>
    );
};

export default Navbar;
