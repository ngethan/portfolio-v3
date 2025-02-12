"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { LuMaximize2 } from "react-icons/lu";
import { LuCopy } from "react-icons/lu";
import { useCursor } from "@/context/CursorContext";
import { LuCheck } from "react-icons/lu";

const Cursor = () => {
    const defaultSize = 13;
    const expandedSize = 112;

    const cursorRef = useRef<HTMLDivElement | null>(null);
    const { copyState } = useCursor();
    const [isHovering, setIsHovering] = useState(false);
    const [clickMe, setClickMe] = useState(false);
    const [copy, setCopy] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothX = useSpring(mouseX, { stiffness: 500, damping: 50 });
    const smoothY = useSpring(mouseY, { stiffness: 500, damping: 50 });

    useEffect(() => {
        const mouseMoveEvent = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
            setIsHovering(
                (hoveredElement?.hasAttribute("data-click-me") || hoveredElement?.hasAttribute("data-copy")) ?? false
            );
            setClickMe(hoveredElement?.hasAttribute("data-click-me") ?? false);
            setCopy(hoveredElement?.hasAttribute("data-copy") ?? false);
        };

        document.addEventListener("mousemove", mouseMoveEvent);
        return () => document.removeEventListener("mousemove", mouseMoveEvent);
    }, [mouseX, mouseY]);

    return (
        <div id="cursor-container" className="fixed top-0 left-0 w-full h-full pointer-events-none z-[999]">
            <motion.div
                ref={cursorRef}
                className="absolute rounded-full flex items-center justify-center"
                style={{
                    left: smoothX,
                    top: smoothY,
                    transform: "translate(-50%, -50%)",
                }}
                animate={{
                    width: isHovering ? expandedSize : defaultSize,
                    height: isHovering ? expandedSize : defaultSize,
                    backgroundColor: isHovering ? "#ffffff" : "#fb7185",
                    opacity: isHovering ? 0.9 : 1,
                    mixBlendMode: isHovering ? "difference" : "normal",
                    transition: {
                        duration: 0.3,
                        ease: "easeOut",
                    },
                }}
            >
                {clickMe && (
                    <motion.span
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="font-bold flex gap-2 items-center"
                        style={{
                            fontSize: `${Math.max(0.8, expandedSize * 0.008)}rem`,
                            whiteSpace: "nowrap",
                        }}
                    >
                        CLICK ME <LuMaximize2 style={{ fontSize: "1.2em" }} />
                    </motion.span>
                )}
                {copy && (
                    <motion.span
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="font-bold flex gap-2 items-center"
                        style={{
                            fontSize: `${Math.max(0.8, expandedSize * 0.008)}rem`,
                            whiteSpace: "nowrap",
                        }}
                    >
                        {!copyState ? "COPY" : "COPIED"}{" "}
                        {!copyState ? <LuCopy style={{ fontSize: "1.2em" }} /> : <LuCheck style={{ fontSize: "1.2em" }} />}
                    </motion.span>
                )}
            </motion.div>
        </div>
    );
};

export default Cursor;
