"use client";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { ReactNode, useEffect } from "react";
import SuspendedPostHogPageView from "./PageView";

export function PostHogProvider({ children }: { children: ReactNode }) {
    useEffect(() => {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
            person_profiles: "identified_only",
        });
    }, []);

    return (
        <PHProvider client={posthog}>
            <SuspendedPostHogPageView />
            {children}
        </PHProvider>
    );
}
