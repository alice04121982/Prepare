# Audit against GOV.UK and the NHS service manual

23 September 2026. Replaces prompt 4 of docs/mobbin-mcp-plan.md, which
could not run: the Figma file it names is a Noble Finance template, and
Mobbin holds no civic pages to audit against. Both recorded in
docs/research-figma-audit.md.

This audits the live site against the two references that are actually
authoritative for this register.

## A limit on this audit, stated first

**Neither design system could be read directly.** This session's egress
policy blocks `design-system.service.gov.uk` and `service-manual.nhs.uk`,
the same way it blocks `mobbin.com`. Everything below comes from search
results that quote those pages, so the rules are quoted at one remove.
Each finding names its source page. Anyone with an unrestricted
connection should confirm the two "fixed" rows against the source before
treating this audit as complete.

Sources used:

- [Task list component](https://design-system.service.gov.uk/components/task-list/)
  and [Complete multiple tasks](https://design-system.service.gov.uk/patterns/complete-multiple-tasks/)
- [Accordion](https://design-system.service.gov.uk/components/accordion/)
  and [Details](https://design-system.service.gov.uk/components/details/)
- [GOV.UK A to Z style guide](https://www.gov.uk/guidance/style-guide/a-to-z-of-gov-uk-style)
- [NHS numbers, measurements, dates and time](https://service-manual.nhs.uk/content/numbers-measurements-dates-time)

## Passes, worth recording

| Rule | Source | Where we already meet it |
| --- | --- | --- |
| "Use 'to' for time, date and numerical ranges, not hyphens or dashes." | NHS | "2.5 to 3 litres", "Children (3 to 17)", "3 to 7 days", "£5 to £12". One exception, now fixed below. |
| "Do not use an accordion for content that all users need to see." "Test your content without an accordion first." | GOV.UK accordion | The checklist's categories are `<details open>`: collapsible, but nothing hidden on arrival. This is the deviation made when building the first research run, where Target collapses 85 items by default. GOV.UK is explicit that Target's pattern is wrong for content everyone needs, so the deviation now has an authority behind it rather than just a judgement. |
| "Do not use the details component to hide information that the majority of your users will need." | GOV.UK details | The FAQ at the bottom of the checklist is the only closed `<details>` on the site, and answers to individual questions are supplementary by definition. |
| Metric units, imperial only in brackets and never for dosage. | NHS | Litres and grams throughout, no imperial anywhere. |
| Error copy names the failure and what to do next, without apology. | GOV.UK error message style | The copy button failure and the Aldi note, both from the second research run. |

## Fixed

| Rule | Source | Was | Now |
| --- | --- | --- | --- |
| Ranges take "to", not a dash. | NHS | `src/data/scenarios.ts`: "a small share last 1–3 days", the only en dash in the codebase. | "a small share last 1 to 3 days". |
| Task list statuses are sentence case. GOV.UK moved them out of uppercase "to make them easier to read". | GOV.UK task list | The checklist's "First" badge was `uppercase tracking-wider`, rendering as "FIRST". | Sentence case "First". |

## For Alice to decide

### 1. Numbers: the site disagrees with itself, and with both style guides

GOV.UK: write numbers in numerals including 2 to 9, using "one" as a word
only where a numeral would read strangely, and spelling out a number that
starts a sentence. NHS is firmer still: numerals including 1 and 2 for
statistics, time, measurements, lists, points and steps, "as people find
numerals easier to read and scan for".

The data files already follow this. `checklist.ts` has "3 days as a
minimum" and "3 to 7 days per person"; `scenarios.ts` has "9-litre
stock".

The page copy does the opposite:

| File | Line |
| --- | --- |
| `src/app/page.tsx` | "shut for three days, would you be all right?", "manage on its own for three days", "Three days, the government minimum", "Two weeks", "Two adults, three days" |
| `src/components/SiteHeader.tsx`, `SiteFooter.tsx` | "Why three days?" |
| `src/components/KitPlanner.tsx` | "Three days is the government minimum. Seven covers most storms and outages. Fourteen is for a long disruption." |
| `src/app/why/page.tsx` | "Why the government asks you to be ready for three days" |
| `src/data/faq.ts` | "eighteen litres", "nine litres", "the six-litre pack", "a three-day stock" |

So a reader meets "3 days" in the checklist table and "three days" in the
heading above it. By both style guides the numerals are right, and "3
days" is what gov.uk itself writes.

This is not a compliance fix to apply quietly. It changes approved copy,
including the hero question, and the tone guide's own sample copy is
written in words. **It is one decision, applied everywhere or nowhere**,
because half-doing it is what produced the current inconsistency. Say the
word and it is a single pass across seven files.

### 2. Item names set in uppercase

`KitPlanner.tsx` renders each product card's item name as
`uppercase tracking-wider` ("DRINKING WATER"). Section eyebrows in
uppercase are a deliberate part of the site's look and are not in
question; this is different, because it is content rather than a label,
and long strings of capitals are measurably harder to read. Left alone
because it is a visual design decision, not a rule breach.

## What this audit does not cover

Accessibility testing with a screen reader, colour contrast measurement,
and the GOV.UK service standard's research requirements. None of those
can be done from a style guide, and two of them cannot be done from this
environment at all.
