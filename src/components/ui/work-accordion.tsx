"use client";

import React, { useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import { Badge } from "./badge";
import Link from "next/link";
import { BorderBeam } from "../magicui/border-beam";
import { useAccordionHover } from "../sections/Work";

const WorkAccordion = ({
    company,
    duration,
    title,
    description,
    tags,
    url,
}: {
    company: string;
    duration: string;
    title: string;
    description: string[];
    tags: string[];
    url?: string;
}) => {
    const circleRef = useRef<HTMLDivElement | null>(null);
    const mouseX = useRef(0);
    const mouseY = useRef(0);
    const { hoveredId, setHoveredId } = useAccordionHover();

    useEffect(() => {
        let animationFrameId: number;

        const updateCirclePosition = () => {
            if (circleRef.current) {
                circleRef.current.style.transform = `translate(${mouseX.current}px, ${mouseY.current}px)`;
            }
            animationFrameId = requestAnimationFrame(updateCirclePosition);
        };

        animationFrameId = requestAnimationFrame(updateCirclePosition);

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.current = e.clientX - rect.left - 50;
        mouseY.current = e.clientY - rect.top - 50;
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div
                    data-click-me="true"
                    className="w-full font-medium cursor-none pt-5 relative overflow-visible group transform transition-transform duration-200 hover:scale-105"
                    onMouseEnter={() => {
                        setHoveredId(company);
                    }}
                    onMouseLeave={() => {
                        setHoveredId(null);
                    }}
                    onMouseMove={handleMouseMove}
                >
                    <div
                        data-click-me="true"
                        className="absolute bottom-0 left-0 w-full h-0 bg-primary-700 transition-all duration-300 ease-out group-hover:h-full"
                    ></div>

                    <div
                        data-click-me="true"
                        className="relative z-10 transition-opacity duration-200"
                        style={{ opacity: hoveredId && hoveredId !== company ? 0.6 : 1 }}
                    >
                        <div data-click-me="true" className="flex justify-between mb-5">
                            <h3 data-click-me="true" className="text-[2rem] md:text-[1.3rem]">
                                {company}
                            </h3>
                            <h3 data-click-me="true" className="text-[2rem] md:text-[1.3rem]">
                                {duration}
                            </h3>
                        </div>
                        <hr data-click-me="true" className="bg-white" />
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {title} @{" "}
                        {url ? (
                            <Link className="text-primary-500 hover-animation-dark" href={url} target="_blank">
                                {company}
                            </Link>
                        ) : (
                            <span>{company}</span>
                        )}
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="space-y-3">
                    {description.map((d, i) => (
                        <li key={i}>{d}</li>
                    ))}
                </DialogDescription>
                <DialogFooter className="flex-wrap">
                    {tags.map((d, i) => (
                        <Badge variant="secondary" className="whitespace-nowrap" key={i}>
                            {d}
                        </Badge>
                    ))}
                </DialogFooter>
                <BorderBeam duration={4} size={300} className="from-transparent via-primary-500 to-transparent" />
                <BorderBeam duration={4} delay={2} size={300} className="from-transparent via-white to-transparent" />
            </DialogContent>
        </Dialog>
    );
};

export default WorkAccordion;
