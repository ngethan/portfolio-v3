"use client";

import React, { createContext, useContext, useState } from "react";

type CursorContextType = {
    copyState: boolean;
    setCopyState: (state: boolean) => void;
};

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider = ({ children }: { children: React.ReactNode }) => {
    const [copyState, setCopyState] = useState(false);
    return <CursorContext.Provider value={{ copyState, setCopyState }}>{children}</CursorContext.Provider>;
};

export const useCursor = () => {
    const context = useContext(CursorContext);
    if (!context) throw new Error("useCursor must be used within a CursorProvider");
    return context;
};
