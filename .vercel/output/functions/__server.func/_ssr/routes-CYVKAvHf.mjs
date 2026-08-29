import { r as __toESM } from "../_runtime.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as ArrowUpRight, l as ArrowRight, u as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as Reveal } from "./Reveal-PI6Wx8EV.mjs";
import { i as testimonials, n as projects, r as services } from "./site-data-g9ShfZGD.mjs";
import { t as getProjectImages } from "./project-images-CTTRIKEj.mjs";
import { t as about_default } from "./about-DTUYU7h2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CYVKAvHf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var slides = [
	{
		image: "/assets/image-gallery-1-CtTGPNcx.webp",
		title: "A New Horizon",
		text: "Every line of the vanishing edge is drawn around the view you already own."
	},
	{
		image: "/assets/image-gallery-2-8Ji1yVcS.webp",
		title: "Set by Hand",
		text: "Coping, tile and stone selected and laid one piece at a time — never by the pallet."
	},
	{
		image: "/assets/image-gallery-3-CuY-cYr1.webp",
		title: "Rooted in Place",
		text: "A reflecting pool framed by brick, boxwood and the house it was built to answer."
	},
	{
		image: "/assets/image-gallery-4-BiU5pHEw.webp",
		title: "Drawn in 3D",
		text: "You walk the design before we ever break ground on your property."
	},
	{
		image: "/assets/image-gallery-5-BMb59xYI.webp",
		title: "After Sundown",
		text: "Fire, water and light choreographed so the backyard begins when the day ends."
	}
];
var DURATION = 7e3;
function HeroCarousel() {
	const [index, setIndex] = (0, import_react.useState)(0);
	const timer = (0, import_react.useRef)(null);
	const go = (0, import_react.useCallback)((next) => {
		setIndex((next + slides.length) % slides.length);
	}, []);
	(0, import_react.useEffect)(() => {
		timer.current = setTimeout(() => go(index + 1), DURATION);
		return () => {
			if (timer.current) clearTimeout(timer.current);
		};
	}, [index, go]);
	const active = slides[index];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative h-screen min-h-[680px] w-full overflow-hidden bg-navy-deep",
		children: [
			slides.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `absolute inset-0 transition-opacity duration-[1400ms] ease-out ${i === index ? "opacity-100" : "opacity-0"}`,
				"aria-hidden": i !== index,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: s.image,
					alt: s.title,
					width: 1920,
					height: 1088,
					loading: i === 0 ? "eager" : "lazy",
					className: `h-full w-full object-cover ${i === index ? "kenburns" : "scale-[1.06]"}`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "veil absolute inset-0" })]
			}, s.title)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-0 mx-auto flex h-full max-w-[1600px] flex-col justify-between px-6 pt-32 pb-14 lg:px-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-auto flex items-center gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "eyebrow text-offwhite",
						children: [
							String(index + 1).padStart(2, "0"),
							" / ",
							String(slides.length).padStart(2, "0")
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-3",
						children: slides.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"aria-label": `Go to slide ${i + 1}`,
							onClick: () => go(i),
							className: "group h-[2px] w-16 overflow-hidden bg-offwhite/25",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `block h-full bg-sand transition-transform duration-500 ${i === index ? "animate-none scale-x-100" : "scale-x-0"} origin-left` })
						}, s.title))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-auto grid items-end gap-10 lg:grid-cols-[1.1fr_1fr_auto]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "animate-[fade-in_0.9s_cubic-bezier(0.16,1,0.3,1)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-5xl leading-[0.95] text-offwhite md:text-7xl xl:text-8xl",
								children: active.title
							})
						}, active.title),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-md text-sm leading-relaxed text-silver md:text-base",
							children: active.text
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/projects",
								className: "eyebrow border border-offwhite/40 px-8 py-4 text-offwhite backdrop-blur-sm transition-all duration-500 hover:border-sand hover:bg-sand hover:text-navy-deep",
								children: "Explore Work"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								className: "eyebrow bg-sand px-8 py-4 text-navy-deep transition-all duration-500 hover:bg-offwhite",
								children: "Keep Me Informed"
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute top-1/2 right-6 z-10 flex -translate-y-1/2 flex-col gap-px lg:right-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"aria-label": "Previous slide",
					onClick: () => go(index - 1),
					className: "border border-offwhite/25 p-4 text-offwhite transition-colors hover:bg-offwhite hover:text-navy-deep",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
						className: "h-4 w-4",
						strokeWidth: 1.4
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"aria-label": "Next slide",
					onClick: () => go(index + 1),
					className: "border border-offwhite/25 p-4 text-offwhite transition-colors hover:bg-offwhite hover:text-navy-deep",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
						className: "h-4 w-4",
						strokeWidth: 1.4
					})
				})]
			})
		]
	});
}
var stats = [
	{
		value: "30+",
		label: "Years building"
	},
	{
		value: "Award-Winning",
		label: "Recognition"
	},
	{
		value: "30+",
		label: "Pools built annually"
	},
	{
		value: "One team",
		label: "From design to build"
	}
];
var featuredServices = [
	"pools-patios",
	"landscaping",
	"3d-design",
	"commercial"
];
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroCarousel, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-[1600px] px-6 py-28 lg:px-12 lg:py-40",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-16 lg:grid-cols-[0.85fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow text-muted-foreground",
					children: "New Jersey Pool Builder"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mt-6 font-display text-4xl leading-[1.05] md:text-6xl",
					children: ["It’s more than a pool.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-muted-foreground",
						children: "It’s a lifestyle."
					})]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					delay: 120,
					className: "flex flex-col justify-end gap-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-xl text-lg leading-relaxed text-muted-foreground",
						children: "SJ Pools & Landscaping is a full-service outdoor living design-build firm, creating custom pools and landscapes as one seamless vision. From the initial site survey and 3D design to construction, masonry, lighting, water features and final landscaping, every detail is thoughtfully coordinated by one team — ensuring the space you envision is the space we bring to life."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/about",
						className: "eyebrow inline-flex w-fit items-center gap-3 border-b border-foreground pb-2 transition-colors hover:border-sand hover:text-sand",
						children: ["Our story ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
							className: "h-4 w-4",
							strokeWidth: 1.4
						})]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-24 grid grid-cols-2 gap-px border border-border bg-border lg:grid-cols-4",
				children: stats.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					delay: i * 90,
					className: "bg-background p-8 lg:p-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-4xl leading-none lg:text-5xl",
						children: s.value
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow mt-4 text-muted-foreground",
						children: s.label
					})]
				}, s.label))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-navy text-offwhite",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-[1600px] px-6 py-28 lg:px-12 lg:py-40",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					className: "flex flex-wrap items-end justify-between gap-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow text-sand",
						children: "What we build"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-6 max-w-2xl font-display text-4xl leading-[1.05] md:text-6xl",
						children: "Outdoor spaces, built as one vision"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/services",
						className: "eyebrow border border-offwhite/40 px-7 py-4 transition-all duration-500 hover:border-sand hover:bg-sand hover:text-navy-deep",
						children: "All services"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-20 grid border-y border-offwhite/15 md:grid-cols-2 lg:grid-cols-4",
					children: featuredServices.map((slug, i) => {
						const service = services.find((item) => item.slug === slug);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: i * 90,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/services",
								className: "group flex min-h-40 items-end justify-between gap-6 border-b border-offwhite/15 py-8 transition-colors hover:text-sand md:border-r md:px-8 lg:min-h-52 lg:border-b-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-3xl",
									children: service.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
									className: "h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1",
									strokeWidth: 1.4
								})]
							})
						}, service.slug);
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-[1600px] px-6 py-28 lg:px-12 lg:py-40",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow text-muted-foreground",
					children: "Selected work"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-6 font-display text-4xl leading-[1.05] md:text-6xl",
					children: "Some of our projects"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-20 grid gap-10 lg:grid-cols-3",
					children: projects.slice(0, 6).map((project, i) => {
						const hero = getProjectImages(project.slug)[0];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: i * 120,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/projects/$slug",
								params: { slug: project.slug },
								className: "surface-3d group block overflow-hidden bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "aspect-[4/3] overflow-hidden",
									children: hero && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: hero,
										alt: project.title,
										width: 1408,
										height: 1008,
										loading: "lazy",
										className: "h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-8",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "eyebrow text-muted-foreground",
											children: project.place
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-4 font-display text-2xl",
											children: project.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 text-sm text-muted-foreground",
											children: project.scope
										})
									]
								})]
							})
						}, project.slug);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: 160,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-16 flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/projects",
							className: "eyebrow inline-flex items-center gap-3 border border-foreground/20 px-10 py-5 transition-all duration-500 hover:border-foreground/40 hover:bg-foreground/[0.03]",
							children: ["View all projects ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
								className: "h-4 w-4",
								strokeWidth: 1.4
							})]
						})
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative isolate overflow-clip bg-navy-deep text-offwhite",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: about_default,
					alt: "",
					width: 1408,
					height: 1008,
					loading: "lazy",
					className: "absolute inset-[-2%] -z-20 h-[104%] w-[104%] scale-105 object-cover blur-[4px]"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					autoPlay: true,
					muted: true,
					loop: true,
					playsInline: true,
					poster: about_default,
					"aria-hidden": "true",
					className: "absolute inset-[-2%] -z-20 h-[104%] w-[104%] scale-105 object-cover blur-[3px]"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 -z-10 bg-navy-deep/85" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-[1600px] px-6 py-28 lg:px-12 lg:py-40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
						className: "max-w-4xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow text-sand",
								children: "The process"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-6 font-display text-4xl leading-[1.05] md:text-5xl",
								children: "From first vision to first swim."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-silver md:text-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A great outdoor space doesn't begin with excavation. It begins with understanding the property, the people who live there, and the way the space should feel when it's finished." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Our process brings design and construction together from the beginning, creating a clear path from the first site visit to the moment your outdoor space becomes part of everyday life." })]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-20 grid gap-16 lg:grid-cols-[minmax(18rem,30rem)_minmax(0,1fr)] lg:items-start lg:gap-20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "self-start lg:sticky lg:top-28",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
								className: "relative aspect-[4/5] overflow-hidden shadow-[0_36px_80px_-28px_rgba(0,0,0,0.7)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: about_default,
									alt: "SJ Pools & Landscaping crew building a custom gunite pool",
									width: 1408,
									height: 1008,
									loading: "lazy",
									className: "h-full w-full object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-navy-deep/10" })]
							}) })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "min-w-0",
							children: [
								{
									title: "Discover & Site Study",
									lead: "We start with the property — and by listening to you.",
									paragraphs: ["Before we design, we study the site and learn how you want to live outside. We evaluate the layout, grade, drainage, sunlight, existing architecture and important sightlines while discussing your goals, priorities and ideas for the space.", "The result is a design direction grounded in both the property and your lifestyle."]
								},
								{
									title: "Design & 3D Vision",
									lead: "See the space before we build it.",
									paragraphs: ["Your ideas begin to take shape through a detailed 3D concept that brings the entire environment together — pool, patio, elevations, landscape, masonry, lighting and outdoor living features.", "This is where we refine proportions, materials and details together, giving you the opportunity to experience the design and make thoughtful decisions before construction begins."]
								},
								{
									title: "Build & Craft",
									lead: "The vision becomes real.",
									paragraphs: [
										"Once the design is approved and the project is ready for construction, our team moves from planning into execution — coordinating the many layers required to build a complete outdoor environment.",
										"From excavation, grading and pool construction to masonry, hardscape, water features, lighting and landscaping, every phase is approached with the finished design in mind.",
										"Because great craftsmanship isn't just about how something looks on day one. It's about how every detail comes together — and how well it performs for years to come."
									]
								},
								{
									title: "Complete & Enjoy",
									lead: "The project ends. Your life outside begins.",
									paragraphs: ["As construction comes to completion, we walk through the finished space with you, review its key features and make sure you understand how to care for and enjoy your new environment."],
									closing: [
										"Then comes the best part:",
										"The renderings become real.",
										"The construction gives way to living.",
										"And a space that once existed only as an idea becomes part of your home."
									]
								}
							].map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
								delay: i % 2 * 100,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "border-t border-offwhite/20 py-12 first:pt-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "eyebrow text-sand",
											children: [
												String(i + 1).padStart(2, "0"),
												" — ",
												step.title
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-5 font-display text-3xl leading-tight md:text-4xl",
											children: step.lead
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-6 space-y-5 leading-relaxed text-silver",
											children: step.paragraphs.map((paragraph) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: paragraph }, paragraph))
										}),
										step.closing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-7 space-y-2 font-display text-xl leading-snug text-offwhite md:text-2xl",
											children: step.closing.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: line }, line))
										})
									]
								})
							}, step.title))
						})]
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-navy text-offwhite",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-[1600px] px-6 py-28 lg:px-12 lg:py-40",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow text-sand",
					children: "Client feedback"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-6 max-w-2xl font-display text-4xl leading-[1.05] md:text-6xl",
					children: "What it's like to work with us"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-20 grid gap-px bg-offwhite/15 md:grid-cols-2 lg:grid-cols-3",
					children: testimonials.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i % 3 * 100,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex h-full flex-col justify-between bg-navy p-10 lg:p-12",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-2xl leading-snug text-offwhite/90",
								children: [
									"“",
									t.quote,
									"”"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow text-sand",
									children: t.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-silver",
									children: t.place
								})]
							})]
						})
					}, t.name))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {})
	] });
}
function CtaBand() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-navy-deep text-offwhite",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-[1600px] gap-12 px-6 py-24 lg:grid-cols-[1fr_auto] lg:items-end lg:px-12 lg:py-32",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				className: "max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow text-sand",
						children: "Get a quote"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "max-w-2xl font-display text-4xl leading-[1.05] md:text-5xl",
						children: "Ready to transform the way you live at home?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-7 max-w-2xl leading-relaxed text-silver",
						children: "From custom pools to complete outdoor environments, we bring your vision to life through thoughtful design, craftsmanship and one seamless process."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: 120,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/contact",
					className: "eyebrow inline-flex items-center gap-3 bg-sand px-10 py-5 text-navy-deep transition-all duration-500 hover:bg-offwhite",
					children: ["Start your project ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
						className: "h-4 w-4",
						strokeWidth: 1.4
					})]
				})
			})]
		})
	});
}
//#endregion
export { CtaBand, Home as component };
