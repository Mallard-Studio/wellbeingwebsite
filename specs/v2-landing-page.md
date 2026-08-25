# v2 landing page rebuild

Rebuild of `index.html` to serve one job: **get the Google Play install.**
Deadline: live by **2026-09-04**. Work started 2026-08-24.

---

## Source of truth — read these first, they live outside this repo

| File | What it holds |
|---|---|
| `D:\anas\Work\GW\marketing\plans\v2-landing-page-brief.md` | **The task list.** Part 3 is the gap table, already prioritized. Part 4 has per-block specs. |
| `D:\anas\Work\GW\marketing\plans\v2-2026-08-24-gtm-plan.md` | §8 = landing page structure. §2 = positioning. §13 = the National Wellbeing Strategy ruling. |
| `D:\anas\Work\GW\marketing\plans\voice-guide.md` | **Supersedes** the vague "no wellness language" line in the GTM plan and the brief. Read before writing any user-facing string. |

Changes on this page are for the marketing team, not a dev request.

---

## Positioning — do not drift

**Offer, one sentence:** You'll see how each app actually makes you feel, and you'll get tapped on the shoulder before the scroll turns on you.

**Never on this page:** rewards, points, marketplace, or any productivity/focus benefit. One honest FAQ line is the single exception (block 8 of the brief).

**Voice, short version:** concrete, second person, short sentences. Write about feelings freely — "feel good", "feel worse", "how it made you feel" are correct and are the product. Banned is the abstract wellness register: mindful, journey, balance, cultivate, holistic, self-care, reclaim, thrive. "Wellbeing" is the app's name and is always fine. Never shame the user. Every number carries a source or comes off.

---

## Decisions made with the founder — do not re-litigate

| # | Decision |
|---|---|
| 1 | **Marketplace is not hidden, it just stops being sold.** Landing page gets one honest FAQ line. The full marketplace/SME story moves to `investors.html`. No public roadmap page — GTM §8 cuts "coming soon" feature lists, and it would be a link away from installing. |
| 2 | **Domain split is intentional, leave it.** Site is `digitalwellbeing.xyz`; emails stay `@digitalwellbeingapp.com`. The `.com` is the mail domain and redirects to `.xyz`. Brief task 13 is closed as as-designed. |
| 3 | **National Wellbeing Strategy 2031 comes off the landing page** (hero tag + footer line), per GTM §13. It moves to `investors.html` as a **"Why now"** section — framed as market timing, never as endorsement or alignment. Drop the word "aligned". |
| 4 | **`investors.html` gets built**, carrying the cut `#investors`, `#moat` and `#research` content plus founder photos. Linked from the footer only, never the nav. |
| 5 | **Hero headline is locked**, founder's own words. See below. |

---

## Hero — locked, built, signed off

```
YOU
NEED AN
EXIT SIGN.          <- h1, caps, .grad on the last line

Listen to your feelings. They're the best sign.
Find out which app drops your mood.

[ Get the app -> ]
```

- Visual: `assets/exit-sign.webp` — the pixel-art highway sign, "Keep Doomscrolling / Real Wellbeing".
- **No eyebrow capsule.** "NOW IN ALPHA" was removed on purpose — founder does not want a capsule as the first thing on the page.
- **One CTA.** "See how it works" was removed on purpose.
- **No em dash** in the copy. Founder's rule.
- Text style reverted to `clamp(18px,1.5vw,22px)` / `var(--ink-2)` / weight 400 after trying `.who-card h3` (26px/600/`--ink`) and rejecting it.
- Grid `1fr 1.05fr`, `.herotext` max-width 520px.

### Hero asset finding — the brief is wrong about this

Brief Block 1 says `firstrun_hero.gif` is "the butterfly appearing over a real scroll" and should become the hero video. **It is not.** It is a 320x183, 162-frame pixel-art meme — a Godfather riff, a man taking a gift box off a car. Pure marketplace messaging, far too small for a hero. It only ever appeared in `#moat`, which is being cut.

There is no butterfly-over-scroll footage anywhere in the repo. Task 6 needs the founder to record it, or it does not ship.

---

## Progress

### Done

**Task 1 — adblock CSS stripped.** `index.html` 1,876,271 → 57,478 bytes (-97%).
Deleted lines 559–4086: twelve injected `<style>` blocks from a browser ad-blocker extension, saved into the file when the page was exported from a browser. Verified the range held zero site content. Also appended the missing `</body></html>`. Committed? **No.** This change is live in `index.html` on `master`, uncommitted.

