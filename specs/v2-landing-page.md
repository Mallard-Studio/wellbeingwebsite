# v2 landing page rebuild

Rebuild of `index.html` to serve one job: **get the Google Play install.**
Deadline: live by **2026-09-04**. Started 2026-08-24. Last updated 2026-08-27.

Changes on this page are for the marketing team, not a dev request.

---

## Source of truth — read these first, they live outside this repo

| File | What it holds |
|---|---|
| `D:\anas\Work\GW\marketing\plans\v2-landing-page-brief.md` | **The task list.** Part 3 is the gap table, already prioritized. Part 4 has per-block specs. |
| `D:\anas\Work\GW\marketing\plans\v2-2026-08-24-gtm-plan.md` | §8 = landing page structure. §2 = positioning. §13 = the National Wellbeing Strategy ruling. |
| `D:\anas\Work\GW\marketing\plans\voice-guide.md` | **Supersedes** the vague "no wellness language" line in the GTM plan and the brief. Read before writing any user-facing string. |
| `D:\anas\Work\GW\marketing\plans\v2-install-attribution-links.md` | The canonical UTM links, one per channel. Copy them, never retype them. |

---

## Positioning — do not drift

**Offer, one sentence:** You'll see how each app actually makes you feel, and you'll get tapped on the shoulder before the scroll turns on you.

**Never on this page:** rewards, points, marketplace, or any productivity/focus benefit. One honest FAQ line is the single exception (block 8 of the brief).

**Voice, short version:** concrete, second person, short sentences. Write about feelings freely, "feel good", "feel worse", "how it made you feel" are correct and are the product. Banned is the abstract wellness register: mindful, journey, balance, cultivate, holistic, self-care, reclaim, thrive. "Wellbeing" is the app's name and is always fine. Never shame the user. Every number carries a source or comes off. **No em dash anywhere**, founder's rule.

---

## Decisions made with the founder — do not re-litigate

| # | Decision |
|---|---|
| 1 | **Marketplace is not hidden, it just stops being sold.** Landing page gets one honest FAQ line. The full marketplace/SME story lives on `investors.html`. No public roadmap page. |
| 2 | **Domain split is intentional, leave it.** Site is `digitalwellbeing.xyz`; emails stay `@digitalwellbeingapp.com`. The `.com` is the mail domain and redirects to `.xyz`. Brief task 13 closed as as-designed. |
| 3 | **National Wellbeing Strategy 2031 is off the landing page**, per GTM §13. It lives on `investors.html` as **"Why now"**, framed as market timing, never as endorsement. The word "aligned" is gone. |
| 4 | **`investors.html` is built.** Carries the cut `#investors` and `#moat` content plus founder photos. Linked from the footer only, never the nav. |
| 5 | **Hero headline is locked**, founder's own words. See below. |
| 6 | **`#research` stays on the landing page.** Founder's call, 2026-08-26, reversing that part of task 4. The alpha numbers are install-driving proof for a regular user, not investor material. The section also stays on `investors.html`, so the two pages carry the same block and must be edited together. |

---

## Hero — locked, built, shipped

```
YOU
NEED AN
EXIT SIGN.          <- h1, caps, .grad on the last line

Listen to your feelings. They're the best sign.
Find out which app drops your mood.

[ Get the app -> ]
```

- Visual: `assets/exit-sign-1148.webp`, the pixel-art highway sign, "Keep Doomscrolling / Real Wellbeing".
- **No eyebrow capsule.** "NOW IN ALPHA" was removed on purpose, founder does not want a capsule as the first thing on the page.
- **One CTA.** "See how it works" was removed on purpose. The button lost its `→` on 2026-08-26 when the QR card was placed beside it; the nav and sticky-bar buttons keep theirs.
- Text style is `clamp(18px,1.5vw,22px)` / `var(--ink-2)` / weight 400, after trying `.who-card h3` (26px/600/`--ink`) and rejecting it.
- Grid `1fr 1.05fr`, `.herotext` max-width 520px.

---

## Where the site stands right now

**`index.html`, 58.4 KB.** Sections in order: hero, `#research`, `#problem`, `#solution`, `#inside`, `#loop`, `#download`. Nav is four links (The data, Problem & Solution, The app, Our Hero) plus the Play CTA and the docked QR. Footer carries Terms, Privacy, EULA, Investors. Sticky install bar fixed to the bottom below 820px. Seven Play links, all UTM-tagged: four buttons on `utm_medium=site` and three QR codes on `utm_medium=qr`. 177 KB of images, 43 KB of it above the fold.

Title and meta description, set 2026-08-26:

```html
<title>Wellbeing: Find out which app drops your mood</title>
<meta name="description" content="Wellbeing shows you how each app actually makes you feel, then taps you on the shoulder before the scroll turns on you. Free on Android.">
```

The old title was "The Wellbeing App — Trade screentime for wellness", the marketplace framing, and there was no description tag at all.

**`investors.html`, 47.6 KB.** Footer-linked, never in the nav. Order: intro, **Why now**, `#research` data, `#moat` (the model), `#investors` funding ask with founder avatar cards. Self-contained: it carries its own copy of the site head and stylesheet, so there is no shared CSS file to keep in sync. No sticky bar, it is not part of the install funnel.

