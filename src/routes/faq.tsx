import { getProjectImages } from "@/lib/project-images";
import { FramedHero } from "@/components/FramedHero";
import { createFileRoute } from "@tanstack/react-router";

import { Reveal } from "@/components/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/site-data";
import { pageMeta } from "@/lib/seo";
import { CtaBand } from "./index";
const hero1 = getProjectImages("pike")[0];

export const Route = createFileRoute("/faq")({
  head: () =>
    pageMeta({
      title: "FAQ | Pool & Landscaping Questions Answered — SJ Pools & Landscaping",
      description:
        "Answers to common questions about gunite pool construction, cost, pool shapes, brick pavers, sealing and landscaping vs. hardscaping in New Jersey.",
      path: "/faq",
      image: "/og/services.jpg",
    }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <FramedHero src={hero1} alt="Pike outdoor living project">

        <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-16 lg:px-12">
          <p className="eyebrow text-sand">Good to know</p>
          <h1 className="mt-5 font-display text-5xl text-offwhite md:text-7xl">FAQ</h1>
        </div>
      </FramedHero>

      <section className="mx-auto max-w-[1600px] px-6 py-24 lg:px-12 lg:py-32">
        <Reveal className="max-w-3xl">
          <p className="text-lg leading-relaxed text-muted-foreground">
            Answers to the questions we hear most often about pool construction, cost and
            landscaping. Don&apos;t see yours here? Reach out and we&apos;ll walk you through it.
          </p>
        </Reveal>

        <div className="mt-20 space-y-16 lg:space-y-20">
          {faqs.map((group, gi) => (
            <Reveal key={group.category} delay={gi * 100}>
              <h2 className="font-display text-3xl md:text-4xl">{group.category}</h2>
              <Accordion type="single" collapsible className="mt-8 w-full">
                {group.items.map((item, i) => (
                  <AccordionItem key={item.q} value={`${group.category}-${i}`}>
                    <AccordionTrigger className="font-display py-6 text-xl hover:no-underline md:text-2xl">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="max-w-3xl pb-8 text-base leading-relaxed text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
