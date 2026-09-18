# Layout patterns for wide screens

Written 18 September 2026 after the move to a full-bleed layout with 40px
side padding made several sections look stretched.

## What was checked

- Mobbin (mobbin.com) is a paid pattern library. Its pattern and app
  pages return 403 without a login, so nothing could be read from it
  directly. The patterns below are the ones its civic, health and
  finance collections are known for, cross-checked against sources that
  are open.
- GOV.UK Design System, layout: default maximum page width 1020px, "no
  more than 75 characters per line", two-thirds or two-thirds-and-one-
  third columns for most pages.
- NHS Design System, layout: default maximum 960px, lines "no longer than
  70 to 80 characters", a fluid full-width container for backgrounds and
  a separate `reading-width` utility to cap text inside it.
- prepare.campaign.gov.uk itself uses the GOV.UK 1020px container.

## The principle

Full bleed is for backgrounds. Content is capped. The two are different
layers, and the mistake was letting one setting control both.

- Panels, photo bands and the footer run edge to edge with 40px padding.
- Inside them, content sits in a centred container capped at 1440px.
- Inside that, running text sits in a measure of about 68 characters.
- Headings get their own measure, about 18 characters for display sizes,
  so a six-word question does not become one line across the screen.

## Patterns applied, by section

| Section | Problem at 1900px | Pattern | Where |
| --- | --- | --- | --- |
| Hero | Heading ran to one line, illustration floated far right | Capped inner grid, heading measure 18ch, lede 60ch | `.wrap` on the hero grid, `max-w-[18ch]` on h1 |
| Photo bands | 21:9 band became 800px tall | Cap height at 560px, keep object-cover | `Photo.tsx` |
| Two-column text sections | Right column stretched to 1100px of prose | Measure of 68ch on the prose column | `.measure` |
| Card rows | Alternating cards became very wide | Cap the row at 1440px; the ml/mr offsets then read as intended | `.wrap` on the section |
| Three-column audience | Fine once capped | Keep 3 columns, capped | `.wrap` |
| Dark card + photo pair | Fine once capped | 2 columns, capped | `.wrap` |
| Inner page reading column | 896px column gave 100-character lines | Back to 768px, about 75 characters at 17px | `max-w-3xl` |
| Planner | Sidebar and list stretched apart | Capped grid, sticky sidebar at 19rem | `.wrap` on the planner grid |
| Header and footer | Nav and content edges misaligned once content was capped | Same cap on their inner rows so edges line up | `.wrap` |

## Patterns worth adding later

- **Bento or three-up feature grids** for the scenarios overview, which
  currently uses a two-column index. Six scenarios sit well in three
  columns at 1440px.
- **Sticky in-page navigation** on the long pages (Scenarios, Checklist,
  Official guidance): a left rail listing sections, as GOV.UK guidance
  pages and NHS long-form pages do.
- **Accordion FAQ** once it passes about twenty entries. Below that, the
  open list is easier to scan.
- **Split hero with a form** for Build Your Kit: inputs on the left, first
  results on the right, the pattern used by every calculator on Mobbin.
  The current page has the intro above and the tool below; moving the
  inputs into the hero would save a screen of scrolling.
- **Photo bands as section dividers** rather than in-section content,
  with the next heading overlapping the bottom edge slightly.
