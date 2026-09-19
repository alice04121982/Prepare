# Photo brief: free imagery for Stay Prepared

Sources: Unsplash (Unsplash Licence: free for commercial use, no
attribution required, credit appreciated) and Pexels (Pexels Licence,
same terms). Both have free APIs; the site needs one key in `.env.local`
(never committed) to search programmatically:

    UNSPLASH_ACCESS_KEY=...   from https://unsplash.com/developers
    PEXELS_API_KEY=...        from https://www.pexels.com/api/

## Art direction

The reference design uses one full-bleed photo band per page (the hands-
on-laptop shot in the Noble Finance template). Do the same: one or two
photographs per page as wide bands or large cards, never inline clip art.
Photos carry warmth and Britishness; the Streamline line drawings carry
the "how to" moments. The two should not sit side by side in one block.

Look for:
- Domestic, British or plausibly British. Terraced streets, kitchens with
  kettles, a hallway with a coat and a torch, a corner shop, allotments,
  rain on a window, a wet pavement, a flat balcony.
- Daylight, overcast, soft. Muted colour that takes a mint or forest tint
  well. No golden-hour glamour, no stock-photo smiles at camera.
- Hands doing ordinary things: filling a bottle, checking a torch, writing
  a list, carrying shopping, knocking on a door, handing something over a
  fence.
- Older people and families as they are, not as "vulnerable groups".
- No bunkers, tactical gear, camouflage, gas masks, empty shelves shot for
  drama, storm porn, or people looking frightened.

Treatment on the site: slight desaturation, a forest-green multiply
overlay at 10 to 15 percent so photos sit inside the palette, rounded-card
corners to match the panels.

## Shot list

| Page | Slot | Search terms |
| --- | --- | --- |
| Home | Hero band or card | "kitchen cupboard tins", "kettle kitchen window rain", "terraced street uk" |
| Home | Household-first section | "family kitchen table list", "hands writing list" |
| Home | Community section | "neighbours talking garden fence", "front door street uk" |
| Scenarios | Power cut | "torch dark kitchen", "candle no" (avoid), "head torch" |
| Scenarios | Water | "filling bottle tap", "water bottles kitchen" |
| Scenarios | Supply delays | "corner shop uk", "supermarket shelf" (not empty-for-drama) |
| Scenarios | Weather | "rain window uk", "snow street uk", "flooded road uk" |
| Scenarios | Conflict | "radio kitchen table", "power bank charging phone" (no war imagery) |
| Checklist | Band | "pantry shelves tins jars", "first aid kit table" |
| Community | Band | "street party uk", "allotment neighbours", "community hall" |
| FAQ | Band | "cup of tea kitchen table" |
| Official guidance | Band | "radio", "phone alert" |
| Build Your Kit | Band | "shopping basket groceries" |

## Process

1. Search each term, save the top 20 thumbnails with photographer and
   licence link to `public/photos/candidates/` for Alice to pick from.
2. Chosen images downloaded at 1600px wide, converted to WebP, stored in
   `public/photos/` with a `credits.json` (photographer, source URL,
   licence) rendered on the Sources page.
3. Never hotlink; both licences allow copying, and hotlinking breaks
   offline use and is slower.
