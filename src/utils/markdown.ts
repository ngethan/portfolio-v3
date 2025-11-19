export interface Heading {
	id: string;
	text: string;
	level: number;
}

export function generateSlug(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");
}

export function extractHeadings(markdown: string): Heading[] {
	const headings: Heading[] = [];
	const lines = markdown.split("\n");

	for (const line of lines) {
		const match = line.match(/^(#{1,2})\s+(.+)$/);
		if (match) {
			const level = match[1].length;
			const text = match[2].trim();
			const id = generateSlug(text);
			headings.push({ id, text, level });
		}
	}

	return headings;
}
