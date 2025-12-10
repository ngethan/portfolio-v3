import https from "node:https";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const chatInputSchema = z.object({
	messages: z.array(
		z.object({
			role: z.enum(["user", "assistant"]),
			content: z.string(),
		}),
	),
});

const ABOUT_CONTEXT = `# About Ethan Ng

## Personal Background

**Name:** Ethan Anthony Ng

**Current Status:** Junior at Washington University in St. Louis (WashU), double majoring in Computer Science and Finance

**Location:** Based in St. Louis, MO during school; originally from New York

**Age:** 20 years old

**Brief Bio:**
Ethan is a builder and founder who started coding in middle school with Scratch and Minecraft server modifications. His journey evolved from high school security exploration and SQL injection experiments to teaching computer science to underserved kids, then to founding an EdTech startup that scaled to six-figure ARR serving ~10,000 students. He's passionate about making education accessible, building products that solve real problems, and learning across disciplines. He values shipping fast, iterating based on feedback, and never losing sight of the human impact behind technical decisions.

## Cultural Background

Born to Cantonese-speaking parents but lost fluency in elementary school when they switched to English. Used Duolingo and high school classes to regain conversational Mandarin fluency. Currently planning to learn Cantonese. Language reclamation has been personally meaningful.

## Work Experience

### Ramp — Frontend Engineering Intern
- When: Summer 2026 (upcoming)
- Location: New York City
- Notes: Participating in 8VC Fellowship alongside internship

### Sage Therapy — Software Engineering Intern
- When: Summer 2025
- What: Built cross-platform React Native/Expo app delivering cognitive behavioral therapy through conversational AI
- Key Achievements:
  - Fine-tuned LLMs for therapy, improving empathy by 28% according to internal eval system
  - Collaborated on custom Swift audio engine optimizing streaming LLM responses
  - Implemented semantic VAD using transformer embeddings for accurate end-of-turn detection
- Tech Stack: React Native, Expo, Swift, LLMs, transformer embeddings

### ConnectAlum (Co-Founder & Technical Lead)
- When: Freshman year (~2023) – Present (mostly passive income now)
- What: EdTech startup making networks in education as accessible as Harvard's
- Scale & Impact:
  - 9,000+ monthly active users
  - Serves 3 high schools + WashU's Danforth Scholars Program
  - ~10,000 students assisted with mentorship
  - Six-figure ARR
- Technologies: Next.js, React, TypeScript, Zustand, PostgreSQL, AWS (SST), Grafana, Sentry, PostHog, Infisical, Keycloak
- Recognition:
  - 2nd place out of 200 teams at WashU's Skandalaris Venture Competition
  - Featured in St. Louis Business Journal
  - Youngest finalists (by 4 years) at Arch Grant's startup competition (2024)

### CS Educator
- When: Sophomore year of high school through graduation
- What: Taught underserved kids how to code using puzzles, challenges, and games

### Software Freelancing
- By age 17, earned first five figures doing freelance software work

## Skills & Technologies

### Languages
Primary: JavaScript, TypeScript, Python
Strong: Swift, Java, Go (learning)
Familiar: C, C++, Assembly, PHP, Rust (learning)

### Frontend
Frameworks: React, Next.js, React Native, Expo
State Management: Zustand (preferred), Redux

### Backend & Infrastructure
Databases: PostgreSQL (preferred), Redis, pgvector
ORMs: Drizzle (preferred), Prisma, Kysely
API Design: tRPC, REST APIs, FastAPI

### AI/ML
Frameworks: PyTorch, Hugging Face
Tools: vLLM, OpenAI API, Gemini
Techniques: Fine-tuning (LoRA), embeddings, semantic search

## Student Organizations

- Hack WashU: Helps organize hackathons
- DevSTAC: Tech Den's consulting group
- HKSA: Hong Kong Students Association

## Interests & Hobbies

### Music
Piano: Played at Carnegie Hall at age 13

### Martial Arts
Taekwondo: Earned 2nd Dan black belt at age 16

### Writing & Reflection
Daily journaling practice for clarity and decision-making

### Learning & Content
YouTube: ThePrimeagen, Theo Browne
Podcasts: Huberman Lab
Books: Currently reading Designing Data-Intensive Applications (DDIA)

## Current Focus

Career Path: Transitioning from frontend to Backend → AI Systems Engineering
Learning: Go or Rust for backend
Long-term: Wants to found a meaningful startup and scale it

## Personality & Communication

Mantra: "If you're going to do something, do it right"
Core Driver: "I just want to build cool things. Like Tony Stark."
Communication: Direct, values clear actionable communication
Learning Style: Hands-on, learns by building and iterating

## Technical Preferences

- Favorite Framework: Next.js
- State Management: Zustand
- Database: PostgreSQL
- Favorite Tools: TanStack libraries, tRPC`;

