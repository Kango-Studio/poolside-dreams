# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Homeowners and commercial property decision-makers in New Jersey and selected areas of New York who are evaluating a premium pool, landscape, or complete outdoor-living project.

## Product Purpose

The website presents SJ Pools & Landscaping's design-build work, explains its integrated process, and helps prospective clients assess fit before starting a project inquiry.

## Positioning

SJ Pools & Landscaping coordinates the complete outdoor environment as one vision and one process: site study, 3D design, pool construction, masonry, lighting, water features, and final landscaping.

## Operating Context

Visitors primarily evaluate the company through completed-project photography, service scope, process clarity, and evidence of craftsmanship. Project galleries are a core decision surface.

## Capabilities and Constraints

- The public website is built with React, TanStack Start, Tailwind CSS, and Vite.
- The homepage hero supports a mixed carousel of still images and video.
- The future Get a Quote page will embed Poolsplan in an iframe; that integration is deliberately deferred.
- Existing routes, supplied copy, project data, and navigation must remain functional during visual refinements.

## Brand Commitments

- Brand name: SJ Pools & Landscaping.
- Core message: “It’s more than a pool. It’s a lifestyle.”
- The experience should communicate premium outdoor living, architectural intent, craftsmanship, and calm confidence.
- Existing SJ logo assets and real project photography are the visual evidence.

## Evidence on Hand

- Real project data and galleries in `src/lib/site-data.ts` and `src/assets/projects/`.
- Homepage carousel photography in `src/assets/hero-slide/`.
- Existing SJ logo variants in `src/assets/logos/`.
- No approved video asset is currently present; the hero must support one when supplied without presenting fabricated footage.

## Product Principles

- Let completed work lead the story.
- Present the property as one designed environment, not a collection of disconnected services.
- Make craftsmanship and process tangible without overstating unsupported claims.
- Keep the path from inspiration to project inquiry clear.
