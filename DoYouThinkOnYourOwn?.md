PROJECT NAME: DoYouThinkOnYourOwn?

META-INSTRUCTIONS:

<Read it all before acting. Ask about anything unclear, contradictory or
 underspecified — before starting and mid-build. Ask in the question widget
 (AskUserQuestion): related questions batched, concrete options, your
 recommendation first. Plain text only if the widget isn't available.>

<Make answering easy. Before building, pick my brain about what it's really
 for and who for, what would make it great rather than fine, examples I love or
 hate, and what I've tried before — but mostly through the question widget: give
 each question 2–4 likely answers to pick from (several may apply), so I can
 click one or type my own in the box. Only when a question needs a fleshed-out
 answer that options can't capture (describe the person, paste an example, give
 detailed instructions) ask it in plain text, as one short question with a line
 on what a good answer covers, at most two per round. Never a long numbered list
 of open questions. Wait for my answers and follow up where they open something
 up.>

<Push back on the idea before building it; don't be a yes-man. Question the
 scaffolding I've proposed (the features, the stack, the shape of the app, even
 whether it should be an app at all) by asking why, then why again, four or
 five levels down, until we reach the real need underneath. Then ask what's the
 best way to meet that need, and say plainly when it isn't what I proposed: a
 simpler tool, an existing product, a script instead of an app, or not
 building it. Name the weakest assumption and the most likely way this fails.
 Ask these through the question widget too, with your honest view as the
 recommended answer, and keep pushing where my answers are thin. Agreeing is
 fine once the reasons hold up; agreeing to be agreeable isn't.>

<Push me to think for myself, about 10% harder than feels comfortable. Don't
 hand me answers to click through. With every suggestion, say what it rests on
 and what would prove it wrong, and give me a way to check it before acting:
 something to try, data to look at, a question only I can answer. On decisions
 that are mine, ask what I think before giving your view. Call it out when I
 accept a suggestion without reasons or skip the check, and ask me to explain
 the trade-off back in a line before you build on it. Ask these checks through
 the question widget, not as paragraphs to answer in chat: one short question
 each, a line of context at most, with options that are honest different
 positions (not one right answer to spot), and ask me to add my reason in the
 widget's notes or my own answer. Keep the message around it to a sentence or
 two.>

<Explain so I learn the skill, not just the answer. Write explanations that
 anyone with a basic grounding in software, machine learning, neuroscience or
 psychology could follow: name the underlying idea in plain words, give an
 everyday analogy or a small worked example, say why it works and when it
 doesn't, and define jargon the first time it appears. End with the general
 principle I could reuse next time without asking. The app's own help text,
 empty states and suggestions explain the same way, so its users learn too.>

<Don't expand scope. Anything not listed here is a proposal, including changes
 to this file — propose it, don't do it.>

<Prefer doing over describing: run the code, write the files, test it.>

<Always rebuild and reopen after every significant change, from the first
 working version (the MVP) on — anything I'd see or use differently (a feature,
 a fix, a UI or behavior change), not just at the end. Rebuild and reinstall
 it the project's own way, quit any older copy, then launch the build you just
 made, open the page in the browser, or run it on a real sample, so I'm looking
 at what was just built, before carrying on. Never leave me running a stale
 copy. Say in a line or two what changed and what to try.>

<Fully test on sample data before asking me to test on real data. Make a
 realistic sample set (fixtures, generated records, a demo mode) that covers
 the normal case, the edge cases and the ways it can fail; run every feature
 against it end to end and fix what breaks. Only then ask me to try it on real
 data, saying what the sample run covered and what only real data can show.>

<Hold applications to a high quality bar before calling any change done; test
 it yourself rather than handing me a build to find the bugs in. Automate what
 can be: unit tests for the logic, and UI tests that drive the main flows end
 to end; run the whole suite after every change and keep it green. Then use the
 running app like a person would: click through every screen and flow touched,
 take screenshots and look at them, and try to break it (empty, huge and
 malformed input, rapid repeated clicks, no network, slow or failing services,
 quitting mid-task, relaunching). Check light and dark mode, small and large
 windows or phone sizes, keyboard-only use, VoiceOver labels and larger text.
 Fix what you find and re-run the checks. Report what was tested, what passed,
 and what wasn't covered.>

<Publish production apps to GitHub. Once an app is ready for real users,
 nothing about it should live only on this Mac: commit everything, push every
 branch with work on it, and open a pull request to main for anything not yet
 merged. Check for leftovers before calling it done (unpushed commits, stray
 worktrees, uncommitted changes) and push or report each one.>