---

## Done

**Task 1 — adblock CSS stripped.** `index.html` 1,876,271 -> 57,478 bytes (-97%). Twelve injected `<style>` blocks from a browser ad-blocker extension, saved into the file when the page was exported from a browser. The range held zero site content. The missing `</body></html>` was also restored.

**Task 2 — sticky install bar.** `.install-bar` is `display:none` by default and `position:fixed` bottom below 820px, matching the hamburger breakpoint. Full-width `.btn.primary`, `env(safe-area-inset-bottom)` padding for iOS, `body{padding-bottom}` on mobile so it never covers the footer. No JS, so it is visible at every scroll position by construction. Verified at 360px top/mid/bottom and hidden at 1536px. Screenshot: `_review/sticky-bar-360-top-mid-bottom.jpg`.

**Task 3 — UTM tags.** All four Play links (nav, hero, `#download`, sticky bar) carry the canonical landing-page tag:
`&referrer=utm_source%3Dweb%26utm_medium%3Dsite`.
The brief writes `?referrer=...` but `?id=` is already in the URL, so the separator is `&`. The hero's first tag was missing `utm_medium%3Dsite` and was normalized.

**Task 4 — investor content cut.** `#moat` and `#investors` removed from the landing page, and `#research` too until the founder put it back on 2026-08-26, see below. The cut took the page from 58,820 to 52,457 bytes and its height at 360px from 15,194 to 10,025 px. Nav lost "The Win" and "Rewards", both pointing at cut sections. Footer lost the Strategy 2031 line and gained the Investors link. All of it moved into the new `investors.html`, where the empty fifth `value-list` item and the empty `matrix-wrap` were dropped, the moat eyebrow became "The model" instead of "Coming Soon", and the plain `.contacts` list became `.f-card` avatars so the emails appear once instead of twice. Screenshots: `_review/task4-360-landing-and-investors.jpg`, `_review/task4-investors-desktop-founders.jpg`.

**Task 5 — images.** Every image is WebP, built at twice its real display size, with `width`/`height` on the tag and `loading="lazy"` below the fold.

| File | Was | Now | Display size |
|---|---|---|---|
| `screen-03` | 635 KB | **29 KB** | 320 px wide, built at 640 |
| `screen-05` | 597 KB | **21 KB** | 320 px wide, built at 640 |
| `screen-02` | 229 KB | **30 KB** | source is only 488 px, not upscaled |
| `solution-exit-sign` | 140 KB | **39 KB** | 509 px wide, built at 1020 |
| `exit-sign` -> `exit-sign-1148` | 61 KB | **41 KB** | 574 px wide, built at 1148 |
| `logo` | 27 KB | **2 KB** | 32 px, the file was 540 px |
| `anas` / `omnia` | 133 / 59 KB | **5 / 5 KB** | 96 px avatars on `investors.html` |

Landing page images **1,689 KB -> 164 KB (-90%)**. Whole page including HTML **216 KB**, against a brief target of 500 KB. Screenshot: `_review/task5-screens-after-webp.jpg`.

**`#research` restored, 2026-08-26.** The founder rejected cutting "What the data says": the alpha numbers are the strongest install argument on the page and read as product proof, not investor material. The section is back between the hero and `#problem`, its count-up animation intact, and the nav has a "The data" link again. Page height at 360px went 10,025 -> 11,651 px, which is the cost of keeping it.

The copy inside the section is the founder's and is unchanged. I rewrote seven strings in it on the way back in and was told to revert; all seven are byte-identical to the original again on both pages.

Screenshot: `_review/research-restored-360.jpg`.

**`#research` heading breaks at the full stop, 2026-08-26.** At desktop width it wrapped as "Screen time isn't the / enemy. The long session / is.", leaving "is." alone. `text-wrap: balance` alone was not enough, the founder wants one line per sentence. Each sentence is now its own `<span class="sentence">` inside the same h2, set to `display:block`, and `#research .section-head` was widened from 760px to 820px because the first sentence needs 806px at the 58px max font size. Wording untouched.

```
Screen time isn't the enemy.
The long session is.
```

`text-wrap: balance` stays on each sentence so that when one has to wrap on a narrow screen it splits evenly instead of dropping a single word. Two lines hold down to roughly 530px viewport width; below that each sentence takes two balanced lines, which at 360px reads "Screen time / isn't the enemy. / The long / session is." Same change on both pages, since they share the section. Screenshots: `_review/research-heading-two-lines-desktop.jpg`, `_review/research-heading-360.jpg`.

**Task 14 — rewards, points and marketplace off the landing page, 2026-08-26.** `grep -i "reward|marketplace|redemption"` over `index.html` now returns zero content hits.

`#solution` was three steps, two of which sold the marketplace. Rebuilt as a real how-it-works, the brief's block 3 and GTM §8.3, "notices -> asks -> good job". Founder picked variant A, the mechanism wording, over the brief's literal arc:

| # | Label | Head | Body |
|---|---|---|---|
| 01 | Notice | Reads the mood | You pick the apps to track. Wellbeing watches how your mood moves inside each one, app by app. |
| 02 | Ask | Asks how you feel | The butterfly turns up and asks. One tap: angry, energized, calm, or down. That is the whole check-in. |
| 03 | Signal | Sends the exit sign | When your mood starts dropping mid-session, you get the sign. It never locks you out. You decide whether to leave. |

