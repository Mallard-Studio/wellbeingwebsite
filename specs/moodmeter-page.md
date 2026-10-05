# Mood meter page

Public tool that asks visitors which nine feelings in each quadrant of the mood meter they would actually use. Rebuilt from the read-only emotions grid on 2026-09-10, revised 2026-09-11.

**Location:** `moodmeter/index.html` (repo root level folder, same shape as `axis-checkin/` and `delete_my_data/`).
**URL:** `https://digitalwellbeing.xyz/moodmeter/`
**Access:** nothing on the site links to it. The URL is the only route in. Not `noindex`, see backlog item 8.
**Backend:** one Cloud Function in the Android repo, `dev/gamerswellbeing/functions/moodmeter.js`. **Deployed 2026-10-04**, serving both `/moodmeter/` and `/moodmeter/v2/`.

Self-contained file on the `investors.html` pattern: its own `<style>` block, no shared stylesheet. Two external requests, both to Google Fonts. No analytics, no third-party scripts.

---

## What it replaced

The page shipped on 2026-09-10 as a byte-for-byte copy of a developer file from the Android repo: all 144 emotions drawn at their real coordinates, the 36 `isBasic` ones left uncoloured, an invert button, and a tint that deepened with distance from the centre.

Two questions settled the rebuild, both answered by Anas:

| Question | Answer |
|---|---|
| Who lands here | Public and users, not internal testers. The page has to explain itself and work on a phone |
| Keep the analysis view | Replace it. No coordinate axes, no invert button, no distance tint |

So the numbered axes, the `isBasic` legend and the invert toggle are gone. **The 144-row `DATA` array is unchanged**, lifted from line 60 of the old file rather than retyped, so the names, emoji, coordinates, quadrant colours and one-line definitions are still the app's own.

---

## The task the page sets

Nine feelings in each of the four quadrants, 36 in total. The quadrant is the sign pair of the cell, because the board has no row or column 0:

| Quadrant | Coordinates | Label on the page |
|---|---|---|
| red | x < 0, y > 0 | Unpleasant, high energy |
| yellow | x > 0, y > 0 | Pleasant, high energy |
| blue | x < 0, y < 0 | Unpleasant, low energy |
| green | x > 0, y < 0 | Pleasant, low energy |

Tap to pick, tap again to drop. A tenth pick in a full quadrant is refused: the cell shakes, the count flinches, and the bar reads "That colour already has nine. Drop one to make room." Each quadrant has its own `clear`, and the bar has `Clear the board`, which is disabled while the board is empty. `Send my 36` unlocks only at 36.

---

## Page structure

Top, to his layout of 2026-09-11:

- Headline left, `Young Serif`, "Which feelings do you use the most?"
- Instruction right, body face, "Pick nine in each colour, the ones you would use as a reply when someone asks how you are."
- Full-width notice under a rule, with an information emoji: "The data will be shared with the Digital Wellbeing team, and it may be shared publicly, but your identity will remain absolutely anonymous. Two submissions per network."

The eyebrow label that read MOOD METER RESEARCH was dropped in that round, because he specified the top region in three parts and it was not one of them. Flagged to him rather than removed quietly.

Below that, the board. Above 940px it is the 2x2 mood meter, four 6x6 quadrants. At 940px and under it becomes four tabs in a 2x2 grid and shows one quadrant at a time; the quadrant's own name is hidden there because the tab above already carries it.

A fixed bar sits at the bottom of every screen and holds three things: the definition line, the running count with a four-segment progress meter, and the two buttons.

### Why the definition line lives in the bar

Each cell carries the app's one-line definition. It first sat in a strip under the board, which does not work: the board is 144 cells tall and a reader hovering the top of it cannot see a line below the bottom of it. Moving the line into the fixed bar puts it in view at every scroll position. It reserves its height permanently so nothing jumps, and the idle text reads "Tap a feeling to read what it means."

### The nudge

