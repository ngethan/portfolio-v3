"use client";

import Link from "next/link";
import React from "react";
import Porsche from "../glbs/porsche";
import { SpinningText } from "../magicui/spinning-text";

const About = () => {
    return (
        <div className="bg-black text-white w-full pb-20" id="bio">
            <div className="mx-[1rem]">
                <div className="relative grid grid-cols-8 pb-14">
                    <div className="lg:text-[9rem] text-[5rem] md:text-[7rem] col-span-8 flex items-center">
                        <h1 className="mr-20 text-left uppercase font-bold largeTablet:!text-[7rem] largeTablet:leading-[1] tablet:!text-[5rem] phone:!text-[4rem] smallPhone:!text-[2.8rem]">
                            A Little
                        </h1>

                        <div className="w-40">
                            <SpinningText duration={10} radius={5} className="text-2xl font-medium">
                                NICE TO MEET YOU • NICE TO MEET YOU •
                            </SpinningText>
                        </div>
                    </div>
                    <div className="lg:text-[9rem] text-[5rem] md:text-[7rem] col-start-2 col-span-8 phone:col-start-2 phone:col-span-7">
                        <h1 className="text-left uppercase font-bold largeTablet:!text-[7rem] largeTablet:leading-[1] tablet:!text-[5rem] phone:!text-[4rem] smallPhone:!text-[2.8rem]">
                            About Me
                        </h1>
                    </div>
                </div>
                <div className="relative">
                    <div className="absolute right-0 top-1/2 transform -translate-y-[50%] md:-translate-y-[75%] w-[400px] h-[400px]">
                        <Porsche />
                    </div>
                </div>

                <div className="flex md:justify-between w-full md:flex-row flex-col md:max-w-[80vw] lg:max-w-[75vw] max-w-[95vw]">
                    <div className="md:py-0 py-6 text-md space-x-6 flex">
                        <p>1.</p> <p className="uppercase">Bio</p>
                    </div>
                    <p className="md:max-w-[55vw] font-medium lg:max-w-[50vw] text-xl">
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
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
