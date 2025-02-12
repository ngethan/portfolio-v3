"use client";

import React from "react";
import { Marquee } from "../magicui/marquee";

const skills = [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "PHP",
    "C",
    "C++",
    "Dart",
    "Swift",
    "SQL",
    "React.js",
    "Next.js",
    "React Native",
    "Flutter",
    "MongoDB",
    "TailwindCSS",
    "ExpressJS",
    "Git",
    "AWS",
    "Linux",
    "Docker",
    "Kubernetes",
    "Google Cloud",
    "Azure",
];
const Skills = () => {
    return (
        <div className="bg-white text-black pb-10 pt-6 mb-40">
            <div className="w-full flex justify-center">
                <div className="sm:w-[50vw] w-[40vw]">
                    <h1>Skills</h1>
                    <hr className="bg-black h-1" />
                </div>
            </div>
            <Marquee pauseOnHover className="[--duration:50s] py-5 duration-300 hover:bg-black hover:text-white">
                {skills.map((s, i) => (
                    <span key={i} className="mx-5 relative text-5xl font-medium inline-block">
                        <span className="relative z-10 animate-highlight">{s}</span>
                    </span>
                ))}
            </Marquee>
            <div className="w-full flex justify-center">
                <div className="sm:w-[50vw] w-[40vw]">
                    <hr className="bg-black h-1" />
                </div>
            </div>
        </div>
    );
};

export default Skills;
