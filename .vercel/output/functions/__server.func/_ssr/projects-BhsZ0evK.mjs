import { r as __toESM } from "../_runtime.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { t as Reveal } from "./Reveal-PI6Wx8EV.mjs";
import { t as CtaBand } from "./routes-BkI25MED.mjs";
import { n as projects } from "./site-data-g9ShfZGD.mjs";
import { t as getProjectImages } from "./project-images-CTTRIKEj.mjs";
import { t as hero_4_default } from "./hero-4-CO9zgzUA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-BhsZ0evK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function pillClass(active) {
	return `eyebrow cursor-pointer border px-6 py-3 transition-all duration-300 ${active ? "border-sand bg-sand text-navy-deep" : "border-border text-muted-foreground hover:border-sand hover:text-sand"}`;
}
function ProjectsPage() {
	const years = (0, import_react.useMemo)(() => Array.from(new Set(projects.map((p) => p.year))).sort((a, b) => b - a), []);
	const [yearFilter, setYearFilter] = (0, import_react.useState)("all");
	const filtered = (0, import_react.useMemo)(() => yearFilter === "all" ? projects : projects.filter((p) => p.year === yearFilter), [yearFilter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "relative flex h-[62vh] min-h-[420px] items-end overflow-hidden bg-navy-deep",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: hero_4_default,
					alt: "Aerial view of a custom backyard pool",
					width: 1920,
					height: 1088,
					className: "absolute inset-0 h-full w-full object-cover opacity-80"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "veil absolute inset-0" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto w-full max-w-[1600px] px-6 pb-16 lg:px-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow text-sand",
						children: "Selected work"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-5 font-display text-5xl text-offwhite md:text-7xl",
						children: "Projects"
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-[1600px] px-6 py-24 lg:px-12 lg:py-32",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				className: "flex flex-wrap items-center justify-between gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setYearFilter("all"),
						className: pillClass(yearFilter === "all"),
						children: "All"
					}), years.map((year) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setYearFilter(year),
						className: pillClass(yearFilter === year),
						children: year
					}, year))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "eyebrow text-muted-foreground",
					children: [
						filtered.length,
						" project",
						filtered.length === 1 ? "" : "s"
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3",
				children: filtered.map((project, i) => {
					const hero = getProjectImages(project.slug)[0];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i % 3 * 100,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/projects/$slug",
							params: { slug: project.slug },
							className: "surface-3d group relative block aspect-[3/4] overflow-hidden bg-navy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-4",
							children: [
								hero && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: hero,
									alt: project.title,
									loading: "lazy",
									className: "absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "veil absolute inset-0 opacity-90 transition-opacity duration-500 group-hover:opacity-100" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "eyebrow absolute left-6 top-6 text-offwhite/70",
									children: String(i + 1).padStart(2, "0")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute inset-x-0 bottom-0 p-6 lg:p-8",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "eyebrow text-sand",
											children: [
												project.year,
												" · ",
												project.place
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-3 font-display text-3xl text-offwhite lg:text-4xl",
											children: project.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 max-w-xs text-sm leading-relaxed text-silver line-clamp-2",
											children: project.scope
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "eyebrow mt-6 inline-flex items-center gap-2 text-offwhite/60 opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100",
											children: ["View project ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
												className: "h-4 w-4",
												strokeWidth: 1.4
											})]
										})
									]
								})
							]
						})
					}, project.slug);
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {})
	] });
}
//#endregion
export { ProjectsPage as component };
