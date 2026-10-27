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
