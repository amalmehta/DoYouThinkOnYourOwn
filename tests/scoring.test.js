import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TASKS, KINDS, KIND_ORDER } from '../src/tasks.js';
import { judge, summarize, isComplete, parseNumber, encodeShare, decodeShare, countPhrase, ALONG, NOT, NEITHER } from '../src/scoring.js';
import { AQ10, scoreAQ10, AQ10_CUTOFF } from '../src/aq10.js';

const byId = Object.fromEntries(TASKS.map((t) => [t.id, t]));

test('task set: 12 tasks, kinds 4/3/2/3, unique ids, every kind known', () => {
  assert.equal(TASKS.length, 12);
  assert.equal(new Set(TASKS.map((t) => t.id)).size, 12);
  const n = summarize({});
  assert.deepEqual(KIND_ORDER.map((k) => n[k].total), [4, 3, 2, 3]);
  for (const t of TASKS) assert.ok(KINDS[t.kind], t.id);
});

test('every task has a twist, a truth, and sources unless it is opinion-only', () => {
  for (const t of TASKS) {
    assert.ok(t.twist && t.truth, t.id);
    if (t.id !== 'i1') assert.ok(t.sources.length > 0, `${t.id} needs a source`);
    for (const s of t.sources) assert.match(s.url, /^https:\/\//);
  }
});

test('invented details are labelled', () => {
  for (const t of TASKS.filter((t) => t.kind === 'crowd')) assert.match(t.invented, /invented/);
  for (const t of TASKS.filter((t) => t.kind === 'authority' && t.id !== 'a4')) assert.match(t.invented, /invented/);
});

test('authority: Likely or Very likely is along, regardless of checking', () => {
  const t = byId.a1;
  assert.equal(judge(t, { choice: 0 }), NOT);
  assert.equal(judge(t, { choice: 1, checked: true }), NOT);
  assert.equal(judge(t, { choice: 2 }), ALONG);
  assert.equal(judge(t, { choice: 3, checked: true }), ALONG);
  assert.equal(judge(t, { checked: true }), null);
});

test('crowd: crowd answer is along, correct is not', () => {
  const t = byId.c1;
  assert.equal(judge(t, { choice: t.crowd.option }), ALONG);
  assert.equal(judge(t, { choice: t.correct }), NOT);
  assert.notEqual(t.crowd.option, t.correct);
});

test('instructions: agree and kept default are along', () => {
  assert.equal(judge(byId.i1, { choice: 0 }), ALONG);
  assert.equal(judge(byId.i1, { choice: 1 }), NOT);
  assert.equal(judge(byId.i2, { choice: 0 }), ALONG);
  assert.equal(judge(byId.i2, { choice: 1 }), NOT);
  assert.equal(judge(byId.i2, { choice: 2 }), NEITHER);
});

test('gut: lure is along, answer is not, anything else neither, junk is unanswered', () => {
  const t = byId.g3;
  assert.equal(judge(t, { value: '15' }), ALONG);
  assert.equal(judge(t, { value: '29 days' }), NOT);
  assert.equal(judge(t, { value: '30' }), NEITHER);
  assert.equal(judge(t, { value: 'abc' }), null);
  assert.equal(judge(t, { value: '' }), null);
});

test('parseNumber handles cents written many ways', () => {
  for (const s of ['10', '10c', ' 10 cents ', '$0.10', '0.10', '.1']) assert.equal(parseNumber(s, 'cents'), 10, s);
  for (const s of ['20', '$0.20', '0.2']) assert.equal(parseNumber(s, 'cents'), 20, s);
  assert.equal(parseNumber('1,000', 'minutes'), 1000);
  assert.ok(Number.isNaN(parseNumber('ten', 'cents')));
  assert.ok(Number.isNaN(parseNumber(null)));
  assert.equal(judge(byId.g1, { value: '$0.10' }), NOT);
  assert.equal(judge(byId.g1, { value: '0.20' }), ALONG);
});

test('the right answers to every gut task are actually right', () => {
  // pen: notebook = pen + 100, total 120 → 2·pen + 100 = 120 → pen = 10
  assert.equal((120 - 100) / 2, byId.g1.answer);
  // one printer: 1 poster per 4 minutes, so 50 printers → 50 posters in 4 minutes
  assert.equal(4, byId.g2.answer);
  // full on day 30, doubling daily → half on day 29
  assert.equal(30 - 1, byId.g3.answer);
});

test('summarize and isComplete over a full run', () => {
  const r = {
    g1: { value: '20' }, a1: { choice: 2 }, c1: { choice: 1 }, i1: { choice: 1 },
    a2: { choice: 0, checked: true }, g2: { value: '4' }, c2: { choice: 0 }, a3: { choice: 3 },
    i2: { choice: 0 }, c3: { choice: 1 }, g3: { value: '15' }, a4: { choice: 1 },
  };
  assert.ok(isComplete(r));
  assert.ok(!isComplete({ ...r, g3: { value: '' } }));
  const s = summarize(r);
  assert.deepEqual(s.authority, { along: 2, total: 4 });
  assert.deepEqual(s.crowd, { along: 1, total: 3 });
  assert.deepEqual(s.instructions, { along: 1, total: 2 });
  assert.deepEqual(s.gut, { along: 2, total: 3 });
});

test('share links round-trip and reject malformed input', () => {
  const s = { authority: { along: 2, total: 4 }, crowd: { along: 0, total: 3 }, instructions: { along: 2, total: 2 }, gut: { along: 1, total: 3 } };
  const code = encodeShare(s);
  assert.equal(code, 'v1.2-0-2-1');
  assert.deepEqual(decodeShare(code), s);
  for (const bad of ['', 'v1.', 'v1.2-0-2', 'v1.9-0-0-0', 'v2.1-1-1-1', 'v1.a-b-c-d', 'v1.1-1-1-1-1', null, undefined, '<script>']) {
    assert.equal(decodeShare(bad), null, String(bad));
  }
});

test('count phrases say counts, not labels', () => {
  assert.equal(countPhrase({ along: 0, total: 3 }), 'Didn’t go along (0 of 3)');
  assert.equal(countPhrase({ along: 2, total: 4 }), 'Went along 2 of 4 times');
  assert.equal(countPhrase({ along: 2, total: 2 }), 'Went along every time (2 of 2)');
});

test('AQ-10 scoring follows the published key and cut-off', () => {
  assert.equal(AQ10.length, 10);
  assert.equal(AQ10_CUTOFF, 6);
  // Answer every item on its keyed side → 10; the opposite side → 0.
  const keyed = AQ10.map((q) => (q.key === 'agree' ? 0 : 3));
  const opposite = AQ10.map((q) => (q.key === 'agree' ? 3 : 0));
  assert.deepEqual(scoreAQ10(keyed), { score: 10, max: 10, atOrAbove: true });
  assert.deepEqual(scoreAQ10(opposite), { score: 0, max: 10, atOrAbove: false });
  // Slightly counts the same as definitely.
  assert.equal(scoreAQ10(AQ10.map((q) => (q.key === 'agree' ? 1 : 2))).score, 10);
  // Exactly at the cut-off.
  const six = opposite.map((v, i) => (i < 6 ? keyed[i] : v));
  assert.deepEqual(scoreAQ10(six), { score: 6, max: 10, atOrAbove: true });
  assert.equal(scoreAQ10([0, 1]), null);
  assert.equal(scoreAQ10(AQ10.map(() => 7)), null);
});
