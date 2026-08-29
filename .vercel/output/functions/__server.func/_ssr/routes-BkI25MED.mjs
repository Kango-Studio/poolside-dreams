import { g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { c as lazyRouteComponent, d as Link, l as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { t as Reveal } from "./Reveal-PI6Wx8EV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BkI25MED.js
var import_jsx_runtime = require_jsx_runtime();
var SITE_URL = "https://sjpoolsandlandscaping.com";
var SITE_NAME = "SJ Pools & Landscaping";
var BUSINESS_PHONE_TEL = "+12012659555";
var BUSINESS_EMAIL = "office@sjpoolsandlandscaping.com";
var BUSINESS_ADDRESS = {
	street: "700 Kinderkamack Rd, Ste 310",
	city: "Oradell",
	state: "NJ",
	zip: "07649"
};
var SOCIAL_LINKS = [
	"https://www.facebook.com/SJPoolsandlandscaping/",
	"https://www.instagram.com/sjpoolsnj/",
	"https://twitter.com/SJPoolsandLand",
	"https://www.youtube.com/user/tombrnj/featured"
];
function pageMeta({ title, description, path, image }) {
	const url = `${SITE_URL}${path}`;
	const imageUrl = `${SITE_URL}${image}`;
	return {
		meta: [
			{ title },
			{
				name: "description",
				content: description
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: description
			},
			{
				property: "og:url",
				content: url
			},
			{
				property: "og:image",
				content: imageUrl
			},
			{
				name: "twitter:title",
				content: title
			},
			{
				name: "twitter:description",
				content: description
			},
			{
				name: "twitter:image",
				content: imageUrl
			}
		],
		links: [{
			rel: "canonical",
			href: url
		}]
	};
}
function localBusinessSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "HomeAndConstructionBusiness",
		"@id": `${SITE_URL}/#business`,
		name: SITE_NAME,
		url: SITE_URL,
		image: `${SITE_URL}/og/home.jpg`,
		telephone: BUSINESS_PHONE_TEL,
		email: BUSINESS_EMAIL,
		address: {
			"@type": "PostalAddress",
			streetAddress: BUSINESS_ADDRESS.street,
			addressLocality: BUSINESS_ADDRESS.city,
			addressRegion: BUSINESS_ADDRESS.state,
			postalCode: BUSINESS_ADDRESS.zip,
			addressCountry: "US"
		},
		areaServed: [{
			"@type": "State",
			name: "New Jersey"
		}, {
			"@type": "State",
			name: "New York"
		}],
		openingHoursSpecification: {
			"@type": "OpeningHoursSpecification",
			dayOfWeek: [
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday"
			],
			opens: "08:00",
			closes: "16:00"
		},
		sameAs: SOCIAL_LINKS
	};
}
var $$splitComponentImporter = () => import("./routes-CYVKAvHf.mjs");
var Route = createFileRoute("/")({
	head: () => pageMeta({
		title: "SJ Pools & Landscaping | Custom Pool Builder in New Jersey",
		description: "Award-winning New Jersey design/build firm creating custom gunite pools, patios and luxury outdoor living environments across North and Central New Jersey and parts of New York.",
		path: "/",
		image: "/og/home.jpg"
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
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
export { pageMeta as a, localBusinessSchema as i, Route as n, SITE_NAME as r, CtaBand as t };
