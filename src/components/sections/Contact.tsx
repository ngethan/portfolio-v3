"use client";

import React from "react";
import { useCursor } from "@/context/CursorContext";

const Contact = () => {
    const { setCopyState } = useCursor();

    return (
        <div className="bg-black text-white w-full mb-40" id="bio">
            <div className="mx-[1rem]">
                <div className="relative grid grid-cols-8 pb-14">
                    <div className="lg:text-[9rem] text-[5rem] md:text-[7rem] col-span-8 col-start-2 phone:col-start-2 text-center flex justify-left items-center">
                        <h1 className="mr-20 text-left uppercase font-bold largeTablet:!text-[7rem] largeTablet:leading-[1] tablet:!text-[5rem] phone:!text-[4rem] smallPhone:!text-[2.8rem]">
                            Let&apos;s get
                        </h1>
                        <svg viewBox="0 0 200 200" className="w-40 h-40 animate-spin-slow">
                            <defs>
                                <path
                                    id="circlePath"
                                    d="M 100, 100
               m -75, 0
               a 75,75 0 1,1 150,0
               a 75,75 0 1,1 -150,0"
                                />
                            </defs>
                            <text fill="white" fontSize="24" className="cursor-default font-bold">
                                <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
                                    NICE TO MEET YOU • NICE TO MEET YOU •
                                </textPath>
                            </text>
                        </svg>
                    </div>
                    <div className="lg:text-[9rem] text-[5rem] md:text-[7rem] col-start-1 col-span-8 phone:col-span-7">
                        <h1 className="text-left uppercase font-bold largeTablet:!text-[7rem] largeTablet:leading-[1] tablet:!text-[5rem] phone:!text-[4rem] smallPhone:!text-[2.8rem]">
                            in touch!
                        </h1>
                    </div>
                </div>

                <div className="flex w-full justify-center">
                    <div className="w-[90vw] sm:w-[70vw] md:w-[30vw]">
                        <p
                            data-copy="true"
                            className="cursor-pointer md:text-6xl text-3xl sm:text-4xl underline w-fit"
                            onClick={() => {
                                navigator.clipboard.writeText("hello@ethans.site");
                                setCopyState(true);
                                setTimeout(() => setCopyState(false), 2000);
                            }}
                        >
                            hello@ethans.site
                        </p>
                        <p className="text-gray-300">PSST!! hover on me ;)</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
