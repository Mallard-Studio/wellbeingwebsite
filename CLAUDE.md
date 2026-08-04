# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---
## Changelog — read FIRST for recent context

`CHANGELOG.md` (repo root) holds one terse line per change: `what — why [specs/files]`.
Read it instead of `git log`/diffs when you need recent history — it captures the *why* commits don't.
After a non-trivial change, add a dated entry (newest date on top). Keep entries one line.

---
## Bug Tracking Workflow

Project keeps a lightweight, in-repo bug log under `bugs/`.

**Structure:**
- `bugs/bugs.md` — index table: number, title, status, file reference.
- `bugs/<NN>-<short-slug>.md` — one file per active bug with the full description.
- `bugs/fixed/` — finished bug files are moved here after the fix is merged.

**When to log a bug:**
- User reports a bug AND we decide not to fix immediately (no solution, deferred, OEM/external limitation), OR
- User explicitly asks to log it.
- Do NOT auto-log every bug touched in a normal fix-and-commit flow.

**Per-bug file must include:**
- Title, status, date reported, affected flow, affected file(s) with line refs.
- Description of expected vs. actual behaviour.
- Current code snippet if relevant.
- If status is "No Solution": explain the underlying platform/OEM/library limitation, list investigated workarounds in a table with reasons each fails, and state the accepted decision + any product mitigation.
- References (Android docs, issue trackers, etc.).

**Status values:** `Open`, `Investigating`, `In Progress`, `No Solution`, `Fixed`.

**Workflow:**
1. Create `bugs/<NN>-<slug>.md` with full description.
2. Add a row to `bugs/bugs.md` linking the file.
3. When fixed: update status, move the file to `bugs/fixed/`, update the link in `bugs.md`.

---
## Communication Style — HARD RULES
- **Max 200 words per response.** If more is needed, ASK first. Permission is one-time only.
- Full sentences. Clear. Simple English. Minimum jargon.
- Use the user's own names for things. Do not invent new names (e.g. "staleness window", etc).
- If the user uses a wrong term (e.g. says "reactive" when the log shows "predictive"), correct it explicitly and early. Do not let mismatched terms slide.
- No walls of text. No over-explaining. No defending past answers — admit and move on.

---
## CRITIAL
**scope control:**
Do not jump into implementation or change files unless clearly instructed to make changes. 
When intent is ambiguous, default to providing information and recommendations rather than taking action. 
Always ask about systems integration.
Only proceed with edits when explicitly requested.
**Prevent overengineering:**
Avoid over-engineering. Only make changes that are directly requested or clearly necessary. Keep solutions simple and focused:
- Don't add features, refactor code, or make "improvements" beyond what was asked
- Don't add docstrings, comments, or type annotations to code you didn't change
- Don't add error handling for scenarios that can't happen
**System Integration Requirements:**
- Before implementing any new feature, analyze its impact on existing systems
- Document all integration points and dependencies
- Consider data flow, API compatibility, and service interactions
- Identify potential breaking changes or conflicts
- Propose integration testing approach
- Review security implications for connected systems
**Feature Development Process:**
- Start with integration analysis before coding
- Map out how the feature connects to existing architecture
- Consider backwards compatibility and migration paths
- Document any new dependencies or external service requirements

## Git Commit Policy — CRITICAL

**NEVER commit code without explicit user approval.**

- After making code changes, ALWAYS stop and wait for user review
- Only commit when the user explicitly says "commit", "commit this", "looks good commit it", or similar
- If user says "wait for my review" or "then wait for my review" — do NOT commit

**Violating this rule is a serious error.**

---

## Build Policy — CRITICAL

**NEVER run build commands.**

- Do NOT run `./gradlew build`, `./gradlew assembleDebug`, `./gradlew assembleRelease`, or any variant
- The user builds the project themselves

---

## JSON Policy — CRITICAL

**NEVER use Gson (`com.google.code.gson:gson`) in this project.**

