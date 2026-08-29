import { r as __toESM } from "../_runtime.mjs";
import { _ as require_react, a as Trigger2, g as require_jsx_runtime, i as Root2, n as Header, r as Item, t as Content2 } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { s as ChevronDown } from "../_libs/lucide-react.mjs";
import { t as Reveal } from "./Reveal-PI6Wx8EV.mjs";
import { t as CtaBand } from "./routes-BkI25MED.mjs";
import { t as faqs } from "./site-data-g9ShfZGD.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as hero_1_default } from "./hero-1-Bl98pu0L.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/faq-JpfNlXag.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
function FaqPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "relative flex h-[52vh] min-h-[360px] items-end overflow-hidden bg-navy-deep",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: hero_1_default,
					alt: "Custom pool and patio at dusk",
					width: 1920,
					height: 1088,
					className: "absolute inset-0 h-full w-full object-cover opacity-70"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "veil absolute inset-0" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto w-full max-w-[1600px] px-6 pb-16 lg:px-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow text-sand",
						children: "Good to know"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-5 font-display text-5xl text-offwhite md:text-7xl",
						children: "FAQ"
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-[1600px] px-6 py-24 lg:px-12 lg:py-32",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				className: "max-w-3xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg leading-relaxed text-muted-foreground",
					children: "Answers to the questions we hear most often about pool construction, cost and landscaping. Don't see yours here? Reach out and we'll walk you through it."
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-20 space-y-16 lg:space-y-20",
				children: faqs.map((group, gi) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					delay: gi * 100,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl md:text-4xl",
						children: group.category
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
						type: "single",
						collapsible: true,
						className: "mt-8 w-full",
						children: group.items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
							value: `${group.category}-${i}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
								className: "font-display py-6 text-xl hover:no-underline md:text-2xl",
								children: item.q
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
								className: "max-w-3xl pb-8 text-base leading-relaxed text-muted-foreground",
								children: item.a
							})]
						}, item.q))
					})]
				}, group.category))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {})
	] });
}
//#endregion
export { FaqPage as component };
