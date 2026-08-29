import { c as lazyRouteComponent, l as createFileRoute, p as notFound } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as pageMeta } from "./_ssr/routes-BkI25MED.mjs";
import { n as projects } from "./_ssr/site-data-g9ShfZGD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-Ccbm_AGM.js
var $$splitNotFoundComponentImporter = () => import("./_slug-BoPFIozX.mjs");
var $$splitComponentImporter = () => import("./_slug-CDN0GrhF.mjs");
function findProject(slug) {
	return projects.find((p) => p.slug === slug);
}
var Route = createFileRoute("/projects/$slug")({
	loader: ({ params }) => {
		const project = findProject(params.slug);
		if (!project) throw notFound();
		return project;
	},
	head: ({ params }) => {
		const project = findProject(params.slug);
		if (!project) return pageMeta({
			title: "Project Not Found — SJ Pools & Landscaping",
			description: "This project could not be found.",
			path: `/projects/${params.slug}`,
			image: "/og/projects.jpg"
		});
		return pageMeta({
			title: `${project.title} | Custom Backyard Project — SJ Pools & Landscaping`,
			description: `${project.scope}. A custom outdoor living project by SJ Pools & Landscaping in ${project.place}.`,
			path: `/projects/${project.slug}`,
			image: "/og/projects.jpg"
		});
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
//#endregion
export { Route as t };
