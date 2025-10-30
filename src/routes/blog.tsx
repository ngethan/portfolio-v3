import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/blog")({
	component: Blog,
});

function Blog() {
	return <Outlet />;
}
