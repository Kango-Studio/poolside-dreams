import { r as __toESM } from "../_runtime.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as Mail, i as MapPin, n as Phone } from "../_libs/lucide-react.mjs";
import { t as Reveal } from "./Reveal-PI6Wx8EV.mjs";
import { t as hero_1_default } from "./hero-1-Bl98pu0L.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-IP5RJypI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var inputClass = "w-full border-b border-border bg-transparent py-4 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-sand";
function ContactPage() {
	const [sent, setSent] = (0, import_react.useState)(false);
	function onSubmit(e) {
		e.preventDefault();
		setSent(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "relative flex h-[52vh] min-h-[360px] items-end overflow-hidden bg-navy-deep",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: hero_1_default,
				alt: "Infinity pool at dusk",
				width: 1920,
				height: 1088,
				className: "absolute inset-0 h-full w-full object-cover opacity-70"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "veil absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto w-full max-w-[1600px] px-6 pb-16 lg:px-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow text-sand",
					children: "Let's talk"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-5 font-display text-5xl text-offwhite md:text-7xl",
					children: "Contact"
				})]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-[1600px] px-6 py-24 lg:px-12 lg:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-20 lg:grid-cols-[1fr_0.7fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl leading-[1.05] md:text-5xl",
					children: "Tell us about the property"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-lg text-muted-foreground",
					children: "Share a few details and we'll schedule a site visit within a week."
				}),
				sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-14 border border-sand bg-secondary/40 p-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-3xl",
						children: "Thank you."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted-foreground",
						children: "Your request is in. A project lead will reach out within one business day."
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					className: "mt-14 space-y-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-10 md:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "eyebrow text-muted-foreground",
										children: "Full name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										name: "name",
										placeholder: "Jane Doe",
										className: inputClass
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "eyebrow text-muted-foreground",
										children: "Email"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										type: "email",
										name: "email",
										placeholder: "jane@email.com",
										className: inputClass
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "eyebrow text-muted-foreground",
										children: "Phone"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										name: "phone",
										placeholder: "(201) 000-0000",
										className: inputClass
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "eyebrow text-muted-foreground",
										children: "Town"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										name: "town",
										placeholder: "Saddle River, NJ",
										className: inputClass
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "eyebrow text-muted-foreground",
								children: "Project"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								name: "message",
								rows: 4,
								placeholder: "New gunite pool, patio and outdoor kitchen…",
								className: `${inputClass} resize-none`
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "eyebrow bg-navy px-10 py-5 text-offwhite transition-all duration-500 hover:bg-sand hover:text-navy-deep",
							children: "Send request"
						})
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				delay: 140,
				className: "space-y-10",
				children: [
					[{
						icon: Phone,
						label: "Phone",
						value: "(201) 265-9555",
						href: "tel:+12012659555"
					}, {
						icon: Mail,
						label: "Email",
						value: "office@sjpoolsandlandscaping.com",
						href: "mailto:office@sjpoolsandlandscaping.com"
					}].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-border pt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
								className: "h-4 w-4 text-sand",
								strokeWidth: 1.4
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "eyebrow text-muted-foreground",
								children: item.label
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: item.href,
							className: "link-underline mt-3 inline-block font-display text-2xl",
							children: item.value
						})]
					}, item.label)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-border pt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
								className: "h-4 w-4 text-sand",
								strokeWidth: 1.4
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "eyebrow text-muted-foreground",
								children: "Studio"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("address", {
							className: "mt-3 font-display text-2xl leading-snug not-italic",
							children: [
								"700 Kinderkamack Rd, Ste 310",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Oradell, NJ 07649"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-border pt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow text-muted-foreground",
							children: "Hours"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-muted-foreground",
							children: "Monday – Friday · 8am – 4pm"
						})]
					})
				]
			})]
		})
	})] });
}
//#endregion
export { ContactPage as component };
