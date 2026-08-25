---
25/8/2026
v2 landing page rebuild started for the marketing team. Stripped 1.82 MB of browser ad-blocker CSS from index.html (1,876,271 -> 57,478 bytes, -97%) and closed the missing </body></html>. New hero built in index-preview.html: "YOU NEED AN EXIT SIGN." with assets/exit-sign.webp, no eyebrow capsule, one CTA, UTM-tagged Play link. See specs/v2-landing-page.md for the task list, locked decisions and blockers. Source of truth is D:\anas\Work\GW\marketing\plans\ (brief, GTM plan, voice-guide). Not committed, not pushed.
---
16/8/2026
Added Delete My Data page at delete_my_data/index.html — the Android app (ProfileFragment.kt:96) links to /delete_my_data but the page never existed on this site. Google Form IDs are placeholders (REPLACE_FORM_ID / REPLACE_USERID_ENTRY / REPLACE_REASON_ENTRY) pending a new dedicated deletion form. Not pushed yet.
---
4/8/2026
Added Axis Check-in page at axis-checkin/index.html, URL-only (no site links). Copied from dev repo. See specs/axis-checkin.md. Not pushed yet.
---
21/7/2026 04:30 PM
I removed this DNS line from digitalwellbeingapp.com settings :
CNAME www.digitalwellbeingapp.com ghs.googlehosted.com 600
because I want to redirect it to digitalwellbeing.xyz
---
21/7/2026 03:00 PM
I added the website to public git repo and used pages to host it on digitalwellbeing.xyz
