# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Stay Prepared (stayprepared.co.uk), a UK household emergency preparedness
site. Next.js App Router, TypeScript, Tailwind v4. The repo keeps its
original working name, `prepare-website`.

`PLAN.md` holds the project plan and build history. `docs/` is the decision
record, and several of its files are binding rather than informational: see
"The docs are rules" below.

## Commands

```bash
npm run dev      # next dev, port 3000
npm run build    # next build, also the typecheck
npm run lint     # eslint
npm run start    # serve the production build
```

**There is no test suite.** Nothing to run a single test from. Verification
is `npm run build` plus `npm run lint`, then driving the real pages in a
browser. Playwright is the tool used for that; check both 390px and 1280px,
and check for horizontal overflow, which this layout has regressed into
more than once.

## Architecture

### Content is typed data, not JSX

Everything factual lives in `src/data/*.ts` and pages render from it.
Changing a quantity, a scenario or an FAQ answer means editing data, never
markup. `checklist.ts` (what to keep, with amounts and sourcing notes),
`scenarios.ts` (what stops and for how long), `faq.ts`,
`official-guidance.ts` (dated links), `products.ts` (Amazon ASINs).

`Diagram.tsx` draws figures taken from these same files, so a change to
`scenarios.ts` must be checked against the `duration` diagram, which plots
it.

### The planner is a pure function over a URL

`src/data/kit-rules.ts` is the engine. `buildKit(household)` turns a
`Household` into `KitLine[]` plus `KitTask[]`. `householdFromParams` parses
the query string, and `KitPlanner` writes state back with
`history.replaceState`, so **the URL is the planner's storage**. A shared
link has to survive a round trip through both functions; that path has
already carried one silent data-loss bug.

### One shared record of what a household owns

`src/lib/have.ts` holds it: a `Set` of keys in `localStorage`, exposed
through `useSyncExternalStore` so every component on a page updates
together without a provider. Three surfaces read it, and a tick in any of
them counts once:

- `ChecklistTracker` (the record itself, on `/checklist`)
- `KitPlanner` (drops ticked lines from the basket and the copied text)
- `home/StepState` (the counts on the home page's three steps)

`src/data/have-map.ts` maps each planner line id to the checklist item it
covers. Several lines share one item on purpose, so they move together; the
record is deliberately kept at the checklist's coarser granularity.

**Keys are derived, not stored.** `haveKey(categorySlug, item)` slugifies
the item's display name, so renaming an item in `checklist.ts` silently
clears that one tick. Accept that or add explicit ids, but know it.

Every `localStorage` access is wrapped and every page must render correctly
when it throws or returns nothing. `ready` is false until the record has
been read, so counts wait rather than flashing a zero through hydration.

### Server components by default

The client islands are `ChecklistTracker`, `KitPlanner` (with
`kit/StillToGet`), `PrintButton` and the homepage's `home/KitShortcut`,
`home/ReachBar` and `home/StepState`. Everything else is a server component,
including `Diagram.tsx`, which is inline SVG. The site has no photographs
or stock illustrations.

## Styling

**`DESIGN.md` is the design system and it is binding**: the "own-label
larder", adopted 23 September 2026. White paper, near-black ink, heavy
lowercase Archivo (self-hosted through `next/font`), square controls with a
4px maximum radius, and seven category colours. Read it before any visual
change. The direction and why it was chosen are in
`.impeccable/briefs/home.md`; product truth is in `PRODUCT.md`.

The rule most easily broken: **each colour has one meaning on every page,
and a category colour appears only where that category is named** (a tin
label, a checklist category, a kit line). Everything else is ink on paper.
Household-specific lines (babies, pets, older people) take no colour.

Tailwind v4, tokens on `:root` in `globals.css` mapped through
`@theme inline`. Light only; there is no dark mode. The old token names
(`--mint`, `--forest`, `--accent`) survive as aliases that resolve to ink
and paper; use the real names (`paper`, `ink`, `ink-2`, `hush`,
`cat-water` and so on) in new code.

Utilities that do real work: `.wrap` (centred, capped at 1360px, with its
own side padding), `.measure` (65ch), `.display`, `.h-section`, `.h-sub`,
`.btn` / `.btn-primary` / `.btn-secondary` / `.btn-lg`, `.arrow-link`,
`.field`, `.no-print`. Page openers use `PageIntro`, which takes an optional
`aside` for a diagram.

Diagrams are monochrome `currentColor`, drawn in ink on paper, with opacity
for depth on shapes only. Their text labels stay solid so they pass AA.

## The docs are rules

- **`docs/tone-of-voice.md`** governs all copy. Since 24 September 2026
  the site is a **practical prepper** shopping tool: "prepper", "prepping"
  and "stockpile" are allowed, the reasons are named plainly, but never
  tactical, conspiratorial or fear-invented. Plain, short, second person.
  Numbers specific and sourced. Its revision section wins over the rest.
- **`docs/monetisation-plan.md`** (revised 24 September 2026): the product
  is the ready-made list and the one-click basket. Disclosure, Amazon's
  wording, price bands and no fake urgency are binding.
- **`docs/copy-audit.md`** holds the four tests every line has to pass,
  including "would gov.uk say it" and "no flourish at the end of the
  paragraph".
- **`docs/audit-govuk-nhs.md`** records the house-style rules taken from
  the GOV.UK Design System and the NHS service manual, what already passes,
  and one open decision.
- **`docs/research-*.md`** record what was built from each design research
  run, what was rejected and why, and two corrections to earlier findings.
  Read the relevant one before revisiting a decision it covers.
- **`docs/look-and-feel.md`** is superseded on palette and styling by
  `DESIGN.md`. Its diagram rationale still stands.

### Conventions worth knowing before you write

- **No em dashes anywhere**, and ranges take "to" rather than a dash
  ("2.5 to 3 litres", "1 to 3 days"). The NHS rule and a standing
  preference agree here.
- **Status tags are sentence case**, following GOV.UK's move away from
  uppercase.
- **Numbers are currently inconsistent and this is a known open
  decision.** The data files use numerals ("3 days"), the page copy spells
  them out ("three days"). Both style guides want the numerals. Do not fix
  half of it; it is one pass across seven files or none.
- **Figures cite their source where they appear.** Water and food
  quantities come from gov.uk and WHO, and the notes say so.
- `products.ts` entries carry `verified: false` until someone has opened
  the listing by hand.

## Environment note

`.env.local` holds the Unsplash key and, later,
`NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG`. Neither is committed, and the affiliate
tag being absent is a normal local state, not a bug.
