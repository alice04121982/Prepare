# Mobbin MCP plan

Written 22 September 2026. Source: Elizabeth Alli (DesignerUp), "I Connected
Mobbin MCP to AI", her companion written guide, the Mobbin MCP docs, and a
second practitioner write-up (João Queirós). The YouTube transcript would not
load in the built-in browser, so the video's content comes from the written
guide, the chapter list and the comment thread.

## Why this matters for Stay Prepared

On 18 September the layout work (docs/layout-patterns.md) could not read
Mobbin: every pattern page returned 403 without a login. The patterns in that
doc are the ones Mobbin's collections are "known for", not ones anyone looked
at. The MCP lets Claude search Mobbin's 600,000+ real screens and flows
directly, so design decisions can cite shipped products instead of a model's
idea of what is typical.

## What the video shows, and what the comments say

The video covers five uses, in order:

1. Pull in real examples. "Analyse the top rated onboarding flows from Mobbin
   and give me 4 examples."
2. Copywriting and microcopy. "What patterns help users recover from mistakes
   faster?"
3. Analyse and generate. Study a category (dashboards) and produce an original
   design that follows the best practice found.
4. Audit against Figma. Read a Figma file with the Figma MCP and compare its
   structure and content side by side with common landing pages on Mobbin.
5. Send back to Figma. Generate a redesign from the audit and push it to Figma.

The comment thread is a useful warning. Several viewers say the final landing
page looked like ordinary AI output, and one points out that the microcopy
step never visibly called Mobbin at all. Another asks what "top" means (most
common, best rated, most successful?). The lesson: vague prompts get generic
results even with good references. The value comes from forcing the agent to
cite specific screens and explain the choice, and from a human review gate
before anything is built.

## Setup (one time, about five minutes)

Requires a paid Mobbin plan (Pro or Team).

1. In a terminal, run
   `claude mcp add mobbin --scope user --transport http https://api.mobbin.com/mcp`.
   User scope means every project and every site gets it, not just this repo.
2. Start `claude` in a terminal, type `/mcp`, select mobbin, choose
   Authenticate and sign in to Mobbin in the browser window.
3. In a new session, check it: "Are you connected to the Mobbin MCP? List the
   Mobbin tools available." Note the real tool names in this doc.

As of today this session lists mobbin as configured but not authenticated,
so step 2 is the one outstanding.

## How to get intentional, accurate outputs

Every Mobbin prompt should carry five things. Without them the agent falls
back on generic taste.

1. **The job and the reader.** "A UK household, not a prepper, checking what
   to keep at home for a few days." Not "a landing page".
2. **A defined category and a defined 'best'.** Name the apps or sectors to
   search (GOV.UK style services, NHS app, banks, insurers, utilities, Monzo,
   Citymapper) and say what "best" means (clearest to a first-time visitor,
   fewest steps, most accessible), rather than "top".
3. **Citations required.** "For each pattern, name the app and screen it came
   from. If you did not retrieve it from Mobbin, say so."
4. **A report before a build.** "Produce a visual HTML report of the examples,
   the patterns they share and a proposed structure. Do not change any code
   yet." Alice reviews, then says go.
5. **Our constraints win.** "Keep to docs/tone-of-voice.md, the slate, navy
   and safety blue palette, the 68 character measure and the existing
   components. Take principles from the references, not their look."

## Workflow for each piece of work

1. **Research.** Mobbin search with the five points above. Output: an HTML
   report published as a private artifact, with screenshots, sources and a
   short "what this means for us".
2. **Review gate.** Alice keeps, cuts or redirects. The agent asks questions
   before proceeding.
3. **Audit.** Compare the live page (or the Figma file oSzUwrqcukRt4CUQnbSKyx)
   against the chosen references, section by section, as a table: ours,
   pattern seen, apps seen in, recommended change, effort.
4. **Build.** Change the code on a branch, one section at a time, and say
   which reference informed each change.
5. **Verify.** Screenshot at phone and desktop width, check against the
   report, then record what was decided in docs/.
6. **Optional Figma round trip.** Push the result to Alice's drafts for
   hand refinement (margins and spacing are where AI output needs "a
   designer's touch", as the guide itself admits).

## The five prompts, adapted for Stay Prepared

Run in this order. Each one feeds the next.

**1. Patterns and flows (checklist and kit builder).**
"Using the Mobbin MCP, find 6 to 8 real checklist, progress tracker and
guided set-up flows from public services, health, banking and insurance apps.
Best means clearest for a first-time visitor on a phone with the fewest
steps. For each, name the app and screen, show it, and say what it does well.
Then list the patterns at least three of them share. Compare with our
/checklist and /build-your-kit pages. Report only, no code changes."

**2. Microcopy.**
"Using the Mobbin MCP, find real examples of empty states, progress
messages, saved confirmations and error recovery in public service and health
apps. Cite each one. Then rewrite the equivalent lines on our site, following
docs/tone-of-voice.md (gov.uk register, second person, no jokes, no alarm).
Show was, now and the reference that informed it, in the same table format as
docs/copy-audit.md."

**3. Analyse and generate (home page and 'three steps').**
"Using the Mobbin MCP, study how public service and health apps introduce a
short, step by step task to a first-time visitor. Propose an original
structure for our home page that applies what you found within our design
system. Explain which reference informed each section."

**4. Audit against Figma.**
"Read the Prepare App Figma file (oSzUwrqcukRt4CUQnbSKyx) with the Figma
MCP. Do a side by side audit of its structure and content against civic and
public information landing pages on Mobbin. Output a table: section, ours,
common pattern, apps seen in, recommended change, effort."

**5. Back to Figma.**
"From the approved audit, create a revised home page frame in my Figma
drafts using the existing palette and components, so I can refine it by
hand before we build it."

Also worth doing once: re-run docs/layout-patterns.md against real Mobbin
screens and mark each pattern as confirmed or changed.

## Rolling it out to the other sites

1. **User scope install** (step 1 above) makes Mobbin available in every
   project with no further setup.
2. **A reusable skill.** Turn the five point prompt frame, the report,
   review, audit, build, verify loop and the output formats into a personal
   Claude Code skill in ~/.claude/skills/mobbin-research/. Each site then
   only supplies its own inputs: audience, sector to search, tone doc and
   design tokens.
3. **A short brief per site.** Each repo gets a docs/design-brief.md with
   those inputs, so the skill has something to hold the output to. Stay
   Prepared already has most of this across tone-of-voice.md,
   layout-patterns.md and the palette.
4. **Shared findings.** Patterns that hold across sites (checklists, empty
   states, error recovery, trust and disclosure pages) go in one shared
   file so each site does not re-research them.

The other sites are not in ~/Documents alongside this repo, so their names,
locations and audiences are still needed before step 3.

## Limits to keep in mind

- Mobbin shows what shipped, not what worked. It cannot say why a product
  chose a pattern or whether it performed. It does not replace talking to
  users or an accessibility check.
- Mobbin is mostly apps and commercial products. Civic information sites
  are thinly covered, so GOV.UK and NHS design systems stay the primary
  reference for Stay Prepared. Mobbin adds the phone-first interaction
  detail.
- References are for principles. Do not copy a screen's look.
