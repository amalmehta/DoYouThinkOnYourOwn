// Pure judging and summarising. No DOM, so it runs in node:test too.
import { TASKS, KIND_ORDER, groupFor } from './tasks.js';

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
