"use client";

import React from "react";
import Laptop from "../glbs/laptop";

const Projects = () => {
    return (
        <div className="bg-black text-white w-full mb-[25rem]" id="projects">
            <div className="mx-[1rem]">
                <div className="relative grid grid-cols-8 pb-14">
                    <div className="lg:text-[9rem] text-[5rem] md:text-[7rem] col-span-8 text-center flex justify-left items-center">
                        <h1 className="mr-20 text-left uppercase font-bold largeTablet:!text-[7rem] largeTablet:leading-[1] tablet:!text-[5rem] phone:!text-[4rem] smallPhone:!text-[2.8rem]">
                            Projects
                        </h1>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute right-0 top-1/2 transform -translate-y-[40%] md:-translate-y-[40%]">
                        <Laptop />
                    </div>
                </div>

                <p>oops wip</p>
            </div>
        </div>
    );
};

export default Projects;
