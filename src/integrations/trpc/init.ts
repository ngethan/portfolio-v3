import { env } from "@/env";
import { initTRPC } from "@trpc/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import superjson from "superjson";
import { ZodError } from "zod";

// Initialize Redis and rate limiter only if configured
const redis =
	env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN
		? new Redis({
				url: env.UPSTASH_REDIS_REST_URL,
				token: env.UPSTASH_REDIS_REST_TOKEN,
			})
		: null;

// Rate limiter for chat: 20 requests per hour
const chatRateLimiter = redis
	? new Ratelimit({
			redis,
			limiter: Ratelimit.slidingWindow(20, "1 h"),
			prefix: "ratelimit:chat",
		})
	: null;

export const createContext = async (opts?: { headers?: Headers }) => {
	// Get client IP for rate limiting
	const ip =
		opts?.headers?.get("x-forwarded-for")?.split(",")[0] ||
		opts?.headers?.get("x-real-ip") ||
		"anonymous";

	return {
		ip,
	};
};

export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create({
	transformer: superjson,
	isServer: true,
	allowOutsideOfServer: true,
	errorFormatter: ({ shape, error }) => ({
		...shape,
		data: {
			...shape.data,
			zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
		},
	}),
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

// Subscription procedure for SSE
export const subscriptionProcedure = t.procedure;

// Rate limited procedure for chat
export const chatProcedure = t.procedure.use(async ({ ctx, next }) => {
	if (chatRateLimiter) {
		try {
			const { success, reset } = await chatRateLimiter.limit(ctx.ip);
			if (!success) {
				const resetIn = Math.ceil((reset - Date.now()) / 1000 / 60);
				throw new Error(
					`Rate limit exceeded. Try again in ${resetIn} minutes.`,
				);
			}
		} catch (err) {
			// If rate limiting fails (e.g., in development), log and continue
			console.warn("Rate limiting unavailable:", err);
		}
	}
	return next();
});
