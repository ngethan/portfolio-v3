import type { TRPCRouter } from "@/integrations/trpc/root";
import { createTRPCContext } from "@trpc/tanstack-react-query";

export const { TRPCProvider, useTRPC } = createTRPCContext<TRPCRouter>();

// Re-export trpcClient from root-provider (single source of truth)
export { trpcClient } from "@/integrations/tanstack-query/root-provider";
