# v2 landing page rebuild

Rebuild of `index.html` to serve one job: **get the Google Play install.**
Deadline: live by **2026-09-04**. Started 2026-08-24. Last updated 2026-08-27.

**Where things stand:** 13 of the 14 brief tasks are closed. Task 6, the hero video, is the only one left and it is waiting on footage that does not exist yet. Three tasks were rejected or skipped by Anas, see the decisions table. Six small questions still need a yes or no from him.

Changes on this page are for the marketing team, not a dev request.

---

## Read these first. They live outside this repo

| File | What it holds |
|---|---|
| `D:\anas\Work\GW\marketing\plans\v2-landing-page-brief.md` | **The task list.** Part 3 is the gap table, already prioritized. Part 4 has per-block specs. |
| `D:\anas\Work\GW\marketing\plans\v2-2026-08-24-gtm-plan.md` | §8 = landing page structure. §2 = positioning. §13 = the National Wellbeing Strategy ruling. |
| `D:\anas\Work\GW\marketing\plans\voice-guide.md` | **Supersedes** the vague "no wellness language" line in the GTM plan and the brief. Read before writing any user-facing string. |
| `D:\anas\Work\GW\marketing\plans\v2-install-attribution-links.md` | The canonical UTM links, one per channel. Copy them, never retype them. |

---

## What this page is selling. Do not drift from it

**Offer, one sentence:** You'll see how each app actually makes you feel, and you'll get tapped on the shoulder before the scroll turns on you.

**Never on this page:** rewards, points, marketplace, or any productivity/focus benefit. The brief allowed one honest FAQ line as an exception. That FAQ was rejected on 2026-08-27, so there is no exception left and the page carries none of it. Stricter than the brief asks, not looser.

**Voice, short version:** concrete, second person, short sentences. Write about feelings freely, "feel good", "feel worse", "how it made you feel" are correct and are the product. Banned is the abstract wellness register: mindful, journey, balance, cultivate, holistic, self-care, reclaim, thrive. "Wellbeing" is the app's name and is always fine. Never shame the user. Every number carries a source or comes off. **No em dash anywhere**, founder's rule.

---

## Decisions Anas made, and why. Do not reopen these.

Newest last. Every row is his call, not mine. The reason column is why he made it, in his words where he gave them.

### Before 2026-08-27

| # | Decision | Why |
|---|---|---|
| 1 | Marketplace is not hidden, it just stops being sold. The full marketplace and SME story lives on `investors.html`. No public roadmap page. **Overtaken by decision 9:** the one honest FAQ line this originally allowed no longer exists, because the FAQ was rejected. The landing page now carries no marketplace language at all. | Hiding it looks dishonest. Selling it oversells a thing that does not exist yet. |
| 2 | The two domains stay as they are. Site is `digitalwellbeing.xyz`, emails stay `@digitalwellbeingapp.com`, and the `.com` redirects to the `.xyz`. | Brief task 13 asked to fix it. Nothing to fix, it is already right. The `.com` is the mail domain on purpose. |
| 3 | National Wellbeing Strategy 2031 comes off the landing page. It lives on `investors.html` as "Why now", framed as market timing. The word "aligned" is gone. | Reading it as an endorsement would be a claim he cannot back. Market timing he can. |
| 4 | `investors.html` gets built and carries the cut investor content plus founder photos. Footer link only, never the nav. | Investor material was pushing regular visitors away from the install. It still has to exist somewhere. |
| 5 | Hero headline is locked. "YOU NEED AN EXIT SIGN." | His own words. Not up for rewriting. |
| 6 | WHAT THE DATA SAYS stays on the landing page. Reverses that part of task 4. The same block stays on `investors.html`, so both pages must be edited together. | 2026-08-26. The alpha numbers are the strongest install argument on the page. They read as product proof to a regular user, not as investor material. |
| 7 | Typos in his copy get fixed silently. Meaning, wording and register still get proposed to him first. | 2026-08-27. Two typos shipped because the old rule said flag, never fix. His answer: "come on man! fix my typos.. don't make me look stupid!" |

### 2026-08-27

