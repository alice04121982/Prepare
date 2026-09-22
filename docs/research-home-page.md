# Home page structure: how this sector opens a task

Research run 22 September 2026. Prompt 3 of the five in
docs/mobbin-mcp-plan.md. Proposal only, held at the review gate. No code
changed.

Full report: https://claude.ai/artifact/A64uoRKhHZG4Qw8AA2mK3M

## What the first search found, which was not what it looked for

Searching for how a product introduces a short step by step task
returned five near-identical marketing sections:
[Apollo](https://mobbin.com/sites/sections/9f272df9-b8f9-4fc9-bdd2-6a297edd7b73)
"How to get started" with 01, 02, 03 and a button;
[OpenPhone](https://mobbin.com/sites/sections/785395c6-a1e0-4b50-8c20-d07a15aef374)
"Ready to get started?" with three numbered cards;
[Amie](https://mobbin.com/sites/sections/6fbc3a73-93b8-4c35-8d6d-f8febfbcd1f5)
"HOW IT WORKS / Ready to get started?";
[Mews](https://mobbin.com/sites/sections/192267a5-39a3-440c-bac1-220e69473600)
"GET STARTED IN THREE EASY STEPS".

Our home page's second section is an eyebrow reading "What to do", a
heading reading "Three things, in this order", and three numbered cards
with an icon, a paragraph and a button each. It is the same object.
Nobody copied anything, which is the point: it is where everyone lands.
The component that could sit on any site is currently in the position of
highest attention on ours.

The thing that actually starts the task, the three field household form
that goes to the planner with the numbers in the URL, is the third
section, inside a dark panel, below all of that.

## The four references worth building on

| Product | Screen | What it does |
| --- | --- | --- |
| Airtasker | [Onboarding, final screen](https://mobbin.com/flows/93cebe6f-786f-412f-99b1-ca941bd2119d) | The task's own input is the hero: "In a few words, what do you need done?", a Get offers button, and two example chips a reader could have typed. |
| Runna | [Today](https://mobbin.com/screens/57dd0758-c29a-49cc-9ec1-cab66ee22485) | The home screen is a state report plus one action. "Week 1 Overview" with two counts, and a single pinned Record workout button. |
| pliability | [This week](https://mobbin.com/screens/e61503ed-0d94-4744-85b5-0368c812d590) | Two named benefits, one Start Test button, then state as plain figures: 0% complete, 2 weeks left, 4 routines left. |
| Apple Fitness | [Summary](https://mobbin.com/screens/5ceeb6ad-9389-457f-a470-ca2ca696235a) | "No sessions recorded" sits as one tile among others. The page does not become an onboarding prompt because part of it is empty. |

Structural alternative worth noting:
[Titan](https://mobbin.com/sites/sections/0d103afa-c85e-4568-a98a-0a1e7cbd5e8f)
does "It's just three steps" as an accordion, one sentence per step. If
the three steps must survive as an explanation, that is the form.

## Proposed structure

The home page should be one task with a visible state, not a menu of
three. That is possible now in a way it was not this morning, because
both pages share a record of what the household has and the home page
can read it.

| # | Section | From |
| --- | --- | --- |
| 01 | **Hero holds the form.** Keep the question and the photograph. Replace the two buttons with the household form from section 03: adults, children, how long, "Build my list". "See the checklist" becomes a quiet secondary link. Below it, two one-tap examples that fill the form: "Two adults, three days" and "A family of four, one week". | Airtasker, for the form in the hero and the worked examples. pliability, for one primary action rather than two competing. |
| 02 | **Where you are, as three rows with counts.** The three steps survive as content, not as that component: "Check what you have, 14 of 30", "Buy what is missing, 16 left", "Tell your neighbours, not started". First visit reads "30 to check", "not started", "not started", as facts rather than prompts. | Runna and pliability for state as counts, Apple Fitness for an empty state that does not take over, Coinbase (report 1) for the row-per-task shape. |
| 03 | **Why three days.** Unchanged. | Already right. |
| 04 | **Offline guide.** Unchanged. | Already right. |
| cut | **The three numbered cards.** Content moves into 02. What goes is the card row itself. | Apollo, OpenPhone, Amie, Mews, as a warning. |
| cut | **The dark "Get the kit" panel.** Its form moves to the hero. Its paragraph about free options and the basket moves to the planner's intro, which also puts the affiliate explanation next to the affiliate links. | Airtasker. |

This makes the home page the third view of one record, alongside the
checklist and the planner.

## Considered and not doing

- **Airtasker's free text field.** It can parse anything typed at it; our
  planner needs counts to compute litres and days. The selects stay, only
  their position changes.
- **"Ready to get started?"** The clearest tell in the four marketing
  sections, and it fails the tone guide's rule on flourishes.
- **A percentage anywhere.** Rejected in report 1, and doubly so here.
- **"Your Preparedness Journey."** A journey implies the site wants the
  reader back repeatedly. It does not. It wants them to buy some tins and
  get on with their life.
- **A persistent bottom action bar,** as Runna has. The site already has
  a floating bar pointing at the "worried" page, aimed at the reader who
  needs it most. Two is one too many.

## Effort and the one risk

Small. The form exists and moves, the cards become rows, and the row with
a count on the right is the component built for the checklist today.

The risk is the state line. Reading the record makes part of the home
page client-rendered and per-browser. It has to degrade to the plain
first-visit copy whenever storage is empty, blocked or throws, and must
not flash a wrong count during hydration. The checklist solves both with
a ready flag, so the fix is known rather than novel, but it is the one
place this proposal can produce a visibly broken page rather than an
unimproved one.

Worth deciding before building: whether the home page should say anything
at all about what the reader has. That is the one proposal here that
changes what the site is, from a page that explains into a page that
remembers. Everything else is rearrangement.

## Limit

Mobbin indexes products, not government services, so "public service and
health" resolved to consumer health and fitness apps. No GOV.UK or NHS
App screen appears in this set. Tonal authority stays with the GOV.UK
Design System; these references are useful for structure.
