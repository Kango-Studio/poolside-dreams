import { g as require_jsx_runtime } from "./_libs/@radix-ui/react-accordion+[...].mjs";
import { d as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { u as ArrowLeft } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-BoPFIozX.js
var import_jsx_runtime = require_jsx_runtime();
function ProjectNotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto flex min-h-[60vh] max-w-[1600px] flex-col items-start justify-center px-6 py-32 lg:px-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow text-muted-foreground",
				children: "Not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-5 font-display text-4xl md:text-5xl",
				children: "This project doesn't exist."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/projects",
				className: "eyebrow mt-10 inline-flex items-center gap-3 border-b border-foreground pb-2 transition-colors hover:border-sand hover:text-sand",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
					className: "h-4 w-4",
					strokeWidth: 1.4
				}), " All projects"]
			})
		]
	});
}
//#endregion
export { ProjectNotFound as notFoundComponent };
