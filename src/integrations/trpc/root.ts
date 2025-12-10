import { createTRPCRouter } from "./init";
import { chatRouter } from "./routers/chat";

export const trpcRouter = createTRPCRouter({
	chat: chatRouter,
});

export type TRPCRouter = typeof trpcRouter;
