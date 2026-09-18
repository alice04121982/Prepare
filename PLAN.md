# Stay Prepared: Project Plan

Name: **Stay Prepared**. Domain stayprepared.co.uk registered 18 September 2026 (the .com, .uk and .co were also free at the time and are worth picking up). Working title was "Prepare"; the repo folder keeps that name.

## 1. Purpose and tone

A practical, non-alarmist website that helps ordinary people understand what to
keep on hand for social disruption — whether the cause is a storm, a supply
shock, a conflict, or something else — and roughly how long different kinds of
preparation will carry a household. The site is not a survivalist or "prepper"
site. The tone is calm, informative, and grounded in the idea that people
mostly help each other through disruption rather than fend for themselves.

Editorial rules that shape every page:
- No fear-based language, countdown clocks, or crisis imagery.
- Every recommendation ties to a real, sourced scenario (e.g. a 72-hour power
  cut, a week of disrupted deliveries), not a vague "the end of the world."
- Framing is "here's what helps and why," never "save yourself."
- Include a running thread about mutual aid, neighbours, and community
  networks — this is explicitly not a save-yourself site.
- Realistic durations and quantities, cited where possible (government
  emergency-preparedness guidance, Red Cross/Red Crescent, FEMA, UK
  gov.uk, etc.), not worst-case numbers.
- Tone follows docs/tone-of-voice.md (approved 18 September 2026): the
  gov.uk Prepare register and Sweden's "If Crisis or War Comes" booklet.
  Open with a question the reader can answer, name hazards once (weather,
  power, water, cyber, conflict in Europe) not ideologies, household first
  then community, sensible safeguards never stockpiling, British and dry.
  Never the macho register of prepper sites.

## 2. Who it's for

- Someone who just read a news story (e.g. the BBC piece that prompted this
  project) and wants a sensible starting point, not a rabbit hole.
- Households with limited time/budget who want a short, prioritised list
  rather than an exhaustive prepper checklist.
- People who want to understand realistic timeframes (how long does a
  72-hour kit actually last a family of four?) rather than guess.

## 3. Core content structure (site map)

1. **Home** — one clear framing statement, three entry points (Start here /
   Build your kit / Understand the scenarios), and a short "why this exists,
   why it's not alarmist" note.
2. **Start Here** — a 5-minute onboarding: household size, home type
   (flat/house), region, dependents (kids, pets, medical needs) → produces a
   tailored shortlist.
3. **Scenarios** — plain-English explainers for the realistic disruption
   types this site plans around (power outage, water disruption, supply
   chain/delivery delays, extreme weather event, local civil disruption),
   each with typical duration ranges and what actually helps.
4. **The Essentials Checklist** — categorised: water, food, power/light,
   first aid & medication, communication, sanitation, important documents,
   cash, pet/child-specific items. Each item states realistic quantity and
   how long it lasts.
5. **Build Your Kit (interactive)** — a checklist/planner tool: pick
   household size + duration target (3 days / 2 weeks / 1 month) and get a
   generated shopping list with estimated cost bands (budget/standard).
6. **Community & Mutual Aid** — why community networks are the most
   effective form of resilience; how to find or start a local mutual aid or
   neighbourhood network; a note on skills-sharing (first aid, repair,
   childcare swaps).
7. **Myth-busting / FAQ** — addresses common misconceptions, distinguishes
   sensible preparation from panic-buying, and explains why hoarding is
   counterproductive.
8. **Official Guidance** — live, dated links to what the UK government and
   public bodies currently say (Prepare campaign, Emergency Alerts, Met
   Office, flood warnings, 105 and the Priority Services Register, NHS,
   National Risk Register). Every link carries a "last checked" date. The
   contrast with prepper sites that hand out decades-old survival PDFs is
   deliberate. Data in `src/data/official-guidance.ts`.
9. **Sources & Methodology** — full citation list and an explanation of how
   duration/quantity estimates were derived, so the site is auditable and
   trustworthy.

## 4. Tech approach

- **Framework:** Next.js (App Router) + TypeScript + Tailwind CSS — already
  scaffolded in this repo.
- **Content:** MDX or simple structured JSON/TS data files for
  scenarios/checklist items, so content can be edited without touching
  component code.
- **Interactive planner:** client-side only at first (no login, no backend) —
  household inputs → generated list, using local component state. Can add
  "save/share your list" later (URL-encoded state, no accounts needed).
- **Hosting:** static export or Vercel/Netlify free tier; GitHub Pages is
  also viable if fully static.
- **Analytics:** privacy-respecting only (e.g. Plausible) if any at all —
  keep in line with the non-alarmist, non-exploitative tone.

## 5. Build phases

**Phase 0 — Foundations**
- [x] Project folder + git repo created
- [x] Next.js/TypeScript/Tailwind scaffold
- [x] Push to GitHub
- [x] Confirm final name (Stay Prepared); tagline still open
- [x] Tone of voice guide: docs/tone-of-voice.md

**Phase 1 — Content skeleton**
- [x] Write Scenarios copy (5 scenario types, realistic durations) —
      `src/data/scenarios.ts`; inline sources still to be added
- [x] Write Essentials checklist data (categories, items, quantities,
      shelf life) — `src/data/checklist.ts`
