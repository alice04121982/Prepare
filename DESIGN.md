---
name: Stay Prepared
description: Calm, practical guidance for UK households, set like a shelf of own-label tins.
colors:
  paper: "#ffffff"
  ink: "#141414"
  ink-2: "#3f3f3f"
  hush: "#f3f3f1"
  hover: "#fff7dd"
  footer-note: "#d6d6d6"
  footer-rule: "#5a5a5a"
  cat-water: "#4a9aeb"
  cat-food: "#f4683a"
  cat-power: "#ffc425"
  cat-health: "#5db84a"
  cat-news: "#b49af2"
  cat-money: "#f7a1c4"
  cat-people: "#2ec4b6"
typography:
  display:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 11vw, 5.5rem)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.035em"
    fontVariation: "\"wdth\" 112"
  headline:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.25rem, 9vw, 4rem)"
    fontWeight: 850
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontVariation: "\"wdth\" 112"
  title:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.5rem, 5.5vw, 2.25rem)"
    fontWeight: 850
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontVariation: "\"wdth\" 112"
  lede:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.01em"
    fontVariation: "\"wdth\" 110"
  quantity:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2rem, 6vw, 3.5rem)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.035em"
    fontFeature: "\"tnum\""
    fontVariation: "\"wdth\" 115"
rounded:
  none: "0px"
  xs: "3px"
  sm: "4px"
spacing:
  gutter-sm: "20px"
  gutter-lg: "40px"
  panel-x-sm: "18px"
  panel-x-lg: "28px"
  section-y-sm: "64px"
  section-y-lg: "104px"
  container: "1360px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0 20px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "#000000"
    textColor: "{colors.paper}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0 20px"
    height: "48px"
  button-lg:
    padding: "0 24px"
    height: "56px"
  field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 40px 0 14px"
    height: "48px"
  field-hover:
    backgroundColor: "{colors.hover}"
  option-row:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 14px"
    height: "48px"
  option-row-checked:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  tin-label:
    backgroundColor: "{colors.cat-water}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 18px 16px"
  site-footer:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  callout:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "16px 18px"
---

# Design System: Stay Prepared

## Overview

**Creative North Star: "The Own-Label Larder"**

The household kit is a row of supermarket own-label tins. White paper, near-black ink, heavy lowercase words, and a flat colour label for each thing that might stop: water, food, power, health, news, money, people. The page should read like a well-stocked shelf, plain and confident, never a civic dashboard and never a startup landing page. Readers arrive anxious from a news story on a phone; the system answers with order, big specific numbers and nothing that flickers.

Everything is built from ink rules and square blocks. Structure comes from thick horizontal rules (the shelves), bordered panels (the back of a pack) and full-bleed colour bands, not from cards, shadows or imagery. Colour is information, not decoration: it names a category and does nothing else. The type does the rest, heavy and slightly wide on the Archivo width axis, always lowercase in headings.

The system is light only (`color-scheme: light`), has no photography or illustration, and prints to A4 in black and white.

**Key Characteristics:**
- White paper, ink text, seven category colours that appear only beside their category name.
- Archivo at 800 to 900 weight, widened with the `wdth` axis, lowercase headings with tight negative tracking.
- Ink rules in fixed weights: 1px hairlines, 2px controls, 3px sections, 8px shelves, 10px panel heads.
- Square corners (4px at most); no shadows, no gradients, no rounded cards.
- One authored motion moment (the phone reach bar); everything else is an instant or 160ms state change.

## Colors

Bright paper and near-black ink carry every surface; seven saturated label colours are reserved for naming categories.