Old 01 carried detect **and** signal, so it was re-split across 01 and 03. It also lost "Backed by scientific research", an unsourced claim standing right below `#research`, which now carries the real alpha numbers. Trophy and coin icons swapped for a speech bubble and an exit-door arrow, both inline paths, no new assets.

`#solution` cannot borrow the brief's "real screenshots" instruction: `#inside` already is that section. `#solution` stays the text mechanism, `#inside` stays the screenshots.

Also cut: the `and earn rewards*` tail on the `#inside` intro, and `Real rewards.*` from the `#download` headline, which is now two lines, `Less screen.` / `Better mood.`

**There were four "coming soon" footnotes, not two.** This spec recorded `#loop` and `#download`; `#solution` and `#inside` had one each as well. All four gone.

**Nav and `#loop` were left alone**, founder's instruction, 2026-08-26. The `Our Hero` link and the "YOU ARE THE HERO" section copy carry no rewards language; only the footnote inside `#loop` was the problem.

`investors.html` untouched. It keeps the marketplace story by decision 1.

`index.html` 55,983 -> 54,649 bytes. Height at 360px 11,651 -> 11,132 px. Backup: `_review/index.html.pre-task14-2026-08-26.bak`. Screenshots: `_review/task14-solution-3steps-desktop.jpg`, `_review/task14-download-headline-desktop.jpg`, `_review/task14-360-solution-and-download.jpg`.

**Task 11 done, 2026-08-26. The QR follows the visitor, it does not sit in one place.** The brief asked for a QR beside the Play badge in `#download`. The founder asked for more: hero first, then docked to the nav on scroll, then parked under the badge at the end of the page.

| Position | Size | Shown when |
|---|---|---|
| Hero, beside "Get the app" | 112 px | Always, desktop only |
| Nav, docked under the sticky bar | 96 px | Only while neither in-page QR is on screen |
| `#download`, under the Play badge | 112 px | Always, desktop only |

One `IntersectionObserver` watches both `.qr-scan` elements and toggles `header.nav.qr-on`, so there is never a pair of QR codes on screen at once. `rootMargin: '-72px 0px 0px 0px'` accounts for the nav height. The nav card is absolutely positioned against `header.nav .row`, hanging below the bar rather than sitting inside it: at a 72px bar height an inline QR would be about 48px, roughly one pixel per module, which no camera can read.

**Everything QR and badge is `min-width: 981px`.** A phone cannot scan its own screen, and below 980 the hero drops to one column. Verified at 360px: no QR anywhere, sticky bar untouched.

`assets/qr-play.webp`, **456 bytes**, 392px for a 112px display. Built with Python `qrcode`, error correction M, version 7, 45 modules. The encoded URL was decoded back out of the WebP with OpenCV and matched byte for byte, which is the only way to know the `%3D` and `%26` survived.

**New tag: `utm_medium=qr`,** same `utm_source=web`. Source stays intact so channel reports do not split, and desktop scans become countable against button taps. Row added to `v2-install-attribution-links.md`, per its rule 5.

**The `#download` pill is now the official Google Play badge.** No download was needed, the artwork was already in the repo's parent at `google-play-app.png`. Cropped to the badge bounds, resized to 400x136, saved as `assets/play-badge.webp` at **12 KB lossless**: Google's brand terms forbid modifying the badge, so no lossy compression. It displays at 200x68, above their 40px minimum. The "Download for Android" arrow went with the pill.

Two layout bugs fixed on the way, both the same root cause, a flex row with no `align-items`:
1. `.hero-ctas` stretched the 145px-tall QR card onto the pill button and turned it into a circle.
2. `.cta-block` floated "Join iOS waitlist" down beside the QR instead of beside the badge. Now `flex-start` with a 12px nudge to match the badge midline.

`index.html` 54,116 -> 58,380 bytes. Backup: `_review/index.html.pre-task11-2026-08-26.bak`. Screenshots: `_review/task11-hero-qr.jpg`, `_review/task11-nav-qr-scrolled.jpg`, `_review/task11-download-badge-qr.jpg`, `_review/task11-360-hero-and-download.jpg`.

The `.coming-soon` CSS was deleted too, four rules, on the founder's call 2026-08-26: "if it's useless it goes". Zero `coming-soon` references left in `index.html`. `investors.html` keeps its own copy, it still uses the footnote.

**Task 7 done 2026-08-27, and it is not what the brief asked for.** Shipped as a two-line disclaimer capsule at the end of `#loop`, above `#download`. Not a section.

The brief's premise failed verification. Both source docs build task 7 around the Accessibility permission and the app does not use it, see "What the Android source actually says" below. Before rebuilding, the founder asked for proof that the task belonged on the landing page at all rather than in `privacy-policy.html`. It does: brief Part 3 row 7 is inside a table of page blocks, target "Plain-language block naming the Accessibility permission head-on", and GTM section 8 "Landing page, structure top to bottom" lists "Privacy, up front and plain" as item 6 of 9, sitting between "Not a blocker" and the install block. `privacy-policy.html` appears nowhere in the v2 marketing docs; its only hits are the unrelated mood-data publication check that blocks task 10.

