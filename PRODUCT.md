# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People in the UK who have just read or heard an alarming news story (power cuts, water notices, severe weather, cyber attacks on infrastructure, a pandemic, conflict in Europe) and want a sensible starting point, not a rabbit hole. Most arrive on a phone from a news link or a share. Many are households with limited time and money who want a short, prioritised list, and people who want realistic timeframes ("how long does three days of supplies last a family of four?") rather than a guess. A distinct group feels frightened or helpless and needs perspective before a checklist.

## Product Purpose

**Summary (approved by the owner, 25 September 2026):**

> Stay Prepared is a UK guide to getting your household ready for disruption, whether it lasts a day or months. Power cuts, water outages, storms, empty shelves, a pandemic or conflict: it tells you what to keep, how much, and what to do. Check what you already have, then order what's missing as a ready-made kit.

Three days is the UK government's minimum and the planner's first option, not the limit of the site. The kit planner and basket already run from 3 days to 4 weeks. The site turns official advice into something practical: what to keep, how much, how long it lasts, and what to do first. Success is a visitor who checks what they already have, fills the gaps with sensible buys, and leaves calmer than they arrived.

In public copy, kits are "ready-made kits" or "emergency kits", never "survival kits" (the tone rules ban "survive"). Events like COVID and the war in Ukraine are why the site exists; public copy names the hazard ("a pandemic", "conflict in Europe"), never countries or leaders.

## Positioning

A calm public-information guide in the register of gov.uk's Prepare campaign and Sweden's "If Crisis or War Comes" booklet, set against prepper sites (TruePrepper and peers) and their macho register. Household first, then community as a consequence. Sensible safeguards, never stockpiling. Every quantity is specific and sourced, and official guidance is linked with a "last checked" date, where competitors hand out old survival PDFs.

## Operating Context

- Visitors usually come from news coverage whose headlines say "stockpile" and "Russia"; the gap between that headline and the official advice is the anxiety the site answers.
- Primary use is on a phone, often in a single short visit.
- The checklist and guide are printed or kept offline (a printed guide and an offline page at `public/offline/` exist), because the moment they are needed may be the moment the internet is down.
- The Build Your Kit planner takes household size and duration and produces a linked shopping list.

## Capabilities and Constraints

- Next.js App Router, TypeScript, Tailwind CSS v4, shadcn/ui. Deployed on Vercel at stayprepared.co.uk.
- Pages: home, checklist, build your kit, why (three days), worried (if the news is frightening you), community, sources. Planned in PLAN.md: scenarios, FAQ, official guidance, kit pages by household type.
- Content lives in `src/data/` (checklist, kit rules, products, scenarios, FAQ, official guidance).
- Monetisation is affiliate links on checklist and kit items: maker or specialist retailer first, Amazon only as a fallback and never first, free or use-what-you-have option listed first, plain disclosure on every page with links (docs/monetisation-plan.md). The site earns when a reader buys something they needed anyway, never by making them want more.
- Open: the owner selected "Something else" for assets to carry forward without specifying it; ask before assuming.

## Brand Commitments

- Name: Stay Prepared. No logo is decided (concepts only, in `public/brand/logo-concepts.html`).
- Voice: docs/tone-of-voice.md, approved 18 September 2026. Plain, short, second person, British and dry. Open with a question the reader can answer. Name hazards once, never ideologies or leaders. No neat paragraph closers, no fact turned into a nudge. Banned words include stockpile, hoard, survive, prepper, bunker, bug-out, doomsday.
- No fear-based language, countdown clocks, or crisis imagery.
- No em dashes or double hyphens in any copy.
- Released on 23 September 2026: the Noble Finance Figma layout (pill buttons, big rounded cards, light display type) and the slate, navy and safety-blue palette are no longer binding. The owner asked for a warm household tone in their place.

## Evidence on Hand

- Sourced figures and official links in `src/data/official-guidance.ts` and the Sources page.
- Tone research and sample copy in docs/tone-of-voice.md; competitor notes in docs/competitor-review.md.
- Imagery: the owner chose to start fresh. The existing Unsplash photos (`public/photos/`) and Surface Pack illustrations (`public/illustrations/`) are not to be carried forward by default. No real photography of the product's subject (for example an actual three-day shelf) exists yet.
- There are no testimonials, user numbers, press coverage or partner endorsements. Do not invent any.

## Product Principles

1. Move the reader from the news to their own cupboard in one line.
2. Check what you have before buying anything; the free option comes first.
3. Household first, then neighbours, because prepared households have more to give.
4. Specific and sourced beats reassuring and vague.
5. Say the worst case once, honestly, and do not dwell.

## Accessibility & Inclusion

- Phone first: design the mobile layout as the primary one, with comfortable touch targets and the main action within thumb reach.
- Print and offline: checklist, kit list and guide pages must print cleanly on A4 in black and white and remain usable without a connection.
- Readers may be anxious; avoid motion or imagery that raises alarm, and meet WCAG 2.2 AA.
