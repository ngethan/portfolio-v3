import https from "node:https";
import { env } from "@/env";
import { z } from "zod";
import { chatProcedure, createTRPCRouter } from "../init";

const ABOUT_CONTEXT = `Junior at WashU, CS + Finance. From NYC.

Work: Ramp (Summer 2026), Sage Therapy (Summer 2025 - React Native therapy app, fine-tuned LLMs), ConnectAlum (co-founder, EdTech, 9k+ MAU, six-figure ARR).

Skills: React, Next.js, React Native, TypeScript, PostgreSQL, Redis, tRPC, PyTorch, fine-tuning.

Notable: Carnegie Hall pianist at 13, 2nd Dan black belt at 16, taught CS to underserved kids, first $10k freelancing by 17.`;

const PLAYGROUND_CONTEXT =
	"This page is an interactive projects playground - drag to explore project cards. Projects: VibeCheck (AI interviews), Frick (iOS focus app), Meet in the Middle, CNN from scratch (99% MNIST), Murmur (voice journaling), Somnia (sleep tracking), NPM packages.";

const SYSTEM_PROMPT = `You ARE Ethan - respond in first person. Keep it short, 1-2 sentences. Casual but not over-the-top. No emojis. Occasional ! is fine but don't overdo it.

${ABOUT_CONTEXT}

${PLAYGROUND_CONTEXT}`;

const messageSchema = z.object({
	role: z.enum(["user", "assistant"]),
	content: z.string(),
});

// Helper to make streaming request to OpenRouter (OpenAI-compatible API)
async function* streamOpenRouterResponse(
	messages: z.infer<typeof messageSchema>[],
): AsyncGenerator<string> {
	const apiKey = env.OPENROUTER_API_KEY;

	const requestBody = JSON.stringify({
		model: "openai/gpt-4o-mini",
		max_tokens: 256,
		stream: true,
		messages: [
			{ role: "system", content: SYSTEM_PROMPT },
			...messages.map((m) => ({
				role: m.role,
				content: m.content,
			})),
		],
	});

	const response = await new Promise<{
		stream: AsyncIterable<Buffer>;
	}>((resolve, reject) => {
		const req = https.request(
			{
				hostname: "openrouter.ai",
				port: 443,
				path: "/api/v1/chat/completions",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${apiKey}`,
				},
			},
			(res) => {
				resolve({
					stream: (async function* () {
						for await (const chunk of res) {
							yield chunk as Buffer;
						}
					})(),
				});
			},
		);

		req.on("error", reject);
		req.write(requestBody);
		req.end();
	});

	let buffer = "";

	for await (const chunk of response.stream) {
		buffer += chunk.toString();
		const lines = buffer.split("\n");
		buffer = lines.pop() || "";

		for (const line of lines) {
			if (line.startsWith("data: ")) {
				const data = line.slice(6);
				if (data === "[DONE]") return;

				try {
					const parsed = JSON.parse(data);
					const content = parsed.choices?.[0]?.delta?.content;
					if (content) {
						yield content;
					}
					if (parsed.choices?.[0]?.finish_reason === "stop") {
						return;
					}
				} catch {
					// Skip unparseable lines
				}
			}
		}
	}
}

export const chatRouter = createTRPCRouter({
	// SSE subscription for streaming chat
	stream: chatProcedure
		.input(
			z.object({
				messages: z.array(messageSchema),
			}),
		)
		.subscription(async function* ({ input }) {
			for await (const text of streamOpenRouterResponse(input.messages)) {
				yield text;
			}
		}),
});