While nothing at all is chosen, a bubble reading "pick me, maybe!" pops from a random cell every 8 seconds and fades after 2.6 seconds. His ask, 2026-09-11. It stops for good on the first pick and never restarts. Three constraints on it, all deliberate:

- It only targets a cell that is actually on screen and clear of the bottom bar, so it never points at something the reader cannot see.
- It is clamped inside the viewport, so a cell in an edge column does not push it off screen.
- It is `pointer-events: none` and `aria-hidden`, so it cannot eat a tap and a screen reader is not nagged.

---

## Design

Direction came from `.impeccable.md` in the Android repo, which is the brand's design context: empathetic, direct, sophisticated, warm dark, mood colours semantic and never decorative.

| Choice | Value |
|---|---|
| Display face | `Young Serif`, named in `.impeccable.md` as a candidate to sample |
| Body and UI face | `Comfortaa`, the app's and the site's own face |
| Ground | oklch neutrals tinted toward the brand indigo, hue 300 |
| Mood colours | Set by Anas on 2026-09-11, see below |

### Cell states

Every cell wears its own quadrant colour from the start, so an empty board already reads as the mood meter rather than a grid of grey tiles.

| State | Background | Label |
|---|---|---|
| Resting | 30% of the quadrant colour mixed into the page ground | white |
| Hover | 45% of the quadrant colour | white |
| Chosen | the quadrant colour at full | black |
| Not chosen, in a full quadrant | as resting, at 52% opacity | white |

The first build used 15% and 30% with a grey label. He rejected both: too dark, and the label read as grey. Corrected on 2026-09-11.

### The mood colours are his

He set these himself, with more chroma than the values they replaced, because his screen runs a warm night filter and the earlier fills read as mud through it.

```css
--red:    oklch(77.124% 0.12028 23.905);
--yellow: oklch(85.961% 0.16344 90.256);
--blue:   oklch(62.448% 0.19639 269.544);
--green:  oklch(79.284% 0.22547 145.429);
```

The matching `--red-ink`, `--yellow-ink`, `--blue-ink` and `--green-ink` tokens are still defined in the file and **nothing uses them**. They were the label colour on a chosen cell until black replaced them. They are his values from the same round, so they were left in place rather than deleted.

**Two loose ends on the colours.** The `--red` and `--red-ink` pair he pasted in chat differs from the pair in the file; the file was rendered and he has not said which he meant. And a proposal to darken the four ink tokens was shown to him as a rendered comparison and **was never applied**.

Contrast on the shipped pairs, computed by converting oklab to linear sRGB rather than through a canvas round trip, which silently fails on `oklab()` in this Chrome:

| Quadrant | White on resting | Black on chosen |
|---|---|---|
| red | 10.8 | 9.7 |
| yellow | 9.6 | 13.7 |
| blue | 12.6 | 5.6 |
| green | 10.1 | 11.9 |

### Soft hyphens on long names

Names like Compassionate cannot fit a 50px cell on a phone, and breaking them at the fill point reads as a typo. Chrome's `hyphens: auto` does nothing inside these cells, verified, so `soften()` inserts one soft hyphen near the middle of any name of nine characters or more: after a vowel that is followed by a consonant, moved past that consonant when a second one follows, with `gh` and `ck` never ending a line and `th`, `ph`, `sh`, `ch` and `wh` never split. Names containing a space are left alone, so Burned Out wraps on its own.

---

## Submitting

### Why the limit cannot live in the browser

The brief is two submissions per IP address. A browser cannot be trusted to report its own address, and a page that asked an IP echo service and wrote the answer to Firestore would be enforcing a number the visitor can edit. The check has to run somewhere that sees the real connection, so it runs in a Cloud Function and the page holds no enforcement at all. The page keeps one count in `localStorage` purely as a courtesy line, never as a gate.

### The endpoint

```
POST https://us-central1-gwapp-30e03.cloudfunctions.net/submitMoodBasics
```

Firebase project `gwapp-30e03`, region `us-central1`, matching the existing `getIpLocation` function. Source is `functions/moodmeter.js` in the Android repo, wired in by one line at the end of `functions/index.js`.

