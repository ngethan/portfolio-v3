import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		OPENROUTER_API_KEY: z.string(),
		UPSTASH_REDIS_REST_URL: z.string().url().optional(),
		UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
	},

	clientPrefix: "VITE_",

	client: {},

	runtimeEnv: {
		OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
		UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
		UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
	},

	emptyStringAsUndefined: true,
});