- The Gson dependency has been removed. Do not add it back.
- Reason: Gson relies on reflection that breaks under R8 minification in release builds. Two prior production incidents:
  - `b7535e4` removed Gson from `AppDetectionHelper` — app detection config silently failed to load in release.
  - Bug `0511-app-list-not-saved` — `AppSelectionManager` lost user selections after the process restarted in release.
- Use `org.json.JSONObject` / `org.json.JSONArray` for all JSON parsing and serialization. They ship with Android, need no dependency, and are unaffected by R8.
- Reference patterns: `AppDetectionHelper.parseDetectionConfig`, `AppSelectionManager.parseCategoryMap`, `CacheUtils.emotionToJson` / `emotionFromJson`.
- Do not propose `@SerializedName` annotations, ProGuard `-keep` rules, or `-keepattributes Signature` as a workaround. The fix is to not use Gson — never the workaround.

---

## Git Branching Strategy — CRITICAL

- **`develop`** — all feature work; staging area for unpublished code
- **`master`** — published/shared snapshots only

**Merge rules:**
- merge ONLY when user says explicitly merge. and confirm.
- Feature branches → always merge to `develop`
- `develop` → `master` ONLY when user says explicitly merge. "ready to publish", "share with others", or "merge develop to master"
- If user says about a feature branch "merge and close the feature branch" with no target → merge to `develop`
- NEVER assume master is the target

---

## Project Overview

**Wellbeing** — Android app tracking emotional wellbeing during gaming and app usage sessions. Monitors emotions via periodic check-ins, provides analytics, and alerts users to mood drops.

**Core features**: mood meter overlays · app usage detection · emotion analytics · warning system · onboarding flow

**Tech stack**: Kotlin · Android · Firebase Firestore · Jetpack Compose (overlays) + XML (activities) · AccessibilityService

---

## Build Commands (reference only — user runs these)

```bash
./gradlew build
./gradlew installDebug
./gradlew assembleRelease
./gradlew clean
./gradlew test
```

---

## Specs & Documentation

All technical and feature details live in `specs/`. Read the relevant spec before making changes to a feature area.

| Spec | Contents |
|------|----------|
| `specs/architecture.md` | Architecture, navigation flow, services, data models, UI patterns, Firebase |
| `specs/product/flows/firstrun_onboarding_flow.md` | First-run onboarding product flow (firstrun page, reward tags, routing) |
| `specs/product/flows/onboarding_wizard_flow.md` | Onboarding wizard product flow (butterfly tutorial steps, incl. MIUI keep-alive) |
| `specs/android/Android-firstrun-onboarding.md` | First-run onboarding Android impl (FirstRunOnboardingActivity, Apps List setup dialogs) |
| `specs/android/Android-onboarding-wizard.md` | Butterfly wizard Android impl (OnboardingCoordinator, step table) |
| `specs/android/Android-hyperos-service-kill.md` | MIUI/HyperOS service-kill root cause + the keep-alive onboarding steps |
| `specs/authentication.md` | Auth product spec (Google sign-in, anonymous fallback, multi-device) |
| `specs/Android-authentication.md` | Auth Android implementation (SignInWithGoogle, Credential Manager) |
| `specs/app-detection.md` | App detection product spec (categories, session lifecycle) |
| `specs/Android-app-detection.md` | App detection Android implementation (AppDetectionService, AccessibilityService) |
| `specs/check-in-system.md` | Check-in product spec (mood meter, intervals, emotion log schema) |
| `specs/Android-check-in.md` | Check-in Android implementation (CheckInsService, MoodMeterOverlay, cooldown) |
| `specs/reactive-warning-system.md` | Reactive warning product spec (trigger conditions, actions, break/snooze) |
| `specs/Android-reactive-warning.md` | Reactive warning Android implementation (WarningManager, ReactiveDetector) |
| `specs/predictive-warning-system.md` | Predictive warning product spec (WIP — pattern-based proactive warnings) |
| `specs/Android-predictive-warning.md` | Predictive warning Android implementation (WIP — PredictiveDetector, rules) |
| `specs/apps-selection.md` | Apps selection product spec (monitoring setup, onboarding, search) |
| `specs/Android-apps-selection.md` | Apps selection Android implementation (AppsListFragment, adapters) |
| `specs/app-shell.md` | App shell product spec (navigation, tabs, settings, monitoring pause) |
| `specs/Android-app-shell.md` | App shell Android implementation (MainActivity, fragments, MonitoringPauseReceiver) |
| `specs/session-continuity.md` | Session continuity product spec (transparent packages, call-pause/resume) |
| `specs/Android-session-continuity.md` | Session continuity Android implementation (isSessionTransparent, AudioManager call detection, pause/resume alarm logic) |
| `specs/analytics.md` | Analytics product spec — all GA4 events, parameters, and setup notes |
| `specs/logging.md` | Logging strategy, Logcat standards, Crashlytics setup, what was cleaned up |
| `specs/Android-logging.md` | Logging Android implementation (AppLogger, log milestones per service) |
| `specs/bug-reporting.md` | Bug reporting — user flow, dialog, Storage structure, admin bypass, spam protection, cross-platform iOS/Android |
| `specs/rewards.md` | Rewards product spec (placeholder — not yet implemented) |
| `specs/Android-rewards.md` | Rewards Android implementation (placeholder) |
| `specs/product/systems/firebase_bootstrap_system.md` | Firebase user-doc bootstrap — gated only on T&C, decoupled from monitoring permissions, AtomicBoolean fence across entry points |
| `specs/product/systems/usage_baseline_system.md` | Usage baseline — retrospective 7-day day-by-day per-app foreground baseline for watchable categories, stored at `users/{deviceId}/usageBaseline/{packageName}` |
| `specs/android/Android-usage-baseline-tests.md` | Baseline ACs + on-device test steps (uses `verify.js baseline` subcommand) |
| `specs/002-statistical-analytics-dashboard/` | Stats dashboard, averaging algorithm, charts |
| `specs/001-install-connection-with/` | Firebase integration, flat hierarchy, multi-device |
| `specs/product/BACKLOG.md` | Single source of truth for all pending work, tech debt, ideas, and cancelled items (categorized). `specs/product/TODO.md` is a retired redirect stub. |