Three versions were built. Keeping all three because the rejections are the useful part:

| # | What | Why it died |
|---|---|---|
| 1 | Full `#privacy` section: three permission cards on the `.flow`/`.step` grid, a "What it never reads" panel, a footnote naming location and notifications | "so overwhelming, it should be just two lines". Cost 2,417 px at 360 |
| 2 | Two lines naming Usage Access | **The rule worth keeping:** "what if we have iOS version also? are we still going to tell iOS users about the USAGE ACCESS!" Naming an Android permission dates the page the moment iOS ships |
| 3 | Founder's own copy, shipped | |

**So the standing rule is: describe what the app sees, never which platform permission grants it.**

The shipped copy, his:

```
Wellbeing ONLY sees what you allow it to see: when apps are opened and closed.
Wellbeing NEVER sees what is on your screen, what you type, or any phone data.
```

Markup is a flex row inside `.privacy-note`: the house `.eyebrow` chip with its green dot reading "Privacy", then the two lines. Capsule is `border-radius:100px`, max-width 900px, 900x94 at desktop. Below 880px it stacks and the radius drops to `var(--radius)` 18px, because a 100px radius on a six-line block bulges.

`index.html` 58,380 -> 59,352 bytes, so the whole task cost 972 bytes. Height at 360px 11,132 -> 11,459 px. Backup: `_review/index.html.pre-task7-2026-08-26.bak`. Screenshots: `_review/task7-privacy-note-desktop.jpg`, `_review/task7-privacy-note-360.jpg`.

**Typos are now fixed silently, not flagged.** His copy shipped with "Wellbing" and "what you allows it to see", both flagged rather than corrected, per the old rule. His answer: "come on man! fix my typos.. don't make me look stupid!" Mechanical errors get corrected on the way in from now on. Meaning, wording and register are still proposals. This narrows the 2026-08-26 no-silent-copy-edits rule, it does not cancel it.

**Two capsules removed 2026-08-27**, founder's call. The green `.r-badge` "Validated in alpha · 2026" at the top of the `#research` lead panel, and the `.eyebrow` "Get the app" above the `#download` headline. The `#download` h2 lost its `margin-top:22px` with it, that gap only existed to clear the capsule. Both CSS rules stay: `.eyebrow` is now used only by the privacy capsule, `.r-badge` is still used by `investors.html`. `index.html` 59,352 -> 59,185 bytes. Screenshots: `_review/capsules-removed-research.jpg`, `_review/capsules-removed-download.jpg`.

---

## Not started

| # | Task | Priority |
|---|---|---|
| 6 | Hero video, **blocked**, no source footage exists | P1 |
| 8 | "Not a blocker" comparison table, **rejected 2026-08-27**, see below | P1 |
| 9 | Real iOS waitlist form and the deletion page, **both done 2026-08-27** | P1 |
| 10 | Mood chart as proof, **skipped 2026-08-27** by the founder, see below | P1 |
| 12 | FAQ block, **rejected 2026-08-27**, see below | P2 |
| 13 | Domain split, **closed, as-designed** | P2 |
| 11 | QR for desktop, **done 2026-08-26**, see above | P2 |
| 7 | Privacy, **done 2026-08-27**, see above. Shipped as a disclaimer capsule, not a section | P1 |

### Rejected by the founder, 2026-08-27

Both killed outright, not deferred. Neither ships on the landing page.

**Task 8, "Not a blocker" comparison, brief block 5.** The copy was rejected on quality, and the block was rejected on audience: the founder reads the comparison-against-blockers argument as investor material, not something a regular visitor came for. If it is rebuilt at all it belongs on `investors.html`, with new copy, and nothing has been written for it yet.

**Task 12, FAQ, brief block 8.** Rejected on audience. The five questions the brief specifies (does it block apps, battery drain, Xiaomi/MIUI, is my data sold, what are points for) are technical support questions, not install objections a regular user has before installing.

This kills the only sanctioned home for the marketplace line. Brief Part 6 says "zero occurrences of rewards, points or marketplace outside the single FAQ line" and there is now no FAQ line, so the landing page carries none of it at all. That is stricter than the brief, not looser, so nothing else has to change. Decision 1 stands: the full marketplace story stays on `investors.html`.

It also drops the only place the page answered "is my data sold". The Firestore and location question in "Open, not yet decided" stops being a copy blocker and stays a factual one.

**A report to the marketing team is owed** once the remaining tasks close, sorted four ways: done as briefed, done with a change from the PM, done completely differently by the PM, and rejected. Tasks 8 and 12 are the first two entries under rejected.

### Task 9 built, 2026-08-27. The waitlist ships, the deletion page does not.

**A working Google Form was already in the repo.** `D:\anas\Work\GW\website\embed\index.html`, from Oct 2025, a leftover embeddable signup widget. Checked live: HTTP 200, titled "Sign up for the Digital wellbeing app", two questions.

| Field | Entry ID | |
|---|---|---|
| Email | `entry.1406486002` | required |
| Leave a comment! | `entry.813107488` | optional |

