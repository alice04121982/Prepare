# Prepare — Project Plan

Working title: **Prepare** (placeholder — see naming options below)

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
8. **Sources & Methodology** — full citation list and an explanation of how
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

**Phase 0 — Foundations (this week)**
- [x] Project folder + git repo created
- [x] Next.js/TypeScript/Tailwind scaffold
- [ ] Push to GitHub
- [ ] Confirm final name + tagline
- [ ] Draft content tone/voice guide (1 page)

**Phase 1 — Content skeleton**
- [ ] Write Scenarios copy (5 scenario types, realistic durations, sources)
- [ ] Write Essentials checklist data (categories, items, quantities,
      shelf life)
- [ ] Draft Community & Mutual Aid page
- [ ] Draft Myth-busting/FAQ

**Phase 2 — Core pages**
- [ ] Home page
- [ ] Start Here flow (static first, no logic)
- [ ] Scenarios pages
- [ ] Essentials Checklist page
- [ ] Community page
- [ ] FAQ page
- [ ] Sources page

**Phase 3 — Interactive planner**
- [ ] Build Your Kit tool (household size + duration → shopping list)
- [ ] Cost-band estimates
- [ ] Printable/exportable list (PDF or plain text)

**Phase 4 — Polish & launch**
- [ ] Accessibility pass (contrast, keyboard nav, screen reader labels)
- [ ] Mobile-first responsive check
- [ ] Source citations linked inline
- [ ] Deploy to hosting, connect custom domain if desired
- [ ] Light analytics (optional, privacy-respecting)

## 6. Open questions for Alice

- Final name/domain for the site?
- Which region(s) to prioritise first for guidance (UK-specific advice
  reads differently from US/FEMA-style advice) — start UK-first given
  Cambridge base?
- Any budget for a domain/hosting, or keep it fully free-tier to start?
- Do we want a donation/no-monetisation stance stated explicitly on the
  site (fits the non-alarmist, non-exploitative tone)?
