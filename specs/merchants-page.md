# Merchants page

Merchant and freelancer sign-up page for the marketplace. Built 2026-09-05.

**Location:** `merchants/index.html` (repo root level folder, same shape as `axis-checkin/` and `delete_my_data/`).
**URL:** `https://digitalwellbeing.xyz/merchants/`
**Access:** linked from the `index.html` footer as **Partners**. Not in the nav, and not linked from `investors.html`.

Self-contained file on the `investors.html` pattern: its own `<style>` block, no shared stylesheet, root absolute asset paths (`/assets/...`) on the `delete_my_data` precedent.

---

## Why `/merchants` and not a subdomain

The original ask was `merchants.digitalwellbeing.xyz`, or `/merchants`, "your call". Three findings settled it.

| Finding | Detail |
|---|---|
| `merchants.digitalwellbeingapp.com` is already taken | CNAME to `merchants-portal.web.app`, a Firebase Hosting site serving an unmodified Flutter template, `<title>dwa_merchant</title>`, `<meta name="description" content="A new Flutter project.">`. That is the dev team's merchant portal, not free to reuse |
| `merchants.digitalwellbeing.xyz` does not resolve | No wildcard on the `.xyz`. GitHub Pages serves one custom domain per repo through the single `CNAME` file, currently `digitalwellbeing.xyz`, so a second subdomain needs a second repo |
| The `.com` cannot reach it | See below |

## The `.com` requirement is not met

The brief asked for the same page to be reachable on `digitalwellbeingapp.com`. It is not, and it cannot be fixed from this repo.

`digitalwellbeingapp.com` resolves to `207.207.210.23/36/50`, Porkbun URL forwarding, `Server: openresty`. It answers `302` to `https://digitalwellbeing.xyz` **with the path stripped**. Verified: `http://digitalwellbeingapp.com/merchants/` lands on the site root, not on the merchants page. This is also why any misspelled subdomain of the `.com` shows the consumer landing page.

**The fix is a Porkbun setting**, switching the forward to path preserving. It is Anas's to make. Until then the only working URL is the `.xyz` one.

---

## The form

Rejected first build: the Google Form embedded in an iframe. He wants the form itself in the site's style, desktop and mobile both. The shipped version is a native HTML form posting into the same Google Form, so responses, the responses sheet and the email notifications all keep working unchanged.

**Action:** `POST https://docs.google.com/forms/d/e/1FAIpQLScdqqz9-Esl4M2p5Hm_PvgrXTdU9fp8e7W6AYML5pBEz_27eA/formResponse`
**Form edit URL:** `https://docs.google.com/forms/d/1z0_8cTvTzLnNZY8acz44qYhRkFk_y4sOZQrN5NpOXqQ/edit`
**Owner:** `anasmatic@gmail.com`

| Field | POST name | Required | Notes |
|---|---|---|---|
| Email | `emailAddress` | yes | **Not a question.** This is the form's built in "collecting emails" setting, so it has no `entry.` id and cannot be prefilled |
| Business name | `entry.1170631230` | yes | |
| Contact name | `entry.152341709` | yes | |
| Phone | `entry.1671990309` | no | |
| Business activity | `entry.1321387667` | yes | Google's own label is "Business activity (what do you sell or serve)" |
| Location | `entry.1080769526` | yes | Google's own label is "Location (city, country. or online business)". This is the field the app prefills |

Also posted: `fvv=1` and `pageHistory=0`. `fbzx` is a per session token and is deliberately not sent; the form accepts the post without it.

The five `entry.` ids were read off the live form, and the `emailAddress` name off the rendered DOM. **Do not guess these.** The five questions appear as hidden inputs in the viewform DOM; the email input renders with no `name` at all and Google names it at submit time.

### Submit behaviour

Hidden iframe target, the same pattern as the iOS waitlist in `index.html` and the older `embed/index.html`. The response is cross-origin and unreadable, so the iframe `load` event is the only success signal available. On success the form is replaced by a "Got it, thank you." panel. A 15 second timeout re-enables the button and hands back `info@digitalwellbeingapp.com`.

**This is why a real test submission is mandatory when any field name changes.** The iframe fires `load` on Google's 404 as well, so a wrong name shows the success panel for a submission that never happened. That exact bug shipped on `delete_my_data` and told every user their deletion request had worked when it had not (see CHANGELOG, 2026-08-27).

### Prefill contract with the Android app

The app opens the page with the merchant's city already resolved. The page reads its own query string and fills the Location input; the merchant can still edit it before submitting.

```
https://digitalwellbeing.xyz/merchants/?city=Abu%20Dhabi%2C%20UAE
```

Both forms are accepted, `?city=` and the raw `?entry.1080769526=`, so the app can send whichever it holds. A comma must be encoded as `%2C`. The app already resolves a city from `ACCESS_COARSE_LOCATION` via `GpsCitySource.kt`, so this needs no new permission.

The equivalent link straight into the Google Form, if the app ever bypasses the page, is `.../viewform?usp=pp_url&entry.1080769526=Abu+Dhabi`.

### Verified end to end, 2026-09-05

One real submission through the page, business name "TEST please delete", landed in the Responses tab with the email captured, the optional phone empty and the prefilled location intact. **That row still needs deleting.**

---

## Design decisions

| # | Decision | Why |
|---|---|---|
| 1 | No `.eyebrow` capsule | "remove the stupid capsule and never use it again". Now a site wide standing rule, not a page decision |
| 2 | Native form, not the embed | His call. The embed was also 1420px tall on desktop and over 2000px at 360, where a nested scrolling iframe is worse than a link |
| 3 | Hero and form share one centred 860px column | The panel was 860px with no auto margins inside a 1240px `.wrap`, so it sat hard left. Both are centred now and their left edges line up. The lead paragraph is capped at 700px so the measure stays readable |
| 4 | Inputs bottom aligned inside a grid row | `.field{display:flex;flex-direction:column}` with `margin-top:auto` on the input. Location is the only field in its row carrying a hint line, which otherwise pushed its input 22px below Phone's |
| 5 | No arrow glyph on the submit button | His call. The `.btn .arrow` rules were removed with it |
| 6 | Two column grid above 700px, one below | Six fields is enough to feel long in a single column on a laptop |

**Watch the hero div shape.** It is a plain `.wrap` wrapping a `.intro` child, not `class="wrap intro"` on one element. With both classes on one element, `.wrap`'s own `padding: 0 28px` applies inside the 860px box and pushes the h1 13px right of the panel edge.

---

## How this sits with the v2 landing page decisions

Decisions 1 and 9 in `v2-landing-page.md` keep all marketplace language off `index.html`. This page does not change that:

- `index.html` was not touched except for the footer link.
- The footer link is labelled **Partners**, which carries none of the banned vocabulary. If it ever becomes "Marketplace" it breaks decision 9.
- The full marketplace story still lives only on `investors.html`.