That is exactly the shape the waitlist needs, so no new form was created. If the founder wants the iOS list kept separate from the old signups, only the form id and the email entry id change.

**Shipped in `#download`.** The `mailto:` button is gone, replaced by an email field plus the same "Join iOS waitlist" button, posting into a hidden iframe exactly like `delete_my_data/`. Success replaces the form with "You're on the list. We'll email you the moment iOS is live." A 15 second timeout re-enables the button and hands back the `hello@` address. The founder's `.sub` copy above it is untouched, including its em dash: the control changed, not the sentence.

CSS appended at the end of the stylesheet per the source-order rule. New `.sr-only` utility for the field label, the page had none. At 360 the row stacks and both the field and the button go full width.

**The deletion page was lying.** The iframe `load` event fires on Google's 404 too, so submitting against `REPLACE_FORM_ID` showed "Request received" for a request that was never received. Every user who asked to be forgotten since 2026-08-16 was told it worked.

Rewritten with the three IDs as named constants at the top of the script and a `configured` check. While the placeholders are in, submit is cancelled and the page says "The form is not connected yet", pointing at `info@digitalwellbeingapp.com`. When the IDs land, the same code wires `form.action` and both input names at runtime and behaves as originally designed. One paste, no other edit.

**Deletion form wired 2026-08-27.** Founder created it and sent the link. Form id `1FAIpQLScnsTdwAGurb61MKXVxesIqlKv5Sc2jnpBLJ7Spxj28BABN7A`, one required question "Your User ID" at `entry.1338548693`. There is no second question, so the "Why are you leaving?" field hides itself rather than collecting an answer that would be thrown away. Add a short-answer question to the form and paste its entry id into `REASON_ENTRY` and the field comes back on its own.

**Waitlist form: reuse confirmed**, founder's call, "no one signed in" on the old Oct 2025 list. The `#download` field posts at `1FAIpQLSez...`, `entry.1406486002`.

**Field sits above the button on desktop**, founder's call. `.wait-row` is a 260px column, not a row.

**Both forms tested live by the founder 2026-08-27.** `GW-TEST-0000` arrived in the deletion sheet, the iOS waitlist email arrived in the signup sheet. Task 9 is closed.

**Still on the founder:** check whether the Play listing links to `delete_my_data/`.

`index.html` 59,185 -> 62,341 bytes. Backups: `_review/index.html.pre-task9-2026-08-27.bak`, `_review/delete_my_data.index.html.pre-task9-2026-08-27.bak`.

**Google Forms over Firestore, decided 2026-08-27.** The site is static on GitHub Pages, so writing to Firestore needs the web API key in the page and a publicly writable collection. See the rules finding below. Forms need no key, no rules change and no cost, and the plumbing already existed.

### Task 10 skipped by the founder, 2026-08-27

Called off after the data was rendered and costed. The legal route was clear and the chart was buildable, he chose not to spend the page on it. Not deferred, skipped. Goes under rejected in the marketing report alongside tasks 8 and 12.

What the render found, kept because it outlives the task:

| Candidate | Verdict |
|---|---|
| Screen time before vs after | Dead. The prototype's own banner says the "after" minutes are a stand-in, about 19% of the real clock |
| Session length vs mood | Dead. Only 54 sessions across 12 users have both a duration and a check-in. Bands read 50%, 58%, 40%, 50%, which is noise |
| How each app leaves you feeling | Real. YouTube 75% pleasant, Instagram 67%, Facebook 59%. 391 check-ins, 18 users, 16 Jul to 10 Aug. LinkedIn dropped, only 3 users behind it |

**The dataset is smaller than this spec said.** 188 is the number of user records. Only 44 ever produced a log, and 27 have a usable emotion answer. Any future claim sourced from it uses those numbers, not 188.

### Task 10, the legal question settled 2026-08-27

The founder asked what the rule actually is. It is four lines.

| Act | Allowed? | Why |
|---|---|---|
| Collect emotion data | Yes | Privacy policy §2 already lists it |
| Train the model on it | Yes | Same §2, "detect your optimal digital exit signal", "generate insights" |
| Publish an aggregate chart over all 188 users | Yes | Aggregate over a group that size is anonymous, so the policy does not govern it |
| Publish one user's week | Only with that user's consent | One person's data is pseudonymous, not anonymous |

Building the model was never the problem and the founder was right to push back on that. Publishing is a separate act, and §2 lists no marketing purpose and §3 lists no public disclosure, which is why the aggregate route is the one that works.

**Why one user is different.** The exported dataset at `web/insights/data/dataset.json` is clean on its own: 188 users, fields are `userId`, `publicId`, `createdAt`, `age`, `sex`, no email and no name. But `userId` is the same SHA-256 device hash that keys the Firestore doc, the doc carries `googleUid` per decision D3, and `googleUid` resolves to an email in Firebase Auth. Three steps inside the founder's own console. That chain is what "pseudonymous" means: the key still exists. Anonymous means the key is gone. Pseudonymisation is a good thing and GDPR Article 32 asks for it, it is just not an exemption.

**Founder's own rule, adopted:** a user sharing their weekly report is their choice and nothing gets shared against their will. That is consent, which is the cleanest basis there is, and a real person's real week is a stronger landing page object than a bar chart. Worth building as a share feature rather than treating it as a legal workaround.