### Primary
- **Label Ink** (#141414): all text, every border and rule, primary buttons, checked option rows, step numeral blocks and the footer band. It is the system's only "brand" colour. Primary button hover deepens to pure black (#000000).

### Secondary (the seven category labels)
Every label colour carries ink text at AA or better, so text always sits directly on the colour.
- **Tap Water Blue** (#4a9aeb, ink 6.2:1): water.
- **Tin Orange** (#f4683a, ink 6.0:1): food. Also the text caret colour.
- **Yolk Yellow** (#ffc425, ink 11.6:1): power, light and warmth. Also the site's single interaction highlight (see the rule below).
- **Plaster Green** (#5db84a, ink 7.4:1): health, first aid, medication, sanitation.
- **Wireless Lilac** (#b49af2, ink 7.8:1): news and communication (the radio tin).
- **Purse Pink** (#f7a1c4, ink 9.5:1): money and papers (cash, documents).
- **Neighbour Teal** (#2ec4b6, ink 8.5:1): neighbours and people around you. Household-specific lines (babies, pets, older household members) are not a tin and take no category colour: plain paper with the 3px ink border.

### Neutral
- **Paper** (#ffffff): the ground of every page and the fill of secondary buttons, fields and option rows.
- **Second Ink** (#3f3f3f, 10.5:1 on paper): notes, source lines, basis text and the "already have it" state.
- **Hush** (#f3f3f1): the only tonal surface. Used for the offline guide band, "got it" rows in the kit list, the `.tag` chip and placeholder product squares.
- **Hover Cream** (#fff7dd): hover fill for fields, option rows, steppers, tabs and category jump links.
- **Footer Note Grey** (#d6d6d6, 12.7:1 on ink) and **Footer Rule Grey** (#5a5a5a): small print and hairlines inside the ink footer only.

### Named Rules
**The Label Rule.** Each colour has one meaning on every page, and a category colour appears only where that category is named: a tin label on the homepage shelf, a checklist category band or swatch, a kit list category header or line swatch, a habit group band on /worried (news, health, people), a chart on /worried whose measure is a category (water, power, health). Everything else is ink on paper. If the category name is not on screen next to the colour, the colour is wrong.

**The Yolk Exception.** Yolk Yellow is the one colour allowed to mean "you are interacting": the 5px stripe on a hovered primary button, the mobile Menu button hover, the skip link, text selection, and focus outlines inside the ink footer. It is never used as a background for content.

**The Light Only Rule.** There is no dark theme. The ink footer is the only dark surface.

## Typography

**Display Font:** Archivo (self-hosted through `next/font/google` with the `wdth` axis), falling back to Helvetica Neue, Arial, sans-serif.
**Body Font:** Archivo, same stack.

**Character:** One family doing two jobs. Headings are the heavy, wide, lowercase voice of a printed label; body text is plain Archivo at a comfortable reading size.

### Hierarchy
- **Display** (900, `clamp(2.5rem, 11vw, 5.5rem)` in the page intro, `clamp(2.6rem, 11.5vw, 6rem)` on the homepage hero, line height 0.95, tracking -0.035em): one per page, the page title. Width 112 in the page intro, 108 on the hero.
- **Headline** (850, `clamp(2.25rem, 9vw, 4rem)`, line height 1, tracking -0.03em, width 112): section headings (`.h-section`).
- **Title** (850, `clamp(1.5rem, 5.5vw, 2.25rem)`): sub-section headings (`.h-sub`); list item headings run 1.375rem to 1.5rem.
- **Lede** (400, 1.1875rem rising to 1.375rem at 900px, line height 1.5): the paragraph under a page title, capped at 40 to 48ch.
- **Body** (400, 1.0625rem / 17px, line height 1.55): running text, capped at 52 to 65ch (`.measure` is 65ch). `text-wrap: pretty` on paragraphs, `balance` on headings.
- **Label** (800, 1.0625rem, tracking -0.01em, width 110): buttons, arrow links, field labels, legends. Selects set 700 at 1.125rem.
- **Quantity** (900, display style, tabular numerals): litres, item counts and step numerals, from 1.75rem in the stepper to 3.5rem in the homepage panel.

Width axis values in use: 108 (hero), 110 (`.display`, buttons, arrow links), 112 (all headings by default, page intro), 115 (litres figure), 118 (wordmark and tin names), 125 (step numerals).

### Named Rules
**The Lowercase Rule.** Headings, the wordmark, nav labels, tin names and button text are lowercase. Sentence case is kept for body copy, field labels and footer links.

**The Tabular Rule.** Every quantity (litres, counts, amounts, step numbers) uses `tabular-nums` so figures line up and do not jitter as the planner updates.

## Layout

Full-bleed bands with capped content. `.wrap` centres content at a maximum of 1360px with 20px side padding, rising to 40px at 900px. There is one breakpoint that matters: 900px. Below it everything is a single column designed phone first; at 900px and above, pages split into two columns (hero text beside the shelf, heading beside body, household panel beside the kit list).

Sections are separated by a 3px ink rule and padded 64px top and bottom, 104px at 900px. Panel interiors use 18px horizontal padding, 28px at 900px (24px in the kit planner). Text never runs wider than 65ch.

On the homepage hero, the left column is sticky on wide screens while the shelf of tins scrolls past it.

## Elevation & Depth

Flat. There are no drop shadows, no gradients and no layered surfaces. Depth and grouping come from ink rules of fixed weights and from the single tonal step to Hush. The only `box-shadow` values in the system are inset, used to draw borders and hover stripes on buttons, never to lift anything.

### Named Rules
**The Shelf Rule.** Rules are the structure. 1px ink hairlines divide rows; 2px borders draw controls; 3px rules close sections and frame panels; 8px rules are shelves above and below lists; 10px rules close the head of a panel. Pick the weight by role, not by taste.

## Shapes

Square. The largest radius anywhere is 4px (buttons, fields, option rows, stepper buttons, the Menu button); 3px on the tick box and the small "required" badge. Tin labels, panels, callouts and colour bands have no radius at all. Stacked tin labels overlap by their 3px border so the shelf reads as one continuous block.

Circles are never used for controls: radio choices are full-width bordered rows, checkboxes are square tick boxes, steppers are square. Icons are drawn with 2.6px stroked paths (the heavy right arrow, the download arrow, plus and minus).

## Components

### Buttons
Square ink blocks, confident and plain.
- **Shape:** near-square (4px), no border on primary.
- **Primary (`.btn-primary`):** ink fill, paper text, 48px tall with 20px side padding; label type. Hover goes to pure black with a 5px Yolk Yellow stripe inset along the base.
- **Secondary (`.btn-secondary`):** paper fill, ink text, a 3px ink border drawn with an inset shadow. Hover adds an 8px ink band along the base.
- **Large (`.btn-lg`):** 56px tall, 24px side padding, 1.1875rem text. Used for the main action of a page or panel.
- **Transitions:** 160ms on background and box-shadow, `cubic-bezier(0.16, 1, 0.3, 1)`.
- Actions that go somewhere end in the heavy right arrow.

### Arrow links
A bold underlined text link ending in the arrow, 44px tall, width 110. Hover thickens the underline from 2px to 4px. Used for secondary routes out of a section. All body links are underlined at 2px with a 0.2em offset.

### Inputs / Fields
- **Select (`.field`):** paper fill, 2px ink border, 4px radius, 48px tall, bold 1.125rem tabular text, a drawn chevron at the right. Hover fills Hover Cream.
- **Option rows (radio and checkbox):** the input is visually hidden; its label is a 48px bordered row (2px, 4px radius) with an optional small note at the right. Hover fills Hover Cream; checked fills ink with paper text in the planner, while the homepage duration rows mark checked with a 4px border on Hush so the choice never looks like the primary button beneath it; keyboard focus shows a 3px ink outline offset 3px.
- **Stepper:** label on the left, then a square 44px minus button, a display-weight count, and a square 44px plus button. Disabled buttons fade the ink to 30%.
- **Tick box:** a 28px square (2px border, 3px radius) inside a 44px target; checked fills ink with a paper tick. Prints as an empty box to tick by hand.
- **Segmented tabs:** a 3px bordered strip of 48px cells split by 3px rules; the selected cell is ink.

### Logo
Adopted 25 September 2026. The mark is an **asterisk of four square-ended bars** (each 14.651 by 71.263, rotated 0, 45, 90 and 135 degrees about one centre), the site's own mark, drawn by the owner (Figma frame "Cross"). It sits to the left of the words, closed up to match the web address: **✱stayprepared** (changed from two words on 25 September 2026), at 0.85em, centred on the line, 0.3em from the s. It is always one colour, `currentColor`: ink on paper, paper on the ink footer, never a category colour. `components/Wordmark.tsx` holds both the lockup and the bare `Asterisk`. The closed-up spelling is for the lockup only: in sentences, titles and metadata the name stays "Stay Prepared", and the lockup gives screen readers "Stay Prepared" as hidden text.

- **Share image:** `app/opengraph-image.png`, drawn by `scripts/og.mjs`. **Pins:** `public/pins/`, drawn by `scripts/pins.mjs`. Both carry the lockup; rerun them after changing it. Pins (revised 26 September 2026) put the lockup small in the footer, not at the top; a pin that names water, food or power fills with that category colour, the rest are ink on paper; each ends with one line saying what the linked page adds. The weather warnings pin shows the Met Office's yellow, amber and red as named swatches: the one exception to the Label Rule, because they are official colours and the pin means nothing without them. They appear nowhere else.

- **Favicon:** `app/icon.svg`, the bare asterisk in ink, switching to paper when the browser is dark. `app/favicon.ico` (16, 32, 48) and `app/icon.png` are the fallbacks, drawn by `scripts/icons.mjs` from `public/brand/mark.svg`; rerun it after changing the mark.
- **Home screen:** `app/apple-icon.png`, 180px, ink asterisk on paper, drawn by the same script.
- Directions tried and rejected on 25 September 2026: a tick, stacked blocks, drawn tins, flat abstract marks and sp monograms.

### Navigation
- **Header:** paper, closed by a 3px ink rule, 64px tall (80px at 900px). The wordmark (see Logo) in display type at width 118. At 900px and above, nav links sit inline, bold 1rem, 28px apart; hover and the current page are underlined.
- **Mobile:** a square Menu button (2px border, 44px tall, two-bar icon that crosses when open, Yolk Yellow on hover) opens a full-width list closed by a 3px rule, with 24px lowercase display links at 56px tall and hairlines between. Escape closes it and returns focus.
- **Footer:** a full ink band with paper text. The wordmark at 2.25rem, a one-line description, a two-column link list with 48px rows and Footer Rule Grey hairlines, and small print in Footer Note Grey carrying the affiliate disclosure and sources.

### Page intro
The opener on every inner page: the display title (max 16ch), the lede under it, optional actions, closed by a 3px ink rule. Plain paper on purpose; colour is kept for categories.

### Diagrams
Four figures drawn from the site's own data (`Diagram.tsx`: water bottles, the kit box, a check-in plan, a duration chart), placed in a page intro's `aside` (up to 440px wide). Each reads like the panel on the back of a tin: a 3px ink frame, the one number the page asks you to picture in quantity type (HTML, not SVG, so it reflows and zooms), closed by a 10px rule, then countable pictograms standing on an 8px shelf rule. Shapes are flat: solid ink, paper with an ink outline, or a category colour with a 2px ink outline. No opacity and no grey wash. A category colour is used only where the figure names that category, in its head or in a key printed with it; colour fills carry `data-cat` so print turns them white. Labels inside the SVG are real text at weight 800, width 110, lowercase. Each has a title and description for screen readers. A diagram must carry a quantity or a plan; nothing is drawn as decoration.

### Charts
Data charts (the small multiples on /worried: child mortality, life expectancy, poverty, drinking water, electricity, disasters, and conflict for the world only, `SaferWorld.tsx`) follow the same frame: a lowercase heavy title, the old figure struck through beside the new one in quantity type, a 10px rule, then a 3px ink line over a Hush area, or solid ink bars, on a 3px ink baseline. A chart whose measure is a kit category takes that colour for the area under the line and names the category beside its title with a 14px swatch (drinking water is water, electricity is power, child mortality and life expectancy are health; amended 25 September 2026). The line stays ink, because yellow, green and blue on white fail the 3:1 contrast a line needs. Poverty, disasters and conflict name no category and stay ink on Hush; poverty is not money, which on this site means cash at home. Axis years and notes are HTML, so they keep their size at any width. Every chart has a "Show the figures" table. Every chart spans at least 100 years: where the record starts later, a dotted line holds the first figure back to the start, and gaps of more than 40 years are dotted too, with a note saying so. The scale runs from zero to a round number just above the highest value, labelled at the top; percentage charts never top out below 5 in 100, so survey noise near zero stays flat. Pointer, touch and the arrow keys read out any year, with a paper-filled marker on a 1.5px rule.

### Tin label (signature)
One label per thing that might stop, stacked into a shelf. A full category colour fill, 3px ink border, no radius. The remedy as the name in display type at width 118 (`clamp(2rem, 8.5vw, 2.75rem)`, never larger than the shelf question above it), the amount in bold under it using a sourced figure wherever one exists, then the hazard as small print at the foot under a 2px ink rule ("if nothing comes out of the taps"). No line sits above the name. Every label is open; nothing hides behind a tap.

### Step shelf
A numbered list between 8px ink shelves. Each step has an ink block with a paper numeral (64 by 80px, 96 by 120px at 900px, width 125), a lowercase heading, body copy and an arrow link.

### Quantity panel
The homepage "how much for your household?" form and the kit planner's household panel share one grammar: a 3px ink frame, a heading closed by a 10px rule, label and control rows split by 1px hairlines, and a full-width large primary button. On the homepage the result column reports drinking water in litres at display size with tabular numerals, updated live in an `aria-live` region.

### Category bands and kit lines
On the checklist each category opens with a full-bleed colour band between 3px rules, with the category name in display type. Item names sit beside a 14px square swatch with a 2px ink border. In the kit list, each category header is a colour strip; each line shows the item, the basis in Second Ink, the free option, and the quantity in display tabular numerals. Lines already owned turn Hush with a strikethrough.

### Callout
A boxed note like the panel on the back of a pack: 3px ink border, no radius, optional bold title closed by a 6px rule, prose inside, max 65ch.

### Chips
- **Tag (`.tag`):** Hush fill, 4px radius, bold 0.8125rem; used for product links on kit lines.
- **Required badge:** ink fill, paper text, 0.75rem extra bold, 3px to 4px radius; prints as an outlined box.

### Motion
One authored moment: on phones the reach bar (a paper strip with a 3px top rule holding the large primary button) slides up from the bottom edge over 500ms `cubic-bezier(0.16, 1, 0.3, 1)` once the hero actions scroll away, and tucks away over the footer or the quantity panel so there is never a second primary action on screen. The checklist uses the same bar at every width, with the same motion, while its list is on screen: the Amazon basket for everything not yet ticked, for the default household (added 25 September 2026). Other movement is state feedback only: 160ms button states, the 300ms Menu icon cross and FAQ plus rotation. Under `prefers-reduced-motion: reduce` all transitions and animations are switched off.

### Print
A4 with 16mm margins, 11pt black on white. Anything marked `.no-print` (the reach bar, planner controls, category jump nav, shop tabs) is hidden. Every colour label (`[data-cat]`) prints white with a 1.5pt black border and never splits across pages. Internal links print their full stayprepared.co.uk address after the text.

### Accessibility floors
Every interactive target is at least 44px tall; option rows and footer links are 48px. Focus is a 3px ink outline offset 3px everywhere (Yolk Yellow inside the ink footer). A skip link in Yolk Yellow leads the page. All text meets WCAG 2.2 AA; ink on the lowest-contrast label (Tin Orange) is 6.0:1.

## Do's and Don'ts

### Do:
- **Do** keep every page ink on paper, and put a category colour only where that category is named.
- **Do** set headings lowercase in heavy Archivo with the width axis, and quantities in tabular numerals.
- **Do** build structure from ink rules at the fixed weights (1, 2, 3, 8, 10px) and full-bleed bands.
- **Do** use square controls: 4px radius at most, 2px ink borders, bordered rows for choices, square tick boxes.
- **Do** give each screen one primary ink button, ending in the arrow when it goes somewhere.
- **Do** keep targets at 44px or more and check every new pairing against AA.
- **Do** mark interactive furniture `.no-print` and colour labels `data-cat` so pages print in black and white.

### Don't:
- **Don't** use rounded cards, drop shadows, gradients or glass effects.
- **Don't** put eyebrows (small uppercase kickers) above headings.
- **Don't** use pill shapes or circles for buttons, radios or other large controls.
- **Don't** use colour for decoration, emphasis or state, other than the Yolk Exception.
- **Don't** add photographs, illustrations, icon tiles or stock imagery, including retailer product photos (the Amazon Associates agreement rules them out outside its API). The one exception is the kit pictograms (`kit/Pictogram.tsx`, 26 September 2026): one flat ink drawing per product line, in the diagram pictogram style (ink, or paper with a 2.6px ink outline, on a 48 unit grid), standing where a product photo would be on the shopping list, the Amazon tab and the home kit drawer. No tile, no background, no colour. A live API photo replaces it when there is one.
- **Don't** add a dark theme or navy hero panels.
- **Don't** add motion beyond the reach bar and short state changes, and never anything that raises alarm.
