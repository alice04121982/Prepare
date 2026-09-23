# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

UK households who have decided to prepare and want to know exactly what to buy: people worried about power cuts, water outages, severe weather and climate, war in Europe, supply shortages, or losing their income, including to automation. They already know from gov.uk that they should prepare; they come here to get it done. Most arrive on a phone, often from search ("72 hour kit family of four UK") or a share. A smaller group arrives frightened by the news and needs perspective first (the /worried page).

## Product Purpose

Turn a household into a ready-made shopping list. The visitor says who lives there, picks a scenario (72 hours or a power cut, 2 weeks to 1 month, 3 months for job loss or a crisis, or a grab bag), and gets a list with the quantities worked out that they can send to an Amazon basket in one go, or buy item by item from other shops. Success is a completed basket. The site earns affiliate commission on it and is one of several online income streams for its owner. The guidance that explains the numbers stays, as a guides section that also brings in search traffic.

## Positioning

A practical prepper site for UK households (repositioned 24 September 2026). Openly about prepping and stockpiling sensibly, without the tactical and macho register of TruePrepper and its peers. What no competitor has: lists that scale to your exact household and duration, with every quantity specific and sourced, and one button that buys the lot.

## Operating Context

- Visitors usually come from news coverage whose headlines say "stockpile" and "Russia"; the gap between that headline and the official advice is the anxiety the site answers.
- Primary use is on a phone, often in a single short visit.
- The checklist and guide are printed or kept offline (a printed guide and an offline page at `public/offline/` exist), because the moment they are needed may be the moment the internet is down.
- The Build Your Kit planner takes household size and duration and produces a linked shopping list.

## Capabilities and Constraints

- Next.js App Router, TypeScript, Tailwind CSS v4, shadcn/ui. Deployed on Vercel at stayprepared.co.uk.
- Pages: home, checklist, build your kit, why (three days), worried (if the news is frightening you), community, sources. Planned in PLAN.md: scenarios, FAQ, official guidance, kit pages by household type.
- Content lives in `src/data/` (checklist, kit rules, products, scenarios, FAQ, official guidance).
- Monetisation is affiliate commission on ready-made lists (docs/monetisation-plan.md, revised 24 September 2026). Amazon Associates UK is live (tag in `NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG`); Awin is applied for; brand programmes come later. Disclosure on every page with links, Amazon's required wording, price bands never live prices, no fake scarcity or urgency.
- Open: the owner selected "Something else" for assets to carry forward without specifying it; ask before assuming.

## Brand Commitments

- Name: Stay Prepared. No logo is decided (concepts only, in `public/brand/logo-concepts.html`).
- Voice: docs/tone-of-voice.md, revised 24 September 2026 to "practical prepper". Prepper, prepping and stockpile are allowed; the reasons (power, water, weather and climate, war, shortages, job loss) are named plainly. Still plain, short, second person, British and dry. Never tactical or conspiratorial.
- No invented threat levels, dates or likelihoods, no countdown clocks, no fake scarcity.
- No em dashes or double hyphens in any copy.
- Released on 23 September 2026: the Noble Finance Figma layout (pill buttons, big rounded cards, light display type) and the slate, navy and safety-blue palette are no longer binding. The owner asked for a warm household tone in their place.

## Evidence on Hand

- Sourced figures and official links in `src/data/official-guidance.ts` and the Sources page.
- Tone research and sample copy in docs/tone-of-voice.md; competitor notes in docs/competitor-review.md.
- Imagery: the owner chose to start fresh. The existing Unsplash photos (`public/photos/`) and Surface Pack illustrations (`public/illustrations/`) are not to be carried forward by default. No real photography of the product's subject (for example an actual three-day shelf) exists yet.
- There are no testimonials, user numbers, press coverage or partner endorsements. Do not invent any.

## Product Principles

1. From your household to a full basket in as few taps as possible.
2. Every quantity is specific and sourced; that is why people trust the list enough to buy from it.
3. Show what you probably already have, so the list is honest and the basket is the right size.
4. Name the risks plainly, never invent them.
5. Household first, then neighbours.

## Accessibility & Inclusion

- Phone first: design the mobile layout as the primary one, with comfortable touch targets and the main action within thumb reach.
- Print and offline: checklist, kit list and guide pages must print cleanly on A4 in black and white and remain usable without a connection.
- Readers may be anxious; avoid motion or imagery that raises alarm, and meet WCAG 2.2 AA.
