# Research: existing measures of independent thinking and conformity

**Bottom line:** none of the published instruments below, and none of the free online tests we found, shows people *the moments they went along* with an expert, a crowd, a first impression or an instruction, and then explains each one. That is what this project does. It should keep writing its own tasks, but borrow three proven design pieces: CRT-style answer coding, BSR-style control items, and Asch-style control trials. Details are in the [recommendation](#recommendation) at the end.

Researched 2026-10-27. Two research agents read the sources, and the key numbers were spot-checked against the papers.

**How sources are marked.** Facts come from the cited paper unless marked:
- *(secondary)*: taken from a review, a library page or Wikipedia that reports the paper, not from the paper itself.
- *Unverified*: no source we could reach confirms it. These are flagged rather than left out, so the gap is visible.
- *Estimate*: anything estimated is labelled as an estimate.

Example items are quoted briefly or paraphrased.

---

## 1. Cognitive Reflection Test (CRT)

- **What it measures:** whether you stop a quick, wrong first answer and check it. Frederick calls it "a simple measure of one type of cognitive ability".
- **Items:** 3.
- **Example (paraphrase):** a bat and a ball cost $1.10 together. The bat costs $1.00 more than the ball. How much is the ball? The tempting answer is 10 cents; the right one is 5 cents.
- **Scoring:** number correct, 0–3. A common second score counts the *intuitive* wrong answers (10 cents, 100 minutes, 24 days) separately from other wrong answers. Thomson & Oppenheimer (2016) use this correct / intuitive / other coding.
- **Norms:** across 3,428 people in 35 studies, the mean was 1.24 of 3. Study means ranged from 0.57 to 2.18, and 17% got all three right (Frederick's data, as reported by Haigh 2016).
  - The top sample was MIT at 2.18 *(secondary)*.
  - Men score higher. A meta-analysis of 89 samples (N = 59,822) found a corrected δ = 0.47, which the authors call small. On verbal reflection tests the gap is much smaller, δ = 0.13 (Otero et al. 2024).
- **Licence:** the article is free to read on the AEA site. We found no explicit licence for the items. They are public and very widely reproduced.
- **Known weaknesses:**
  - *Leakage.* In one online sample, 51.4% had seen at least one item before, from:
    - earlier studies (33.3%),
    - media (30.6%),
    - school (22.2%).

    People who had seen an item scored 2.36 vs 1.48, d = 0.81 (Haigh 2016). On MTurk, 63–94% had seen the items (Thomson & Oppenheimer 2016).
  - *But exposure may matter less than it looks.* Some of the gap is who gets exposed: familiar people were younger and more educated, and education explained more of the score than prior exposure did (Stieger & Reips 2016). Over 14,053 respondents who took the test up to 25 times, scores rose only about 0.024 items per exposure, and validity held (Meyer, Zhou & Frederick 2018; also Bialek & Pennycook 2018). The fair reading: exposure raises scores and makes the test easy to spot, but the score keeps much of its predictive meaning.
  - *Numeracy confound.* Numeric ability, not reflection, explained the CRT's links to decision outcomes (Sinayev & Peters 2015).
  - *Coarse scores.* Three items give a 0–3 range, with ceiling effects in exposed or elite samples (Haigh 2016).
- **Relevance to us:** our three Gut tasks (notebook and pen, printers, moss on a pond, in [src/tasks.js](../src/tasks.js)) are re-skinned versions of these exact three items. Changing the numbers does not hide the structure from anyone who knows the bat-and-ball problem.
- **Citations:**
  - Frederick, S. (2005). Cognitive reflection and decision making. *Journal of Economic Perspectives*, 19(4), 25–42. https://doi.org/10.1257/089533005775196732
  - Haigh, M. (2016). Has the standard cognitive reflection test become a victim of its own success? *Advances in Cognitive Psychology*, 12(3), 145–149. https://doi.org/10.5709/acp-0193-5 (full text: https://pmc.ncbi.nlm.nih.gov/articles/PMC5225989)
  - Stieger, S., & Reips, U.-D. (2016). *PeerJ*, 4, e2395. https://doi.org/10.7717/peerj.2395 *(numbers from the abstract as reported in indexes; the PeerJ page could not be fetched)*
  - Meyer, A., Zhou, E., & Frederick, S. (2018). The non-effects of repeated exposure to the Cognitive Reflection Test. *Judgment and Decision Making*, 13(3), 246–259. https://doi.org/10.1017/S1930297500007683
  - Bialek, M., & Pennycook, G. (2018). The cognitive reflection test is robust to multiple exposures. *Behavior Research Methods*, 50(5), 1953–1959. https://doi.org/10.3758/s13428-017-0963-x
  - Sinayev, A., & Peters, E. (2015). Cognitive reflection vs. calculation in decision making. *Frontiers in Psychology*, 6, 532. https://doi.org/10.3389/fpsyg.2015.00532
  - Otero, I., et al. (2024). *Journal of Intelligence*, 12(4), 39. https://doi.org/10.3390/jintelligence12040039

## 2. CRT-2 (and the 7-item CRT)

- **What it measures:** the same thing as the CRT, using verbal trick questions with less arithmetic.
- **Items:** 4.
- **Example (paraphrase):** you pass the person in second place in a race. What place are you in now? The tempting answer is first; the right one is second.
- **Scoring:** 0–4 correct, plus the correct / intuitive / other coding. *Typo warning:* for the "Emily's father" item, the paper lists "June" as the intuitive answer in one place and "July" in its coding rule. Check the paper before copying the key.
- **Norms:** only small samples (200 MTurk workers; 134 UCLA students who finished). Students got 56.2% of CRT-2 answers right vs 46.3% on the original CRT. No population norms.
- **Licence:** open access in *JDM*. The article page says CC BY 3.0; Cambridge's metadata lists CC BY-NC-ND 3.0. Check before reusing items commercially.
- **Known weaknesses:**
  - Reliability is low (α = 0.511, which the authors call "somewhat low"), and no test–retest reliability is reported.
  - These items are old riddles too, so they are likely familiar. *(Estimate: no exposure study of CRT-2 was found.)*
- **7-item extension:** Toplak, West & Stanovich (2014) add 4 items to the original 3. The new items correlate .58 with the originals, and all seven together have reliability .72 *(abstract via search; paper is paywalled; item wording not seen)*.
- **Citations:**
  - Thomson, K. S., & Oppenheimer, D. M. (2016). Investigating an alternate form of the cognitive reflection test. *Judgment and Decision Making*, 11(1), 99–113. https://doi.org/10.1017/S1930297500007622
  - Toplak, M. E., West, R. F., & Stanovich, K. E. (2014). Assessing miserly information processing. *Thinking & Reasoning*, 20(2), 147–168. https://doi.org/10.1080/13546783.2013.844729

## 3. Actively Open-minded Thinking (AOT)

- **What it measures:** how much you *say* you value looking for evidence against your own view, changing your mind, and holding confidence that fits the evidence. It is self-report, so it measures stated attitudes, not behaviour.
- **Items:** depends on the version.
  - The classic long form has 41 items (Stanovich & West 2007), which a review describes as "much used".
  - A widely cited short form has 7 items (Haran, Ritov & Mellers 2013).
  - Stanovich & Toplak (2023) now recommend a 13-item version.
  - Baron's site lists an 11-item version dated Dec 2021 *(secondary: search snippet; the page could not be fetched)*.

  No source says which version is used most.
- **Example (Haran et al., reverse-scored):** "Changing your mind is a sign of weakness."
- **Scoring:** agreement ratings (7-point in Haran et al.; 6-point with no midpoint in the 2023 version). Reverse-score the dogmatic items. A higher score means more open-minded. Haran et al. do not say whether to sum or average.
- **Norms:** none found for the general population. The 2023 version reports α = .84.
- **Licence:** the source papers are open access (Haran 2013 CC BY 3.0; Stanovich & Toplak 2023 CC BY 4.0). We found no separate licence for the items themselves.
- **Known weaknesses** (all from Stanovich & Toplak 2023):
  - *Religion and politics leak in.* Items about revising "beliefs" get read as being about religious faith. Changing "belief" to "opinion" cut the correlation with religiosity from −.42 to −.20.
  - *Self-report.* People picture beliefs that are easy to change. AOT scores often fail to predict whether someone actually avoids myside bias, which the authors call "disconcerting".
  - *Socially desirable.* Everyone wants to look open-minded, and agreeing costs nothing.
- **Citations:**
  - Haran, U., Ritov, I., & Mellers, B. A. (2013). The role of actively open-minded thinking in information acquisition, accuracy, and calibration. *Judgment and Decision Making*, 8(3), 188–201. https://doi.org/10.1017/S1930297500005921
  - Stanovich, K. E., & Toplak, M. E. (2023). Actively open-minded thinking and its measurement. *Journal of Intelligence*, 11(2), 27. https://doi.org/10.3390/jintelligence11020027
  - Baron, J. (2019). Actively open-minded thinking in politics. *Cognition*, 188, 8–18. https://doi.org/10.1016/j.cognition.2018.10.004

## 4. Need for Cognition, short forms (NCS-18, NCS-6)

- **What it measures:** how much you *say* you enjoy effortful thinking. It is self-report.
- **Items:** 18 (Cacioppo, Petty & Kao 1984) or 6 (Coelho, Hanel & Wolf 2020).
- **Example:** "I would prefer complex to simple problems."
- **Scoring:**
  - NCS-18 originally used a 9-point scale (+4 to −4), summed to a range of −72 to +72. Nine of the 18 items are reverse-keyed: 3, 4, 5, 7, 8, 9, 12, 16, 17.
  - NCS-6 uses a 5-point scale (1 = extremely uncharacteristic of me, 5 = extremely characteristic of me). Two items are reversed: "Thinking is not my idea of fun" and the "little thought" item.
- **Norms:**
  - NCS-6: α = .90 (US, MTurk) and .86 (UK, Prolific), N = 1,596 in total. It takes a mean of 43 s, vs 115 s for the NCS-18.
  - Mean scores of 3.58 (UK) and 3.68 (US) on the 1–5 scale are reported by PsyToolkit *(secondary; not found in the paper's text)*.
- **Licence:**
  - NCS-6 paper: CC BY 4.0.
  - NCS-18: the article is © Taylor & Francis. A third-party page says the authors allow free use for "nonprofit educational use only" *(secondary, not a statement from the authors or publisher)*.
- **Known weaknesses:**
  - It measures *liking* thinking, not *doing it well* or *doing it independently*.
  - Self-report and socially desirable, like AOT.
- **Citations:**
  - Cacioppo, J. T., Petty, R. E., & Kao, C. F. (1984). The efficient assessment of need for cognition. *Journal of Personality Assessment*, 48(3), 306–307. https://doi.org/10.1207/s15327752jpa4803_13
  - Lins de Holanda Coelho, G., Hanel, P. H. P., & Wolf, L. J. (2020). The very efficient assessment of need for cognition. *Assessment*, 27(8), 1870–1885. https://doi.org/10.1177/1073191118793208
  - NCS-18 use terms *(secondary)*: https://centerofinquiry.org/?p=2134. Ready-made NCS-6: https://www.psytoolkit.org/survey-library/need-for-cognition-ncs6.html

## 5. Bullshit Receptivity (BSR)

- **What it measures:** how profound you rate statements that sound deep but were built by randomly stringing buzzwords together.
- **Items:** 10 in Studies 1 and 4; Studies 2 and 3 used 20. Some studies add control items:
  - motivational quotes that do have a meaning,
  - mundane statements.
- **Example:** "Hidden meaning transforms unparalleled abstract beauty."
- **Scoring:** each item is rated 1 (not at all profound) to 5 (very profound), and BSR is the mean.
  - "Bullshit sensitivity" is a difference score: the mean for motivational quotes minus the BSR mean. In plain words: do you tell real meaning from fake meaning, or rate everything as deep?
  - This is a simple difference, not a formal signal-detection measure.
- **Norms (study means, not population norms):**

  | Study | BSR mean | α | Motivational mean | Mundane mean |
  |---|---|---|---|---|
  | 1 | 2.6 | .82 | not used | not used |
  | 3 | 2.72 | not reported for BSR alone | 3.05 | 1.44 |
  | 4 | 2.29 | .89 | 3.13 | not used |
- **Licence:** open access in *JDM*. The article page says CC BY 3.0; Cambridge's metadata lists CC BY-NC-ND 3.0.
- **Known weaknesses:**
  - *Begs the question.* Dalton (2016) argues the label "bullshit" assumes the verdict, since a random sentence can still feel profound to a reader. Pennycook et al. replied that bullshit is defined by how it was made (indifference to truth), not how it is received.
  - *Yes-saying.* A high score mixes up "can't tell" with "rates everything highly". Acquiescence correlated r = .18 with BSR, but controlling for it did not change the results (Evans, Sleegers & Mlakar 2020).
  - We found no published signal-detection analysis of BSR.
- **Relevance to us:** BSR shows why a control item matters. Without the motivational quotes, a high score can't separate "fooled" from "generous rater". Our Authority tasks have the same problem (see the recommendation).
- **Citations:**
  - Pennycook, G., Cheyne, J. A., Barr, N., Koehler, D. J., & Fugelsang, J. A. (2015). On the reception and detection of pseudo-profound bullshit. *Judgment and Decision Making*, 10(6), 549–563. https://doi.org/10.1017/S1930297500006999
  - Dalton, C. (2016). Bullshit for you; transcendence for me. *JDM*, 11(1), 121–122. https://doi.org/10.1017/S1930297500007646. Reply: https://doi.org/10.1017/S1930297500007658
  - Evans, A., Sleegers, W., & Mlakar, Ž. (2020). Individual differences in receptivity to scientific bullshit. *JDM*, 15(3), 401–412. https://doi.org/10.1017/S1930297500007191

## 6. Conformity: Asch line-judgement paradigm (with Milgram and a self-report scale)

- **What it measures:** whether you give an answer you can see is wrong because everyone around you gave it. It measures behaviour, not self-report.
- **Items:** in the 1951 version, 18 trials of matching a line to one of three others. On 12 of them (the "critical" trials), the confederates all give the same wrong answer *(secondary)*.
- **Example:** which of lines A, B, C matches the standard line? The answer is obvious when you are alone.
- **Scoring:** the number of critical trials on which you gave the majority's wrong answer. Group results are reported as the share of critical trials that conformed.
- **Norms:**
  - *Original (secondary):* about 35.7% of critical answers conformed (36.8% in the 1956 report), and about 74% of people conformed at least once. With no group pressure, errors were under 1%. One honest ally cut conformity to about 5%.
  - *Modern in-person replication* (Bern, N = 202): 33%, falling to 25% when correct answers were paid (Franzen & Mader 2023).
  - *Meta-analysis:* 133 studies in 17 countries. Conformity declined over time in the US and was higher in collectivist cultures *(secondary; full text not read)*.
- **Licence:** Asch's paradigm is a method, not a copyrighted item set. The 1956 monograph is © APA.
- **Known weaknesses:**
  - It relies on deception and needs a debrief.
  - Online versions face the "are these bots?" problem. People who suspected the confederates were excluded in the replication. We found no study measuring suspicion in online versions.
  - It needs a live group, or a convincing fake one.
- **Obedience (Milgram 1963):** 26 of 40 participants went to the maximum shock *(secondary; the scan could not be read)*. The ethics were challenged by Baumrind (1964). Burger (2009) ran a modern partial replication. It cannot be run as a web survey.
- **Self-report alternative:** the Conformity Scale (Mehrabian & Stefl 1995).
  - Its abstract says it correlates strongly and negatively with dominance.
  - © 1995, All Rights Reserved, with no free-use statement found.
  - *Unverified:* the item count (often given as 11), because the full text is paywalled.
- **Citations:**
  - Asch, S. E. (1956). Studies of independence and conformity: I. A minority of one against a unanimous majority. *Psychological Monographs*, 70(9), 1–70. https://doi.org/10.1037/h0093718
  - Secondary summary of the figures: https://en.wikipedia.org/wiki/Asch_conformity_experiments
  - Franzen, A., & Mader, S. (2023). *PLOS ONE*. https://doi.org/10.1371/journal.pone.0294325
  - Bond, R., & Smith, P. B. (1996). Culture and conformity. *Psychological Bulletin*, 119(1), 111–137. https://doi.org/10.1037/0033-2909.119.1.111
  - Milgram, S. (1963). Behavioral study of obedience. *Journal of Abnormal and Social Psychology*, 67(4), 371–378. https://doi.org/10.1037/h0040525
  - Baumrind, D. (1964). https://doi.org/10.1037/h0040128
  - Burger, J. M. (2009). Replicating Milgram. https://doi.org/10.1037/a0010932
  - Mehrabian, A., & Stefl, C. A. (1995). *Social Behavior and Personality*, 23(3), 253–263. https://doi.org/10.2224/sbp.1995.23.3.253

---

## Does a free online test already meet the need?

**No, not for this project's need.** No free test we found combines authority, crowd, first-impression and instruction cues in one sitting, and shows each moment you went along with an explanation. Some come close on one piece:

| Test | What it covers | Why it falls short here |
|---|---|---|
| Free online CRT, e.g. [HKU](https://philosophy.hku.hk/think/critical/CRT.php) | The Gut kind only | Leaked items; no other kinds |
| [Bad News](https://www.getbadnews.com/) ([Roozenbeek & van der Linden 2019](https://doi.org/10.1057/s41599-019-0279-9)) | The closest *format*: free, scenario-based, feedback as you go | Teaches misinformation tactics; doesn't measure going along |
| [MIST](https://yourmist.streamlit.app/) ([Maertens et al. 2023](https://doi.org/10.3758/s13428-023-02124-2)) | Validated, 20 headlines; separates discernment from bias | Feedback comes only at the end; about misinformation, not conformity |
| Clearer Thinking, ["How Other People Can Make You Irrational"](https://programs.clearerthinking.org/social_biases.html) | Free and on the right topic | *Unchecked:* the page renders with JavaScript, so we couldn't see its format or whether it uses a validated scale |
| IDRlabs, Psychology Today | General personality quizzes | No conformity or critical-thinking test found |

One gap remains. The Clearer Thinking tool is the one real candidate we couldn't inspect. Taking it yourself (about 10 minutes, *estimate*) is the cheapest way to confirm the "no" above.

---

## Recommendation

**Write our own tasks, but adapt the proven designs inside them, and adopt nothing wholesale.**

- **Why not adopt.**
  - The validated scales either measure self-report attitudes (AOT, NCS) or a single kind of going along (CRT, BSR, Asch).
  - Self-report is the wrong tool for a mirror. Everyone says they value changing their mind, and the AOT authors themselves find scores often fail to predict behaviour.
  - Adopting the CRT also imports its leakage. Our Gut tasks are already near-copies of the three most famous items in the field.
- **Why not write purely from scratch either.** These instruments solved problems we have:
  - **CRT's correct / intuitive / other coding** is already our Gut rule. Keep it, and cite it.
  - **BSR's control items** (meaningful quotes beside meaningless ones) separate "fooled" from "rates everything high". The equivalent for us is the deferred "untagged control claims". Without them, rating an expert-tagged false claim "Likely" could just mean the person didn't know the fact, not that they deferred to the expert.
  - **Asch's control trials** (under 1% errors alone, about a third under pressure) are what make the conformity number mean something. Our Crowd tasks need questions people get right without the fake majority, or the "went along" count mixes ignorance with conformity.
  - **Debriefing**, as Asch and Milgram show, is required whenever there's deception. The spec already has it.
- **Proposals, not built** (per the spec's no-scope-creep rule):
  1. Replace the three CRT isomorphs with new structures or CRT-2-style verbal items.
  2. Add a one-tap "seen this before?" after each Gut task, as Haigh recommends.
  3. Promote untagged control claims from Deferred to v1.

  Stays as is: the results labelled "illustrative, not diagnostic" — 2–4 tasks per kind is far below any validated instrument.
