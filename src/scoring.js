// Pure judging and summarising. No DOM, so it runs in node:test too.
import { TASKS, KIND_ORDER, HERD_KINDS, groupFor } from './tasks.js';

export const ALONG = 'along';
export const NOT = 'not';
export const NEITHER = 'neither';

// "10", "10c", " 10 cents ", "$0.10" are all fine. "$0.10" is read as dollars
// and converted only for the cents question. Returns NaN when there's no number.
export function parseNumber(raw, unit) {
  if (raw == null) return NaN;
  const s = String(raw).trim().toLowerCase().replace(/,/g, '');
  const m = s.match(/-?\d*\.?\d+/);
  if (!m) return NaN;
  let n = parseFloat(m[0]);
  if (unit === 'cents' && (s.includes('$') || (n < 1 && n > 0 && s.includes('.')))) n = Math.round(n * 100);
  return n;
}

const isIdx = (v, max) => Number.isInteger(v) && v >= 0 && v < max;

// Whether a task needs a second step (the reveal) before Next can finish it.
export function stage(task, response) {
  if (task.type !== 'switch' && task.type !== 'shift') return 'done';
  if (!response || response.first == null) return 'first';
  return response.final == null ? 'reveal' : 'done';
}

// One answer → along / not / neither, or null while unanswered.
// Response shapes by task type:
//   rate:   { choice: 0..3, checked: bool }
//   pick:   { choice: index }
//   number: { value: string }
//   switch: { first: index, final: index }
//   shift:  { first: 0..4, final: 0..4 }   (group position is groupFor(first))
export function judge(task, r) {
  if (!task || !r) return null;
  switch (task.type) {
    case 'rate':
      if (!isIdx(r.choice, task.options.length)) return null;
      return r.choice >= task.alongFrom ? ALONG : NOT;
    case 'pick':
      if (!isIdx(r.choice, task.options.length)) return null;
      if (r.choice === task.crowd.option) return ALONG;
      return r.choice === task.correct ? NOT : NEITHER;
    case 'number': {
      const n = parseNumber(r.value, task.unit);
      if (Number.isNaN(n)) return null;
      if (n === task.lure) return ALONG;
      return n === task.answer ? NOT : NEITHER;
    }
    case 'switch':
      if (!isIdx(r.first, task.options.length) || !isIdx(r.final, task.options.length)) return null;
      // Only a right first answer abandoned for the crowd's wrong one counts.
      if (r.first !== task.correct) return NEITHER;
      return r.final === task.crowd.option ? ALONG : NOT;
    case 'shift': {
      if (!isIdx(r.first, 5) || !isIdx(r.final, 5)) return null;
      const g = groupFor(r.first);
      return Math.abs(r.final - g) < Math.abs(r.first - g) ? ALONG : NOT;
    }
    default:
      return null;
  }
}

// Responses keyed by task id → per-kind { along, total } in KIND_ORDER.
// Control tasks are reported separately and never counted.
export function summarize(responses, tasks = TASKS) {
  const out = {};
  for (const k of KIND_ORDER) out[k] = { along: 0, total: 0 };
  for (const t of tasks) {
    if (t.control) continue;
    out[t.kind].total += 1;
    if (judge(t, responses[t.id]) === ALONG) out[t.kind].along += 1;
  }
  return out;
}

// The control: did they pick the better option when no crowd cue was shown?
export function controlResult(responses, tasks = TASKS) {
  const t = tasks.find((x) => x.control);
  if (!t) return null;
  const r = responses[t.id];
  if (!r || !isIdx(r.choice, t.options.length)) return null;
  return r.choice === t.correct;
}

export function isComplete(responses, tasks = TASKS) {
  return tasks.every((t) => judge(t, responses[t.id]) !== null);
}

// Share links carry only the five counts: "v2.2-1-0-1-0" (KIND_ORDER).
export function encodeShare(summary) {
  return 'v2.' + KIND_ORDER.map((k) => summary[k].along).join('-');
}

export function decodeShare(str, tasks = TASKS) {
  if (typeof str !== 'string') return null;
  const parts = str.match(/^v2\.(\d{1,2}(?:-\d{1,2})*)$/);
  if (!parts) return null;
  const nums = parts[1].split('-').map(Number);
  if (nums.length !== KIND_ORDER.length) return null;
  const empty = summarize({}, tasks);
  const out = {};
  for (let i = 0; i < KIND_ORDER.length; i++) {
    const k = KIND_ORDER[i];
    if (nums[i] > empty[k].total) return null;
    out[k] = { along: nums[i], total: empty[k].total };
  }
  return out;
}

