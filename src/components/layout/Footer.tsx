"use client";

import React from "react";
import { Marquee } from "../magicui/marquee";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";

const Footer: React.FC = () => {
    return (
        <div className="relative text-white">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <h1
                    className="font-bold text-[#767676] whitespace-nowrap overflow-hidden uppercase select-none"
                    style={{ fontSize: "16vw", opacity: 0.1 }}
                >
                    MY SOCIALS
                </h1>
            </div>
            <div className="flex justify-center">
                <hr className="mb-10 w-[91vw]" />
            </div>
            <div className="relative z-10">
                <div className="w-full flex justify-center mb-[240px]">
                    <div className="w-[90vw]">
                        <ul className="flex justify-between">
                            <li className="list-none flex gap-1 items-center text-lg">
                                <Link className="hover-animation-dark" href="mailto:hello@ethans.site" target="_blank">
                                    hello@ethans.site
                                </Link>
                                <LuArrowUpRight />
                            </li>
                            <br />
                            <li className="list-none flex gap-1 items-center text-lg">
                                <Link className="hover-animation-dark" href="https://github.com/ngethan" target="_blank">
                                    Github
                                </Link>
                                <LuArrowUpRight />
                            </li>
                            <li className="list-none flex gap-1 items-center text-lg">
                                <Link
                                    className="hover-animation-dark"
                                    href="https://linkedin.com/in/ethan--ng"
                                    target="_blank"
                                >
                                    LinkedIn
                                </Link>
                                <LuArrowUpRight />
                            </li>
                            <li className="list-none flex gap-1 items-center text-lg">
                                <Link className="hover-animation-dark" href="https://instagram.com/ethn.ng" target="_blank">
                                    Instagram
                                </Link>
                                <LuArrowUpRight />
                            </li>
                            <li className="list-none flex gap-1 items-center text-lg">
                                <Link
                                    className="hover-animation-dark"
                                    href="https://monkeytype.com/profile/ethan.ng"
                                    target="_blank"
                                >
                                    Monkeytype
                                </Link>
                                <LuArrowUpRight />
                            </li>
                        </ul>

                        <p className="text-gray-400 uppercase">Copyright {new Date().getFullYear()} Ethan Ng</p>
                    </div>
                </div>

                <Marquee pauseOnHover className="[--duration:15s] py-4 duration-300 text-white overflow-hidden">
                    <p className="gap-2 text-xl font-medium flex items-center">
                        <span>MADE WITH </span>
                        <FaHeart className="text-primary-500" />
                        <span> BY ETHAN NG</span>
                        <span>•</span>
                    </p>
                    <p className="gap-2 text-xl font-medium flex items-center">
                        <span>MADE WITH </span>
                        <FaHeart className="text-primary-500" />
                        <span> BY ETHAN NG</span>
                        <span>•</span>
                    </p>
                </Marquee>
            </div>
        </div>
    );
};

export default Footer;
