"use client";

import React, { useState, createContext, useContext } from "react";
import WorkAccordion from "../ui/work-accordion";
import work from "@/lib/work";

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
    return (
        <AccordionHoverProvider>
            <div className="bg-black text-white w-full pb-10 mb-40" id="work">
                <div className="mx-[1rem]">
                    <div className="flex md:justify-between md:flex-row flex-col md:w-[80vw] lg:w-[75vw] w-[95vw]">
                        <div className="md:py-0 py-6 text-md space-x-6 flex">
                            <p>2.</p> <p className="uppercase">Work</p>
                        </div>

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
            </div>
        </AccordionHoverProvider>
    );
};

export default Work;