| # | Decision | Why |
|---|---|---|
| 8 | **Task 8, the "Not a blocker" comparison table, is rejected.** Not postponed. If it ever returns it belongs on `investors.html` with new copy. | Two reasons. The brief's copy is bad: "I reject the copy. it's stupid." And the block is aimed at the wrong person: an argument against blocker apps is investor material, not something a regular visitor came to the page for. |
| 9 | **Task 12, the FAQ block, is rejected.** Not postponed. | "all these questions are so technical and not not important for regular users." Does it block apps, battery drain, Xiaomi/MIUI, is my data sold, what are points for. Those are support questions, not the doubts someone has before installing. |
| 10 | Both forms post to Google Forms. Not to Firebase. | The site is static on GitHub Pages, so Firebase would need the web API key sitting in the page and a collection anyone can write to. The Firestore rules are already wide open, see below. Adding a second unauthenticated write path into that database would make it worse. |
| 11 | The iOS waitlist reuses the existing Google Form from Oct 2025 instead of a new one. | "Fine, no one signed in." The old signup list is empty, so there is nothing for the iOS list to get mixed up with. |
| 12 | On desktop the email field sits above the Join iOS waitlist button, not beside it. | His call after seeing it side by side. He also said the mobile version reads better than the desktop one, and stacking is what mobile was already doing. |
| 13 | The Firestore rules get handed to the dev project. Not fixed from here. | "write a prompt with your claims and marketing claims to the claude dev project. they will handle it." Website repo is the wrong place to change app security. Prompt written to `_review/dev-project-prompt.md`. |
| 14 | Nothing to do on the legal side. An aggregate chart over many users is safe to publish. | "The data on the landingpage is anonmous and for many users without spacifying any personal information about them." Correct. Aggregate over a group that size is anonymous data, so the privacy policy and GDPR do not reach it. His own rule stands too: a user sharing their weekly report is that user's choice, and nothing gets shared against their will. |
| 15 | **Task 10, the mood chart, is skipped.** | Called off after the data was rendered and the numbers checked. The legal route was clear and one real chart existed. He chose not to spend the page on it. Skipped, not deferred. |
| 16 | Sections are called by the label printed on the page, never by their HTML id. | "I don't understand when you tell me @research or #inside. that is not how I comunicate sections names with you!" He wrote the page as headings. The ids are mine to work with, not his to read. |
| 17 | A report is owed to the marketing team once the remaining work closes. Four buckets: done as briefed, done with a change from him, done completely differently by him, and rejected. | He is the PM. The marketing team wrote the brief and has not seen how much of it changed. |
| 18 | Every update and decision gets written down with its reason, including the ones that postpone or kill something. | His instruction, 2026-08-27. This section is that. |

### Section names to use with him

| HTML id | Say this |
|---|---|
| `#research` | WHAT THE DATA SAYS |
| `#problem` | THE PROBLEM |
| `#solution` | THE SOLUTION |
| `#inside` | HOW IT WORKS |
| `#loop` | YOU ARE THE HERO |
| `#download` | the download block, "Less screen. Better mood." |

---

## The hero. Locked, built, shipped

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

## What was built, and what changed on the way

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

## The task list, where each one stands

All 14 tasks from the brief. Nothing is missing from this table.

| # | Task | State | Why |
|---|---|---|---|
| 1 | Strip the adblock CSS | **Done** 2026-08-24 | |
| 2 | Sticky Play button on mobile | **Done** 2026-08-25 | |
| 3 | UTM tags on every Play link | **Done** 2026-08-25 | |
| 4 | Cut the investor content | **Done** 2026-08-25, partly reversed 2026-08-26 | Anas put WHAT THE DATA SAYS back, decision 6 |
| 5 | Compress the images | **Done** 2026-08-25 | 1,689 KB down to 164 KB |
| 6 | Hero video | **Waiting** | Two things missing. No footage of the butterfly over a real scroll exists anywhere. And this machine has no `ffmpeg`, so even with footage nothing here can make an MP4. Anas: "that will need sometime." |
| 7 | Privacy block | **Done** 2026-08-27 | Shipped as a two-line capsule in his own words, not the section the brief asked for |
| 8 | "Not a blocker" comparison table | **Rejected** by Anas 2026-08-27 | Copy is bad and it is aimed at investors, not visitors. Decision 8 |
| 9 | Real iOS waitlist form | **Done** 2026-08-27 | Both it and the deletion page work. He tested both |
| 10 | Mood chart as proof | **Skipped** by Anas 2026-08-27 | Decision 15 |
| 11 | QR code for desktop | **Done** 2026-08-26 | Three positions, not the one the brief asked for |
| 12 | FAQ block | **Rejected** by Anas 2026-08-27 | Questions are too technical for a regular user. Decision 9 |
| 13 | Fix the domain split | **Nothing to fix** | Already correct. Decision 2 |
| 14 | Cut rewards and marketplace | **Done** 2026-08-26 | |

