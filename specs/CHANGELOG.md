---
26/8/2026 (5)
Rewrote specs/v2-landing-page.md as a clean handoff document: current state of both pages, tasks 1 to 5 with their numbers, what is left and what is blocked, an assets table split into referenced and source-only, the findings worth keeping, and the mobile review method with the harness snippet to rebuild it. Corrected the stale claims that the work was uncommitted and that index-preview.html was still the working file.
---
26/8/2026 (4)
Deleted index-preview.html (merged into index.html, nothing unique left in it) and the superseded assets/exit-sign.webp, replaced by exit-sign-1148.webp. Source originals kept: screen-0*.png, solution-exit-sign.jpg, anas.jpg, omnia.jpg are what the WebP files were built from, and logo.png is still used by axis-checkin/index.html. Not committed, not pushed.
---
26/8/2026 (3)
Replaced the index.html title (was "Trade screentime for wellness", old marketplace framing) with "Wellbeing: Find out which app drops your mood" and added the missing meta description. Not committed, not pushed.
---
26/8/2026 (2)
Preview signed off and merged: index-preview.html copied over index.html byte for byte, so the landing page now carries the new hero, the sticky mobile install bar, the UTM-tagged Play links, the cut investor sections and the WebP images. Pre-merge index.html backed up outside the repo at _review/index.html.pre-merge-2026-08-26.bak. index-preview.html is now a stale duplicate and should be deleted. Eight assets/*.webp are still untracked and must be added or the page ships with broken images. Not committed, not pushed.
---
26/8/2026
v2 landing page task 5 done. All landing page images converted to WebP at 2x display size with width/height attributes and lazy loading below the fold: 1,689 KB of images down to 164 KB (-90%), whole page 216 KB, 43 KB of that above the fold. firstrun_hero.gif deliberately stays a GIF, animated WebP came out larger at every quality tried and MP4 needs ffmpeg which is not installed; it is lazy-loaded on investors.html only. No originals deleted, live index.html still references them. Not committed, not pushed.
---
25/8/2026 (3)
v2 landing page task 4 done. Cut #research, #moat and #investors from index-preview.html, removed the two dead nav links and the UAE National Wellbeing Strategy 2031 footer line, added a footer-only Investors link. New investors.html carries that content plus a Why now section that frames Strategy 2031 as market timing and not as endorsement, and the founder photos as avatar cards. index-preview.html 58,820 -> 52,457 bytes. Not committed, not pushed.
---
25/8/2026 (2)
v2 landing page tasks 2 and 3 done in index-preview.html. Task 3: all Play links normalized to the canonical landing-page attribution tag (utm_source=web, utm_medium=site) from marketing/plans/v2-install-attribution-links.md; the hero link had been missing utm_medium. Task 2: sticky install bar, fixed bottom, mobile only below 820px, safe-area padding and body padding-bottom so it never covers the footer, no JS. Verified at 360px top/mid/bottom and hidden on desktop. Not committed, not pushed.
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
