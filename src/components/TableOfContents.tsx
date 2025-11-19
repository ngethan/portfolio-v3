interface Heading {
	id: string;
	text: string;
	level: number;
}

interface TableOfContentsProps {
	headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
		e.preventDefault();
		const element = document.getElementById(id);
		if (element) {
			const mainElement = document.querySelector("main");
			if (mainElement) {
				const offsetTop = element.offsetTop - 100;
				mainElement.scrollTo({
					top: offsetTop,
					behavior: "smooth",
				});
			}
		}
	};

	if (headings.length === 0) return null;

	return (
		<nav className="hidden md:block fixed left-24 top-48 w-48 max-h-[60vh] overflow-y-auto z-20">
			<ul className="space-y-2 text-sm">
				{headings.map((heading) => (
					<li key={heading.id}>
						<a
							href={`#${heading.id}`}
							onClick={(e) => handleClick(e, heading.id)}
							className="block text-muted-foreground hover:text-foreground transition-colors duration-200"
						>
							{heading.text}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