Task 6 is the only one still open. Everything else is finished, rejected or skipped.

### Tasks 8 and 12, rejected by Anas 2026-08-27

Both killed outright, not deferred. Neither ships on the landing page.

**Task 8, "Not a blocker" comparison, brief block 5.** The copy was rejected on quality, and the block was rejected on audience: the founder reads the comparison-against-blockers argument as investor material, not something a regular visitor came for. If it is rebuilt at all it belongs on `investors.html`, with new copy, and nothing has been written for it yet.

**Task 12, FAQ, brief block 8.** Rejected on audience. The five questions the brief specifies (does it block apps, battery drain, Xiaomi/MIUI, is my data sold, what are points for) are technical support questions, not install objections a regular user has before installing.

This kills the only sanctioned home for the marketplace line. Brief Part 6 says "zero occurrences of rewards, points or marketplace outside the single FAQ line" and there is now no FAQ line, so the landing page carries none of it at all. That is stricter than the brief, not looser, so nothing else has to change. Decision 1 stands: the full marketplace story stays on `investors.html`.

It also drops the only place the page answered "is my data sold". The Firestore and location question in "Open, not yet decided" stops being a copy blocker and stays a factual one.

**A report to the marketing team is owed** once the remaining tasks close, sorted four ways: done as briefed, done with a change from the PM, done completely differently by the PM, and rejected. Tasks 8 and 12 are the first two entries under rejected.

### Task 9 done, 2026-08-27. Both forms work.

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

### Task 10, skipped by Anas 2026-08-27

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

### How the forms work, for whoever touches them next

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

### Waiting on Anas

- **Task 6, the hero video.** Needs 6 to 10 seconds of screen capture, the butterfly appearing over a real TikTok or Instagram scroll. Nothing like it exists in any repo. He knows, and said it will take time.
- **THE SOLUTION screenshots.** He is making a new butterfly screenshot.
- **Does the Play Store listing link to `delete_my_data/`?** Nothing on either HTML page links to it, so its only traffic comes from the listing or the app. Worth knowing now that the page works.
- **A "Why are you leaving?" question on the deletion form.** The form has one question. Until a second one exists, that field on the page stays hidden rather than collecting an answer with nowhere to put it.

Cleared since this list was written: task 9 needed Google Form IDs and now has them, task 10 needed a mood chart and was skipped.

### THE SOLUTION and HOW IT WORKS are live phone demos now, 2026-08-29

His instruction. Both sections are copy on the left, a running phone demo on the right.
This closes "his own idea, not on the brief" below, and it went further than that note
described: it took THE SOLUTION as well, not only HOW IT WORKS.

**The demos are two documents he wrote**, from `dev/gamerswellbeing/web/promo/`:

| Section | Demo | What it does |
|---|---|---|
| THE SOLUTION | `promo/1-stop-sign.html` | Loops. A blurred doomscroll feed, then the butterfly flies in and says take a break |
| HOW IT WORKS | `promo/2-how-do-you-feel.html` | **Interactive.** Home screen, tap the app, the butterfly appears, tap it, mark how you feel on the axis grid |

**Iframed, not inlined.** Both are complete documents with their own `*` reset, an
`html,body{height:100%}` rule, a body background gradient and a `fit()` that scales the
phone to `window.innerHeight`. Inlining any of that would have collided with the page
stylesheet, and file 2 is 55 KB with a 966-line script. In an iframe their `fit()` reads
the iframe box instead of the window, so each demo scales itself to whatever size the
stage is given and no size has to be hardcoded. The stage is `aspect-ratio: 424/834`,
which is the phone frame plus a little slack, so it stays right at every width with no
media query. Both iframes are `loading="lazy"`.