// Plain words for a count. A count, never a level or a label.
export function countPhrase({ along, total }) {
  if (along === 0) return `Didn’t go along (0 of ${total})`;
  if (along === total) return `Went along every time (${along} of ${total})`;
  return `Went along ${along} of ${total} times`;
}

// ---------- metrics ----------

// Herd rate: went along / herd questions where going along was possible.
// "Possible" leaves out the control and any switching question whose first
// answer already matched the crowd (judged neither).
export function herdRate(responses, tasks = TASKS) {
  let along = 0;
  let possible = 0;
  for (const t of tasks) {
    if (t.control || !HERD_KINDS.includes(t.kind)) continue;
    const v = judge(t, responses[t.id]);
    if (v === ALONG || v === NOT) possible += 1;
    if (v === ALONG) along += 1;
  }
  return { along, possible, rate: possible ? along / possible : null };
}

// 95% Wilson score interval for k successes in n trials. Better than
// p ± 1.96·SE at small n: it never leaves 0–1 and isn't zero-width at 0 or n.
export function wilson(k, n, z = 1.96) {
  if (!n) return null;
  const p = k / n;
  const z2 = z * z;
  const denom = 1 + z2 / n;
  const centre = (p + z2 / (2 * n)) / denom;
  const half = (z * Math.sqrt((p * (1 - p)) / n + z2 / (4 * n * n))) / denom;
  return { low: Math.max(0, centre - half), high: Math.min(1, centre + half) };
}

// Opinion shift: average steps moved toward the group (−2 to 2). The group is
// always shown 2 steps from the first answer, so 2 means "moved all the way".
export function shiftSize(responses, tasks = TASKS) {
  const moves = [];
  for (const t of tasks) {
    if (t.type !== 'shift') continue;
    const r = responses[t.id];
    if (judge(t, r) === null) continue;
    moves.push(2 - Math.abs(r.final - groupFor(r.first)));
  }
  return moves.length ? moves.reduce((a, b) => a + b, 0) / moves.length : null;
}

// One attempt as stored in history and in export files.
export function attemptRecord(responses, set, primed, tasks = TASKS, date = new Date()) {
  const h = herdRate(responses, tasks);
  return {
    v: 3,
    date: date.toISOString(),
    set,
    primed,
    counts: summarize(responses, tasks),
    herd: { along: h.along, possible: h.possible },
    shift: shiftSize(responses, tasks),
  };
}

// Validate one attempt read from an import file; returns a clean copy or null.
export function cleanAttempt(a, tasks = TASKS) {
  if (!a || typeof a !== 'object' || a.v !== 3) return null;
  const date = new Date(a.date);
  if (Number.isNaN(date.getTime())) return null;
  if (!Number.isInteger(a.set) || a.set < 0 || a.set > 99) return null;
  const empty = summarize({}, tasks);
  const counts = {};
  for (const k of KIND_ORDER) {
    const c = a.counts && a.counts[k];
    if (!c || !Number.isInteger(c.along) || c.along < 0 || c.along > empty[k].total) return null;
    counts[k] = { along: c.along, total: empty[k].total };
  }
  const h = a.herd || {};
  if (!Number.isInteger(h.possible) || !Number.isInteger(h.along) || h.along < 0 || h.along > h.possible || h.possible > 7) return null;
  const shift = a.shift === null ? null : Number(a.shift);
  if (shift !== null && !(shift >= -2 && shift <= 2)) return null;
  return { v: 3, date: date.toISOString(), set: a.set, primed: !!a.primed, counts, herd: { along: h.along, possible: h.possible }, shift };
}

// Merge imported attempts into history, skipping any already there (same date).
export function mergeHistory(existing, incoming) {
  const seen = new Set(existing.map((a) => a.date));
  const added = [];
  for (const a of incoming) {
    if (seen.has(a.date)) continue;
    seen.add(a.date);
    added.push(a);
  }
  const merged = [...existing, ...added].sort((x, y) => x.date.localeCompare(y.date));
  return { merged, added: added.length, skipped: incoming.length - added.length };
}

// Parse an export file's text. Returns { attempts, rejected } or null if it isn't one.
export function parseExport(text) {
  let data;
  try { data = JSON.parse(text); } catch { return null; }
  if (!data || data.app !== 'DoYouThinkOnYourOwn' || !Array.isArray(data.attempts)) return null;
  const attempts = [];
  let rejected = 0;
  for (const a of data.attempts.slice(0, 500)) {
    const c = cleanAttempt(a);
    if (c) attempts.push(c); else rejected += 1;
  }
  return { attempts, rejected };
}

export const pct = (x) => `${Math.round(x * 100)}%`;
