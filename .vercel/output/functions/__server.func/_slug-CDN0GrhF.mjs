import { r as __toESM } from "./_runtime.mjs";
import { _ as require_react, g as require_jsx_runtime } from "./_libs/@radix-ui/react-accordion+[...].mjs";
import { d as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { l as ArrowRight, o as Expand, t as X, u as ArrowLeft } from "./_libs/lucide-react.mjs";
import { t as Reveal } from "./_ssr/Reveal-PI6Wx8EV.mjs";
import { t as CtaBand } from "./_ssr/routes-BkI25MED.mjs";
import { n as projects } from "./_ssr/site-data-g9ShfZGD.mjs";
import { t as Route } from "./_slug-Ccbm_AGM.mjs";
import { t as cn } from "./_ssr/utils-C_uf36nf.mjs";
import { t as getProjectImages } from "./_ssr/project-images-CTTRIKEj.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "./_libs/@radix-ui/react-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-CDN0GrhF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
function ProjectGallery({ images, title, gridClassName = "grid-cols-3 sm:grid-cols-4 lg:grid-cols-6" }) {
	const [index, setIndex] = (0, import_react.useState)(null);
	const open = index !== null;
	function go(delta) {
		setIndex((current) => {
			if (current === null) return current;
			return (current + delta + images.length) % images.length;
		});
	}
	(0, import_react.useEffect)(() => {
		if (!open) return;
		function onKey(e) {
			if (e.key === "ArrowLeft") go(-1);
			if (e.key === "ArrowRight") go(1);
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open]);
	if (images.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `grid gap-2 ${gridClassName}`,
		children: images.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => setIndex(i),
			className: "group relative aspect-[4/3] cursor-pointer overflow-hidden bg-muted",
			"aria-label": `View photo ${i + 1} of ${images.length} — ${title}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src,
				alt: `${title} — photo ${i + 1}`,
				loading: "lazy",
				className: "h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute inset-0 flex items-center justify-center bg-navy-deep/0 transition-colors duration-300 group-hover:bg-navy-deep/30",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Expand, {
					className: "h-4 w-4 text-offwhite opacity-0 transition-opacity duration-300 group-hover:opacity-100",
					strokeWidth: 1.4
				})
			})]
		}, src))
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (next) => !next && setIndex(null),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-[96vw] border-none bg-navy-deep p-0 sm:max-w-[92vw]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
				className: "sr-only",
				children: [
					title,
					" — photo ",
					index !== null ? index + 1 : 0,
					" of ",
					images.length
				]
			}), index !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex min-h-[50vh] items-center justify-center p-2 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: images[index],
						alt: `${title} — photo ${index + 1}`,
						className: "max-h-[82vh] w-auto max-w-full object-contain"
					}),
					images.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Previous photo",
						onClick: () => go(-1),
						className: "absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer border border-offwhite/30 bg-navy-deep/60 p-3 text-offwhite transition-colors hover:bg-offwhite hover:text-navy-deep",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
							className: "h-4 w-4",
							strokeWidth: 1.4
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Next photo",
						onClick: () => go(1),
						className: "absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer border border-offwhite/30 bg-navy-deep/60 p-3 text-offwhite transition-colors hover:bg-offwhite hover:text-navy-deep",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
							className: "h-4 w-4",
							strokeWidth: 1.4
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "eyebrow absolute bottom-3 left-1/2 -translate-x-1/2 text-offwhite/70",
						children: [
							index + 1,
							" / ",
							images.length
						]
					})
				]
			})]
		})
	})] });
}
function ProjectDetailPage() {
	const project = Route.useLoaderData();
	const images = getProjectImages(project.slug);
	const hero = images[0];
	const index = projects.findIndex((p) => p.slug === project.slug);
	const prev = projects[(index - 1 + projects.length) % projects.length];
	const next = projects[(index + 1) % projects.length];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "relative flex h-screen min-h-[640px] items-end overflow-hidden bg-navy-deep",
			children: [
				hero && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: hero,
					alt: project.title,
					className: "kenburns absolute inset-0 h-full w-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "veil absolute inset-0" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/projects",
					className: "eyebrow absolute left-6 top-28 z-10 inline-flex items-center gap-3 text-offwhite/80 transition-colors hover:text-sand lg:left-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
						className: "h-4 w-4",
						strokeWidth: 1.4
					}), " All Projects"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto w-full max-w-[1600px] px-6 pb-16 lg:px-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "eyebrow text-sand",
							children: [
								String(index + 1).padStart(2, "0"),
								" / ",
								String(projects.length).padStart(2, "0"),
								" · Selected Work"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-5 font-display text-6xl leading-[0.95] text-offwhite md:text-8xl",
							children: project.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "eyebrow mt-6 text-offwhite/70",
							children: [
								project.year,
								" · ",
								project.place
							]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-border bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid max-w-[1600px] grid-cols-1 gap-px border-y border-border bg-border sm:grid-cols-3",
				children: [
					["Location", project.place],
					["Completed", String(project.year)],
					["Photography", "Jimi Smith Photography Group"]
				].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-background px-6 py-8 lg:px-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "eyebrow text-muted-foreground",
						children: k
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-2 font-display text-2xl",
						children: v
					})]
				}, k))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-[1600px] px-6 py-24 lg:px-12 lg:py-32",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-16 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl leading-[1.05] md:text-5xl",
					children: "Every detail, drawn before it was built."
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					delay: 120,
					className: "space-y-6 text-lg leading-relaxed text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [project.scope, "."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Designed in full 3D before the first excavation, then built entirely by our own crews — excavation, gunite, masonry, water and light coordinated as one project, not a chain of subcontractors. The result is finished with a lighting and planting plan tuned to the way this family actually uses the property." })]
				})]
			})
		}),
		images.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-muted",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-[1600px] px-6 py-24 lg:px-12 lg:py-32",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					className: "mb-14 flex flex-wrap items-end justify-between gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow text-muted-foreground",
						children: "The full story"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 font-display text-4xl md:text-5xl",
						children: "Gallery"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "eyebrow text-muted-foreground",
						children: [images.length, " photos"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectGallery, {
					images,
					title: project.title,
					gridClassName: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-[1600px] grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/projects/$slug",
					params: { slug: prev.slug },
					className: "group flex items-center justify-between gap-6 px-6 py-12 transition-colors hover:bg-muted lg:px-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
						className: "h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-x-1",
						strokeWidth: 1.4
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow text-muted-foreground",
							children: "Previous"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-3xl",
							children: prev.title
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/projects/$slug",
					params: { slug: next.slug },
					className: "group flex items-center justify-between gap-6 px-6 py-12 transition-colors hover:bg-muted lg:px-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow text-muted-foreground",
						children: "Next"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-3xl",
						children: next.title
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
						className: "h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1",
						strokeWidth: 1.4
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {})
	] });
}
//#endregion
export { ProjectDetailPage as component };