**Three edits to the copies in `promo/`, none to his originals in the dev repo:**
1. PNG srcs to WebP.
2. `.caption-note` set to `display:none`. That is the standalone slate label at the
   bottom, "Wellbeing — the stop sign". It is a demo watermark, not page copy, and it
   carries an em dash. **Flagged to him.**
3. The `fit()` insets went from `-60`/`-24` to `-12`/`-12`, since the slate that the 60px
   was leaving room for is gone.

**Assets, `promo/assets/`, 85.6 KB of PNG to 17.9 KB of WebP (-79%).** `butterfly-logo`
was 540px for an 84px display, rebuilt at 176px per the repo's 2x rule. `frame.png`
46 KB to 6.6 KB.

**THE SOLUTION, what he asked for and what it now is:**
- Title was "You need an exit sign!", the same line as the hero h1. He gave
  "An exit sign before screentime turns bad.", then took the full-sentence version:
  **"You get the exit sign before screentime turns bad."** A fragment read soft sitting
  under a hero that is a full sentence, and this one answers "YOU NEED AN EXIT SIGN."
- The drifting-car image (`solution-exit-sign.webp`) is gone, replaced by demo 1.
- The three steps are stacked in one column, icon beside the text, `.flow.stacked`.
- Icons 64px to 40px, radius 18 to 12, the glyph 32 to 21.
- The `01 / Notice`, `02 / Ask`, `03 / Signal` labels are deleted. The `.step .num` CSS
  stays, `investors.html` still uses it.
- Step head and body copy are unchanged, his words.

**HOW IT WORKS:** the three `.screens-row` screenshot columns are gone, replaced by
demo 2.

**The subtitle became an invite, and its content moved into the captions.** His call,
2026-08-29: the captions were repeating the subtitle, so the subtitle's better wording
went into them and the subtitle itself is now **"Try it now in the web demo."** That
line is doing a job the old one could not: demo 2 is interactive and nothing was telling
anyone to touch it.

The old subtitle, now retired: "The butterfly helps you map your emotional states: angry,
energized, calm, or down. Your feelings input helps us predict where you should stop
scrolling. Within 4 weeks, we help you adopt new healthier habits."

| Caption | Was | Is |
|---|---|---|
| Emotional Check-in | "Mark your emotions on the butterfly. We learn your patterns, app by app." | "**One tap on the butterfly: angry, energized, calm, or down.** We learn your patterns, app by app." |
| Exit Signal | "When mood drops, we send you a clear signal. **You should take a break.**" | "**Your feelings input helps us predict where you should stop scrolling.** When mood drops, we send you a clear signal." |
| App Tracking | "Decide which apps to track and how often we check on you." | "Decide which apps to track and how often we check on you. **Within 4 weeks, we help you adopt new healthier habits.**" |

Bold is what moved in from the subtitle. Every phrase is his, from one place or the other.
Two notes on the seams:
- "Mark your emotions" was abstract where the subtitle was concrete, so the four emotions
  replaced it. The voice guide asks for the concrete one.
- **"You should take a break." was dropped**, the only phrase that did not survive the
  merge. It is the in-app string, and "we send you a clear signal" in the same sentence
  was already saying it. Say the word and it goes back.
- **"Within 4 weeks" still has no source.** It had none in the subtitle either, so this
  changes nothing, but the voice guide's rule is that every number carries a source or
  comes off. It had no natural caption and App Tracking was the only one about the
  ongoing relationship, so that is where it landed. Raised, not decided.

**On a phone the demo sits between the heading and the list**, in both sections. His
call. `.demo-copy` gets `display: contents` below 980px, which drops it out of the box
tree so the heading and the list become grid items of `.demo-split` in their own right,
and `order` can then place the stage between them. Order verified at narrow width:
heading, stage, list, in THE SOLUTION and HOW IT WORKS both. Desktop is untouched, the
grid is still `748px 380px`.

**The three caption blocks are back, his call the same day.** They were deleted with the
screenshot columns they belonged to, flagged, and he said bring them back and set them
vertical. They are now a `.cap-list` down the left column under the section paragraph,
byte-identical copy from the backup: "Emotional Check-in / How are you, really?",
"Exit Signal / Caught before the spiral.", "App Tracking / Your rules."

