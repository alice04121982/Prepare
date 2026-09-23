# Source note: Radical, "Disaster Prepping: Should We All Stock Up?"

Logged 23 September 2026 at Alice's request. Not yet on the site.

- Show: Radical (BBC Radio 4)
- Episode: Disaster Prepping: Should We All Stock Up?
- Presenter: Gabriel Gatehouse
- Guest: Mike Chappell, a prepper
- Published: 17 September 2026
- Link: https://podcasts.apple.com/gb/podcast/radical/id1708808280?i=1000790225790

## Status: only the opening captured

Alice pasted the opening from Apple Podcasts' share excerpt, which cuts
off after the first minute. The rest of the transcript is still needed.
The build environment cannot fetch it: egress blocks podcasts.apple.com,
podnews.net and podcastrepublic.net. Copy it in sections from Show
Transcript in the Apple Podcasts app. Keep the full text out of the repo
(it is BBC copyright); record short quotes with timestamps here instead.

What the opening establishes:

- Gatehouse frames it with the same question the Swedish booklet and
  this site use: what would you do if the shops, water and power went,
  "and not just for you, but for everyone".
- He then asks how long before "law and order begins to break down".
  That is the register docs/tone-of-voice.md rules out; do not borrow it.
- He says the government is "urging us to stockpile". The government's
  own line is "not about stockpiling, this is about sensible
  safeguards". The site should keep the government's wording.
- He cites the National Audit Office; the excerpt cuts off there. Find
  the NAO report he means. If it is the 2026 resilience report, it may
  belong in src/data/official-guidance.ts under "The bigger picture".

## Claims as reported by Alice from listening (not in the excerpt)

1. **Keep 90 days of food.**
2. **Sewage can come back up through the toilet** after a certain amount
   of time without power.

Both need the exact wording, the timeframe and the guest's basis before
anything goes on the site.

## How each fits the site

**90 days of food.** Adopted as the longest option in the kit planner
(23 September 2026), with three days kept as the default and the
headline. docs/tone-of-voice.md rule 6 now allows cover up to three
months, built up over time. Bottled water stops at two weeks and baby
consumables at a month; see src/data/kit-rules.ts.

**Sewage backing up.** Plausible and worth covering. Sewers in low-lying
areas rely on electric pumping stations. In a long power cut some run on
backup generators and some do not, so flows can back up into the lowest
connection, often a ground-floor or basement toilet. Before this goes on
the site, find a water company or Water UK source giving how long
stations can run on backup, and the advice that goes with it: stop
flushing if told to, use the bin-bag toilet the checklist already
describes, and consider a non-return valve if you are in a low-lying
home. The checklist and kit rules already cover the bin-bag toilet
(src/data/checklist.ts, src/data/kit-rules.ts), so this would extend an
existing item rather than add a new one.

## Where the link belongs

Not in src/data/official-guidance.ts. That list is official bodies only,
and each entry must be opened and checked before it is added. Once the
transcript is in, the episode can be cited on the Sources page alongside
the BBC News nutrition piece.
