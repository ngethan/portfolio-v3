const rawSiteUrl = (
	import.meta.env.VITE_SITE_URL as string | undefined
)?.replace(/\/$/, "");

const resolveRuntimeOrigin = () => {
	if (typeof document !== "undefined" && document.location?.origin) {
		return document.location.origin;
	}

	if (typeof window !== "undefined" && window.location?.origin) {
		return window.location.origin;
	}

	if (
		typeof globalThis !== "undefined" &&
		(globalThis as typeof globalThis & { location?: { origin: string } })
			.location?.origin
	) {
		return (globalThis as typeof globalThis & { location: { origin: string } })
			.location.origin;
	}

	return "";
};

const getBaseUrl = () => rawSiteUrl ?? resolveRuntimeOrigin() ?? "";

export const siteConfig = {
	name: "Ethan Ng",
	shortName: "Ethan Ng",
	description:
		"Passionate builder and WashU CS & finance student obsessed with learning, exploring new tech, and turning ideas into reality.",
	url: getBaseUrl(),
	twitterHandle: "@ethn_ng",
	defaultOgImagePath: "/og.png",
	locale: "en_US",
};

const ensureLeadingSlash = (path: string) =>
	path.startsWith("/") ? path : `/${path}`;

export const buildCanonicalUrl = (path = "/") => {
	const withSlash = ensureLeadingSlash(path);
	const trimmed =
		withSlash.length > 1 ? withSlash.replace(/\/+$/, "") : withSlash;
	const baseUrl = getBaseUrl();

	if (!baseUrl) {
		return trimmed;
	}

	return trimmed === "/" ? `${baseUrl}/` : `${baseUrl}${trimmed}`;
};

export const toAbsoluteUrl = (maybeRelative: string) => {
	if (!maybeRelative) {
		return buildCanonicalUrl("/");
	}

	if (/^https?:\/\//i.test(maybeRelative)) {
		return maybeRelative;
	}

	const baseUrl = getBaseUrl();

	if (!baseUrl) {
		return ensureLeadingSlash(maybeRelative);
	}

	return `${baseUrl}${ensureLeadingSlash(maybeRelative)}`;
};

type SeoInput = {
	title: string;
	description: string;
	path?: string;
	imagePath?: string;
	robots?: string;
};

export const buildSeoTags = ({
	title,
	description,
	path = "/",
	imagePath,
	robots = "index, follow",
}: SeoInput) => {
	const canonical = buildCanonicalUrl(path);
	const image = toAbsoluteUrl(imagePath ?? siteConfig.defaultOgImagePath);

	return {
		meta: [
			{
				title,
			},
			{
				name: "description",
				content: description,
			},
			{
				name: "robots",
				content: robots,
			},
			{
				property: "og:title",
				content: title,
			},
			{
				property: "og:description",
				content: description,
			},
			{
				property: "og:type",
				content: "website",
			},
			{
				property: "og:url",
				content: canonical,
			},
			{
				property: "og:image",
				content: image,
			},
			{
				property: "og:locale",
				content: siteConfig.locale,
			},
			{
				property: "og:site_name",
				content: siteConfig.name,
			},
			{
				name: "twitter:card",
				content: "summary_large_image",
			},
			{
				name: "twitter:title",
				content: title,
			},
			{
				name: "twitter:description",
				content: description,
			},
			{
				name: "twitter:image",
				content: image,
			},
			{
				name: "twitter:site",
				content: siteConfig.twitterHandle,
			},
			{
				name: "twitter:creator",
				content: siteConfig.twitterHandle,
			},
		],
		links: [
			{
				rel: "canonical",
				href: canonical,
			},
			{
				rel: "alternate",
				href: canonical,
				hrefLang: "en",
			},
		],
	};
};
