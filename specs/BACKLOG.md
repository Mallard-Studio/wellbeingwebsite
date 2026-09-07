# Website backlog

Pending work, open questions and known debt for the **website repo**. One row per item, newest concerns first. Close an item by striking the title and writing **Closed \<date\>** with what happened, the same way `v2-landing-page.md` does.

Note: `CLAUDE.md` points at `specs/product/BACKLOG.md`. That path belongs to the Android repo; this file is the website's own and the CLAUDE.md line was copied over with the rest of that file. This file is the one to use here.

---

## 1. The footer is not unified across the site

**Raised by Anas, 2026-09-05. Open.**

Three different footer treatments ship today, and the two that look alike carry different links.

| Page | Footer |
|---|---|
| `index.html` | Real `<footer>`. Terms and Conditions · Privacy Policy · EULA · Investors · Partners. **No Home** |
| `investors.html` | Real `<footer>`. Home · Terms and Conditions · Privacy Policy · EULA. **No Investors, no Partners** |
| `merchants/index.html` | Real `<footer>`. Home · Terms and Conditions · Privacy Policy · EULA. **No Investors, no Partners** |
| `privacy-policy.html` | No `<footer>` at all. A single "← Back to home" link |
| `terms-and-conditions.html` | No `<footer>` at all. A single "← Back to home" link |
| `eula.html` | No `<footer>` at all. A single "← Back to home" link |
| `delete_my_data/index.html` | No `<footer>` at all. A single "← Back to home" link |
| `axis-checkin/index.html` | Neither. No footer, no back link. URL-only page by design |

Consequences worth naming:

- A visitor on `investors.html` or the merchants page cannot reach **Partners** or **Investors** from the footer. Each of those links exists in exactly one place.
- The four legal and utility pages give no route to anything except home, so a reader of the privacy policy cannot get to the terms.
- The three real footers each duplicate the same markup with inline styles on every link. There is no shared stylesheet, so any unification is a copy edit across files, not a CSS change.

**Not decided:** what the unified set should be. The obvious candidate is Home · Terms · Privacy · EULA · Investors · Partners on every page, with the current page's own link dropped or left inert. That is a call for Anas, not an implementation detail.

**Also worth folding in:** `uploads/` holds duplicate copies of `eula.html`, `privacy-policy.html` and `terms-and-conditions.html`. Check whether anything still links to them before unifying, or the same fix has to be made twice.

---

## 2. Delete the test row in the marketplace form responses

**Raised 2026-09-05 by the work itself. Open.**

The merchants form was verified with one real submission, business name **"TEST please delete"**, contact name "Claude Code test", activity "ignore this row", location "Abu Dhabi, UAE", email `anasmatic@gmail.com`. It is response 1 in the form and it also fired a notification email.

It was submitted on purpose: the hidden iframe reports success on Google's 404 too, so field names cannot be verified any other way. See `merchants-page.md`.

---

## 3. `digitalwellbeingapp.com/merchants` does not work

**Raised 2026-09-05. Open. Needs Anas, not code.**

Porkbun URL forwarding on the `.com` answers 302 to `https://digitalwellbeing.xyz` with the path stripped, so the brief's "same page reachable on digitalwellbeingapp.com" is unmet. Fix is to switch the Porkbun forward to path preserving. Full detail in `merchants-page.md`.

---

## 4. Three typos in the Google Form's own copy

**Raised 2026-09-05. Open. Blocked.**

In the marketplace form description and one question title, all in Anas's own writing, all still live:

- "apply to our **market place**" should be marketplace
- "Location (city, country**.** or online business)" has a full stop where a comma belongs
- the description ends mid sentence on a comma: "...for our first subscribers**,**"

He asked for these to be fixed. The edit was attempted in the Forms UI and **refused by the permission classifier**, so they are still there. The merchants page writes its own labels and does not reproduce them.

---

## 5. One `.eyebrow` capsule still ships on `index.html`

**Raised 2026-09-05. Needs one word from Anas.**

The standing rule is no capsule anywhere on the site, ever. One survives at `index.html:1015`, the `Privacy` label inside the privacy disclaimer block from task 7. It was left alone rather than deleted because that block is his own approved copy and the instruction was about not using the capsule again, not about tearing out shipped work. Cut it, or let it stand as the one exception.

---

## 6. Marketplace form notifications reach the owner only

**Raised 2026-09-05. Open.**

Responses > Get email notifications for new responses is on, and it notifies the form owner, `anasmatic@gmail.com`, and nobody else. If sign-ups should reach anyone else on the team, the form needs collaborators added, or a linked Sheet with its own notification rule.