**One line to add** to `legal/privacy-policy.html` §2 next time it is touched: publication of anonymous aggregate statistics. Not urgent, the aggregate route does not depend on it.

Chart still to pick from `dev/gamerswellbeing/web/weekly-report/`. Two candidates: `catChart`, median minutes a day by category, which is not emotion data at all, and `moodChart`, the mood map.

### `firestore.rules` is wide open, found 2026-08-27

Not a website task, but it outranks everything on this list.

```
match /users/{userId}/{document=**} { allow read, write: if true; }
match /emotionLogs/{logId}          { allow read, write: if true; }
```

Comment says "allow all during development". The commit that introduced them is `cfb1d4c [RULES] live firebase rules`. Project id `gwapp-30e03` ships inside every APK in `app/google-services.json`, so it is public by definition. Anyone can read every user's check-ins and screen time, and write or delete them. The founder confirmed the deployed rules are byte-identical to the file.

This also settles the forms question above: do not add a second unauthenticated write path into that database.

**Proposal written to `dev/gamerswellbeing/firestore.rules.proposed`, not deployed.** It blocks delete on `users` and its subcollections, blocks update and delete on `emotionLogs`, and requires the 64-hex device hash on every write. Checked against the app first: the only `.delete()` in the Kotlin is `FieldValue.delete()` on one field, which is an update, and check-ins are only ever created, so none of it breaks the current app.

**The deployed rules are the file.** The founder pasted his live rules on 2026-08-27 and they diff clean against `firestore.rules` apart from whitespace, so nothing about the finding changes.

**Handed to the dev project, not fixed here.** Prompt at `_review/dev-project-prompt.md`, covering the rules in both stages plus the three marketing claims that depend on the Android repo: the Play listing's Accessibility declaration, `ACCESS_COARSE_LOCATION` against the "never any phone data" line, and the absence of any device-local claim. It also asks for a share control on the weekly report, which is the consent route to a single-user chart for task 10.

**Reads cannot be closed from the rules file.** The app signs nobody in, so every request arrives unauthenticated and Firestore cannot tell the app from a stranger. Closing reads needs `signInAnonymously()` at first run plus an `ownerUid` field on the doc, which is an app change and a release. Written up as stage 2 at the bottom of the proposed file. It does not touch decision D1, the doc id stays the device hash.

### The `#inside` intro paragraph overflows at 360

`index.html:869` carries a hardcoded `style="width: 730px;"`. At a 360 viewport the paragraph is 640px wide and the document scrolls sideways. Pre-existing, present in the pre-task-9 backup, not caused by this work. One line: `max-width:730px; width:100%`. Not fixed, waiting on the founder.

### Task 9 is no longer blocked on the tech

The pattern already exists in this repo. `delete_my_data/index.html` posts a plain `<form>` straight at a Google Form's `formResponse` endpoint, `target`-ed at a hidden iframe, and treats the iframe's `load` event as the success signal because the response is cross-origin and unreadable. No backend, no third-party script, works on GitHub Pages. Copy that whole approach for the iOS waitlist: one email field instead of the ID and reason fields.

It also carries the two things worth stealing: an inline success message that replaces the form, and a timeout fallback that re-enables the button and shows a `mailto:` if the POST never lands.

**But that form has never worked.** It ships three literal placeholders:

```
action="https://docs.google.com/forms/d/e/REPLACE_FORM_ID/formResponse"
name="entry.REPLACE_USERID_ENTRY"
name="entry.REPLACE_REASON_ENTRY"
```

So every deletion request submitted from that page has failed since 2026-08-16, falling through to the email fallback if the user waited for it. Nothing links to `delete_my_data/` from either HTML page, so the only traffic is from the Play Store listing or the app itself. **Founder needs to check whether the Play listing points at it.**

To get both pages working the founder creates the Google Forms and sends the IDs. To read them: open the live form, view source, find `FB_PUBLIC_LOAD_DATA_`, the `entry.NNNNNNN` numbers are in there. The form id is the `/d/e/<id>/viewform` segment of its share URL.

### What the Android source actually says, verified 2026-08-27

Kept because task 7 is done but every other privacy or permission claim on any surface has to match this. Source at `D:\anas\Work\GW\dev\gamerswellbeing`.

**The app does not use the Accessibility permission.** No class extends `AccessibilityService` anywhere in the Kotlin. No `BIND_ACCESSIBILITY_SERVICE`, no service declaration in `AndroidManifest.xml`, no `res/xml` accessibility config. `AppDetectionService.kt:44` extends `BaseForegroundService`. The brief and the GTM plan both build task 7 around this permission and both are wrong about it.

**The accessibility strings are dead code.** `res/values/strings.xml` and `res/values-ar/strings.xml` carry a full set, including a Google Play prominent-disclosure block written for the policy requirement. Nothing references them. If the Play listing still declares an Accessibility service, the listing and the APK disagree, which is the founder's to check.

**Foreground detection is Usage Access.** `PACKAGE_USAGE_STATS`, polled in `UsageStatsPoller.kt:97` through `queryEvents`. That yields the foreground package name and how long it has been open, nothing more.

