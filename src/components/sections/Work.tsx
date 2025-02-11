import React from "react";
import WorkAccordion from "../ui/work-accordion";
import work from "@/lib/work";

const Work = () => {
    return (
        <div className="bg-black text-white w-full pb-10">
            <div className="mx-[1rem]">
                <div className="relative grid grid-cols-8">
                    <div className="lg:text-[9rem] text-[5rem] md:text-[7rem] col-span-8 text-center flex justify-left items-center">
                        <h1 className="text-left uppercase font-bold largeTablet:!text-[7rem] largeTablet:leading-[1] tablet:!text-[5rem] phone:!text-[4rem] smallPhone:!text-[2.8rem]"></h1>
                    </div>
                    <h1 className="lg:text-[9rem] text-[5rem] md:text-[7rem] col-start-2 col-span-8 phone:col-start-2 phone:col-span-7">
                        <h1 className="text-left uppercase font-bold largeTablet:!text-[7rem] largeTablet:leading-[1] tablet:!text-[5rem] phone:!text-[4rem] smallPhone:!text-[2.8rem]"></h1>
                    </h1>
                </div>

                <div className="flex md:justify-between md:flex-row flex-col md:w-[80vw] lg:w-[70vw] w-[95vw]">
                    <div className="md:py-0 py-6 text-md space-x-6 flex">
                        <p>2.</p> <p className="uppercase">Work</p>
                    </div>

                    <p className="md:w-[55vw] font-medium w-full lg:w-[50vw] text-lg">
                        {work.map((w) => {
                            return (
                                <WorkAccordion
                                    key={w.company}
                                    company={w.company}
                                    title={w.title}
                                    duration={w.duration}
                                    description={w.description}
                                    tags={w.tags}
                                    url={w.url}
                                />
                            );
                        })}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Work;