**Request:** `{ "picks": [ { "x": -3, "y": 5, "n": "Stressed" }, ... ] }`, 36 entries.

**Validation**, all server side, on coordinates rather than names so the function needs no copy of the 144-name list:

- exactly 36 picks
- every x and y an integer, never 0, absolute value 6 or less
- no duplicate cell
- exactly nine in each quadrant

**Responses:**

| Status | Body | Page shows |
|---|---|---|
| 200 | `{ ok, id, remaining }` | "Your 36 are in", the picks grouped by quadrant, and whether one more set is allowed |
| 429 | `{ error: "limit_reached" }` | "Two is the limit", no recap |
| 400 | `{ error: "invalid", detail }` | the send-failed line in the bar |
| 403 | `{ error: "forbidden" }` | the send-failed line in the bar |

**CORS** is closed by default and answers only `https://digitalwellbeing.xyz`, `https://www.digitalwellbeing.xyz` and any localhost origin. Anything else gets 403 before the body is read.

### How the IP is handled

The address comes from the first entry of `x-forwarded-for`. It is hashed with SHA-256 and a salt, `process.env.MOODMETER_IP_SALT` falling back to `gw-moodmeter-v1`, and only the hash is stored. **The raw address is never written anywhere.** Quota and submission are written in one Firestore transaction, so two simultaneous sends from the same address cannot both pass.

### Collections

| Path | Shape |
|---|---|
| `moodMeterSubmissions/{autoId}` | `picks[]` of `{x, y, n, c}`, `ipHash`, `createdAt`, `country`, `userAgent` truncated to 300 chars |
| `moodMeterIpQuota/{ipHash}` | `count`, `firstAt`, `lastAt` |

### Firestore rules need no change

`firebase/firestore.rules` in the Android repo ends in a `match /{document=**}` deny-all. Both new collections fall through to it, so no client can read or write them. The function uses the Admin SDK, which bypasses rules entirely. **Do not add a rule for these collections.** Adding one would open to clients what is currently closed.

---

## Deploying

From the Android repo:

```
cd D:\anas\Work\GW\dev\gamerswellbeing
firebase deploy --only functions:submitMoodBasics
```

Optionally set a real salt first, which invalidates every quota row already written:

```
firebase functions:secrets:set MOODMETER_IP_SALT
```