**Task 3 — partial.** The hero Play link is UTM-tagged. Two more links still need it.
Note: the brief says `?referrer=...` but `?id=` is already in the URL, so the correct form is `&referrer=utm_source%3Dweb`.

**Hero** — built in `index-preview.html`. Three real bugs found and fixed while building it:
1. `.hero-visual{min-height:560px}` at ≤980px pushed the sign ~610px down, below the mobile fold. My override lost on source order — fix was to append the new CSS at the **end** of the stylesheet, not mid-file.
2. Nav collided at 360px: wordmark under the hamburger, CTA wrapping to two lines. `.brand .name` now hides below 560px.
3. Sign bled left but not right — `flex-shrink` was eating `calc(100% + 56px)`. Now symmetric negative margins.

### Not started

| # | Task | Priority |
|---|---|---|
| 2 | Sticky Play button on mobile | P0 |
| 3 | UTM-tag the remaining two Play links | P0 |
| 4 | Cut `#investors`, `#moat`, `#research`; build `investors.html` | P0 |
| 5 | Compress images — **blocked, see below** | P0 |
| 6 | Hero video — **blocked**, no source footage exists | P1 |
| 7 | Privacy section naming the Accessibility permission | P1 |
| 8 | "Not a blocker" comparison table | P1 |
| 9 | Real iOS waitlist form — **blocked**, needs a form endpoint | P1 |
| 10 | Mood chart as proof — **blocked**, needs real anonymized data | P1 |
| 11 | QR code for desktop | P2 |
| 12 | FAQ block, six questions | P2 |
| 13 | Domain split — **closed, as-designed** | P2 |
| 14 | Audit `#loop` — it carries the marketplace footnote, so it is cut | P2 |

### Blocked on the founder

- **Task 5** — do not start. Founder asked for an explanation of why image compression matters before any work happens. Explain, then wait.
- **Task 6** — needs 6–10s of screen capture: the butterfly appearing over a real TikTok/Instagram scroll.
- **Task 9** — a real form needs a third-party endpoint (Formspree, Google Form, Buttondown). GitHub Pages is static, there is no backend.
- **Task 10** — needs a real anonymized mood chart. Voice rule: every number carries a source or comes off.
- **`#solution` screenshots** — founder is creating a new butterfly screenshot.

---

## Assets

| File | Size | Note |
|---|---|---|
| `assets/exit-sign.webp` | 61 KB | **New.** Made from `solution-exit-sign.jpg` (140 KB) via PIL, quality 82. In use by the hero. |
| `assets/screen-01.png` | 479 KB | Has "You earned 5 points" burned into the image. Unresolved — crop, swap, or reshoot. |
| `assets/screen-02.png` | 234 KB | Select Apps to Track. Bottom nav shows a "Rewards" tab. |
| `assets/screen-03.png` | 650 KB | Breath / emotion check-in, butterfly. Clean. |
| `assets/screen-04.png` | 997 KB | Emotion grid. Clean. |
| `assets/screen-05.png` | 611 KB | "Take a break / There is a drop in your mood." Clean, and the strongest asset for the exit-signal story. |
| `assets/firstrun_hero.gif` | 1,066 KB | The meme. Only used by `#moat`, which is cut. Delete with that section. |
| `assets/anas.jpg` / `omnia.jpg` | 196 KB | Move to `investors.html`. |

No `ffmpeg`, `magick` or `cwebp` on this machine. Python **PIL 12.1.0** is available and is what produced the WebP.

---

## Working method

- **All work happens in `index-preview.html`**, a copy of `index.html`. Nothing merges back until the founder signs off.
- **`_review/`** at `D:\anas\Work\GW\website\_review\` holds review screenshots. Outside the git repo, so it never gets committed.
- Local servers used during the session: `python -m http.server 8765` on the site root, `8766` on the scratchpad for the mobile harness. The repo's own `run-local-server.bat` uses port 8000.
- **Mobile is simulated by iframing the page at 360px and 390px** inside a wrapper page. `resize_window` does not work — Chrome refuses to go below roughly 500px wide.
- Anchor links (`#id`) do not reliably scroll inside those iframes; images load after the jump and the layout shifts back to the top. Build one standalone file per variant instead.

---

## Repo rules that bit during this work

- **Never commit without explicit approval.** Currently uncommitted: modified `index.html`, new `assets/exit-sign.webp`, new `index-preview.html`.
- Branch is `master`. `master` is the published branch — a commit here goes live on `digitalwellbeing.xyz` via GitHub Pages.
- Max 200 words per response, per `CLAUDE.md`.
