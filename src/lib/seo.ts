export const SITE_URL = "https://sjpoolsandlandscaping.com";
export const SITE_NAME = "SJ Pools & Landscaping";
export const BUSINESS_PHONE_DISPLAY = "(201) 265-9555";
export const BUSINESS_PHONE_TEL = "+12012659555";
export const BUSINESS_EMAIL = "office@sjpoolsandlandscaping.com";
export const BUSINESS_ADDRESS = {
  street: "700 Kinderkamack Rd, Ste 310",
  city: "Oradell",
  state: "NJ",
  zip: "07649",
};
export const SOCIAL_LINKS = [
  "https://www.facebook.com/SJPoolsandlandscaping/",
  "https://www.instagram.com/sjpoolsnj/",
  "https://twitter.com/SJPoolsandLand",
  "https://www.youtube.com/user/tombrnj/featured",
];

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  image: string;
};

export function pageMeta({ title, description, path, image }: PageSeoInput) {
  const url = `${SITE_URL}${path}`;
  const imageUrl = `${SITE_URL}${image}`;

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: imageUrl },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: imageUrl },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function localBusinessSchema() {
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
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "State", name: "New Jersey" },
      { "@type": "State", name: "New York" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "16:00",
    },
    sameAs: SOCIAL_LINKS,
  };
}