They keep the `.screen-cap` class, so if the screenshots ever come back the CSS is
already shared. Inside `.cap-list` they are left-aligned instead of centred, and
separated by a hairline rather than wrapped in panel cards, so HOW IT WORKS does not
read as a second copy of the three cards in THE SOLUTION.

This fixes the balance: the HOW IT WORKS left column went from 219px to **580px** of
copy against the 746px phone, which now matches THE SOLUTION's 602px.

**The demos start when their section is reached, not on page load.** His instruction.
Each iframe carries `data-src` and an `IntersectionObserver` at `threshold: 0.35` swaps
it to `src` the first time the stage is a third on screen, then unobserves. Verified:
at the top of the page there are zero network requests to `promo/`; at THE SOLUTION only
`1-stop-sign.html` has loaded; `2-how-do-you-feel.html` loads only on reaching HOW IT
WORKS. Without this both demos ran from page load and a visitor arrived mid-sequence,
which for demo 2 meant missing the home screen and the app tap that set it up. No
`IntersectionObserver` means both start immediately, which is the old behaviour.

**Open question 6 is closed by this.** The HOW IT WORKS paragraph's hardcoded
`width: 730px` at the old `index.html:869` is gone. At 360 the only element still wider
than the viewport is `.who-card.users`, which is in another section and pre-existing.

**Two things are now dead code**, both left alone because open question 4 says ask first:
the `.screens-row` / `.screen-col` / `.screen-frame` / `.screen-cap` rules, and the dev
tweaks panel's "Screens row" slider and photo-align control, which drove `--shift-3rd`
and `data-photoalign` on a row that no longer exists.

**Also now unreferenced by `index.html`:** `solution-exit-sign.webp` and
`screen-02/03/05.webp`. Not deleted, and `screen-*.png` sources stay per the assets table.

`index.html` 62,377 -> 66,710 bytes. Height at 360px 11,459 -> 11,221 px, so the page is
still shorter than it was even with the captions restored. Backup: `_review/index.html.pre-demos-2026-08-29.bak`. Harnesses:
`_review/harness-demos.html` (desktop, both sections side by side at 1400px scaled) and
`_review/harness-demos-360.html`.

### His own idea, not on the brief

Replace the screenshots in **HOW IT WORKS** with a walkthrough built from the check-in mockup at `dev/gamerswellbeing/web/axis-checkin/index.html`: butterfly appears, user taps it, user picks an emotion, butterfly says there is a drop in your mood, take a break. Raised 2026-08-27. Not started, not scoped, no decision yet.

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

## Still needs a yes or no from Anas

Small things. None of them block anything. Each one has been raised and none has been answered.

| # | Question | Why it is open |
|---|---|---|
| 1 | The privacy capsule says Wellbeing never sees "any phone data", but `ACCESS_COARSE_LOCATION` ships in the app today | Requested at `RewardsFragment.kt:188` for a marketplace that is not live. Either the permission comes out of the app, or the sentence narrows. This is a claim on a live page, not a style point. Raised 2026-08-27, now also in the dev project prompt |
| 2 | `investors.html` still shows the green "Validated in alpha · 2026" capsule | It was removed from the landing page only. The two pages are supposed to carry an identical WHAT THE DATA SAYS block. Left on purpose for now, since the alpha claim is investor material, but it needs a decision. Raised 2026-08-27 |
| 3 | Three of the four Play links are still the blue "Get the app" pill | Only the download block uses the official Google Play badge. Google's guidelines want the badge everywhere the page points at Play. Swap all four, or keep the pill above the fold because it looks better on the dark background. Raised 2026-08-26 |
| 4 | A developer tweaks panel is still shipped and live on `digitalwellbeing.xyz` | `aside.wb-tweaks`, "Tweaks / Screens row", a photo-align control and a slider with about 60 lines of JS, sitting between `</main>` and the footer. Not on any task list, found 2026-08-26. It may still be how he nudges the phone row in HOW IT WORKS, so ask before cutting |
| 5 | Em dash in the download block sub copy | "iOS launching soon **—** join the waitlist". His no-em-dash rule says it goes, but it is his sentence, so it stays until he says otherwise. Raised 2026-08-26, he answered about the form instead |
| 6 | ~~One paragraph in HOW IT WORKS has a hardcoded `width: 730px`~~ | **Closed 2026-08-29.** The paragraph was rewritten into the new two-column HOW IT WORKS and the hardcoded width went with it |
| 7 | ~~Three caption blocks deleted with the HOW IT WORKS screenshots~~ | **Closed 2026-08-29.** He said bring them back and set them vertical. Done, copy unchanged |
| 8 | The demo files carry a slate label, "Wellbeing — the stop sign" / "— how do you feel?" | Hidden in the embedded copies. It reads as a standalone-demo watermark and it has an em dash, but it is his text, so say so. Raised 2026-08-29 |

