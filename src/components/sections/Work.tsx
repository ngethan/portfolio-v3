"use client";

import React, { useState, createContext, useContext, useEffect } from "react";
import WorkAccordion from "../ui/work-accordion";
import work from "@/lib/work";
import { motion, useAnimation } from "motion/react";
import { useInView } from "react-intersection-observer";

type AccordionHoverContextType = {
    hoveredId: string | null;
    setHoveredId: (id: string | null) => void;
};

const AccordionHoverContext = createContext<AccordionHoverContextType>({
    hoveredId: null,
    setHoveredId: () => {},
});

export const useAccordionHover = () => useContext(AccordionHoverContext);

export const AccordionHoverProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    return <AccordionHoverContext.Provider value={{ hoveredId, setHoveredId }}>{children}</AccordionHoverContext.Provider>;
};

const Work = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.5 });
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
                staggerChildren: 0.07,
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
        <AccordionHoverProvider>
            <motion.div
                className="bg-black text-white w-full pb-10 mb-40"
                id="work"
                initial="hidden"
                animate={controls}
                variants={list}
                ref={ref}
            >
                <div className="mx-[1rem]">
                    <div className="flex md:justify-between md:flex-row flex-col md:w-[80vw] lg:w-[75vw] w-[95vw]">
                        <motion.div variants={item} className="md:py-0 py-6 text-md space-x-6 flex font-bold">
                            <p>2.</p> <p className="uppercase">Work</p>
                        </motion.div>

                        <div className="md:w-[55vw] font-medium w-full lg:w-[50vw] text-lg">
                            {work.map((w) => (
                                <WorkAccordion
                                    key={w.company}
                                    company={w.company}
                                    title={w.title}
                                    duration={w.duration}
                                    description={w.description}
                                    tags={w.tags}
                                    url={w.url}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </AccordionHoverProvider>
    );
};

export default Work;
