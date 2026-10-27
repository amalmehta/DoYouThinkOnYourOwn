import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TASKS, KINDS, KIND_ORDER, HERD_KINDS, groupFor } from '../src/tasks.js';
import { judge, stage, summarize, controlResult, isComplete, parseNumber, encodeShare, decodeShare, countPhrase, ALONG, NOT, NEITHER } from '../src/scoring.js';
import { AQ10, scoreAQ10, AQ10_CUTOFF } from '../src/aq10.js';

const byId = Object.fromEntries(TASKS.map((t) => [t.id, t]));

test('task set: 12 tasks, 8 about the herd, counted kinds 3/2/2/2/2', () => {
  assert.equal(TASKS.length, 12);
  assert.equal(new Set(TASKS.map((t) => t.id)).size, 12);
  assert.equal(TASKS.filter((t) => HERD_KINDS.includes(t.kind)).length, 8);
  const n = summarize({});
  assert.deepEqual(KIND_ORDER.map((k) => n[k].total), [3, 2, 2, 2, 2]);
  for (const t of TASKS) assert.ok(KINDS[t.kind], t.id);
  assert.equal(TASKS.filter((t) => t.control).length, 1);
});

test('every task has a twist and a truth; factual ones have sources; invented details are labelled', () => {
  for (const t of TASKS) {
    assert.ok(t.twist && t.truth, t.id);
    for (const s of t.sources) assert.match(s.url, /^https:\/\//);
    if (t.type === 'rate' || t.type === 'number' || t.type === 'switch') assert.ok(t.sources.length, `${t.id} needs a source`);
    if (['pick', 'switch', 'shift'].includes(t.type)) assert.match(t.invented, /invented/, t.id);
  }
});

test('popularity: on every herd pick the popular option is the worse one', () => {
  for (const t of TASKS.filter((t) => t.type === 'pick')) {
    assert.notEqual(t.crowd.option, t.correct, t.id);
    if (!t.control) {
      assert.ok(t.options[t.crowd.option].badge, `${t.id} popular option shows a crowd cue`);
      assert.equal(judge(t, { choice: t.crowd.option }), ALONG);
      assert.equal(judge(t, { choice: t.correct }), NOT);
    } else {
      assert.ok(t.options.every((o) => !o.badge), 'control shows no crowd cue');
    }
  }
});

test('switching: only a right first answer abandoned for the crowd counts', () => {
  const t = byId.s1;
  assert.equal(stage(t, undefined), 'first');
  assert.equal(stage(t, { first: 0 }), 'reveal');
  assert.equal(stage(t, { first: 0, final: 1 }), 'done');
  assert.equal(judge(t, { first: 0 }), null);
  assert.equal(judge(t, { first: t.correct, final: t.crowd.option }), ALONG);
  assert.equal(judge(t, { first: t.correct, final: t.correct }), NOT);
  assert.equal(judge(t, { first: t.crowd.option, final: t.crowd.option }), NEITHER);
  assert.equal(judge(t, { first: t.crowd.option, final: t.correct }), NEITHER);
});

test('switching answers are actually right', () => {
  assert.ok(80 * 0.75 < 70 * 0.9); // s1: $60 vs $63
  assert.equal(byId.s1.correct, 0);
  assert.ok(4.5 / 10 < 3 / 6); // s2: 45c vs 50c an egg
  assert.equal(byId.s2.correct, 1);
});

test('opinion: the group sits two steps from the first answer; moving toward it counts', () => {
  assert.deepEqual([0, 1, 2, 3, 4].map(groupFor), [2, 3, 4, 1, 2]);
  const t = byId.o1;
  assert.equal(judge(t, { first: 0, final: 1 }), ALONG);
  assert.equal(judge(t, { first: 0, final: 2 }), ALONG);
  assert.equal(judge(t, { first: 0, final: 0 }), NOT);
  assert.equal(judge(t, { first: 4, final: 4 }), NOT);
  assert.equal(judge(t, { first: 4, final: 3 }), ALONG);
  assert.equal(judge(t, { first: 2, final: 1 }), NOT); // moved away from the group (4)
  assert.equal(judge(t, { first: 2, final: 7 }), null);
});

test('authority: Likely or Very likely is along, regardless of checking', () => {
  const t = byId.a1;
  assert.equal(judge(t, { choice: 1, checked: true }), NOT);
  assert.equal(judge(t, { choice: 2 }), ALONG);
  assert.equal(judge(t, { checked: true }), null);
});

test('gut: lure is along, answer is not, anything else neither, junk is unanswered', () => {
  const t = byId.g2;
  assert.equal(judge(t, { value: '15' }), ALONG);
  assert.equal(judge(t, { value: '29 days' }), NOT);
  assert.equal(judge(t, { value: '30' }), NEITHER);
  assert.equal(judge(t, { value: 'abc' }), null);
  assert.equal((120 - 100) / 2, byId.g1.answer);
  assert.equal(30 - 1, byId.g2.answer);
});

test('parseNumber handles cents written many ways', () => {
  for (const s of ['10', '10c', ' 10 cents ', '$0.10', '0.10', '.1']) assert.equal(parseNumber(s, 'cents'), 10, s);
  for (const s of ['20', '$0.20', '0.2']) assert.equal(parseNumber(s, 'cents'), 20, s);
  assert.ok(Number.isNaN(parseNumber('ten', 'cents')));
  assert.ok(Number.isNaN(parseNumber(null)));
});

const ALL = {
  p1: { choice: 0 }, a1: { choice: 2 }, s1: { first: 0, final: 1 }, o1: { first: 0, final: 1 }, g1: { value: '20' },
  p2: { choice: 0 }, pc: { choice: 1 }, s2: { first: 1, final: 0 }, a2: { choice: 3 }, o2: { first: 4, final: 3 },
  p3: { choice: 0 }, g2: { value: '15' },
};

test('summarize, control and completeness over a full run', () => {
  assert.ok(isComplete(ALL));
  assert.ok(!isComplete({ ...ALL, s1: { first: 0 } }));
  const s = summarize(ALL);
  assert.deepEqual(KIND_ORDER.map((k) => s[k].along), [3, 2, 2, 2, 2]);
  assert.equal(controlResult(ALL), true);
  assert.equal(controlResult({ ...ALL, pc: { choice: 0 } }), false);
  assert.equal(controlResult({}), null);
  // The control never changes the popularity count.
  assert.deepEqual(summarize({ ...ALL, pc: { choice: 0 } }).popularity, { along: 3, total: 3 });
});

test('share links round-trip and reject malformed input', () => {
  const s = summarize(ALL);
  assert.equal(encodeShare(s), 'v2.3-2-2-2-2');
  assert.deepEqual(decodeShare('v2.3-2-2-2-2'), s);
  for (const bad of ['', 'v2.', 'v2.1-1-1-1', 'v2.4-0-0-0-0', 'v1.2-0-2-1', 'v2.a-b-c-d-e', 'v2.1-1-1-1-1-1', null, undefined, '<script>']) {
    assert.equal(decodeShare(bad), null, String(bad));
  }
});

test('count phrases say counts, not labels', () => {
  assert.equal(countPhrase({ along: 0, total: 3 }), 'Didn’t go along (0 of 3)');
  assert.equal(countPhrase({ along: 1, total: 2 }), 'Went along 1 of 2 times');
  assert.equal(countPhrase({ along: 2, total: 2 }), 'Went along every time (2 of 2)');
});

test('AQ-10 scoring follows the published key and cut-off', () => {
  assert.equal(AQ10.length, 10);
  assert.equal(AQ10_CUTOFF, 6);
  const keyed = AQ10.map((q) => (q.key === 'agree' ? 0 : 3));
  const opposite = AQ10.map((q) => (q.key === 'agree' ? 3 : 0));
  assert.deepEqual(scoreAQ10(keyed), { score: 10, max: 10, atOrAbove: true });
  assert.deepEqual(scoreAQ10(opposite), { score: 0, max: 10, atOrAbove: false });
  assert.equal(scoreAQ10(AQ10.map((q) => (q.key === 'agree' ? 1 : 2))).score, 10);
  const six = opposite.map((v, i) => (i < 6 ? keyed[i] : v));
  assert.deepEqual(scoreAQ10(six), { score: 6, max: 10, atOrAbove: true });
  assert.equal(scoreAQ10([0, 1]), null);
  assert.equal(scoreAQ10(AQ10.map(() => 7)), null);
});
