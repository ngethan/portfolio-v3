import { createServerFn } from "@tanstack/react-start";

export interface ContributionDay {
	contributionCount: number;
	date: string;
}

export interface ContributionWeek {
	contributionDays: ContributionDay[];
}

export interface GitHubData {
	totalContributions: number;
	weeks: ContributionWeek[];
}

const QUERY = `
query {
  user(login: "ngethan") {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
          }
        }
      }
    }
  }
}
`;

export const fetchGitHubData = createServerFn({ method: "GET" }).handler(
	async (): Promise<GitHubData | null> => {
		const { request } = await import("undici");
		const token = process.env.VITE_GITHUB_TOKEN || process.env.GITHUB_TOKEN;

		if (!token) {
			console.warn("GITHUB_TOKEN not set, using fallback data");
			return null;
		}

		try {
			const { statusCode, body } = await request(
				"https://api.github.com/graphql",
				{
					method: "POST",
					headers: {
						Authorization: `bearer ${token}`,
						"Content-Type": "application/json",
						"User-Agent": "portfolio-v3",
					},
					body: JSON.stringify({ query: QUERY }),
				},
			);

			// biome-ignore lint/suspicious/noExplicitAny: GitHub API response
			const json = (await body.json()) as any;

			if (statusCode !== 200 || json.errors) {
				console.error("GitHub API error:", statusCode, json.errors);
				return null;
			}

			const calendar =
				json.data.user.contributionsCollection.contributionCalendar;

			return {
				totalContributions: calendar.totalContributions,
				weeks: calendar.weeks,
			};
		} catch (error) {
			console.error("Failed to fetch GitHub data:", error);
			return null;
		}
	},
);