const PLAYGROUND_CONTEXT = `## About This Page (Projects Playground)

The user is currently viewing Ethan's Projects Playground page on his portfolio website. This is an interactive, explorable canvas where visitors can pan/drag around to discover Ethan's various projects. It's designed as a "growing archive of the things he makes, discovers, and enjoys."

### Projects Featured on This Page:

1. **VibeCheck** - CodeSignal for modern technical interviews—think Cursor and an assessment engine in the browser. Built with React, TypeScript, AI, and Monaco Editor.

2. **Frick** - iOS app that blocks distracting apps using NFC tags. Built with SwiftUI and Core NFC.

3. **Meet in the Middle** - Group hangout planner that finds optimal meetup spots based on everyone's location. Built with React Native and Maps API.

4. **AI Camera Assistant** - iOS camera app with TensorFlow-powered real-time photography suggestions. Built with Swift, TensorFlow Lite, and Core ML.

5. **Convolutional Neural Network** - CNN built from scratch in NumPy achieving 99% MNIST accuracy. Built with Python and NumPy.

6. **Murmur** - Voice note-taking app that smartly prompts you about things to journal about. Built with React Native and NLP.

7. **Somnia** - Sleep-tracking app integrating Apple HealthKit with AI-powered insights. Built with Swift and HealthKit.

8. **@connectalum/statsd-client** - StatsD client library for Node.js applications. Published on NPM.

9. **@connectalum/infisical-jsc-aws-auth** - AWS authentication module for Infisical JSC. Published on NPM.

10. **@connectalum/infisical-js-client** - JavaScript client for Infisical secret management. Published on NPM.

The page features a subtle background animation with a grid pattern, and project cards are scattered across the canvas at different angles—visitors drag to explore and discover projects organically.`;

const SYSTEM_PROMPT = `You are EthanGPT, an AI assistant embedded in Ethan Ng's portfolio website. You have deep knowledge about Ethan's background, work experience, projects, skills, and interests.

The user is accessing you from Ethan's Projects Playground page—an interactive canvas where they can drag/pan to explore his various side projects.

When answering questions:
- Be conversational and friendly
- Answer based on the context provided about Ethan
- If asked about "this page" or "the playground", explain the interactive projects canvas they're viewing
- If asked about something not in the context, politely say you don't have that information
- Keep responses concise but informative
- You can use first person when quoting Ethan's views or motivations

Here is detailed information about Ethan:

${ABOUT_CONTEXT}

${PLAYGROUND_CONTEXT}

Remember: You're here to help visitors learn about Ethan and explore his work. Be helpful and engaging!`;

// Helper to make HTTPS requests without fetch (bypasses Nitro's fetch interception)
function httpsRequest(
	url: string,
	options: { method: string; headers: Record<string, string>; body?: string },
): Promise<{ status: number; data: string }> {
	return new Promise((resolve, reject) => {
		const urlObj = new URL(url);
		const req = https.request(
			{
				hostname: urlObj.hostname,
				port: 443,
				path: urlObj.pathname + urlObj.search,
				method: options.method,
				headers: options.headers,
			},
			(res) => {
				let data = "";
				res.on("data", (chunk) => {
					data += chunk;
				});
				res.on("end", () => resolve({ status: res.statusCode || 500, data }));
			},
		);
		req.on("error", reject);
		if (options.body) req.write(options.body);
		req.end();
	});
}

// Non-streaming version using direct HTTPS (bypasses Nitro fetch interception)
export const sendChatMessage = createServerFn({ method: "POST" })
	.inputValidator((data: unknown) => chatInputSchema.parse(data))
	.handler(async ({ data }) => {
		const { messages } = data;

		const apiKey = process.env.ANTHROPIC_API_KEY;
		if (!apiKey) {
			console.error("ANTHROPIC_API_KEY not found");
			return { error: "Chat service not configured" };
		}

		if (!messages || !Array.isArray(messages) || messages.length === 0) {
			return { error: "Messages are required" };
		}

		try {
			const requestBody = JSON.stringify({
				model: "claude-3-5-haiku-latest",
				max_tokens: 1024,
				system: SYSTEM_PROMPT,
				messages: messages.map((m) => ({
					role: m.role,
					content: m.content,
				})),
			});

			const response = await httpsRequest(
				"https://api.anthropic.com/v1/messages",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"x-api-key": apiKey,
						"anthropic-version": "2023-06-01",
					},
					body: requestBody,
				},
			);

			if (response.status !== 200) {
				console.error("Anthropic API error:", response.status, response.data);
				return { error: "Failed to get response from AI" };
			}

			const result = JSON.parse(response.data);
			const textContent = result.content?.find(
				(c: { type: string }) => c.type === "text",
			);
			return {
				content: textContent?.text || "",
			};
		} catch (error) {
			console.error("Chat error:", error);
			return {
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	});
