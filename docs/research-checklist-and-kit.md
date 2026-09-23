# Checklist and kit builder: what shipped products do

Research run 22 September 2026. Prompt 1 of the five in
docs/mobbin-mcp-plan.md, run on the Mobbin MCP now that it is
authenticated. Report only. No site code was changed.

Full report with the design reasoning:
https://claude.ai/artifact/EUeKqGto2nzA3RHqu432F8

## Method

Five searches across iOS and web: guided set-up with a checklist of
remaining steps, task lists with tickable items and a progress
indicator, short questionnaires that produce a personalised plan,
shopping lists grouped by category, and multi-step applications showing
what is complete. "Best" was defined as clearest to a first-time visitor
on a phone with the fewest steps, not most popular. Every screen below
was read from its image, not from the metadata.

Screens could not be downloaded into the report: this environment's
egress policy denies mobbin.com, so curl gets a 403 from the proxy. The
report links to each screen instead.

## The eight references

| Product | Screen | What it does well |
| --- | --- | --- |
| Apple Health | [Health Checklist](https://mobbin.com/screens/28a851b4-8f4d-4502-bec1-b74d67a4f50c) | A preparedness checklist that never raises its voice. Status per item, dated, and the gap ("No emergency contacts") stated in the same grey as everything that is fine. |
| Coinbase | [Start a new application](https://mobbin.com/screens/86bf2576-80c8-4204-bee8-98aaf3ec0498) | The GOV.UK task list outside government. "25% complete" over per section counts ("0 / 12 questions completed"), a written promise that it is saved, FAQ beside the task. |
| Target | [Registry checklist](https://mobbin.com/screens/5c2bd4eb-0deb-413f-976c-133844fe32e1) | 85 items that do not feel like 85. Every category collapsed to one row carrying its own count. |
| Linktree | [Completing setup checklist](https://mobbin.com/flows/e8a1aab9-185f-4c4c-a414-6b7c46a400ce) | One step open, the rest struck through. An explicit Skip, and a small "17% set up" ring as the persistent entry point. |
| Origin | [Set up guide](https://mobbin.com/flows/d1c88901-0ec4-4281-bc3d-9cccd3cd1560) | Same accordion, confirmed in finance. Completed items sink to the bottom rather than vanish. |
| Turo | [List your car](https://mobbin.com/screens/d1f5a3aa-ffb1-4886-abb8-75ea4ce3130f) | "1 of 9 steps", then "Next: Your goals", then "Start over", with "View all steps" beside the bar. Names what is coming. |
| Centr | [Shopping list](https://mobbin.com/screens/3b5a73a0-bb8d-4cab-b9cf-b50686d23303) | Quantity right aligned in its own column, source of the list shown above it, add-your-own inside each category. |
| Amazon Shopping | [Shopping list](https://mobbin.com/screens/80e787c9-d870-4bba-81f5-5b9fd06075bb) | The shop is a view of the same list, not a second list. Every row says why it is there. |

Supporting: [Apple Watch Safety](https://mobbin.com/screens/a2de2c3c-c949-4c42-9336-ef7f42b803fd),
[Kitchen Stories](https://mobbin.com/screens/aba5066d-4566-433a-a1f1-65945d719160)
("Unmark all items"),
[GoHenry](https://mobbin.com/screens/8c96f881-62da-4f5f-842d-0325a3e06555)
("Untick all tasks"),
[Lifesum](https://mobbin.com/flows/b162aad4-2314-42c2-9f18-e674d62fb299)
("Question 6 of 7", and a sources link on the plan it produces).

## Patterns at least three of them share

1. **A count, not only a bar** (5 of 8). A fraction next to the bar, and
   a second fraction on each section. A percentage says how far; a count
   says how much is left, which is what someone stocking a cupboard is
   asking.
2. **Ticking is reversible, undoing is one control** (5 of 8). Ticked
   items are struck through or greyed, never removed, with one visible
   way to clear everything.
3. **Collapsed by default, one thing open** (4 of 8). Titled rows
   carrying their own count, at most one section expanded.
4. **The state is saved, and the page says so** (4 of 8). Coinbase
   writes the promise out; Linktree and Origin prove it with a small
   progress marker on the home screen.
5. **Every line says why it is on the list** (4 of 8). Amazon names the
   recipe and the amount, Apple Health gives each item a sentence of
   purpose, Lifesum links its sources.
6. **An explicit way out of every step** (4 of 8). Skip, Dismiss, Maybe
   later, Start over. Skipping is never a failure state.
7. **Gaps are stated in the same voice as the rest** (3 of 8). Neutral
   chips and grey lines, not red badges. The most important finding for
   this site's tone.

## Where our two pages sit

Read from src/app/checklist/page.tsx and src/components/KitPlanner.tsx
as they stand on main.

| Pattern | /checklist | /build-your-kit |
| --- | --- | --- |
| A count | None anywhere on the page | None. A 40 line list gives no sense of progress |
| Reversible ticking | Nothing is tickable | Already correct: the line stays, struck through |
| Collapsed, one open | Every category is a fully expanded 3 column table, a sideways scroll on a phone | Not applicable |
| Saved, and says so | Nothing persists | Household is in the URL, which is good, but announced in one small grey line |
| Every line says why | Done well. The notes column is exactly this | Already correct: every line carries its `basis` |
| Neutral voice on gaps | Nothing has a status, so nothing alarms. Correct by omission | Same |
| One list, several views | Not applicable | "Your list" and "Buy it" are separate tabs |

One idea is missing from both. Every reference is a record of what
someone has done, kept between visits. We ask people to stock a cupboard
over several weeks, the longest running task of any product in this set,
and we are the only one that remembers nothing.

## Two corrections to the first reading

Made after re-reading src/components/KitPlanner.tsx line by line while
building. The report published on 22 September carried both errors.

1. **The planner never deleted a ticked line.** In the list tab a ticked
   item stays where it is at 50% opacity with the text struck through and
   the checkbox still ticked, so it was always reversible. What a tick
   removes is the line's place in the Buy tab and in the copied text,
   which is the intent. Recommendation 4 below was therefore already
   done.
2. **Planner quantities were already sourced.** Every line renders its
   `basis` field underneath, which is exactly the "why is this on the
   list" the references do well. Recommendation 7 below applied to the
   checklist, not to the planner.

Neither changes the main finding. Nothing persisted between visits, and
neither page carried a count.

## Recommendation

Make the checklist the record and keep the planner the calculator. One
shared store of what a household already has, held on the device, read
by both pages. Ticking in either place counts once.

1. A status line at the top of the checklist in Apple Health's register:
   what you have, out of what, and the one thing most worth getting
   next. No percentage in the site header.
2. Categories collapse, each carrying its own count, built on the
   `<details>` element the FAQ on that page already uses. This fixes the
   phone layout at the same time.
3. Real checkboxes on every item. Ticked items greyed and struck through
   in place, never removed, with one "Clear all ticks" control.
4. The planner greys instead of deletes. "Have" items stay on the list
   and drop out of the basket and the copied text, not out of the page.
5. Say that it is saved, and where: kept on this device only, never sent
   anywhere. Coinbase's save promise and the honest privacy answer at
   once.
6. Quantity gets its own right aligned column with tabular numerals.
7. Cite the water and food figures where they appear, as Lifesum links
   its sources.

Rejected, with reasons:

- **Turning the planner into a wizard.** Turo's nine steps exist because
  listing a car needs nine screens of data. Ours is eight counters that
  fit on one screen, and a civic site should not make people answer
  questions before it tells them anything.
- **A persistent progress ring in the site header.** A number about your
  household's safety following you around every page reads as nagging on
  this subject in a way "17% set up" does not on a link tool.
- **Streaks, days completed and badges** (QUITTR, Liven). Built on
  urgency. Directly against the tone this site holds.
- **Merging "Your list" and "Buy it" into one Amazon-style view now.**
  The right end state, but it changes the affiliate surface and the
  products data, so it deserves its own piece of work.

## What was built

Approved 22 September and built the same day. `src/lib/have.ts` holds one
record of what the household has, keyed by checklist item, in this
browser's local storage. `src/data/have-map.ts` maps each planner line to
the checklist item it covers, so a tick in either place counts once.

Done: the status line (1), per category counts (2), real checkboxes with
a Clear all ticks control (3), the saved-state sentence (5), and the
quantity as its own right aligned column in tabular numerals (6). Items 4
and 7 were already correct, per the corrections above.

Two deviations from the recommendation as written:

- **Categories stay open by default.** Target collapses because it holds
  85 items across 10 categories. Ours is 30 across 9, and collapsing them
  by default would hide the reference content the page exists to give.
  The count sits on every category heading and the reader can collapse
  what they have finished, which is the part of the pattern that carries
  over.
- **No shadcn components were used.** The three the report named turned
  out not to be needed: `<details>` is already this page's accordion, the
  planner already uses a native checkbox, and the recommendation is a
  count rather than a bar. Native elements are also the more accessible
  choice here, and it keeps this work independent of the shadcn setup in
  #6.

Verified with Playwright at 390px and 1280px: no horizontal overflow on
either page, ticks survive a reload, and a tick in the planner shows up
in the checklist's count. Build and lint pass.

Original build note: three shadcn components cover it, Checkbox, Progress and
Accordion, each with `bg-muted` replaced by `bg-soft` per the ui-builder
rules. Wrap every localStorage access in try/catch and render correctly
when it throws. At phone width the checklist table should become one
block per item rather than a sideways scroll. Ticking must be keyboard
operable, with the per category count in the summary so a screen reader
gets what the eye gets.

## Limits

- Mobbin's civic coverage is thin, as docs/mobbin-mcp-plan.md warned.
  Nothing from GOV.UK, the NHS App or any UK public service appeared in
  five searches. Coinbase's task list is a descendant of the GOV.UK task
  list, so the primary source for that pattern stays the GOV.UK Design
  System, with Coinbase as evidence it holds up outside government.
- Mobbin shows what shipped, not what worked. Nothing here says whether
  people finished Target's 85 item checklist.
- Worth doing next: the patterns in docs/layout-patterns.md that were
  written from what Mobbin collections are "known for", back when the
  site returned 403 without a login, can now be checked against real
  screens and marked confirmed or changed.
