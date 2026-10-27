// Pure judging and summarising. No DOM, so it runs in node:test too.
import { TASKS, KIND_ORDER } from './tasks.js';

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

// One answer → along / not / neither. `response` shape depends on task type:
//   rate:    { choice: 0..3, checked: bool }
//   choice:  { choice: index }
//   agree:   { choice: index }
//   default: { choice: index }
//   number:  { value: string }
export function judge(task, response) {
  if (!task || !response) return null;
  switch (task.type) {
    case 'rate':
      if (!Number.isInteger(response.choice)) return null;
      return response.choice >= task.alongFrom ? ALONG : NOT;
    case 'choice':
      if (!Number.isInteger(response.choice)) return null;
      if (response.choice === task.crowd.option) return ALONG;
      return response.choice === task.correct ? NOT : NEITHER;
    case 'agree':
      if (!Number.isInteger(response.choice)) return null;
      return response.choice === task.along ? ALONG : NOT;
    case 'default':
      if (!Number.isInteger(response.choice)) return null;
      if (response.choice === task.preselected) return ALONG;
      return response.choice === task.correct ? NOT : NEITHER;
    case 'number': {
      const n = parseNumber(response.value, task.unit);
      if (Number.isNaN(n)) return null;
      if (n === task.lure) return ALONG;
      return n === task.answer ? NOT : NEITHER;
    }
    default:
      return null;
  }
}

// Responses keyed by task id → per-kind { along, total } in KIND_ORDER.
export function summarize(responses, tasks = TASKS) {
  const out = {};
  for (const k of KIND_ORDER) out[k] = { along: 0, total: 0 };
  for (const t of tasks) {
    out[t.kind].total += 1;
    if (judge(t, responses[t.id]) === ALONG) out[t.kind].along += 1;
  }
  return out;
}

export function isComplete(responses, tasks = TASKS) {
  return tasks.every((t) => judge(t, responses[t.id]) !== null);
}

// Share links carry only the four counts: "v1.2-1-0-1" (KIND_ORDER).
export function encodeShare(summary) {
  return 'v1.' + KIND_ORDER.map((k) => summary[k].along).join('-');
}

export function decodeShare(str, tasks = TASKS) {
  if (typeof str !== 'string') return null;
  const m = str.match(/^v1\.(\d{1,2})-(\d{1,2})-(\d{1,2})-(\d{1,2})$/);
  if (!m) return null;
  const empty = summarize({}, tasks);
  const out = {};
  for (let i = 0; i < KIND_ORDER.length; i++) {
    const k = KIND_ORDER[i];
    const along = Number(m[i + 1]);
    if (along > empty[k].total) return null;
    out[k] = { along, total: empty[k].total };
  }
  return out;
}

// Plain words for a count. A count, never a level or a label.
export function countPhrase({ along, total }) {
  if (along === 0) return `Didn’t go along (0 of ${total})`;
  if (along === total) return `Went along every time (${along} of ${total})`;
  return `Went along ${along} of ${total} times`;
}