- [x] Draft Community & Mutual Aid page
- [x] Draft Myth-busting/FAQ — `src/data/faq.ts`

**Phase 2 — Core pages**
- [x] Home page (framing statement, three entry points, non-alarmist note,
      scenarios at a glance, offline download)
- [ ] Start Here flow (static first, no logic) — not yet created; home
      page currently points "Start here" at the Checklist
- [x] Scenarios page
- [x] Essentials Checklist page
- [x] Community page
- [x] FAQ page
- [x] Official Guidance page (links verified 2026-09-18; re-check quarterly)
- [ ] Sources page — **still placeholder** (styled, short methodology
      note, citation list to be written)
- [x] Shared layout: header nav, footer, design tokens, PageIntro/Callout
      components (`src/components/`)

**Phase 3 — Interactive planner**
- [x] Build Your Kit tool: household inputs (adults, children, under-3s,
      over-65s, dogs, cats, medical needs, flat or house, 3/7/14 days) →
      quantified list with a free option per line and a "get first" flag.
      Rules in `src/data/kit-rules.ts`, UI in `src/components/KitPlanner.tsx`.
      State lives in the URL so a list can be shared.
- [x] Cost bands per product (budget and standard)
- [x] Copy as plain text and print
- [ ] Amazon "add everything to basket" button: mechanism built
      (`amazonBasketUrl`, needs `NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG`); appears
      once products carry verified ASINs. Populate ASINs by hand, never guess.
- [ ] Supermarket baskets (Tesco, Sainsbury's, Asda, Ocado): no public
      add-to-basket links exist. Route is a Samsung Food (Whisk) shoppable
      partnership, as BBC Good Food uses. Phase-two conversation.
- [ ] Kit pages by household type (flat, family of four, older relative,
      with a baby, with a dog), pre-filled planner links with commentary

**Phase 4 — Polish & launch**
- [ ] Accessibility pass (contrast, keyboard nav, screen reader labels)
- [ ] Mobile-first responsive check
- [ ] Source citations linked inline
- [ ] Deploy to hosting, connect custom domain if desired
- [ ] Light analytics (optional, privacy-respecting)

**Design and imagery (2026-09-18)**
- [x] Visual system taken from the "Prepare App" Figma file
      (figma.com/design/oSzUwrqcukRt4CUQnbSKyx): mint hero #a0f1bd,
      pale-mint cards #d2f8dc, forest-green buttons/footer #2e4f21,
      off-white page #f9f9f9, pill buttons and tags, rounded-card panels.
- [x] Illustrations from Streamline's free "Minimal" set via the Figma
      community file (Alice's choice), in `public/illustrations/` with a
      node map in its README. Free tier is 400px PNG, so they are shown at
      380px or less. Attribution to streamlinehq.com is a licence
      condition and sits in the footer and on Sources. Rendered by
      `src/components/Illustration.tsx`, which falls back to a soft
      placeholder for any missing name.
- [ ] Better matches for Checklist, Build Your Kit, and Sources intros:
      the Figma MCP only sees pages open in the desktop app, so open the
      Home, Health, Shopping, or Weather category pages and re-pick.
- [ ] Dark-mode pass: black line art on dark panels needs inverting or a
      light backing shape.

**Content notes (2026-09-18)**
- Six scenarios now, including armed conflict drawn from Ukraine since
  2022. It stretches the "short, common disruption" framing on purpose and
  says so in its own copy.
- Product links: maker's own site only, never a retailer, no affiliate
  links, only things actually used. Jackery power station and solar panel
  are the first examples. Disclosure callout sits on the Checklist page.
- Scenarios, checklist, and the first three FAQ entries mirror the
  offline guide. When either side changes, update the other.
- Guidance is UK-first (105 power-cut number, Priority Services Register,
  Met Office, gov.uk flood warnings). Regionalisation is an open question.

## 6. Open questions for Alice

- ~~Final name/domain for the site?~~ Stay Prepared, stayprepared.co.uk.
- Which region(s) to prioritise first for guidance (UK-specific advice
  reads differently from US/FEMA-style advice) — start UK-first given
  Cambridge base?
- Any budget for a domain/hosting, or keep it fully free-tier to start?
- Do we want a donation/no-monetisation stance stated explicitly on the
  site (fits the non-alarmist, non-exploitative tone)?
  See docs/competitor-review.md for how TruePrepper and The Prepared
  monetise (affiliate, courses, kits) and the options table.

## 7. Typography

Font pairing (from Fontshare, both free): **General Sans** for headings,
**Switzer** for body text. Both are clean geometric-humanist sans fonts —
reads as calm, modern, and trustworthy rather than either corporate-cold or
survivalist. Loaded via Fontshare's CSS API in `src/app/layout.tsx`, with
CSS variables `--font-heading` / `--font-body` set in `globals.css`.

## 8. Offline access

Added `public/offline/index.html`: a single self-contained HTML file (no
external fonts, scripts, or requests) covering scenarios, the essentials
checklist, community/mutual aid, and myth-busting. It's linked from the
home page as "Download the offline guide" so people can save, print, or
share it before a disruption happens, and it will still open and read
correctly with zero internet connection. Content should be reviewed and
expanded alongside the main site pages as those are built out — the two
should stay in sync.
