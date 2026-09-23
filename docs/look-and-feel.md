# Look and feel: direction, and the diagrams

> **Superseded on palette and styling, 23 September 2026.** The site moved to
> the own-label larder design recorded in `DESIGN.md`; the navy palette and
> photography direction below no longer apply. The case for diagrams that
> carry information still stands, and the diagrams are now drawn in ink.

23 September 2026. Four Mobbin searches on visual direction rather than
structure, after Alice said the styling was not there yet and that she
could not see the illustrations.

Full report: https://claude.ai/artifact/3m7zxBjGdULa5jxjsZGfjC

## What was actually wrong

The illustrations were not the Streamline line drawings PLAN.md
describes. They had been swapped for a pack called **Textile 3D Shapes**:
`public/illustrations/README.md` mapped the checklist to frame 24
"asterisk", the kit planner to frame 14 "cube", the home page to frame 15
"heart". Abstract inflated objects, in mint green, on a slate navy panel.

The mint is the tell. PLAN.md records the original visual system as
taken from a Figma file with a "mint hero #a0f1bd" and forest-green
buttons. That palette was replaced with slate, navy and Safety Blue. The
illustrations were not, so the site was wearing two designs at once.

## The direction

From the search, in short: take **domestic documentary** photography
([IKEA](https://mobbin.com/sites/sections/654d8640-91ea-4242-bceb-30d0aae4fd9c),
a real room with a caption in the corner) and the **handbook** framing
([Assembly Coffee](https://mobbin.com/sites/sections/9a7a1fbc-28ac-4c74-9f19-014a377ea4c4),
a practical subject treated as an object you keep), on the palette we
already have. Reject the health-brand mood
([Superpower](https://mobbin.com/sites/sections/db484778-34d1-4a38-af04-5593bee2f342)),
which is beautiful and sells a fear, and reject generic spot
illustration ([Wise](https://mobbin.com/sites/sections/5913d254-146e-49b6-bc26-caaee21e868e)).

The one thing worth keeping from the illustration family is
[Graza](https://mobbin.com/sites/sections/ee5be1fd-0642-4808-8cf4-ef5c3234a18b):
an annotated drawing of a real object. Not decoration, a diagram.

## What was built

Approved and done the same day. The Textile 3D Shapes pack is deleted,
along with `Illustration.tsx` and `public/illustrations/`. In its place,
`src/components/Diagram.tsx` holds four drawings, each with one job.

| Page | Diagram | What it explains |
| --- | --- | --- |
| /checklist | `water` | Six bottles in three pairs, one pair per day. 3 litres a day, 9 litres over three days, about one six-pack. Turns a figure into a picture of a shelf. |
| /build-your-kit | `box` | An open box holding two bottles, three tins, a torch, a power bank and a folder. "It fits in one box." The scale claim from the FAQ, drawn. |
| /community | `checkin` | Three houses on a road, joined to each other and by dotted lines to one contact outside the area. "Who calls whom." |
| /why | `duration` | Typical durations as bars on a scale linear in days, nought to fourteen, against a dashed line at three days. "Three days covers most of it." The page's whole argument. |

Two pages lost their aside and gained nothing: **/worried**, which
speaks to a frightened reader and where a diagram would be clinical, and
**/sources**, which is a credits list.

Notes on the drawings:

- Inline SVG, not image files. They are monochrome in `currentColor` on
  the navy intro panel, so they need no separate dark mode, and they can
  be edited in the component rather than re-exported.
- Every one carries a `<title>` and `<desc>`, so the explanation reaches
  a screen reader as words rather than being lost in a picture.
- The duration scale is linear in days on purpose. A compressed axis
  would flatter the argument; the honest one already makes it.
- Figures come from the site's own data: `scenarios.ts` for the
  durations, `checklist.ts` and the FAQ for the litres and the box.

The Sources page credit now reads that the diagrams are drawn for this
site rather than crediting the retired pack.

## Still open

- **Photography.** Direction 1 is the larger half and cannot be faked
  with stock. The hero photograph is still washed to 40% opacity under a
  gradient, so it reads as texture rather than a picture of a home. That
  needs real images and a budget decision.
- **Captions on photographs,** IKEA style, which only makes sense once
  the photography is right.
- **One serif** for the handbook voice, on the offline guide and /why.
