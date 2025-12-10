import type { TRPCRouter } from "@/integrations/trpc/root";
import {
	createTRPCClient,
	httpBatchLink,
	httpSubscriptionLink,
	splitLink,
} from "@trpc/client";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import superjson from "superjson";

export const { TRPCProvider, useTRPC } = createTRPCContext<TRPCRouter>();

// Vanilla tRPC client for subscriptions
export const trpcClient = createTRPCClient<TRPCRouter>({
	links: [
		splitLink({
			condition: (op) => op.type === "subscription",
			true: httpSubscriptionLink({
				url: "/api/trpc",
				transformer: superjson,
			}),
			false: httpBatchLink({
				url: "/api/trpc",
				transformer: superjson,
			}),
		}),
	],
});