---

## File Organization

```
app/src/main/java/com/gw/gamerswellbeing/
├── MainActivity.kt
├── CheckInActivity.kt
├── CheckInState.kt
├── AppAccessibilityService.kt
├── auth/
├── base/
├── db/                        Firebase repositories (UserRepository, BugReportRepository, ...)
├── emotions/
├── permissions/               PermissionsActivity, PermissionsHandler
├── services/                  AppDetectionService, CheckInsService, PermissionService
├── settings/                  AppsListFragment, adapters
├── stats/
├── tutorial/                  TutorialManager, TutorialOverlay
├── utils/                     AppDetectionHelper, AppCategory, IntervalOption
├── warning/                   WarningService, WarningOverlayActivity
└── welcome/                   WelcomeActivity

app/src/main/assets/
├── app_detection_config.json
├── tutorial_definitions.json
└── warning_config.json
```

---

## Code Patterns & Consistency

- **AppSelectionManager**: always use static methods (`selectApp()`, `deselectApp()`)
- **IntervalOption**: access via static methods (`getDisplayNames()`, `fromId()`)
- **Back navigation**: use `OnBackPressedCallback` — never deprecated `onBackPressed()`
- **MaterialButton with custom background**: always set `app:backgroundTint="@null"`
- **Dialogs**: use `AlertDialog.Builder(context, R.style.AppDialog)` + `setView(R.layout.dialog_app)`
- **Snackbar positioning**: see `specs/architecture.md` §UI Patterns

## Known Issues & Solutions

- **Large app lists**: use `AppListAdapterOptimized` with `item_app_simple.xml`
- **Checkbox 3-state**: custom drawables `checkbox_selector` / `checkbox_indeterminate`
- **System bar overlap**: `fitsSystemWindows="true"` or `WindowInsetsCompat` listener
- **Material3 conflicts**: use `Widget.MaterialComponents.*` not `Widget.Material3.*`
- **GIF animation**: load via `ImageDecoder` + `AnimatedImageDrawable.start()` — XML `android:src` shows only first frame
