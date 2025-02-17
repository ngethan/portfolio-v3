"use client";

import React from "react";
import { Marquee } from "../magicui/marquee";

const languages = ["JavaScript", "TypeScript", "Python", "Java", "PHP", "C", "C++", "Go", "Dart", "Swift", "SQL", "Assembly"];

const technologies = [
    "React.js",
    "Next.js",
    "React Native",
    "Flutter",
    "MongoDB",
    "TailwindCSS",
    "Git",
    "AWS",
    "Linux",
    "Docker",
    "Kubernetes",
    "Azure",
];

const Skills = () => {
    return (
        <div className="bg-white text-black pb-10 pt-6 mb-40">
            <div className="w-full flex justify-center">
                <div className="sm:w-[50vw] w-[40vw]">
                    <h1>Languages</h1>
                    <hr className="bg-black h-1" />
                </div>
            </div>
            <Marquee pauseOnHover className="[--duration:50s] py-5 duration-300 hover:bg-black hover:text-white">
                {languages.map((s, i) => (
                    <span key={i} className="mx-5 relative text-5xl font-medium inline-block">
                        <span className="relative z-10 animate-highlight">{s}</span>
                    </span>
                ))}
            </Marquee>
            <Marquee pauseOnHover reverse className="[--duration:50s] py-5 duration-300 hover:bg-black hover:text-white">
                {technologies.map((s, i) => (
                    <span key={i} className="mx-5 relative text-5xl font-medium inline-block">
                        <span className="relative z-10 animate-highlight">{s}</span>
                    </span>
                ))}
            </Marquee>
            <div className="w-full flex justify-center">
                <div className="sm:w-[50vw] w-[40vw] float-right">
                    <hr className="bg-black h-1" />
                    <h1 className="text-right">Technologies</h1>
                </div>
            </div>
        </div>
    );
};

export default Skills;
