"use client";

import React, { useEffect, useState } from "react";
import { useCursor } from "@/context/CursorContext";
import { SpinningText } from "../magicui/spinning-text";
import { Spotlight } from "../ui/spotlight";
import { useInView } from "react-intersection-observer";

const Contact = () => {
    const { setCopyState } = useCursor();

    const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });
    const [showSpotlight, setShowSpotlight] = useState(false);

    useEffect(() => {
        setShowSpotlight(inView);
    }, [inView]);

    return (
        <div className="bg-black text-white w-full mb-40" id="bio">
            <div className="mx-[1rem]">
                <div className="relative grid grid-cols-8 pb-14">
                    <div className="lg:text-[9rem] text-[5rem] md:text-[7rem] col-span-8 col-start-2 phone:col-start-2 text-center flex justify-left items-center">
                        <div className="w-40">
                            <SpinningText duration={10} radius={5} className="text-2xl font-medium">
                                NICE TO MEET YOU • NICE TO MEET YOU •
                            </SpinningText>
                        </div>
                        <h1 className="ml-20 text-left uppercase font-bold largeTablet:!text-[7rem] largeTablet:leading-[1] tablet:!text-[5rem] phone:!text-[4rem] smallPhone:!text-[2.8rem]">
                            Let&apos;s get
                        </h1>
                    </div>
                    <div className="lg:text-[9rem] text-[5rem] md:text-[7rem] col-start-1 col-span-8 phone:col-span-7">
                        <h1 className="text-left uppercase font-bold largeTablet:!text-[7rem] largeTablet:leading-[1] tablet:!text-[5rem] phone:!text-[4rem] smallPhone:!text-[2.8rem]">
                            in touch!
                        </h1>
                    </div>
                </div>

                <div className="flex w-full justify-center">
                    <div>
                        {showSpotlight && <Spotlight className="-mt-[500px] -ml-[300px]" fill="white" />}
                        <p
                            ref={ref}
                            data-copy="true"
                            className="cursor-pointer md:text-6xl text-3xl sm:text-4xl underline w-fit text-primary-300"
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