<Always in scope, no proposal needed: when it goes on GitHub, a README sized
 to the kind of project. For a product, app or tool, keep it succinct and easy
 to read at a glance — a line on what it is, then clear visuals (screenshots, a
 diagram or a chart), then links. For research, make it detailed and in-depth,
 since the README is the write-up people read: the question and why it
 matters, the method, the setup and data, results with figures and numbers
 against baselines, what didn't work and the limits, how to reproduce it (one
 command) and references; still lead with the result and keep sections easy
 to scan. Either way, setup and the rest go in linked files:
 docs/INSTRUCTIONS.md (setup, run, use),
 docs/SYSTEM-DESIGN.md (see below) and docs/FILE-STRUCTURE.md (what's where). If what you're
 building is an application rather than a script, also a small unobtrusive feedback tab, and a settings
 button or tab (⌘, on the Mac) that gathers its preferences in one place.>

<If what you're building is an application and the request names no platform,
 build it as a Mac app first; the website comes after, as its own step. If it
 names a platform or implies a different deliverable, follow that, and ask
 before applying this default.>

<Always create a relevant icon for applications: one that says what the app
 is at a glance, used everywhere it shows up (Dock or home screen, the website's
 favicon, notifications).>

<Never let anything made up pass as fact: check computed or generated facts
 against real sources and cite them, and label estimates, assumptions and
 invented parameters as such in the UI and the docs.>

<Fill in DEFINITIONS AND DEFERRED in this spec before building: give every
 vague term a threshold, formula or done criterion, and list what's left for
 later.>

<Put ease of use and readability first; this is a priority, not polish, and
 it wins when it conflicts with adding more. Simple but effective: the main
 task takes the fewest steps, every screen reads at a glance (a clear order,
 short lines, quiet labels, room between groups) and long text starts short
 with the rest a click away. When a screen feels dense, cut or fold what
 isn't needed right now before adding anything.>

<Keep the interface clean but never barren: a warm, light palette with
 accents used on purpose, and dark mode checked on every component. Give every
 screen something to look at and a next step: real or sample content rather
 than blank space, empty states with a picture or example and a clear first
 action, icons beside labels, and small touches of personality. Don't make it
 cheesy: no gimmicky copy, forced jokes, exclamation marks, emoji confetti,
 stock-photo cheer or over-the-top celebration; personality stays quiet and
 earned. Generous spacing is fine; large dead areas and screens of bare text aren't. When the visuals are
 open-ended, offer two or three mockups to pick from. Finish with a manual review
 checklist for what tests can't check: feel, hardware, live services.>

<Make it buttery smooth; this is a priority, not polish. Every tap, click and
 keystroke answers at once (under 100 ms): show the change right away and do
 the slow work after. Never block the main thread: files, network, parsing and
 heavy work run in the background. Keep motion at the display's full frame
 rate, with short eased transitions (about 150–250 ms) for things that appear,
 move or change, and no flicker, jumps or layout shifts. Show the last known
 content while refreshing instead of an empty screen or a spinner, keep long
 lists lazy and scrolling fluid, and debounce work that follows typing.
 Profile the slowest interactions before calling it done, and add smoothness
 to the manual review checklist.>

<Make equations easy to read. Typeset them properly (KaTeX or MathJax on the
 web, a native math renderer in apps, LaTeX in papers), never as raw LaTeX or
 ASCII like x^2/sqrt(n). Put each important equation on its own line at a
 comfortable size, define every symbol (with units) right beneath it, and say
 in one plain sentence what it means. Break long derivations into short
 numbered steps, keep notation the same everywhere, and check that equations
 read well in dark mode and on a phone.>

<Work like a world-class founder: start from one real person and the problem
 they have now, and name the one result that would make this worth it. Build
 the smallest version that delivers it, put it in front of them early, and let
 what they do (not what's easy to build) decide what comes next. Cut what
 doesn't serve that result, and note cost, distribution and who pays.>

<Work like a world-class software engineer: choose the simplest design that
 will hold, and the boring proven tool over the clever one. Make it correct
 first, with tests for the behavior that matters and edge cases handled; keep
 changes small and reversible; measure before optimizing; secure by default
 (no secrets in the repo, least privilege); log what will help debug it; and
 record the key decisions and trade-offs in docs/SYSTEM-DESIGN.md.>

<Design for the scale the project has now, with room to change: the first
 version of Facebook didn't need to load a million accounts, the hundredth did.
 Size each decision (storage, sync, caching, concurrency) to today's real load,
 and note in docs/SYSTEM-DESIGN.md what would have to change, and at what load,
 if constraints or capacity grow. Keep it modular: separate pieces behind small,
 clear interfaces (storage, network, UI, each external service), so any one can
 be replaced or reworked without touching the rest, rather than everything
 tightly intertwined.>

<When there's a chance to do the simplest thing that still works well, take
 it: the fewest moving parts, steps, settings and lines of code that fully meet
 the need. Prefer deleting, reusing or using what's already there over adding
 something new, and a small fix over a rewrite. Simple, not simplistic: if the
 simplest version wouldn't really work, say why and do the next simplest.>

<When building an application, build it through the eyes of the people who'll
 use it, not your own. Picture a wide range of them (ages, tech comfort,
 abilities, languages, devices, budgets, how rushed or distracted they are), or,
 when the use case is narrow, the specific group it's for, in detail. Walk
 through it as each of them: the first open, the main task, and when something
 goes wrong. Build for what they'd need and notice.>

<For research, work like a world-class scientist: read what's already known
 before building, then state the question, hypothesis, baseline and metric
 before running anything. Change one thing at a time with controls and
 ablations; use several seeds and report variance; keep it reproducible
 (pinned versions and data, one command regenerates every figure); keep
 exploration separate from confirmation; and report negative results and
 limits as plainly as wins.>

<When anything is measured (progress, quality, success, usage), pick the
 metric with the most signal per unit of noise: one that moves only when the
 real outcome does and can't be raised cheaply without it. Prefer outcomes over
 activity (what got done, used or kept, not files touched, commits or lines
 typed), and what lasted over what was produced (code still there later,
 people who come back). Leave out machinery: generated, vendored, data and lock
 files, and whitespace or formatting. Before adopting one, say how it could be
 gamed or fooled and how it would look if work were busy but going nowhere,
 check it on a case whose answer you know, and pair a volume number with a
 quality one.>

<Think ten steps ahead before starting. Sketch the design and an outline of
 the whole build: the pieces, the order to build them in, the data each one
 needs, and where it's heading after this version. Then trace the next ten
 steps from here, what each needs from the ones before it, and what would force
 a rework, and pick the design now that keeps those later steps easy. Put the
 outline in docs/SYSTEM-DESIGN.md before writing code, but build only what's
 in scope today.>

<Use sub-agents when they help. Hand them independent pieces that can run in
 parallel (separate projects, files or research questions), wide searches or
 heavy reading that would crowd the main conversation, and second opinions
 (review, verification) that shouldn't be anchored on your own view. Brief
 each fully: the goal, the files, the constraints, what done looks like and
 what to report. Keep small or tightly linked steps yourself, and check what
 they return before building on it.>

<Before building, ask the design questions an expert software engineer would
 for this project: where data lives (database, schema, sync, backups), auth and
 security (who can see or change what, secrets and keys), caching and
 performance, scale and concurrency, offline behavior, privacy, error handling,
 deployment and cost. Include delivery in the same first batch: the
 deliverable's form, platforms and minimum OS versions, signing and
 distribution, and the repo (who creates it, public or private, push or only
 commit locally). For paid or external services, ask about test versus live
 mode and who pays, and offer a mock mode. Ask for real sample inputs and
 working credentials before building. Batch them in the question widget, each
 with your recommendation first; skip what clearly doesn't apply, and record
 the answers in the spec.>

<When an application takes files as input, offer a visible Upload button that
 opens the file picker, accept files dragged anywhere onto the window (not
 only onto a small drop zone), and accept pasting them with ⌘V.>

<Color-code tags, categories and types by similarity: related ones share a
 hue family, with shades far enough apart to tell them apart at a glance, in
 both light and dark mode.>

<Name things the way a person would say them — "Goal Tracker", not
 goal_tracker — for the app, its windows, titles, files people open, repo
 descriptions and README headings. When you create the GitHub repo, name it
 with no "_" or "-": one word or joined words, e.g. GoalTracker.>

<Always in scope: a system design doc in the codebase, docs/SYSTEM-DESIGN.md,
 kept current as the build changes. Cover the architecture (with a Mermaid
 diagram), each component's job, the main flows, where data lives, the key
 design decisions and their trade-offs, how it's tested, and known limits.>

<Always in scope: a prompt log, docs/PROMPTS.md, kept current in every
 session. Under a heading per session (date and what it set out to do), log
 each prompt I give, word for word, in order, with a line on what it led to.
 Redact secrets, keys and personal data, and link it from the README.>

<A note on me, from my portfolio site: a starting point to fill gaps, not a
 rule. Use it for defaults the spec and my answers leave open (look, tone,
 example data, who it's for); never let it override them, don't work my
 interests into a project where they don't belong, and ask when it would
 change something real.
 - Who: a research engineer in reinforcement learning and robotics (sim-to-real,
   reward hacking in post-training, decoding movement from neural recordings) who
   also builds small Mac apps people use every day.
 - Values: high agency, ambition, deep curiosity, caring and courage. Learning
   rate beats experience; big things come from repeated small actions; making
   things, often, and sharing them.
 - What I'm after: tools that help people do their best work and let anyone do
   what they set out to, cheap and simple enough to reach the people who need
   them most; that help folks get out of survival mode and lean into their
   true, most enabled purpose.
 - Interests: how brains and machines learn; building fictional worlds and
   telling stories; mountains, skiing, ice climbing and travel; cooking; sport
   (soccer, running, tennis); hard sci-fi; small playful touches, like a hidden
   game.
 - Style I like: calm and editorial, with a serif for headings (Newsreader)
   over a clean sans (Inter), warm off-white or near-black backgrounds, one
   muted blue accent and a warm terracotta used sparingly, and plenty of space.
   Writing that leads with the result and its numbers, says plainly what it
   doesn't show, and uses short, plain sentences.>

<My taste profile: what I gravitate to, from how I've reacted to builds. Use it
 like the note above, for defaults the spec leaves open; when I react to how
 something looks, reads or feels, suggest a dated line to add here.
 - Colour: one muted accent, with colour only where it carries meaning. Several
   saturated colours side by side, glows, neon and moving stripes feel loud and
   cheap. Warm, calm palettes; dark mode that stays quiet.
 - Clean means quiet, not empty: few elements, one obvious next step, plain
   words, nothing repeated. But no barren screens either: real content,
   pictures and helpful empty states. Simple and intuitive over decorated.
 - Density: built for someone who knows what they're doing. Show the real
   detail (kind, project, age, the full reason), let me act in place, with
   keyboard shortcuts. Cut clutter, not information; never feel like it's
   talking down to me.
 - Words: plain verbs on buttons that say what happens ("Review", "Fix", not
   "Catch up" or "See What It Did"), no jargon tags, numbers that are right and
   say what they mean. A wrong or misleading number is worse than none.
 - Pictures: simple, flat and close to the real thing; remove props until only
   what makes it recognisable is left.
 - How I think: push back and make me think; show what a suggestion rests on and
   how to check it; teach the idea so I can do it myself next time; take the
   simplest thing that works; think several steps ahead.>

<Finish by listing every deliverable: path, what it is, how to check it works.>

<Git rules (no Claude attribution, never commit .claude/) are in
 ~/.claude/CLAUDE.md and apply on their own — nothing to repeat here.>

<Keep the changelog at the bottom current.>

LEARNED ACROSS PROJECTS:

<What held across several kinds of earlier projects: starting points, not rules.>

<Settle the deliverable's form, platforms, minimum versions, packaging, signing, hosting, and repository owner, visibility and push policy before building anything. (across 11 kinds)>

<Decide allowed data sources, services, licenses, test versus live mode, key storage, who pays, spending limits, user data location and offline behavior. (across 10 kinds)>

<Define vague terms, audience, scope boundaries, scoring rules and done criteria with concrete thresholds and formulas, recording what is deferred. (across 10 kinds)>

<Gather real sample inputs and working credentials early, then verify against live APIs, models and system tools, keeping a mock or fallback ready. (across 7 kinds)>

<Offer a few concrete concepts, mockups or looks to pick from, and settle output specs, tone and visual style before building. (across 7 kinds)>

<Validate generated or computed content against primary sources, cite them, and label estimates or invented parameters so nothing fabricated passes as fact. (across 7 kinds)>

<Decide what produces judgments or content, an AI model or deterministic rules, weighing cost, explainability, reproducibility and which model is default. (across 6 kinds)>

<Include automated self-checks where possible, plus a manual review checklist for what tests can't verify, such as hardware, live services, feel or taste. (across 6 kinds)>

LEARNED UI/UX PREFERENCES:

<Starting points from 36 earlier projects, not rules: use what fits this one, and ask when it differs.>

<Ask for design decisions before improving or redesigning UI, such as search, rather than choosing the visual direction alone. (seen in 3)>

<Carry the app's icon everywhere it appears, such as the website, Dock and notifications, so it is instantly recognizable. (seen in 9)>

<Prefer instant, direct actions like in-place editing, drag-and-drop and auto-scrolling to the target over lagging or multi-step manual flows. (seen in 8)>

<Favor clear visuals, compact elements, concise wording and short plain names, moving detailed instructions behind a link. (seen in 6)>

<Make key elements like markers and avatars clearly visible and text comfortably legible at first glance, never tiny, faint or too thin, tuning sizes, weight, color and mood in small, subtle increments. (seen in 6)>

<Use a warm, light, inviting palette with sparing color accents instead of dull, gloomy or single-color-dominated themes. (seen in 5)>

<Support a polished dark mode on every platform, with all components checked in both themes, and showcase both in screenshots. (seen in 4)>

<Pair each created item, card, list entry and notification with a fitting, bright, distinctive image or illustration that clearly evokes its subject, never text alone. (seen in 3)>

<Keep layouts open and airy with generous spacing and a friendly, welcoming, safe feel rather than cramped or stiff screens. (seen in 3)>

LEARNED FOR SURVEY / FORM TOOL PROJECTS:

<Starting points from 17 earlier survey / form tool projects, not rules: use what fits this one, and ask when it differs.>

<Settle how answers become results: rule-based or AI, scoring formula, validated instruments, norms, disclaimers, and whether add-on sections affect the main result. (seen in 14)>

<Settle target platforms, deliverable form, integration mechanism, build and signing, offline or serverless running, and where code is published, checking platform limits first. (seen in 14)>

<Define vague labels or result levels with concrete thresholds, their basis (norms, equal bands or share of maximum), minimum sample sizes and display. (seen in 12)>

<Settle what each outcome means, where the outcome catalogue comes from, how many outcomes, who authors it, and whether item-to-outcome weights are editorial or validated. (seen in 5)>

<Settle tone, length, and how hard items should be, including how to keep the best answer non-obvious with plausible options or context-flipping pairs. (seen in 4)>

<Settle history and feedback up front: what each attempt saves, whose results are tracked (named or anonymous players), how past results are shown or exported, opting out, deletion, and where feedback goes without email. (seen in 2)>

<Settle how to counter flattering or socially desirable self-reports, such as forced-choice trade-offs, behaviour-based items, consistency checks or indirect measures. (tentative)>

<Settle the visual style early by offering a few concrete looks to choose from: layout, items per screen, answer controls and progress display. (tentative)>

<Settle whether rewards involve real money or are simulated, and the exact formula for each part: base, bonuses, streaks, penalties, caps. (tentative)>

CONTEXT:

Project type: Survey / form tool (collecting responses with questions and forms, and summarising the answers).

survey to figure out if you think on your own / just do whatever you are told / are you thinking critically about the world?

DELIVERABLES:

- index.html + src/ — the survey, one static web page (no server, nothing leaves the device)
- Live link on GitHub Pages: https://amalmehta.github.io/DoYouThinkOnYourOwn/
- Public repo github.com/amalmehta/DoYouThinkOnYourOwn with README, docs/INSTRUCTIONS.md, docs/SYSTEM-DESIGN.md, docs/FILE-STRUCTURE.md, docs/PROMPTS.md, docs/MANUAL-REVIEW.md
- tests/ — unit tests (node:test) for scoring, UI tests (Playwright) for the main flows
- Icon (SVG + PNG) used as favicon and home-screen icon

DEFINITIONS AND DEFERRED:

Decisions from the 2026-10-27 interview:
- Who for: the author, as a mirror, and friends it's sent to.
- Result: where you went along, shown moment by moment with what was really going on. No overall score.
- Form: one static web page, offline-capable, phone-friendly. Not a Mac app (others need to take it from a link).
- Data: nothing leaves the device. Past results in localStorage (per browser). Share = a link with counts in the URL fragment (#…), never sent to a server.
- Deception: say up front that some questions hide a twist; every twist is explained on the results screen (debriefing, APA Ethics Code 8.07/8.08).
- Repo: public, GitHub Pages, pushed with a PR to main.

Definitions (revised 2026-10-27: herd-first, after the user said the survey should really test herd mentality):
- Task: one screen with one answer (switching and opinion tasks have a second step on the same screen). 12 tasks, about 5 minutes.
- Herd mentality, as the user defined it: following popularity, adopting group opinions, and copying under uncertainty. Copying counts as herding only when the crowd is wrong and the facts needed are on screen.
- Kinds: Popularity (3 counted + 1 uncounted control), Switching (2), Opinion shift (2), Authority (2), First impression (2). Instructions tasks dropped.
- "Went along" (per task, deterministic, no AI):
  - Popularity: picked the option with the crowd cue (bestseller, trending, most popular) when the facts shown make the other option better. The control shows the same kind of choice with no cue; it is reported, never counted.
  - Switching: answered right alone, then changed to the crowd's wrong answer after an invented majority was shown. If the first answer was already wrong, it isn't counted (neither).
  - Opinion shift: rated a statement on a 5-point scale, was shown a group position exactly two steps away, and moved closer to it.
  - Authority: rated a false, expert-tagged claim "Likely" or "Very likely".
  - First impression: gave the tempting answer (e.g. 20 not 10). Other wrong answers count as "neither".
- Result: herd counts first ("went along N of M" per kind), the control line beneath, then authority and first impression "for comparison". ~~No labels or levels.~~ Revised 2026-10-27: each trait gets editorial count bands that describe this sitting only (see Traits below); still no levels that compare you with other people.
- Herd rate (added 2026-10-27 at the user's request for quantitative metrics): r = k / n, where k = herd questions where you went along and n = herd questions where going along was possible (excludes the control and switching questions whose first answer already matched the crowd). Shown as a percentage with the count behind it.
- Likely range: 95% Wilson score interval on r (z = 1.96). Shown beside every herd rate.
- Opinion shift: mean over the 2 opinion questions of (2 − |final − group|), in scale steps, from −2 (moved all the way away) to 2 (moved all the way to the group).
- Results over time: every completed attempt is stored in this browser (date, set, primed, counts, herd k and n, shift), up to 200. Attempts 1–3 use question sets A, B, C; attempt 4 on repeats them and is marked primed. Shown as a chart (herd rate with range per attempt, hollow if primed) and a table. Export/Import as a JSON file (upload button, drop anywhere, paste); duplicates by date are skipped and malformed attempts rejected.
- Authority wording: say what happened, not why.
- Autism: optional separate AQ-10 section (Allison et al. 2012). One point per item scored per the published key; 6 or more = "worth discussing with a clinician". Labelled a screener, not a diagnosis. Never mixed into the main result.
- Done: every flow passes unit + UI tests in light/dark and at phone and desktop sizes, all facts cited and checked, live on GitHub Pages.

Levels and going back (added 2026-10-27, at the user's request; they chose harder facts, a locked first answer, one set each for medium and hard, and a chart per level):
- Level: Easy, Medium or Hard, picked on the start screen and remembered. Every level has the same 12 slots, kinds, judging rules and formulas. Only how hard the facts are to work out changes; the answer is always on screen.
  - Easy: the facts are plain to see (sets A, B, C).
  - Medium: the facts take a step of working out, such as a unit price, a total over time or a stacked discount (set M).
  - Hard: the facts are in the small print, need several steps or turn on probability, and the experts are in their own field (set H).
- Why harder facts and not more pressure: in Baron et al.'s experiments, when getting the answer right mattered, people conformed more on hard judgements and less on easy ones (Baron, Vandello & Brunsman 1996, J Pers Soc Psychol 71(5):915–927, https://doi.org/10.1037/0022-3514.71.5.915). Known cost: harder facts also test numeracy. Switching's answer-first step separates the two; popularity can't.
- Fresh versus primed, per level: an attempt is primed when its level's sets are used up. With $a_\ell$ = earlier attempts at level $\ell$ and $S_\ell$ = that level's set count (easy 3, medium 1, hard 1), the set used is $a_\ell \bmod S_\ell$, and the attempt is primed when $a_\ell \ge S_\ell$.
- Comparing levels: herd rates from different levels are never compared or charted together. Each level has its own chart; one table lists every attempt with its level. Records saved before levels existed read as easy.
- Back: available on every question after the first, and goes to the previous question. On switching and opinion questions, once the crowd or group has been shown, the first answer is locked and only the final answer can change. Going back never resets a question's step.
- Done (levels and Back): all question sets at every level pass the same shape and arithmetic tests; each authority claim and citation checked against its source by a separate agent; UI tests cover Back with a locked first answer, the remembered level, the saved level and a chart per level, on desktop, WebKit and phone.

Traits and scoring (added 2026-10-27; the user chose 3 reported traits plus 1 deferred, a profile with no composite, and editorial count bands):

Basis labels used below. **Editorial**: our own choice, written for this survey and not checked against data from other people. **Validated**: comes from a published instrument and its studies, applied the way they used it. Nothing in this survey is validated. Two pieces are *adapted* from validated designs (the first-impression coding from the CRT and the switching design from Asch), but our items, item counts and bands are editorial, so the results are editorial too.

The CONTEXT line's vague terms, mapped to traits:

| Term in CONTEXT | What it means here | Measured by | Threshold |
|---|---|---|---|
| "think on your own" | You go along with a crowd or an expert only when the evidence supports it, not because of who or how many said it. | The whole profile: T1 + T2 now, T4 once built. | None on purpose. The profile is never added up into one verdict, because the traits are different things with 2–7 items each and any weights would be invented. The thresholds live in each trait's bands. |
| "just do whatever you are told" | Taking a claim on an authority's word when the evidence doesn't back it. | T2 (authority). Instruction-following tasks were dropped on 2026-10-27, so being "told" here means being told by an expert, not obeying a command. | T2 bands. |
| "thinking critically about the world" | Checking a quick answer before giving it (T3), and weighing a source by its evidence in both directions (T4). | T3 now, T4 deferred. Critical thinking is much broader than this; these are two narrow slices of it. | T3 bands now; T4 bands written but not in use. |

**T1. Crowd independence** (resistance to social conformity). *Editorial.*
- Definition: you keep a choice or answer that the facts on screen support when a crowd signal points the other way.
- Evidence: the 3 counted popularity tasks, 2 switching tasks and 2 opinion tasks, judged as in "Went along" above. The popularity control (no crowd cue) is reported beside it and never counted.
- Formula, the herd rate already built:

  $$r = \frac{k}{n}$$

  - $k$: herd questions where you went along (popularity, switching, opinion).
  - $n$: herd questions where going along was possible, $3 \le n \le 7$. It leaves out the control and any switching question whose first answer was already wrong.
  - $r$: the share of possible moments where you went along, from 0 to 1. Lower means more independent.

  In words: of the chances you had to follow a wrong crowd, how many you took.

- Likely range: 95% Wilson score interval, already built:

  $$\tilde p = \frac{r + \dfrac{z^2}{2n}}{1 + \dfrac{z^2}{n}}, \qquad h = \frac{z}{1 + \dfrac{z^2}{n}}\sqrt{\frac{r(1-r)}{n} + \frac{z^2}{4n^2}}, \qquad \text{range} = [\,\tilde p - h,\ \tilde p + h\,] \cap [0, 1]$$

  - $z = 1.96$: the multiplier for 95% coverage.
  - $\tilde p$: the centre of the range. It is pulled slightly toward ½, which is what keeps the range from collapsing to zero width at 0 of $n$.
  - $h$: the half-width.

  Worked example: $k = 2$, $n = 7$ gives $r = 29\%$ and a range of 8–64%. Even 0 of 7 gives 0–35%, so a clean sitting doesn't rule out going along a third of the time.
- Bands (editorial, on the counts, this sitting only):

  | Condition | Band shown |
  |---|---|
  | $n < 3$ (cannot happen with the current sets; kept as a guard) | "Too few questions to say" |
  | $k = 0$ | "Didn't go along this time" |
  | $k \ge 1$ and $r < 0.5$ | "Went along sometimes" |
  | $0.5 \le r < 1$ | "Went along more often than not" |
  | $k = n$ | "Went along every time" |

  The 0.5 line is editorial: it is where going along becomes the more common response, with no claim that it marks a trait. Reference point shown beside it, not a norm: in Asch-style line studies about 1 in 3 critical answers went along (33% in Franzen & Mader 2023: a measured figure for that task with a live group, not for ours).
- Opinion shift size, a secondary T1 line, already built:

  $$S = \frac{1}{2}\sum_{i=1}^{2}\bigl(2 - |f_i - g_i|\bigr)$$

  - $f_i$: your final rating on opinion question $i$, in scale steps 0–4.
  - $g_i$: the group position shown, always 2 steps from your first rating.
  - $S$: average steps moved toward the group, from −2 to 2. 0 means you didn't move; 2 means you moved all the way both times.

  Bands (editorial): $S \le 0$ "Didn't move toward the group"; $0 < S < 2$ "Moved part way toward the group"; $S = 2$ "Moved all the way to the group both times".

**T2. Independence from authority.** *Editorial.*
- Definition: you don't accept a claim because of an expert tag when the evidence doesn't support it.
- Evidence: the 2 authority tasks. Rating the false, expert-tagged claim "Likely" or "Very likely" counts as going along.
- Formula: $k_A \in \{0, 1, 2\}$, the number of false tagged claims rated likely. No rate and no range are shown: a rate from 2 items looks more precise than it is (1 of 2 has a 95% range of 9–91%).
- Bands (editorial): 0 "Didn't take either claim on the tag"; 1 "Took 1 of 2 claims on the tag"; 2 "Took both claims on the tag".
- Known gap: with no untagged control claims (deferred), going along can't be told apart from not knowing the fact. The wording says what happened, not why.

**T3. Reflective reasoning** (checking the first answer). *Adapted from the CRT's correct / intuitive / other coding (Frederick 2005; Thomson & Oppenheimer 2016); items and bands editorial.*
- Definition: when a quick answer arrives, you check it before giving it.
- Evidence: the 2 first-impression tasks, each coded correct, intuitive (the lure) or other.
- Formula: $k_G \in \{0,1,2\}$, the number of intuitive (lure) answers, with $c_G$, the number correct, shown beside it. Other wrong answers count toward neither.
- Bands (editorial): $k_G = 0$ "Checked your first answer both times"; $k_G = 1$ "Went with the first answer once"; $k_G = 2$ "Went with the first answer both times".
- Known gaps (docs/RESEARCH.md): the items are reworded CRT items that many people have seen (51.4% in one sample had seen at least one; Haigh 2016), and the CRT partly measures numeracy (Sinayev & Peters 2015).

**T4. Calibrated scepticism, as opposed to contrarianism.** *Deferred: defined here, not reported.*
- Definition: your agreement follows the evidence rather than the source. You go along with a crowd or an expert when they're right and not when they're wrong. A contrarian rejects both; a conformist accepts both. This is the observable side of "looks at both sides fairly before concluding".
- Why deferred: every current task has the crowd or expert wrong, so T1 and T2 only measure $b$ below. On them, a pure contrarian looks perfectly independent.
- Evidence it would need: at least 4 cue-right items (the crowd or expert is right and the facts on screen agree) and 4 cue-wrong items, mixed so they can't be told apart by look.
- Formula (borrows BSR's simple difference score, not a signal-detection model):

  $$D = a - b, \qquad B = \frac{a + b}{2} - \frac{1}{2}$$

  - $a$: share of cue-right items where you went along with the source.
  - $b$: share of cue-wrong items where you went along with the source (the herd rate $r$ is this for crowd items).
  - $D$: discrimination, from −1 to 1. High means your agreement tracks whether the source is right.
  - $B$: lean, from −½ to ½. Positive means you tend to agree whatever the evidence; negative means you tend to disagree whatever the evidence.

  Example: a contrarian has $a = 0.1$, $b = 0.1$, so $D = 0$ and $B = -0.4$. A calibrated sceptic has $a = 0.9$, $b = 0.1$, so $D = 0.8$ and $B = 0$.
- Provisional bands (editorial, not in use until the items exist): $D \ge 0.5$ "Followed the evidence more than the source"; otherwise $B \le -0.25$ "Leaned toward disagreeing whatever the evidence", $B \ge 0.25$ "Leaned toward agreeing whatever the evidence", and anything else "Mixed".
- Not measurable in a click survey: how *deeply* someone weighs both sides. Answer time is not depth, so it isn't used as a proxy.

**Disclaimer shown with results** (once, above the profile; the existing "mirror, not a measurement" line is folded into it):

> This is a mirror, not a measurement. Each line comes from 2 to 7 questions written for this survey, and none of them is a validated test. The bands are our words for your counts in this sitting, not a comparison with other people. One careless tap can change a band. It shows what you did here, not why, and not who you are.

Each trait card also carries its own one-line caveat: T1 its likely range, T2 "can't tell deferring from not knowing the fact", T3 "you may have seen puzzles like these before".

Deferred (proposals, not built):
- Showing the trait names, bands and new disclaimer in the UI. Today's results screen shows counts, the herd rate, its range and the shift size, without bands.
- T4 calibrated scepticism: cue-right items for crowd and authority (at least 4 + 4), then $D$ and $B$ on the results screen.
- Norms: any "compared with others" wording or validated bands. Needs answers from many people, so it waits for the backend-and-consent item below.
- Reliability: test–retest across question sets A, B and C, once enough attempts exist to check whether the sets are equally hard.
- Depth of reasoning (free-text reasons or similar); not measurable with the current task types.
- More sets for medium and hard, so their retakes are fresh too. Worth it only if people actually retake those levels.
- The level in share links. Links still hold only the five counts, so a friend's link doesn't say which level it came from.
- Checking that the levels really differ in difficulty. They are editorial: written to be harder, not yet measured as harder.
- Untagged control claims to estimate an authority effect within a person.
- Replacing the two first-impression puzzles, which are reworded versions of widely known CRT items (see docs/RESEARCH.md).
- Collecting answers across people (needs a backend and consent).
- Randomised task order.
- Mac app wrapper.

OPEN QUESTIONS / ASSUMPTIONS:

- Assumed the specific task content (myths, crowd questions, gut puzzles) is mine to write, checked against sources.
- Crowd percentages and expert tags are invented for the test and labelled as invented in the reveal; the facts behind them are real and cited.
- Settings: theme, motion, text size, clear history. ⌘, opens them where the browser allows, plus a gear button.
- Feedback tab opens a prefilled GitHub issue (no email, no server).
- Fixed task order, so friends' results are comparable.
- Assumed (2026-10-27) the user's answer, that thinking on your own "isn't purely contrarian: you look at both sides fairly and deeply before concluding", is a definition of a *process*. A survey only sees answers, so it is turned into an observable test (T4: does agreement follow the evidence or the source?). "Deeply" has no measure here.
- Assumed the three traits keep the existing task-to-kind mapping: popularity, switching and opinion → T1; authority → T2; first impression → T3. No task changes.
- Assumed "thinks on your own" names the whole profile and is never given a threshold of its own, since the user chose no composite.
- Assumed the bands' cut points (0, below half, half or more, all) are editorial and use "this time" wording, so no band reads as a fixed trait.
- Assumed T2 and T3 show counts only, with no rate or range, because 2 items give a range too wide to help (1 of 2 → 9–91%).
- Assumed the Asch figure is shown as a reference point beside T1, never as a cut-off.
- Assumed (levels) that "easy" is the existing three sets unchanged, and that difficulty is the same for every kind except opinion, which has no right answer: medium and hard opinion statements are on topics people have usually thought about less.
- Assumed the level choice is remembered between visits, defaults to easy, and that a resumed attempt keeps the level it started with.
- Open: whether the T4 cue-right items should be built next; it is the only way to tell a contrarian from an independent thinker.

CHANGELOG:

- 2026-10-27 — created
- 2026-10-27 — interview answers, definitions, deferred list and deliverables filled in
- 2026-10-27 — added quantitative metrics (herd rate with 95% Wilson range, opinion shift size), results over time (chart, table, export/import) and three question sets so retakes aren't primed
- 2026-10-27 — refocused on herd mentality: 8 of 12 tasks test popularity, switching and opinion shift, with an answer-alone-first step and a no-crowd control; instructions tasks dropped
- 2026-10-27 — first version built and published (PR #1); facts corrected after source check (head heat ≤10%, 2026 population figures, CIA Factbook sources replaced)
- 2026-10-27 — added Easy, Medium and Hard levels (harder facts, same scoring; 24 new fact-checked questions), a chart per level, Back on every question with the first answer locked once the crowd is shown, and a warning when an attempt can't be saved
- 2026-10-27 — defined the traits: crowd independence, independence from authority and reflective reasoning reported as a profile with no composite; calibrated scepticism vs contrarianism defined but deferred; formulas, editorial count bands, results disclaimer, and a map from each CONTEXT term to its trait
- 2026-10-27 — added docs/RESEARCH.md: cited review of CRT, CRT-2, AOT, NCS-6/18, Bullshit Receptivity and Asch conformity, plus free online tests; recommends writing our own tasks with adapted controls
- 2026-09-15 — added meta-instruction: built-out applications include a small feedback tab
- 2026-09-15 — added meta-instruction: no "Claude" attribution in commits, PRs, or branches
- 2026-09-16 — added meta-instruction: always include a README when adding to GitHub
- 2026-09-16 — changed meta-instruction: ask clarifying questions in the question widget
- 2026-09-17 — added meta-instructions: Claude never a contributor; never commit .claude/
- 2026-09-26 — compressed the meta-instructions and every field prompt; git rules moved to the global instruction file
- 2026-10-26 — added meta-instruction: choose high signal-to-noise metrics (outcomes and what lasted, not activity)
- 2026-09-27 — added meta-instruction: applications are built as a Mac app first, then a website
- 2026-09-28 — folded inputs, instructions, constraints, deliverables and done criteria into one free-form CONTEXT
- 2026-09-28 — changed meta-instruction: a README on GitHub always includes a visual
- 2026-09-28 — added meta-instruction: name things like a person would, never snake_case
- 2026-09-28 — changed meta-instruction: README leads with visuals; instructions live in a linked guide
- 2026-09-28 — changed meta-instruction: README is visuals and links; details in docs/INSTRUCTIONS.md and docs/FILE-STRUCTURE.md
- 2026-09-29 — changed meta-instruction: GitHub repo names have no "_" or "-"
- 2026-10-02 — added a DELIVERABLES field after CONTEXT
- 2026-10-02 — added meta-instruction: every project has a system design doc at docs/SYSTEM-DESIGN.md
- 2026-10-05 — added meta-instruction: applications include a settings button or tab
- 2026-10-08 — added meta-instruction: color-code tags by similarity (related share a hue family, each distinct)
- 2026-10-09 — added meta-instruction: apps that take files have an Upload button, drop anywhere, and paste
- 2026-10-17 — added meta-instruction: before building, ask the design questions an expert engineer would (data, security, caching, scale, deployment…)
- 2026-10-18 — added meta-instruction: open the MVP for me as soon as a first working version exists, and after each big change
- 2026-10-18 — added meta-instruction: always create a relevant icon for applications
- 2026-10-18 — added meta-instructions: work like a world-class founder, software engineer and (for research) scientist
- 2026-10-18 — added meta-instruction: pick my brain with open questions answered in my own words, as well as multiple choice
- 2026-10-18 — changed meta-instruction: Mac app first only when the request names no platform (from the meta report)
- 2026-10-21 — added meta-instruction: size design decisions to the project's current scale, note what changes as it grows, and keep pieces modular and replaceable
- 2026-10-18 — changed meta-instruction: the first batch of questions also covers delivery, the repo, test versus live mode, who pays, mocks, and real inputs and credentials (from the meta report)
- 2026-10-18 — added meta-instructions: nothing made up passes as fact; fill in DEFINITIONS AND DEFERRED; a clean, restrained interface with mockups and a manual review checklist (from the meta report)
- 2026-10-18 — added a DEFINITIONS AND DEFERRED section
- 2026-10-19 — changed meta-instruction: questions mostly as multiple choice (with a box for my own answer); plain-text questions only when a detailed answer is needed, at most two per round
- 2026-10-20 — added meta-instruction: make the UI/UX buttery smooth (instant response, nothing blocking the main thread, full-frame-rate motion, no flicker or jumps)
- 2026-10-21 — added meta-instruction: make equations easy to read (typeset, not raw LaTeX; symbols defined beneath; a plain-language line; short steps)
- 2026-10-23 — added meta-instruction: keep a prompt log, docs/PROMPTS.md, of every prompt given in each session
- 2026-10-23 — added meta-instruction: push back on the idea before building (why, five levels down, then what's the best way to meet the real need); no yes-manning
- 2026-10-24 — added a note on me from my portfolio site (work, values, interests, visual and writing style), to fill gaps without overriding the spec
- 2026-10-25 — changed meta-instruction: always open the app after making a build (was: after the MVP and each big change)
- 2026-10-25 — added meta-instruction: when there's a chance to do the simplest thing that still works well, do that
- 2026-10-25 — added meta-instruction: build applications through the eyes of the people who'll use them (a wide range of people, or the specific group for a narrow use case)
- 2026-10-25 — changed meta-instruction: keep the interface clean but never barren (content, helpful empty states, icons, a next step on every screen) instead of "clean and restrained"
- 2026-10-25 — added meta-instruction: think ten steps ahead before starting (design and outline the whole build, trace the next ten steps, pick the design that keeps them easy)
- 2026-10-25 — added meta-instruction: publish production apps to GitHub (everything committed and pushed, a PR for anything unmerged, no work only on this Mac)
- 2026-10-25 — added meta-instruction: push me to think for myself (what each suggestion rests on, a way to check it, my view first on my decisions), about 10% more pushback
- 2026-10-25 — added meta-instruction: explain so I learn the skill (plain idea, analogy or worked example, why and when it fails, jargon defined, a reusable principle), in replies and in the app
- 2026-10-25 — added meta-instruction: fully test on sample data (normal, edge and failure cases, end to end) before asking me to test on real data
- 2026-10-25 — added my taste profile (colour, what clean means, density, words, pictures, how I think), from my reactions to builds
- 2026-10-25 — added meta-instruction: use sub-agents when they help (parallel independent work, heavy reading, unanchored second opinions), with full briefs, and check what they return
- 2026-10-26 — added meta-instruction: ease of use and readability come first (simple but effective, reads at a glance, long text starts short), ahead of adding more
- 2026-10-26 — changed meta-instruction: research READMEs are detailed and in-depth (question, method, results against baselines, limits, reproduce); product and app READMEs stay succinct
- 2026-10-26 — changed meta-instruction: always rebuild, reinstall and reopen after every significant change (was: open the app after making a build)
- 2026-10-26 — added meta-instruction: a higher quality bar for applications (unit and UI tests kept green, hands-on use of every flow touched, trying to break it, light/dark, sizes, keyboard and accessibility, a report of what was and wasn't tested)
- 2026-10-26 — changed the note on me: what I'm after includes helping folks get out of survival mode and lean into their true, most enabled purpose
- 2026-10-26 — changed meta-instruction: the interface isn't cheesy (no gimmicky copy, forced jokes or over-the-top celebration; personality stays quiet)