---

## Things worth remembering

**The brief is wrong about `firstrun_hero.gif`.** Block 1 calls it "the butterfly appearing over a real scroll" and wants it as the hero video. It is not that. It is a 320x183, 162-frame pixel-art meme, a Godfather riff where a man takes a gift box off a car. Pure marketplace messaging and far too small for a hero. There is no butterfly-over-scroll footage anywhere in the repo, which is why task 6 is blocked.

**That GIF stays a GIF.** Animated WebP was tried at three quality levels and every one came out larger than the 1,041 KB original: 1,198 KB at q65, 979 KB at q50, 754 KB at q35 and visibly mushy on pixel art. A GIF's palette plus frame differencing beats lossy WebP on flat pixel art. Re-saving the GIF with PIL `optimize=True` also made it bigger, 1,267 KB. The real fix is MP4 or WebM and that needs `ffmpeg`.

**Three CSS bugs found while building the hero**, all fixed, all worth remembering:
1. `.hero-visual{min-height:560px}` at ≤980px pushed the sign about 610px down, below the mobile fold. The override lost on source order. Fix: append new CSS at the **end** of the stylesheet, never mid-file.
2. Nav collided at 360px, wordmark under the hamburger and CTA wrapping to two lines. `.brand .name` now hides below 560px.
3. The sign bled left but not right, `flex-shrink` was eating `calc(100% + 56px)`. Now symmetric negative margins.

---

## How the work gets done

- **All work happens in `index.html` directly.** The preview was signed off and merged on 2026-08-26, and `index-preview.html` was deleted. `_review/harness.html` was rebuilt on 2026-08-26 for the `#research` review and is on disk again. Pre-merge backup: `_review/index.html.pre-merge-2026-08-26.bak`, outside the repo.
- **`_review/`** at `D:\anas\Work\GW\website\_review\` holds review screenshots and the backup. Outside the git repo, so it never gets committed.
- Serve the **parent** dir so the site and any review harness share an origin: `python -m http.server 8765` in `D:\anas\Work\GW\website`. The repo's own `run-local-server.bat` uses port 8000.

### Looking at the page at phone width

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

## Git

- **Never rewrite his copy.** Not the wording, not the register, not a stray comma. Propose it in the reply and let him decide. This was a real mistake on 2026-08-26: seven strings in WHAT THE DATA SAYS were rewritten unasked and had to be reverted. The one exception is typos, which get fixed silently. See decision 7.
- **Never commit without him saying so.** He commits this work himself.
- Branch is `master` and `master` is what gets published. A push goes live on `digitalwellbeing.xyz` through GitHub Pages, with a minute or two of build lag.
- Commits so far: `b89d363` task 1 and the hero. `48be0f1` task 4 and `investors.html`. `53e0014` tasks 2, 3 and 5, plus the merge, the title and two deletions. `43628d2` task 11, the three QR codes and the Play badge. `62f093d` task 9, the deletion page and the iOS waitlist.
- **As of 2026-08-27:** `62f093d` is committed but **not pushed**, `master` is one ahead of `origin/master`. So the working forms are not live yet. The only uncommitted file is `specs/v2-landing-page.md`, these notes.
- To check what is actually live, open `digitalwellbeing.xyz`: the title should read "Wellbeing: Find out which app drops your mood", and the page source should contain `install-bar` and `waitForm`.
- Max 200 words per response, per `CLAUDE.md`.