**The other permissions that touch the page's claims:**

| Permission | What it is for | Where |
|---|---|---|
| `PACKAGE_USAGE_STATS` | which app is open, for how long | `UsageStatsPoller.kt:97` |
| `QUERY_ALL_PACKAGES` | list installed apps so the user picks what to track | manifest |
| `SYSTEM_ALERT_WINDOW` | draws the butterfly over other apps | manifest |
| `ACCESS_COARSE_LOCATION` | **marketplace only**, city level | `RewardsFragment.kt:188`, `GpsCitySource.kt` |
| `POST_NOTIFICATIONS` | delivering the signal | manifest |

**Check-ins do not stay on the device.** `EmotionRepository.kt:131` writes them to the Firestore `emotionLogs` collection. The app also ships Firebase Analytics, Crashlytics, Auth, Storage, Config and Functions. So "nothing leaves your phone" is not a claim this page can make.

### Blocked on the founder

- **Task 6** — needs 6 to 10 seconds of screen capture: the butterfly appearing over a real TikTok or Instagram scroll.
- **Task 9** — needs a Google Form and its three IDs, see "Task 9 is no longer blocked on the tech" below.
- **Task 10** — needs a real anonymized mood chart. Voice rule: every number carries a source or comes off.
- **`#solution` screenshots** — founder is creating a new butterfly screenshot.
- **Google Form IDs** — for task 9 and to repair `delete_my_data/`.

---

## Assets

Referenced by a live page:

| File | Size | Used by |
|---|---|---|
| `exit-sign-1148.webp` | 41 KB | hero |
| `qr-play.webp` | 456 B | hero, nav and `#download`, all desktop only |
| `play-badge.webp` | 12 KB | `#download`, the official Google Play badge |
| `solution-exit-sign.webp` | 39 KB | `#solution` |
| `screen-02/03/05.webp` | 30 / 29 / 21 KB | `#inside` |
| `logo.webp` | 2 KB | nav and footer, both pages |
| `anas.webp` / `omnia.webp` | 5 / 5 KB | `investors.html` founder cards |
| `firstrun_hero.gif` | 1,041 KB | `investors.html`, lazy-loaded |
| `logo.png` | 27 KB | **`axis-checkin/index.html`**, do not delete it for being unused on the landing page |

Kept as sources, referenced by nothing:

| File | Size | Note |
|---|---|---|
| `screen-01.png` | 468 KB | Has "You earned 5 points" burned into the image. Unresolved: crop, swap, or reshoot. |
| `screen-02.png` | 229 KB | Select Apps to Track. Bottom nav shows a "Rewards" tab. |
| `screen-03.png` | 635 KB | Breath / emotion check-in, butterfly. Clean. |
| `screen-04.png` | 974 KB | Emotion grid. Clean. |
| `screen-05.png` | 597 KB | "Take a break / There is a drop in your mood." The strongest asset for the exit-signal story. |
| `solution-exit-sign.jpg` | 140 KB | Source of the hero and `#solution` WebP files. |
| `google-play-app.png` | 78 KB | **Outside the repo**, at `D:\anas\Work\GW\website\`. The official Play badge on a white canvas, alpha bbox (45,149)-(1160,527). Source of `play-badge.webp`. |
| `anas.jpg` / `omnia.jpg` | 133 / 59 KB | Sources of the avatar WebP files. |

Deleted 2026-08-26: `index-preview.html` (merged into `index.html`), `assets/exit-sign.webp` (1376 px first cut, superseded).

**No `ffmpeg`, `magick` or `cwebp` on this machine.** Python **PIL 12.1.0** is available and produced every WebP here.

Python **`qrcode`** is installed and generated the QR. **`opencv-python-headless`** was installed on 2026-08-26 to decode a generated QR back to its URL, which is the only real check that an attribution tag survived encoding. `segno` is not installed. SVG output from `qrcode` was rejected: one `<path>` per module came to 16 KB against 456 bytes for the WebP.

---

## Open, not yet decided

- **The privacy line says Wellbeing never sees "any phone data", and `ACCESS_COARSE_LOCATION` ships today.** It is requested in `RewardsFragment.kt:188` for a marketplace that is not live. Either the permission comes out of the app until the marketplace ships, or the clause narrows. Raised 2026-08-27, undecided. This is a claim on a live page, not a style question.
- **`investors.html` still carries "Validated in alpha · 2026".** The capsule was removed from `index.html` only. That breaks the rule that both pages carry an identical `#research`. Deliberate for now, since the alpha claim is investor material, but it needs a yes or no. Raised 2026-08-27.
- **The Play listing may still declare an Accessibility service** the APK does not have. Founder's to check. Raised 2026-08-27.

- **The blue pill vs the Play badge.** Only `#download` uses the official badge. The hero, the nav and the sticky mobile bar are still the blue "Get the app" pill. Google's guidelines want the badge wherever the page points at Play. Raised 2026-08-26, undecided: swap all four, or keep the pill above the fold for contrast against the dark palette.
- **A dev tweaks panel is still shipped in `index.html`.** `aside.wb-tweaks`, "Tweaks / Screens row", a photo-align segmented control and a lift slider with about 60 lines of JS behind it, sitting between `</main>` and the footer. It is live on `digitalwellbeing.xyz`. Not on any task list, found 2026-08-26. Ask before cutting it, it may still be how the founder nudges the `#inside` phone row.

