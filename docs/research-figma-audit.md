# Prompt 4 cannot run as written, for two reasons

22 September 2026. Prompt 4 of docs/mobbin-mcp-plan.md asks to read the
Figma file `oSzUwrqcukRt4CUQnbSKyx` and audit its structure and content
against civic and public information landing pages on Mobbin. Both
halves of that fail, independently. Recorded here so the next session
does not rediscover it.

## 1. That Figma file is not this site

The Figma MCP is connected and the file opens. It is not Stay Prepared.
It is a green template for **Noble Finance**, a tax filing and
bookkeeping business.

Top-level structure of page 0:1:

| Section | Frames | What it is |
| --- | --- | --- |
| `/services` | Desktop, Tablet, Mobile | Noble Finance services |
| `/booking` | Desktop, Tablet, Mobile | Noble Finance booking |
| `Home` | Desktop, Tablet, Mobile | "Financial Clarity You Can Trust", tax preparation and filing, IRS audit assistance, bookkeeping and accounting, "Hear From Our Happy Clients" |
| `Scenarios` | Desktop, Tablet, Mobile | Stay Prepared content grafted on top |
| `Styles` | one page | A generic template style sheet: Background 1 to 6, Accents 1 and 2, Dividers 1 and 2, lorem ipsum paragraphs |

Only the `Scenarios` frames carry anything of ours: a "Potential
scenarios" header and the "What disruption actually looks like" six item
grid, sitting above an otherwise untouched Noble Finance page, with the
Noble Finance nav, footer, palette and photography below it.

Nothing else matches. The palette is mint green against the site's
slate, navy and Safety Blue. The `Styles` page is a bought template's
system, not ours. There is no checklist, no planner, no home hero.

So the file cannot be audited as "the Prepare App Figma file". Either
the key in the plan is wrong, or this file is an abandoned starting
point that the live site long outgrew. **This needs Alice's answer
before prompt 4 or prompt 5 can run**, and prompt 5 especially, since it
would push a generated redesign into somebody's drafts.

## 2. Mobbin has no civic landing pages to audit against

The plan already warned that Mobbin's civic coverage is thin. Two
searches aimed directly at the sector settle it.

"Public information landing page explaining what to do when an essential
service fails" returned
[incident.io](https://mobbin.com/sites/sections/1dd966ac-1014-494e-b413-3bf276e9e462),
[Zendesk](https://mobbin.com/sites/sections/6d063279-de84-4ca7-88f6-a9c85acc569a),
[Better Stack](https://mobbin.com/sites/sections/8f9217b8-081f-4fa5-957a-5cadaf07024c)
and
[Antimetal](https://mobbin.com/sites/sections/28ce9033-3455-412a-b25a-d80eda692670).
All four are B2B incident management tools. "Essential service fails"
resolves to server outages, not water supply.

"Charity or nonprofit homepage hero with a clear single call to action
and no sales language" returned
[Contractbook](https://mobbin.com/sites/sections/396f8efa-7394-4949-8f7d-27755156fb83),
[monday.com](https://mobbin.com/sites/sections/658827c4-0f83-4359-8562-d2ba0e43266d),
[PayPal](https://mobbin.com/sites/sections/baa86742-e77d-41df-8c61-d845c7b96d65)
and [Notion](https://mobbin.com/sites/sections/0758da30-16e2-47f0-9581-8f67f18ff114):
four SaaS companies' nonprofit discount pages. Every one of them is
selling something, which is the single thing this site must never do.

Across all four research runs, five sectors and fifteen searches, Mobbin
has produced no government, council, NHS or public information page.
This is not a query problem. It is what the index holds. **Treat this
line of research as closed**: Mobbin is useful here for interaction
detail in health, banking and retail apps, which the first three runs
proved, and useless for civic register or civic page structure, where
the GOV.UK and NHS design systems remain the only real references.

One crossover worth keeping:
[Zendesk's status page](https://mobbin.com/sites/sections/6d063279-de84-4ca7-88f6-a9c85acc569a)
lists each service with "No active incidents" and a three state legend,
then ends on "Having an issue that is not reported above? Tell us." That
is the same neutrality as Apple Health's checklist from the first run,
applied to a list of systems rather than a list of supplies, and it is
the closest structural analogue to our checklist in the whole index.

## Recommended replacements

1. **Instead of prompt 4**, audit the live site against the GOV.UK
   Design System and the NHS digital service manual directly. Both are
   open, both are the actual authority for this register, and neither
   needs Mobbin. This is the audit the plan wanted; only the reference
   set was wrong.
2. **Instead of prompt 5**, generate a Stay Prepared Figma file from the
   live site rather than editing the Noble Finance template. The Figma
   MCP can create a file and push frames into it. That gives Alice
   something to refine by hand that actually matches what is shipped.
   Not started: creating a file in someone's Figma account is Alice's
   call, not mine.
