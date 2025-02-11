import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import { Badge } from "./badge";
import Link from "next/link";
import { BorderBeam } from "../magicui/border-beam";

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
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="w-full cursor-pointer mb-5">
                    <div className="flex justify-between mb-5">
                        <h3 className="text-[2rem] md:text-[1.3rem]">{company}</h3>
                        <h3 className="text-[2rem] md:text-[1.3rem]">{duration}</h3>
                    </div>
                    <hr className="bg-white" />
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
                <DialogDescription>
                    {description.map((d, i) => {
                        return <li key={i}>{d}</li>;
                    })}
                </DialogDescription>
                <DialogFooter className="flex-wrap">
                    {tags.map((d, i) => {
                        return (
                            <Badge variant="secondary" className="whitespace-nowrap" key={i}>
                                {d}
                            </Badge>
                        );
                    })}
                </DialogFooter>
                <BorderBeam duration={4} size={300} className="from-transparent via-primary-500 to-transparent" />
                <BorderBeam duration={4} delay={2} size={300} className="from-transparent via-white to-transparent" />
            </DialogContent>
        </Dialog>
    );
};

export default WorkAccordion;