First deployed 2026-10-04. **If the CLI says "credentials are no longer valid"**, the login has expired: run `firebase login --reauth` in your own PowerShell window (it needs a browser, so it cannot run from Claude's `!` prompt), then deploy. The admin service-account key in `specs/firebase-service-account-private-key/` can read Firestore and Storage but **cannot deploy**: it lacks the Service Account User role (`iam.serviceAccounts.ActAs`). Add `--force` to set the artifact cleanup policy, which is now set.

---

## Testing locally

```
cd D:\anas\Work\GW\website\wellbeingwebsite
python -m http.server 8123 --bind 127.0.0.1
```

Then `http://localhost:8123/moodmeter/`. The function's CORS list allows localhost, so a deployed function can be exercised from there. Append a query string to bust the browser cache after an edit.

Mobile is checked by loading the page in an iframe at 390px and 360px wide. Chrome's window cannot be resized to phone widths through the automation tools.

---

## Verified, and not

**Verified:** the four quadrant fills and label contrast, measured not eyeballed. The full board at 1520px and the tab layout at 390px and 360px. The refusal of a tenth pick. Per-quadrant and global clear. The send-failed path. The 429 panel and the success panel, both driven through a stubbed `fetch`. Payload validation against short, duplicate, zero-coordinate and skewed-quadrant sets, run directly against the function's own source. CORS accepting the two site origins and localhost and rejecting everything else.

**Verified live 2026-10-05** for v2: a full game on `digitalwellbeing.xyz/moodmeter/v2/` wrote a Firestore document (test-flagged). **Not verified:** a v1 36-pick send against the live function.

---

## Open items

Tracked in `BACKLOG.md` as items 7 and 8: the function is undeployed, and the page collects submissions while being unlinked and not `noindex`.

---

## Variant: `/moodmeter/v2/`

Built 2026-10-03, reshaped the same day to his five-stage game. Same `DATA` and fonts. Same colours except red, which is the Android `mood_red` #ff0606 at his ask.

| Stage | Shows | Pick |
|---|---|---|
| 1 | four colours: grrrr red, yaaay yellow, blah blue, hmmm green | 1 |
| 2 | the 3x3 block next to the centre, `abs(x)` 1-3, `abs(y)` 1-3 | 3 |
| 3 | out on energy, `abs(x)` 1-3, `abs(y)` 4-6 | 2 |
| 4 | back in, out on pleasantness, `abs(x)` 4-6, `abs(y)` 1-3 | 2 |
| 5 | far corner, `abs(x)` 4-6, `abs(y)` 4-6 | 2 |

**Zoom.** All 36 cells live in one board. Picking a colour flies a copy of the tile, emoji and word included, over the board in 380ms; the 36 stay hidden until it lands, then it fades and the board cracks into 36 squares, then zooms onto stage 2's block. Between stages it zooms out to the 36, then into the next block. Cells rest in full colour; a chosen cell fades and gets a tick. The title stays on every stage, small.

**End.** Nav, title and count go. The board zooms out to all 36 with the picks marked, showing names instead of emoji (object emoji like a chain or a syringe read as fake feelings). Tapping one shows its name and meaning above the grid, then fades over 3.5s; picks do not change. Below: "You just made emotional intelligence easier for humanity." large, the booth line, Try again, Home.

**Submitting is on** since 2026-10-04. `SUBMIT = false` near the top of the script skips the post and goes straight to the end screen, for review.

3+2+2+2 = 9, sent at stage 5 to the same endpoint (payload below). Then the thank-you lines, the booth line (H4-P205), Try again and Home. Back and the phone's back gesture step through the stages; after a send the stage history is unwound so Back leaves the page.

**Limit:** ten sends per network per UTC day, fields `day` and `dayCount` in `moodMeterIpQuota/{ipHash}` next to v1's `count`. A 429 shows "Limit reached" and no booth line.

**Open:** his notice still says "Two submissions per network".

---

## Similar feelings (`/moodmeter/v2/`)

Added 2026-10-04 at his ask. Picking a feeling greys out and strikes through its near-twins on every stage; tapping one shows a toast, "You already selected a similar emotion" over the twin's name in capitals. Unpicking frees them. A stage never drops below the number of picks it still needs: if it would, its twins stay open. Every link is equal weight. **Draft, for his review:**

- **red:** Uneasy / Apprehensive; Uneasy / Concerned; Concerned / Worried; Concerned / Troubled; Worried / Troubled; Worried / Anxious; Apprehensive / Worried; Apprehensive / Anxious; Nervous / Jittery; Nervous / Anxious; Jittery / Restless; Tense / Stressed; Tense / Pressured; Stressed / Pressured; Stressed / Overwhelmed; Peeved / Irritated; Peeved / Annoyed; Irritated / Annoyed; Annoyed / Frustrated; Angry / Furious; Angry / Irate; Furious / Livid; Furious / Enraged; Livid / Enraged; Irate / Livid; Irate / Furious; Scared / Frightened; Frightened / Terrified; Terrified / Panicked; Envious / Jealous; Contempt / Repulsed
- **yellow:** Pleased / Pleasant; Pleased / Delighted; Upbeat / Alive; Cheerful / Upbeat; Cheerful / Happy; Delighted / Happy; Happy / Joyful; Joyful / Elated; Elated / Ecstatic; Thrilled / Ecstatic; Thrilled / Excited; Exhilarated / Thrilled; Excited / Eager; Excited / Enthusiastic; Enthusiastic / Eager; Energized / Alive; Hopeful / Optimistic; Wishful / Hopeful; Accomplished / Successful; Accomplished / Productive; Accomplished / Proud; Successful / Proud; Confident / Empowered; Motivated / Determined; Motivated / Inspired; Focused / Engaged; Awe / Amazed; Surprised / Amazed
- **blue:** Down / Sad; Down / Glum; Depressed / Miserable; Hopeless / Despair; Helpless / Hopeless; Trapped / Helpless; Tired / Fatigued; Fatigued / Exhausted; Exhausted / Spent; Spent / Burned Out; Exhausted / Burned Out; Bored / Meh; Meh / Apathetic; Apathetic / Disengaged; Bored / Disengaged; Numb / Apathetic; Disheartened / Discouraged; Disappointed / Disheartened; Forlorn / Lonely; Lonely / Disconnected; Excluded / Alienated; Disconnected / Alienated; Ashamed / Humiliated; Ashamed / Guilty; Insecure / Vulnerable; Pessimistic / Glum
- **green:** Calm / Peaceful; Calm / Tranquil; Peaceful / Tranquil; Tranquil / Serene; Peaceful / Serene; Relaxed / Chill; Chill / Mellow; Relaxed / Mellow; At ease / Comfortable; At ease / Relaxed; Carefree / Chill; Safe / Secure; Thankful / Grateful; Grateful / Blessed; Appreciated / Valued; Valued / Respected; Understood / Accepted; Supported / Loved; Connected / Included; Included / Accepted; Sympathetic / Compassionate; Empathetic / Compassionate; Empathetic / Sympathetic; Content / Satisfied; Fulfilled / Satisfied; Content / Fulfilled

Also fixed in v2's copy of `DATA`: Serene carried Shocked's definition ("experiencing extreme horror, disgust, and surprise"); it now reads "deeply calm and untroubled, completely at peace" from the translations sheet. **v1 `/moodmeter/` still has the wrong line.**


**Between stages (2026-10-04).** Axes were tried and dropped. After the zoom out, the finished block keeps a white frame, the squares dim, an arrow draws from it toward the next block, and a pill says which way: up "More energy", down "Less energy", right "Happier", left "Less happy", read off screen direction so it holds for every colour. The diagonal move (stage 3 to 4) shows two joined by a dot.

---

## v2 data: what is saved and how to get it

Survey goal: find the feelings people use most per colour, then use the similar-feeling pairs to merge near-twins into a final agreed set.

**Payload** from `/moodmeter/v2/`:

```
{ "quadrant": "green", "picks": [ {x, y, n} x9, in pick order ],
  "blocked": [ {x, y, n, by} ], "lang": "en|es|ar", "simVersion": "2026-10-04",
  "page": "v2", "test": true on localhost }
```

`blocked` is every feeling crossed out at send time and the pick(s) that blocked it, `by` joined with `|` when two picks block it. Without it a crossed-out twin would look unpopular when it was only unavailable.

**Firestore** `moodMeterSubmissions/{id}`: `picks[]` of `{x, y, n, c, s, o}` (`s` stage 0-3, `o` order), `quadrant`, `blocked`, `lang`, `simVersion`, `page`, `test`, `ipHash`, `createdAt`, `userAgent`, `country` (always empty on 2nd-gen functions).

**Fallback.** If the Firestore transaction throws, the function adds one line to a single Storage file, `gs://gwapp-30e03.firebasestorage.app/moodmeter-fallback.csv` (read, append, save only if unchanged, retry on clash), and still answers 200. No daily limit on that path. Inside the file `by` uses `+` instead of `|`.

**Export**, from the Android repo:

```
node scripts/pull-moodmeter/export.js out.csv [--with-tests]
```

One CSV, one row per feeling, Firestore and the fallback file together. Columns: `id, source, createdAt, page, quadrant, lang, test, simVersion, ipHash, country, kind (pick|blocked), name, x, y, stage, order, blockedBy`. Test sends are left out unless `--with-tests`.

**Test data in Firestore:** two test-flagged sends, `uKerpi3qVAax5GV8jW2j` (curl, 2026-10-04) and `LWm0mTHx4elVvrkC4nQY` (live page, 2026-10-05). Excluded by default.
