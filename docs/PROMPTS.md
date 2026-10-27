# Prompt log

## 2026-10-27 — Research existing instruments

1. "Read DoYouThinkOnYourOwn?.md in full, including the meta-instructions. Research published instruments that measure independent or critical thinking and conformity: at least the Cognitive Reflection Test (and CRT-2), the Actively Open-minded Thinking scale, Need for Cognition (short form), Bullshit Receptivity, and one conformity or obedience measure. Use a sub-agent for the wide reading if that helps. Write docs/RESEARCH.md with one short section per instrument: what it measures, item count, an example item, how it is scored, known norms if any, licence or usage terms, known weaknesses (for example, CRT items leaking online), and a citation with a link. Include nothing you could not cite, and label every estimate as an estimate. End with a one-paragraph recommendation: adopt, adapt, or write our own, and why. Also say plainly whether an existing free online test already meets the need. Do not write any app code. Done means docs/RESEARCH.md exists with cited entries and the recommendation, and the CHANGELOG in DoYouThinkOnYourOwn?.md has a dated line for it. Before starting I was asked: "If an existing free scale already answers 'do you think critically?', what would this project still need to add to be worth building?" My answer: it needs to ask specific pointed scenarios, not an existing rubric. I want to understand this work, not just have it done. As you go, explain the reasoning behind each change: the concept, the tradeoff, and what you chose against. Tell me where my answer above is wrong or incomplete. At the end, sum up what I should take away from it, and ask me one question that checks I understood why it was done this way."
   → Two research agents read the sources. Wrote docs/RESEARCH.md (six instruments, free-test check, recommendation: write our own tasks, adapt the CRT coding and the BSR/Asch control designs) and added a CHANGELOG line.

## 2026-10-27: Build the first version from the spec

1. **Prompt:** "DoYouThinkOnYourOwn?: build this project. Read DoYouThinkOnYourOwn?.md in this folder and build what it describes, following its META-INSTRUCTIONS exactly."
   **Led to:** reading the spec, then four rounds of questions before any code.

2. **Answers, round 1** (question widget): who for: "Me, as a mirror", "Friends I'd send it to"; result: "Where they defer, shown"; measurement: "Behaviour tasks"; form: "One web page".
   **Led to:** a web page, not a Mac app; behaviour tasks instead of self-report; no score.

3. **Answers, round 2:** trade-off: "Credibility"; why: "want to also test if autistic or not", "I caught myself", "Worried about others"; deception: "Hide, then reveal"; data: "Nothing leaves the device".
   **Led to:** pushback on inferring autism from the tasks; the debrief design; no server.

4. **Answers, round 3:** autism: "Separate, validated, optional" (AQ-10); length: "~5 min, 12 tasks"; layout: "One card at a time"; repo: "Public + GitHub Pages".
   **Led to:** the AQ-10 section, the card layout, the public repo.

5. **Answers, round 4:** reading an authority answer: "They deferred to authority"; instructions tasks: "'Select Agree to continue'", "Wrong pre-selected answer"; overall number: "Per-kind counts only".
   **Led to:** one more push on the causal reading.

6. **Answer, round 5:** authority wording: "Say what happened".
   **Led to:** the build: 12 tasks (4/3/2/3), facts checked by a sub-agent against primary sources, 13 unit tests, 46 UI tests, screenshots, docs, the GitHub repo.

7. **Prompt:** "Yes, add docs/RESEARCH.md to the PR and restore the research session's prompt-log entry."
   **Led to:** docs/RESEARCH.md added to PR #1; the research session's entry above restored word for word from its transcript after this session had overwritten it.

8. **Prompt:** "open this bad boy up"
   **Led to:** the survey opened in the browser pane.

9. **Prompt:** "this should really be testing if you are just following herd mentality"
   **Led to:** two rounds of questions. Herd means following popularity, adopting group opinions and copying under uncertainty, and it counts only when the crowd is wrong and the facts are on screen. Herd-first scope, answer alone then reveal, a popularity control, opinion shift toward the group. Rebuilt the 12 tasks (8 herd), scoring, screens, tests and docs.

10. **Prompt:** "*should give quantitative metrics. also store results over time"
    **Led to:** questions on which numbers, how retakes stay fair, and where results live. Answers: herd rate %, opinion shift size, a 95% range; three question sets; this browser plus export. Built the metrics with typeset formulas, two new question sets (B and C, facts checked), a results-over-time chart and table, and export/import by upload, drop and paste.

## 2026-10-27: Define the traits, formulas and bands

1. **Prompt:** "Using DoYouThinkOnYourOwn?.md and docs/RESEARCH.md if it exists, fill in the DEFINITIONS AND DEFERRED section of DoYouThinkOnYourOwn?.md. Before writing, use AskUserQuestion to ask me, with your recommendation first and 2–4 options each: how many separate traits to report (for example, independence from authority, resistance to social conformity, reflective reasoning, calibrated scepticism versus contrarianism), whether results are one score or a profile, and whether result bands use fixed cut-offs or wait for norms. Then write, for each trait: a one-line plain definition, what answers count as evidence for it, the scoring formula (typeset clearly, with every symbol defined), the result bands with their basis labelled as editorial or validated, and the disclaimer shown with results. List what is deferred. Record what you assumed under OPEN QUESTIONS / ASSUMPTIONS and add a dated CHANGELOG line. Done means every vague term in the CONTEXT line has a definition, formula and threshold, and nothing reads as validated unless it is. Before starting I was asked: "Should someone who distrusts every authority score high on 'thinks on their own', and what in your definition decides that?" My answer: whether it isnt purely contrarian (i.e. it isnt one dimensional). person is able to look at both sides, fairly and deeply, before coming up with a conclusion. I want to understand this work, not just have it done. As you go, explain the reasoning behind each change: the concept, the tradeoff, and what you chose against. Tell me where my answer above is wrong or incomplete. At the end, sum up what I should take away from it, and ask me one question that checks I understood why it was done this way."
   **Led to:** questions on traits, score shape and bands. Answers: "3 now + 1 deferred", "Profile, no composite", "Editorial count bands, labelled". The spec now defines three reported traits and one deferred trait (calibrated scepticism vs contrarianism), each with evidence, a formula, editorial bands and a caveat, plus the results disclaimer, a map from the CONTEXT terms to traits, assumptions and deferred items. No code changed.

2. **Prompt:** "open this"
   **Led to:** the spec opened in the editor at the new traits section.

3. **Prompt:** "open the site"
   **Led to:** the local build of this branch opened in the browser pane (the GitHub Pages site serves main, which doesn't have this work yet).

4. **Prompt:** "*make sure to save the result over time"
   **Led to:** confirmed every finished attempt was already saved; a failed save (storage blocked or full) now shows a warning instead of failing silently. Two UI tests added: two attempts saved across page loads, and the warning when storage is blocked. 61 tests pass.

5. **Prompt:** "Commit the working tree changes with a sensible message."
   **Led to:** two commits: the trait definitions, and the save warning with its tests.

6. **Prompt:** "also make it possible to go backwards in questions. add an easy version (this is the easy version), medium, and hard"
   **Led to:** questions on what makes a level harder, Back after the crowd is shown, how many sets, and history across levels. Answers: "Facts harder to work out", "Back, first answer locked", "1 set each for medium and hard", "Chart per level, one table". Built the level picker, 24 new questions (checked by a sub-agent, which corrected wording that overstated four sources and two mismatched cards), Back, a chart per level and a table with a Level column. Also fixed the switching reveal's key numbers, which didn't match the keys that pick them. Unit and UI tests added; all pass.
