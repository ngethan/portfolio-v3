import https from "node:https";
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

function graphqlRequest(
	token: string,
	query: string,
): Promise<{ statusCode: number; data: string }> {
	return new Promise((resolve, reject) => {
		const postData = JSON.stringify({ query });
		const req = https.request(
			{
				hostname: "api.github.com",
				path: "/graphql",
				method: "POST",
				headers: {
					Authorization: `bearer ${token}`,
					"Content-Type": "application/json",
					"User-Agent": "portfolio-v3",
					"Content-Length": Buffer.byteLength(postData),
				},
			},
			(res) => {
				let data = "";
				res.on("data", (chunk) => {
					data += chunk;
				});
				res.on("end", () => {
					resolve({ statusCode: res.statusCode ?? 0, data });
				});
			},
		);
		req.on("error", reject);
		req.write(postData);
		req.end();
	});
}

export const fetchGitHubData = createServerFn({ method: "GET" }).handler(
	async (): Promise<GitHubData | null> => {
		const token = process.env.VITE_GITHUB_TOKEN || process.env.GITHUB_TOKEN;

		if (!token) {
			console.warn("GITHUB_TOKEN not set, using fallback data");
			return null;
		}

		try {
			const { statusCode, data } = await graphqlRequest(token, QUERY);
			const json = JSON.parse(data);

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
