"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Spin as Hamburger } from "hamburger-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { HiGlobeAmericas } from "react-icons/hi2";

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const [time, setTime] = useState("");
    const handleClick = () => setNav(!nav);
    const router = useRouter();
    const pathname = usePathname();

    const dateFormatter = useMemo(() => {
        return new Intl.DateTimeFormat([], {
            timeZone: "America/Chicago",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => setTime(dateFormatter.format(new Date())), 1000);
        return () => {
            clearInterval(interval);
        };
    }, [dateFormatter]);

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
        <div id="navbar" className="fixed top-0 opacity-0 left-0 w-[100vw] bg-black text-white duration-300 z-50">
            <div className="mx-8 py-4 flex items-center justify-between border-b border-white">
                <div className="flex items-center">
                    <Link href="/">ETHAN NG</Link>
                </div>
                <p className="font-medium text-md uppercase flex items-center gap-3 text-[14px] text-gray-300">
                    <div className="animate-pulse bg-[#83E084] rounded-full w-3 h-3" />
                    <span> Open to work</span>
                </p>
                <p className="font-medium flex text-md items-center gap-3 text-[14px] text-gray-300">
                    <HiGlobeAmericas />
                    <span> STL {time}</span>
                </p>
                <ul className="hidden items-center gap-4 text-[12px] md:flex">
                    <li>
                        <h1
                            className="hover-animation-dark font-medium duration-300 hover:text-primary-400"
                            data-section="about"
                            onClick={handleViewSection}
                        >
                            ABOUT
                        </h1>
                    </li>
                    <li>
                        <h1
                            className="hover-animation-dark font-medium duration-300 hover:text-primary-400"
                            data-section="skills"
                            onClick={handleViewSection}
                        >
                            SKILLS
                        </h1>
                    </li>
                    <li>
                        <h1
                            className="hover-animation-dark font-medium duration-300 hover:text-primary-400"
                            data-section="work"
                            onClick={handleViewSection}
                        >
                            WORK
                        </h1>
                    </li>
                    <li>
                        <h1
                            className="hover-animation-dark font-medium duration-300 hover:text-primary-400"
                            data-section="writing"
                        >
                            <Link href="/Ethan%20Ng%20Resume.pdf" target="_blank">
                                RESUME
                            </Link>
                        </h1>
                    </li>
                    <li>
                        <Link
                            href="/photos"
                            target="_blank"
                            className="hover-animation-dark font-medium duration-300 hover:text-primary-400"
                        >
                            PHOTOS
                        </Link>
                    </li>
                    <li>
                        <Button
                            data-section="contact"
                            onClick={handleViewSection}
                            type="button"
                            aria-label="Contact"
                            className="font-medium"
                        >
                            <span className="text-[12px]">CONTACT</span>
                        </Button>
                    </li>
                </ul>

                <div className="z-50 md:hidden" onClick={handleClick}>
                    <Hamburger toggled={nav} toggle={setNav} size={18} label="Menu" />
                </div>
            </div>

            <hr className="hidden md:inline w-full" />

            {nav && (
                <ul className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-800 font-mono text-lg">
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
                </ul>
            )}
        </div>
    );
};

export default Navbar;
