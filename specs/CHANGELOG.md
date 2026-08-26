---
26/8/2026 (9)
Deleted the now-dead .coming-soon CSS from index.html, four rules, on the founder's call. Zero coming-soon references left on that page; investors.html keeps its own copy because it still shows the footnote. index.html 54,649 -> 54,116 bytes. Also investigated task 9, the iOS waitlist: delete_my_data/index.html already proves the pattern, a plain form POSTing to a Google Form formResponse endpoint through a hidden iframe with the iframe load event as the success signal, no backend needed on GitHub Pages. It also has an inline success state and a timeout fallback to a mailto. Found while reading it that the same file ships REPLACE_FORM_ID, entry.REPLACE_USERID_ENTRY and entry.REPLACE_REASON_ENTRY as literal placeholders, so no deletion request submitted since 16/8/2026 has ever reached a form. Nothing on either HTML page links to it, so the traffic is from the Play listing or the app; the founder needs to check that. Task 9 moved from blocked to unblocked-on-tech, now waiting only on the founder creating the Google Forms and sending the IDs. Not committed, not pushed.
---
26/8/2026 (8)
Task 14 done: the landing page no longer sells rewards, points or the marketplace. #solution rebuilt as a real three-step how-it-works, per the brief's block 3 and GTM section 8.3, variant A approved by the founder: 01 / Notice "Reads the mood", 02 / Ask "Asks how you feel", 03 / Signal "Sends the exit sign". Old steps 02 / Reward and 03 / Redeem removed with their trophy and coin icons, replaced by a speech bubble and an exit-door arrow. Step 01 lost the unsourced "Backed by scientific research" line, since #research now sits above it carrying the real alpha numbers. #inside intro lost its "and earn rewards*" tail. #download headline went from "Less screen. Better mood. Real rewards.*" to two lines. All four "Marketplace & points redemption are under construction and coming soon" footnotes deleted, from #solution, #inside, #loop and #download; the spec had recorded only two. Nav and the #loop section left alone on the founder's instruction, only the footnote inside #loop went. investors.html untouched, it keeps the marketplace story per decision 1. index.html 55,983 -> 54,649 bytes, page height at 360px 11,651 -> 11,132 px. Backup at _review/index.html.pre-task14-2026-08-26.bak. Not committed, not pushed.
---
26/8/2026 (7)
Made the #research heading break at the full stop, one line per sentence: each sentence wrapped in span.sentence set to display:block, section-head widened 760px -> 820px so the first sentence fits on one line, text-wrap:balance kept per sentence for narrow screens. Copy untouched. Applied to index.html and investors.html. Not committed, not pushed.
---
26/8/2026 (6)
Founder reversed part of task 4: the What the data says section (#research) is back on the landing page between the hero and #problem, with its count-up animation and a The data nav link. It stays on investors.html as well, so both pages now carry that block and must be edited together. The seven copy edits made to it were reverted on request; the section text is byte-identical to the original on both pages. index.html 51.7 -> 55.7 KB, page height at 360px 10,025 -> 11,651 px. Not committed, not pushed.
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
