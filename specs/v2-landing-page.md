# v2 landing page rebuild

Rebuild of `index.html` to serve one job: **get the Google Play install.**
Deadline: live by **2026-09-04**. Started 2026-08-24. Last updated 2026-08-26.

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
- **One CTA.** "See how it works" was removed on purpose.
- Text style is `clamp(18px,1.5vw,22px)` / `var(--ink-2)` / weight 400, after trying `.who-card h3` (26px/600/`--ink`) and rejecting it.
- Grid `1fr 1.05fr`, `.herotext` max-width 520px.

---

## Where the site stands right now

**`index.html`, 55.7 KB.** Sections in order: hero, `#research`, `#problem`, `#solution`, `#inside`, `#loop`, `#download`. Nav is four links (The data, Problem & Solution, The app, Our Hero) plus the Play CTA. Footer carries Terms, Privacy, EULA, Investors. Sticky install bar fixed to the bottom below 820px. Four Play links, all four UTM-tagged. 164 KB of images, 43 KB of it above the fold.

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

---

## Not started

| # | Task | Priority |
|---|---|---|
| 6 | Hero video, **blocked**, no source footage exists | P1 |
| 7 | Privacy section naming the Accessibility permission | P1 |
| 8 | "Not a blocker" comparison table | P1 |
| 9 | Real iOS waitlist form, **blocked**, needs a form endpoint | P1 |
| 10 | Mood chart as proof, **blocked**, needs real anonymized data | P1 |
| 11 | QR code for desktop | P2 |
| 12 | FAQ block, six questions | P2 |
| 13 | Domain split, **closed, as-designed** | P2 |
| 14 | Audit `#loop` and the marketplace footnotes | P2 |

### Task 14 is bigger than it looks

The landing page still contradicts the positioning in three visible places, all found during task 4:

- `#download` headline reads "Less screen. Better mood. **Real rewards.\***"
- `#loop` and `#download` both carry the "Marketplace & points redemption are under construction and coming soon" footnote
- nav still links "Our Hero" to `#loop`

The brief's done-list says zero occurrences of rewards, points or marketplace outside one FAQ line. Right now there are several, above the fold of the install CTA.

### Blocked on the founder

- **Task 6** — needs 6 to 10 seconds of screen capture: the butterfly appearing over a real TikTok or Instagram scroll.
- **Task 9** — a real form needs a third-party endpoint (Formspree, Google Form, Buttondown). GitHub Pages is static, there is no backend.
- **Task 10** — needs a real anonymized mood chart. Voice rule: every number carries a source or comes off.
- **`#solution` screenshots** — founder is creating a new butterfly screenshot.

---

## Assets

Referenced by a live page:

| File | Size | Used by |
|---|---|---|
| `exit-sign-1148.webp` | 41 KB | hero |
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
| `anas.jpg` / `omnia.jpg` | 133 / 59 KB | Sources of the avatar WebP files. |

Deleted 2026-08-26: `index-preview.html` (merged into `index.html`), `assets/exit-sign.webp` (1376 px first cut, superseded).

**No `ffmpeg`, `magick` or `cwebp` on this machine.** Python **PIL 12.1.0** is available and produced every WebP here.

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
- Commits so far: `b89d363` task 1 and the hero, `48be0f1` task 4 and `investors.html`, `53e0014` tasks 2, 3 and 5 plus the merge, the title and the two deletions.
- As of 2026-08-26 the working tree is **clean and pushed**, `master` in sync with `origin/master`. GitHub Pages was still serving the old page a minute after the push, which is normal build lag. Verify at `digitalwellbeing.xyz`: the title should read "Wellbeing: Find out which app drops your mood" and the page source should contain `install-bar`.
- Max 200 words per response, per `CLAUDE.md`.