- **Em dash in the `#download` sub copy.** It reads "Download Wellbeing on Android today. iOS launching soon **—** join the waitlist and we'll let you know the moment it's live." The no-em-dash rule says it goes. Raised 2026-08-26, founder answered about the form instead, so the dash is still there. It is his copy, so it stays until he says. The sentence changes anyway when task 9 replaces the `mailto:` button with a real field.

---

## Findings worth keeping

**The brief is wrong about `firstrun_hero.gif`.** Block 1 calls it "the butterfly appearing over a real scroll" and wants it as the hero video. It is not that. It is a 320x183, 162-frame pixel-art meme, a Godfather riff where a man takes a gift box off a car. Pure marketplace messaging and far too small for a hero. There is no butterfly-over-scroll footage anywhere in the repo, which is why task 6 is blocked.

**That GIF stays a GIF.** Animated WebP was tried at three quality levels and every one came out larger than the 1,041 KB original: 1,198 KB at q65, 979 KB at q50, 754 KB at q35 and visibly mushy on pixel art. A GIF's palette plus frame differencing beats lossy WebP on flat pixel art. Re-saving the GIF with PIL `optimize=True` also made it bigger, 1,267 KB. The real fix is MP4 or WebM and that needs `ffmpeg`.

**Three CSS bugs found while building the hero**, all fixed, all worth remembering:
1. `.hero-visual{min-height:560px}` at ≤980px pushed the sign about 610px down, below the mobile fold. The override lost on source order. Fix: append new CSS at the **end** of the stylesheet, never mid-file.
2. Nav collided at 360px, wordmark under the hamburger and CTA wrapping to two lines. `.brand .name` now hides below 560px.
3. The sign bled left but not right, `flex-shrink` was eating `calc(100% + 56px)`. Now symmetric negative margins.

---

## Working method

- **All work happens in `index.html` directly.** The preview was signed off and merged on 2026-08-26, and `index-preview.html` was deleted. `_review/harness.html` was rebuilt on 2026-08-26 for the `#research` review and is on disk again. Pre-merge backup: `_review/index.html.pre-merge-2026-08-26.bak`, outside the repo.
- **`_review/`** at `D:\anas\Work\GW\website\_review\` holds review screenshots and the backup. Outside the git repo, so it never gets committed.
- Serve the **parent** dir so the site and any review harness share an origin: `python -m http.server 8765` in `D:\anas\Work\GW\website`. The repo's own `run-local-server.bat` uses port 8000.

### Reviewing at mobile width

`resize_window` cannot do it, Chrome refuses to go below roughly 500px wide. Iframe the page instead, from a harness served on the same origin. Rebuild `_review/harness.html` when needed:

```html
<!doctype html><meta charset="utf-8"><title>360 harness</title>
<style>body{margin:0;background:#222;display:flex;gap:18px;padding:14px}
iframe{width:360px;height:640px;border:0;background:#000}</style>
<iframe id="a" src="/wellbeingwebsite/index.html"></iframe>
<iframe id="b" src="/wellbeingwebsite/index.html"></iframe>
```

Two things that do not work inside those iframes, both cost time before they were understood:

- **Scrolling.** `scrollTo` and `scrollingElement.scrollTop` both read back `0`. To review a lower part of the page, shift the document instead: `body{position:relative; top:-Npx}` on the iframe's document. `position:fixed` elements stay pinned, which is exactly what makes it a valid way to test a sticky bar against the footer.
- **Anchor links.** `#id` jumps do not hold; images load after the jump and the layout snaps back to the top.

Programmatic scrolling fails on the top-level page in this browser tooling too. Use the mouse-wheel scroll action, not `window.scrollTo`.

---

## Repo and git

- **Never edit the founder's copy.** Not grammar, not register, not a stray comma. Suggest the change in the reply and let him decide. This was a real mistake on 2026-08-26: seven strings in `#research` were rewritten without being asked and had to be reverted.
- **Never commit without explicit approval.** The founder commits this work himself.
- Branch is `master`, and `master` is the published branch. A push goes live on `digitalwellbeing.xyz` through GitHub Pages.
- Commits so far: `b89d363` task 1 and the hero, `48be0f1` task 4 and `investors.html`, `53e0014` tasks 2, 3 and 5 plus the merge, the title and the two deletions. `43628d2` task 11, the three QR codes and the Play badge, committed by the founder on 2026-08-26 while the notes were still being written, so the spec and changelog entries for it landed across that commit and the working tree.
- As of 2026-08-26, after `43628d2`, the only uncommitted files are `specs/CHANGELOG.md` and `specs/v2-landing-page.md`, the rest of these task 11 notes. `master` is in sync with `origin/master`, so the QR codes and the badge are live. GitHub Pages was still serving the old page a minute after the push, which is normal build lag. Verify at `digitalwellbeing.xyz`: the title should read "Wellbeing: Find out which app drops your mood" and the page source should contain `install-bar`.
- Max 200 words per response, per `CLAUDE.md`.
