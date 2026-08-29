import { r as __toESM } from "../_runtime.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { c as lazyRouteComponent, d as Link, f as useRouter, i as HeadContent, l as createFileRoute, o as createRouter, r as Scripts, s as Outlet, u as createRootRouteWithContext } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Menu, t as X } from "../_libs/lucide-react.mjs";
import { a as pageMeta, i as localBusinessSchema, n as Route$7, r as SITE_NAME } from "./routes-BkI25MED.mjs";
import { t as Route$8 } from "../_slug-Ccbm_AGM.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Disj4aVW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-5d9A_EBj.css";
var sj_landscaping_pools_logo_03_default = "/assets/sj-landscaping-pools-logo-03-Co3BjT9E.png";
var nav = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/services",
		label: "Services"
	},
	{
		to: "/projects",
		label: "Projects"
	},
	{
		to: "/about",
		label: "About Us"
	},
	{
		to: "/blog",
		label: "Blog"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function SiteHeader() {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: `fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-navy-deep/90 py-3 backdrop-blur-xl" : "bg-transparent py-6"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-[1600px] items-center justify-between px-6 lg:px-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "flex items-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: sj_landscaping_pools_logo_03_default,
						alt: "SJ Pools & Landscaping",
						className: "h-14 w-auto"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden items-center gap-6 xl:gap-9 lg:flex",
					children: [nav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: n.to,
						activeOptions: { exact: n.to === "/" },
						activeProps: { className: "text-sand" },
						className: "link-underline eyebrow text-offwhite/85 transition-colors hover:text-sand",
						children: n.label
					}, n.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						className: "eyebrow border border-offwhite/40 px-6 py-3 text-offwhite transition-all duration-500 hover:border-sand hover:bg-sand hover:text-navy-deep",
						children: "Get a Quote"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"aria-label": "Toggle menu",
					onClick: () => setOpen((v) => !v),
					className: "text-offwhite lg:hidden",
					children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-6 w-6" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-6 w-6" })
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-navy-deep/97 mt-3 border-t border-offwhite/10 backdrop-blur-xl lg:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col px-6 py-6",
				children: nav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: n.to,
					onClick: () => setOpen(false),
					className: "eyebrow border-b border-offwhite/10 py-4 text-offwhite/85",
					children: n.label
				}, n.to))
			})
		})]
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "bg-navy-deep text-offwhite",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-[1600px] gap-12 px-6 py-20 lg:grid-cols-4 lg:px-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: sj_landscaping_pools_logo_03_default,
					alt: "SJ Pools & Landscaping",
					className: "h-14 w-auto"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-xs text-sm leading-relaxed text-silver",
					children: "SJ Pools & Landscaping is an award-winning outdoor living design-build firm creating custom pools, landscapes and complete outdoor environments throughout North and Central New Jersey and select areas of New York."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "eyebrow text-sand",
					children: "Navigate"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-5 space-y-3 text-sm text-silver",
					children: [
						[
							{
								to: "/",
								label: "Home"
							},
							{
								to: "/services",
								label: "Services"
							},
							{
								to: "/projects",
								label: "Projects"
							},
							{
								to: "/about",
								label: "About Us"
							}
						].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: l.to,
							className: "link-underline hover:text-sand",
							children: l.label
						}) }, l.to)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/blog",
							className: "link-underline hover:text-sand",
							children: "Blog"
						}) }),
						[{
							to: "/contact",
							label: "Get a Quote"
						}, {
							to: "/contact",
							label: "Contact"
						}].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: l.to,
							className: "link-underline hover:text-sand",
							children: l.label
						}) }, l.label))
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "eyebrow text-sand",
					children: "Studio"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("address", {
					className: "mt-5 space-y-3 text-sm text-silver not-italic",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"700 Kinderkamack Rd, Ste 310",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Oradell, NJ 07649"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "tel:+12012659555",
							className: "link-underline hover:text-sand",
							children: "(201) 265-9555"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "mailto:office@sjpoolsandlandscaping.com",
							className: "link-underline hover:text-sand",
							children: "office@sjpoolsandlandscaping.com"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "eyebrow text-sand",
						children: "Consultation"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-sm leading-relaxed text-silver",
						children: "Book a private site visit and receive a 3D concept of your backyard."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						className: "eyebrow mt-6 inline-block border border-sand px-6 py-3 text-sand transition-all duration-500 hover:bg-sand hover:text-navy-deep",
						children: "Start a Project"
					})
				] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-offwhite/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-[1600px] flex-wrap justify-between gap-4 px-6 py-6 text-xs text-silver/70 lg:px-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" SJ Pools & Landscaping. All rights reserved."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Licensed & insured · NJ HIC #13VH09118700" })]
			})
		})]
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$6 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: SITE_NAME },
			{
				name: "description",
				content: "Award-winning custom pool construction and landscape design serving North and Central New Jersey."
			},
			{
				name: "robots",
				content: "index, follow"
			},
			{
				name: "theme-color",
				content: "#0a1b2e"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:site_name",
				content: SITE_NAME
			},
			{
				property: "og:locale",
				content: "en_US"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Jost:wght@300;400;500&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify(localBusinessSchema())
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$6.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
var $$splitComponentImporter$5 = () => import("./about-ZvxW4pfe.mjs");
var Route$5 = createFileRoute("/about")({
	head: () => pageMeta({
		title: "About | 30+ Years of Outdoor Living — SJ Pools & Landscaping",
		description: "For more than two decades, SJ Pools & Landscaping has created complete outdoor environments across New Jersey and the tri-state area.",
		path: "/about",
		image: "/og/about.jpg"
	}),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./blog-BnOzyRJx.mjs");
var Route$4 = createFileRoute("/blog")({
	head: () => pageMeta({
		title: "Blog | SJ Pools & Landscaping",
		description: "Design inspiration, project stories and outdoor living guidance from SJ Pools & Landscaping.",
		path: "/blog"
	}),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./contact-IP5RJypI.mjs");
var Route$3 = createFileRoute("/contact")({
	head: () => pageMeta({
		title: "Contact | Book a Backyard Consultation — SJ Pools & Landscaping",
		description: "Request a private site visit and 3D concept for your New Jersey pool, patio or landscape project. Call (201) 265-9555.",
		path: "/contact",
		image: "/og/contact.jpg"
	}),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./faq-JpfNlXag.mjs");
var Route$2 = createFileRoute("/faq")({
	head: () => pageMeta({
		title: "FAQ | Pool & Landscaping Questions Answered — SJ Pools & Landscaping",
		description: "Answers to common questions about gunite pool construction, cost, pool shapes, brick pavers, sealing and landscaping vs. hardscaping in New Jersey.",
		path: "/faq",
		image: "/og/services.jpg"
	}),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./services-BBgrYI4f.mjs");
var Route$1 = createFileRoute("/services")({
	head: () => pageMeta({
		title: "Outdoor Living Services | SJ Pools & Landscaping",
		description: "Custom pools and patios, landscaping, 3D design and commercial outdoor environments designed and built as one cohesive vision.",
		path: "/services",
		image: "/og/services.jpg"
	}),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./projects-BhsZ0evK.mjs");
var Route = createFileRoute("/projects/")({
	head: () => pageMeta({
		title: "Projects | Custom Pool & Backyard Portfolio — SJ Pools & Landscaping",
		description: "A portfolio of custom New Jersey backyards: vanishing edge pools, outdoor kitchens, stone terraces and full landscape builds.",
		path: "/projects",
		image: "/og/projects.jpg"
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$7.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$6
});
var AboutRoute = Route$5.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$6
});
var BlogRoute = Route$4.update({
	id: "/blog",
	path: "/blog",
	getParentRoute: () => Route$6
});
var ContactRoute = Route$3.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$6
});
var FaqRoute = Route$2.update({
	id: "/faq",
	path: "/faq",
	getParentRoute: () => Route$6
});
var ServicesRoute = Route$1.update({
	id: "/services",
	path: "/services",
	getParentRoute: () => Route$6
});
var ProjectsIndexRoute = Route.update({
	id: "/projects/",
	path: "/projects/",
	getParentRoute: () => Route$6
});
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	BlogRoute,
	ContactRoute,
	FaqRoute,
	ServicesRoute,
	ProjectsSlugRoute: Route$8.update({
		id: "/projects/$slug",
		path: "/projects/$slug",
		getParentRoute: () => Route$6
	}),
	ProjectsIndexRoute
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
