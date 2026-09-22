# Microcopy audit: empty states, saved, errors, waiting

Research run 22 September 2026. Prompt 2 of the five in
docs/mobbin-mcp-plan.md. Held at the review gate: nothing below has been
written into the code.

Full report: https://claude.ai/artifact/1BjEm5kGjrz9VpKAYi832H

Same table format as docs/copy-audit.md, and the same four tests apply.

## Four rules, read off real screens

1. **Empty: name what will appear here, and what puts it there.** Two
   sentences, plus a low commitment way in beside the action.
   [Deliveroo](https://mobbin.com/screens/46a2d38c-1730-4920-93b0-fee1a02ca2da)
   "You'll see your reward cards here" then how one starts then "How does
   Rewards work?";
   [Angi](https://mobbin.com/screens/3397ad40-11a0-4572-93c6-9aeb6c4b6fe0)
   "You don't have any pros yet. When you do, you can find them here.";
   [timespent](https://mobbin.com/screens/2110919d-e927-4187-af30-c24230f55bff)
   pairs "Add Activity" with "See Demo Activities".
2. **Saved: state the fact, say where it went, stop.** Past tense, no
   exclamation mark. Take
   [LinkedIn](https://mobbin.com/screens/1c8978b4-47df-4b8f-92c0-aa589c39506a)
   "Job preferences saved" and
   [Co-Star](https://mobbin.com/screens/885bdd85-35a1-41a9-8c82-57c10c5af8d1)
   "Update Saved. Go to the Saved section of your profile to read this
   again later." Avoid
   [WHOOP](https://mobbin.com/screens/812337fb-a878-4c21-bfe1-3c89d3c57954)
   "SAVED / Have a great day!",
   [Angi](https://mobbin.com/screens/23c12a25-eced-44bb-b5ab-991c2374e22d)
   "Success!" and
   [Fanatics Live](https://mobbin.com/screens/1bf64634-6281-4736-a060-34039189be97)
   "Thank You!".
3. **Errors: name the failure as a heading, then list what to try.** Not
   one of these apologises or says "something went wrong". Retry is the
   primary button with a way out beside it.
   [Fitbit](https://mobbin.com/screens/5becafee-af2f-4621-87fc-e3863b2d36d4)
   "Inspire 3 not found" with four named fixes;
   [Amazon Alexa](https://mobbin.com/screens/a50fe432-f4cf-447a-8669-46546338f126)
   "Device not discovered. Here are a few tips:";
   [Oura](https://mobbin.com/screens/f529277c-9371-4aec-8380-225d82941229);
   [Monese](https://mobbin.com/screens/342da419-90c6-4e6e-adf5-c2323979e310)
   "Verification failed" with three things to try.
4. **Waiting: give it a real unit and say who acts next.**
   [Wealthfront](https://mobbin.com/screens/bf81f32c-3f10-4eba-a699-2785fbb8138f)
   "This normally takes less than one business day. We'll contact you if
   we need more information.";
   [Hers](https://mobbin.com/screens/2a4b82e2-361d-493e-81c9-914995bf3438)
   "a diagnosis in 12 to 48 hours". Note
   [Beside](https://mobbin.com/screens/ad595233-4ac1-4024-a0eb-823457d24912)
   opens with "Don't worry", which the tone guide rules out.

## Proposed changes

| Where | Was | Now | Why |
| --- | --- | --- | --- |
| KitPlanner, copy button failure | Nothing. The failure is caught and discarded; the button never changes, so a copy that failed looks like one that worked. | Button reads "Could not copy", and below it: "Your browser would not let the page copy the list. Print it instead, or select the list and copy it by hand." | Rule 3, Fitbit and Alexa. **This one is a defect, not a wording preference**: on an older browser, or any page not served over https, the button does nothing at all. |
| Checklist, nothing ticked | "Nothing ticked yet. Tick anything you already have and this page will remember it." | "Nothing ticked yet. Tick what you already have, and this page keeps the count of what is left to get." | Rule 1. "Remember it" names the mechanism; the count is what the reader actually gets. |
| Checklist, saved-state line | "Ticks are kept in this browser only. Nothing is sent anywhere." | "Ticks are kept in this browser, so they will not show up on your phone. Nothing is sent anywhere." | Rule 2, Co-Star. Same fact, in the form the reader will meet it. |
| KitPlanner, under the list heading | "Tick anything you already have. Ticked lines stay here, struck through, and drop out of the basket and the copied list. Ticks are kept in this browser only; the link in your address bar carries your household." | "Tick what you already have. Ticked lines stay on the list and drop out of the basket. Ticks are kept in this browser; the link in your address bar carries your household." | Tone guide rule 1, sentences under twenty words. 43 words to 31, and "struck through" goes because the reader can see it. |
| KitPlanner, supermarket note | "... A single basket button for supermarkets needs a partnership with Samsung Food, the service behind BBC Good Food's shoppable recipes, which is on the plan." | "Tesco has no way for a website to fill your basket, so it is one click per item. Each link opens the search for that item, and you add it there." | Copy audit tests 1 and 4. The removed sentence is the site's own roadmap. |
| Checklist, everything ticked | "All 30 ticked. Put a date in the calendar to check the dates and the batteries in six months." | "All 30 ticked. Put a date in the calendar to check the batteries and the food dates in six months." | Rule 4. "The dates and the batteries" makes "dates" do two jobs in one sentence. |

## Kept, deliberately

| Where | As it stands | Why it stays |
| --- | --- | --- |
| KitPlanner, Aldi note | "Aldi does not deliver groceries in the UK. Use this list in store, or check Specialbuys for torches and power banks." | Rule 3 already: the limit named without apology, then the two things that do work. This is the model the copy button failure should follow. |
| KitPlanner, Amazon basket note | "You check the basket and pay there. Nothing is bought until you choose to. Groceries are on your list; buy those at a supermarket." | Copy audit test 3. Says who does what, in the second person, with the limit stated before the reader meets it. The clearest writing on the site. |

## The category with no home here

Progress messages apply to nothing. The planner recalculates as a counter
changes; there is no upload, no verification and no queue, so there is no
wait to narrate. Adding a spinner because the research found spinners
would be exactly the failure the plan warns about, where a reference
drives a change nobody needed.

What does carry over is the shape of an ending: name a real unit of time
and who acts next. The checklist's all-ticked state is the only place on
the site that needed it, and it already does it.
