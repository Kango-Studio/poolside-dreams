import { g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as ArrowUpRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog-BnOzyRJx.js
var import_jsx_runtime = require_jsx_runtime();
function Blog() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "flex min-h-[78vh] items-center bg-navy-deep px-6 pt-28 text-offwhite lg:px-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-[1600px] py-24 lg:py-32",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow text-sand",
					children: "Blog"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-6 max-w-3xl font-display text-5xl leading-[1.02] md:text-7xl",
					children: "Stories for life outdoors."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 max-w-xl text-lg leading-relaxed text-silver",
					children: "Project stories, design inspiration and practical guidance are coming soon."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/contact",
					className: "eyebrow mt-10 inline-flex items-center gap-3 border-b border-sand pb-2 text-sand",
					children: ["Start your project ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
						className: "h-4 w-4",
						strokeWidth: 1.4
					})]
				})
			]
		})
	});
}
//#endregion
export { Blog as component };
