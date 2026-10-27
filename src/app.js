// Screens and state. All content comes from tasks.js / aq10.js; all judging
// from scoring.js. Nothing here talks to a network.
import { tasksFor, LEVELS, LEVEL_ORDER, levelOf, KINDS, KIND_ORDER, HERD_KINDS, AGREE5, groupFor } from './tasks.js';
import { judge, stage, summarize, controlResult, encodeShare, decodeShare, countPhrase, herdRate, wilson, shiftSize, attemptRecord, mergeHistory, parseExport, pct } from './scoring.js';
import { renderTrend, renderTable, renderMath, wireTrend, wireMath } from './charts.js';
import { AQ10, AQ10_OPTIONS, AQ10_CUTOFF, scoreAQ10 } from './aq10.js';
import { load, save } from './store.js';

const main = document.getElementById('main');
const settingsDialog = document.getElementById('settings');
const toastEl = document.getElementById('toast');

const fresh = () => ({ screen: 'intro', i: 0, set: 0, level: levelOf(load('level', 'easy')), responses: {}, aq: [], aqI: 0, shared: null });
// The question set for this attempt, counted per level: below the level's set
// count it's fresh; at or above it repeats a set and is primed.
const cur = () => tasksFor(state.set, state.level);
const isPrimed = () => state.set >= LEVELS[state.level].sets.length;
const getHistory = () => load('history', []).filter((h) => h && h.v === 3).map((h) => ({ ...h, level: levelOf(h.level) }));
const attemptsAt = (level) => getHistory().filter((h) => h.level === level).length;
let state = fresh();
let settings = { theme: 'system', text: 'default', motion: 'system', ...load('settings', {}) };

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// ---------- small pictures ----------
const ICONS = {
  clock: '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  lock: '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>',
  twist: '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h11l-3-3M20 16H9l3 3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  search: '<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m16 16 4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  down: '<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  up: '<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15V4m0 0-4 4m4-4 4 4M5 20h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  link: '<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
};
const heroArt = '<img class="hero-art" src="assets/icon.svg" alt="">';

// ---------- render plumbing ----------
function render() {
  const html = {
    intro: renderIntro, task: renderTask, results: renderResults, shared: renderShared,
    aqIntro: renderAqIntro, aq: renderAq, aqResult: renderAqResult,
  }[state.screen]();
  main.innerHTML = `<section class="screen">${html}</section>`;
  const focusEl = main.querySelector('#num') || main.querySelector('[data-focus]');
  if (focusEl) focusEl.focus({ preventScroll: true });
  window.scrollTo({ top: 0 });
  if (state.screen === 'task') syncNext();
  wireTrend(main);
  wireMath(main);
}

function go(screen, patch = {}) {
  Object.assign(state, patch, { screen });
  render();
}

// ---------- intro ----------
function renderIntro() {
  const progress = loadProgress();
  const canResume = progress && progress.i < 12 && Object.keys(progress.responses || {}).length > 0;
  const history = getHistory();
  return `
  <div class="card hero">
    ${heroArt}
    <h1 tabindex="-1" data-focus>Do you think on your own?</h1>
    <p class="lede">Twelve short questions, most of them about what other people chose. At the end you’ll see each moment you followed the herd, and what was really going on.</p>
    <ul class="facts">
      <li>${ICONS.clock}<span>About 5 minutes. One question at a time.</span></li>
      <li>${ICONS.twist}<span>Some questions hide a twist. Every one is explained at the end.</span></li>
      <li>${ICONS.lock}<span>Nothing leaves this device. No account, no tracking.</span></li>
    </ul>
    <fieldset class="levels"><legend class="ask">Level</legend>
      ${LEVEL_ORDER.map((l) => `<label class="opt"><input type="radio" name="level" value="${l}" ${state.level === l ? 'checked' : ''}><span class="dot"></span><span class="opt-body"><span class="pick-name">${LEVELS[l].name}</span><span class="pick-lines">${esc(LEVELS[l].blurb)}</span></span></label>`).join('')}
    </fieldset>
    <div class="row">
      ${canResume
        ? `<button class="btn" data-action="resume">Resume ${LEVELS[progress.level].name.toLowerCase()} at ${progress.i + 1} of 12 <span class="kbd" aria-hidden="true">↵</span></button>
           <button class="btn ghost" data-action="start">Start over</button>`
        : `<button class="btn" data-action="start">Start <span class="kbd" aria-hidden="true">↵</span></button>`}
    </div>
  </div>
  ${renderHistory(history, 'intro', state.level)}`;
}

// Past attempts: a chart for one level once it has two, a table of every
// attempt, plus export and import.
function renderHistory(history, where, level) {
  const L = LEVELS[level];
  const name = L.name.toLowerCase();
  const mine = history.filter((a) => a.level === level);
  const left = Math.max(0, L.sets.length - mine.length);
  const fresh = left
    ? `Your next ${name} attempt uses a fresh set of questions${L.sets.length > 1 && left < L.sets.length ? `, so it compares fairly with this one. ${left} fresh set${left === 1 ? '' : 's'} left.` : '.'}`
    : `You\u2019ve used ${L.sets.length === 1 ? 'the' : `all ${L.sets.length}`} ${name} question set${L.sets.length === 1 ? '' : 's'}. Further ${name} attempts repeat questions and are marked primed.`;
  const tools = `
    <div class="row data-tools">
      <button class="btn ghost small" data-action="export" ${history.length ? '' : 'disabled'}>${ICONS.down} Export</button>
      <button class="btn ghost small" data-action="import">${ICONS.up} Import</button>
      <span class="quiet">or drop or paste a results file anywhere</span>
    </div>`;
  if (!history.length) {
    return where === 'intro' ? `<div class="history quiet-block">${tools}</div>` : '';
  }
  const body = mine.length >= 2
    ? renderTrend(mine)
    : mine.length === 1
      ? `<p class="quiet">${where === 'intro' ? `One ${name} attempt so far: herd rate ${pct(mine[0].herd.along / mine[0].herd.possible)}.` : `This is your first ${name} attempt.`} Take it again later and the chart of your ${name} results over time appears here.</p>`
      : `<p class="quiet">No ${name} attempts yet.</p>`;
  const levelsUsed = new Set(history.map((a) => a.level)).size;
  return `
  <div class="history">
    <h2>Your results over time</h2>
    ${levelsUsed > 1 || level !== 'easy' ? `<p class="quiet">Showing ${name}. Each level has its own chart, because a herd rate on harder questions isn\u2019t comparable with one on easier questions.</p>` : ''}
    ${body}
    ${history.length >= 2 ? renderTable(history) : ''}
    <p class="quiet">${fresh}</p>
    ${tools}
  </div>`;
}

// ---------- tasks ----------
// The number shown is the key that picks it: its place on screen, which can
// differ from the option's index (the switching reveal lists Keep first).
const radio = (i, checked, inner, key = i + 1) => `
  <label class="opt"><input type="radio" name="opt" value="${i}" ${checked ? 'checked' : ''}><span class="dot"></span><span class="opt-body">${inner}</span>${key ? `<span class="num" aria-hidden="true">${key}</span>` : ''}</label>`;

function pickOption(o) {
  return `<span class="pick-name">${esc(o.name)}</span><span class="pick-lines">${o.lines.map(esc).join(' · ')}</span>${o.badge ? `<span class="badge">${esc(o.badge)}</span>` : ''}`;
}

function scale(selected, marks = {}) {
  return `<fieldset class="options scale5"><legend class="sr-only">Agreement</legend>
    ${AGREE5.map((label, i) => radio(i, selected === i, `${esc(label)}${marks[i] ? `<span class="mark">${esc(marks[i])}</span>` : ''}`)).join('')}
  </fieldset>`;
}

function renderTask() {
  const t = cur()[state.i];
  const r = state.responses[t.id] || {};
  const st = stage(t, r);
  const n = state.i + 1;
  const total = cur().length;
  const pct = (state.i / total) * 100;
  let body = '';

  if (t.type === 'rate') {
    body = `
      <p class="tag">${esc(t.tag)}</p>
      <h2 class="claim" tabindex="-1" data-focus>${esc(cap(t.claim))}</h2>
      <fieldset class="options"><legend class="ask">${esc(t.ask)}</legend>
        ${t.options.map((o, i) => radio(i, r.choice === i, esc(o))).join('')}
      </fieldset>
      ${r.checked ? `<div class="source-panel"><b>What the research says.</b> ${esc(t.check)}</div>` : ''}`;
  } else if (t.type === 'pick') {
    body = `
      <h2 class="claim" tabindex="-1" data-focus>${esc(t.prompt)}</h2>
      <fieldset class="options two picks"><legend class="sr-only">${esc(t.prompt)}</legend>
        ${t.options.map((o, i) => radio(i, r.choice === i, pickOption(o))).join('')}
      </fieldset>`;
  } else if (t.type === 'switch') {
    if (st === 'first') {
      body = `
        <h2 class="claim" tabindex="-1" data-focus>${esc(t.prompt)}</h2>
        <fieldset class="options two"><legend class="ask">${esc(t.ask)}</legend>
          ${t.options.map((o, i) => radio(i, r.draft === i, esc(o))).join('')}
        </fieldset>`;
    } else {
      const other = 1 - r.first;
      const crowdName = t.options[t.crowd.option];
      body = `
        <p class="tag">${esc(t.prompt)} ${esc(t.ask)}</p>
        <p class="yours">You chose <b>${esc(t.options[r.first])}</b>. <span class="quiet">Locked now that you\u2019ve seen what others chose.</span></p>
        <div class="crowd" tabindex="-1" data-focus><span>${t.crowd.pct}% of people who answered chose ${esc(crowdName)}.</span><div class="track"><div class="fill" style="width:${t.crowd.pct}%"></div></div></div>
        <fieldset class="options two"><legend class="ask">Your final answer?</legend>
          ${radio(r.first, r.final === r.first, `Keep ${esc(t.options[r.first])}`, 1)}
          ${radio(other, r.final === other, `Change to ${esc(t.options[other])}`, 2)}
        </fieldset>`;
    }
  } else if (t.type === 'shift') {
    if (st === 'first') {
      body = `
        <h2 class="claim" tabindex="-1" data-focus>${esc(t.statement)}</h2>
        <p class="ask">${esc(t.ask)}</p>
        ${scale(r.draft)}`;
    } else {
      const g = groupFor(r.first);
      const marks = { [r.first]: 'your answer', [g]: 'most people' };
      body = `
        <p class="tag">${esc(t.statement)}</p>
        <div class="crowd" tabindex="-1" data-focus><span>Most people who answered said <b>${esc(AGREE5[g])}</b>. You said ${esc(AGREE5[r.first])}, which is now locked.</span></div>
        <p class="ask">Where do you land now?</p>
        ${scale(r.final, marks)}`;
    }
  } else if (t.type === 'number') {
    body = `
      <h2 class="claim" id="num-prompt">${esc(t.prompt)}</h2>
      <label class="ask" for="num">${esc(t.ask)}</label>
      <div class="numfield"><input id="num" name="num" type="text" inputmode="decimal" autocomplete="off" maxlength="12" value="${esc(r.value ?? '')}" aria-describedby="num-prompt num-unit"><span id="num-unit" class="quiet">${esc(t.unit)}</span></div>`;
  }

  const last = n === total && st !== 'first';
  return `
  <div class="card">
    <div class="progress" aria-label="Question ${n} of ${total}, ${LEVELS[state.level].name.toLowerCase()} level"><div class="track"><div class="fill" style="width:${pct}%"></div></div><span>${n} of ${total}</span></div>
    <div class="stack">${body}</div>
    <div class="task-foot">
      <button class="btn link" data-action="back" ${state.i === 0 ? 'disabled' : ''}>Back</button>
      ${t.type === 'rate' && !r.checked ? `<button class="btn ghost" data-action="check">${ICONS.search} Check the source</button>` : ''}
      <span class="spacer"></span>
      <button class="btn" data-action="next" id="next">${last ? 'See results' : 'Next'} <span class="kbd" aria-hidden="true">↵</span></button>
    </div>
  </div>`;
}

function metricsBlock() {
  const h = herdRate(state.responses, cur());
  if (!h.possible) return '';
  const range = wilson(h.along, h.possible);
  const shift = shiftSize(state.responses, cur());
  const primed = isPrimed();
  return `
    <div class="metric">
      <div class="metric-main">
        <span class="hero-num">${pct(h.rate)}</span>
        <span><b>Herd rate.</b> You went along on ${h.along} of the ${h.possible} herd questions where it was possible.</span>
      </div>
      <p class="quiet">Likely range ${pct(range.low)}\u2013${pct(range.high)} (95%). That\u2019s wide because ${h.possible} questions is a small sample.</p>
      ${shift === null ? '' : `<p><b>Opinion shift:</b> ${shift > 0 ? `moved ${shift.toFixed(1)} step${shift === 1 ? '' : 's'} toward the group on average, out of 2` : shift < 0 ? `moved ${Math.abs(shift).toFixed(1)} away from the group on average` : 'stayed where you were'}.</p>`}
      ${primed ? '<p class="invented">These were questions you\u2019d seen before, so this attempt is primed and marked that way in your history.</p>' : ''}
      ${renderMath(h, range, shift)}
    </div>`;
}

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function canAdvance(t, r) {
  if (stage(t, r) === 'first') return r != null && r.draft != null;
  return judge(t, r) !== null;
}

function syncNext() {
  const t = cur()[state.i];
  const btn = document.getElementById('next');
  if (btn) btn.disabled = !canAdvance(t, state.responses[t.id]);
}

// Progress from an older question set is ignored rather than resumed into the wrong questions.
function loadProgress() {
  const p = load('progress', null);
  return p && p.v === 3 && Number.isInteger(p.set) ? { ...p, level: levelOf(p.level) } : null;
}

function saveProgress() {
  save('progress', { v: 3, level: state.level, set: state.set, i: state.i, responses: state.responses });
}

// Back always goes to the previous question. A two-step answer whose crowd was
// already shown keeps its locked first answer; only the second step can change.
function back() {
  if (state.i === 0) return;
  state.i -= 1;
  saveProgress();
  render();
}

function next() {
  const t = cur()[state.i];
  const r = state.responses[t.id];
  if (!canAdvance(t, r)) return;
  if (stage(t, r) === 'first') {
    // Lock the first answer, then show what the group chose.
    state.responses[t.id] = { first: r.draft };
    saveProgress();
    render();
    return;
  }
  if (state.i < cur().length - 1) {
    state.i += 1;
    saveProgress();
    render();
    return;
  }
  const history = getHistory();
  history.push(attemptRecord(state.responses, state.set % LEVELS[state.level].sets.length, isPrimed(), cur(), new Date(), state.level));
  const saved = save('history', history.slice(-200));
  save('progress', undefined);
  go('results');
  if (!saved) toast('Couldn’t save this attempt. This browser is blocking site storage, so it won’t appear in your results over time.', 8000);
}

// ---------- results ----------
function answerText(t, r) {
  if (!r) return '—';
  switch (t.type) {
    case 'number': return `${r.value.trim()} ${t.unit}`;
    case 'rate': return t.options[r.choice] + (r.checked ? ' · checked the source' : ' · didn’t check the source');
    case 'pick': return t.options[r.choice].name;
    case 'switch': return r.final === r.first ? `${t.options[r.first]}, kept` : `${t.options[r.first]}, then changed to ${t.options[r.final]}`;
    case 'shift': return r.final === r.first ? `${AGREE5[r.first]}, kept` : `${AGREE5[r.first]} → ${AGREE5[r.final]} (group shown: ${AGREE5[groupFor(r.first)]})`;
    default: return '';
  }
}

function questionText(t) {
  if (t.type === 'rate') return `${t.tag} ${t.claim}`;
  if (t.type === 'shift') return t.statement;
  return t.prompt + (t.ask ? ' ' + t.ask : '');
}

const STATUS = { along: 'Went along', not: 'Didn’t', neither: 'Neither' };

function renderMoment(t) {
  const r = state.responses[t.id];
  const v = t.control ? 'control' : judge(t, r) || 'neither';
  const parts = [
    `<p><b>The twist.</b> ${esc(t.twist)}</p>`,
    `<p><b>What’s true.</b> ${esc(t.truth)}</p>`,
  ];
  if (t.type === 'number' && v === 'neither') parts.push(`<p class="quiet">Your answer wasn’t the tempting one or the right one (${t.answer} ${esc(t.unit)}).</p>`);
  if (t.type === 'switch' && v === 'neither') parts.push('<p class="quiet">Your first answer already matched the crowd, so this one can’t tell herding from a slip. It isn’t counted either way.</p>');
  if (t.invented) parts.push(`<p class="invented">${esc(t.invented)}</p>`);
  if (t.note) parts.push(`<p class="quiet">${esc(t.note)}</p>`);
  if (t.sources.length) parts.push(`<p class="sources">Source: ${t.sources.map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a>`).join('; ')}</p>`);
  const chip = t.control
    ? `<span class="status neither">No crowd shown</span>`
    : `<span class="status ${v}">${STATUS[v]}</span>`;
  return `
  <li><details class="moment">
    <summary><span class="q">${esc(questionText(t))}</span><span class="you">You: ${esc(answerText(t, r))}</span>${chip}</summary>
    <div class="reveal">${parts.join('')}</div>
  </details></li>`;
}

function kindCard(k, c) {
  return `
  <div class="kcard" data-kind="${k}">
    <span class="name"><span class="kdot"></span>${esc(KINDS[k].name)}</span>
    <span class="count">${esc(countPhrase(c))}</span>
    <span class="pips" aria-hidden="true">${Array.from({ length: c.total }, (_, i) => `<span class="pip ${i < c.along ? 'on' : ''}"></span>`).join('')}</span>
    <span class="quiet">${esc(KINDS[k].short)}</span>
  </div>`;
}

function controlLine(ok) {
  if (ok === null) return '';
  return ok
    ? '<p class="quiet control-line">With no crowd shown, you picked the option that fit. So if you followed popularity elsewhere, it wasn’t from rushing.</p>'
    : '<p class="quiet control-line">With no crowd shown, you also picked the option that didn’t fit. Some popularity picks may be rushing rather than herding.</p>';
}

function renderResults() {
  const counts = summarize(state.responses, cur());
  const sections = KIND_ORDER.map((k) => {
    const K = KINDS[k];
    return `
    <section class="ksection" data-kind="${k}">
      <header><h3><span class="kdot"></span>${esc(K.name)}</h3><span class="quiet">${esc(countPhrase(counts[k]))}</span></header>
      <details class="idea"><summary>Why people go along, and when it’s fine</summary>
        <div class="body"><p>${esc(K.idea)}</p><p>${esc(K.fails)}</p><p class="principle">${esc(K.principle)}</p></div>
      </details>
      <ul class="moments">${cur().filter((t) => t.kind === k).map(renderMoment).join('')}</ul>
    </section>`;
  }).join('');
  const others = KIND_ORDER.filter((k) => !HERD_KINDS.includes(k));
  return `
  <div class="stack-lg">
    <div class="stack">
      <h1 tabindex="-1" data-focus>Where you followed the herd</h1>
      <p class="level-line">${LEVELS[state.level].name} level</p>
      <p class="lede">Each count comes from 2–3 questions, so one careless tap changes it. Read it as a mirror, not a measurement. Open any moment to see what was going on.</p>
    </div>
    ${metricsBlock()}
    <div class="stack">
      <div class="kinds three">${HERD_KINDS.map((k) => kindCard(k, counts[k])).join('')}</div>
      ${controlLine(controlResult(state.responses, cur()))}
    </div>
    <div class="stack">
      <h2 class="sub">For comparison</h2>
      <div class="kinds">${others.map((k) => kindCard(k, counts[k])).join('')}</div>
    </div>
    ${sections}
    ${renderHistory(getHistory(), 'results', state.level)}
    <div class="callout">
      <h3>The habit underneath</h3>
      <p>Each time you went along, something other than the facts was doing the persuading: a review count, a headcount, the group’s number, a title, or the speed of an answer. Next time you feel sure, name what made you sure, then ask whether it’s evidence.</p>
    </div>
    <div class="share">
      <button class="btn" data-action="share">${ICONS.link} Copy a link to your result</button>
      <button class="btn ghost" data-action="again">Take it again</button>
    </div>
    <p class="quiet">The link holds only your five counts, not your answers. A retake is primed: you now know the twists.</p>
    <div class="callout">
      <h3>Optional: a 10-question autism screener</h3>
      <p>Separate from everything above, and it doesn’t change your counts. The AQ-10 is a short questionnaire used in the UK to decide who might benefit from a full assessment. It’s a screener, not a diagnosis.</p>
      <div class="row"><button class="btn ghost" data-action="aq-start">Take the screener</button></div>
    </div>
  </div>`;
}

// ---------- shared link ----------
function renderShared() {
  const c = state.shared;
  if (!c) {
    return `
    <div class="card hero">
      ${heroArt}
      <h1 tabindex="-1" data-focus>This link doesn’t hold a result</h1>
      <p class="lede">It may have been cut short when it was copied. You can still take the questions yourself.</p>
      <div class="row"><button class="btn" data-action="start">Start</button></div>
    </div>`;
  }
  return `
  <div class="stack-lg">
    <div class="stack">
      <h1 tabindex="-1" data-focus>A friend’s result</h1>
      <p class="lede">Someone sent you how often they followed the herd. To see what each question was really testing, take it yourself first. Knowing the twists spoils them.</p>
    </div>
    <div class="kinds three">${HERD_KINDS.map((k) => kindCard(k, c[k])).join('')}</div>
    <div class="kinds">${KIND_ORDER.filter((k) => !HERD_KINDS.includes(k)).map((k) => kindCard(k, c[k])).join('')}</div>
    <div class="row"><button class="btn" data-action="start">Take it yourself</button></div>
  </div>`;
}

// ---------- AQ-10 ----------
function renderAqIntro() {
  return `
  <div class="card stack">
    <h1 tabindex="-1" data-focus>AQ-10 autism screener</h1>
    <p>Ten statements. Pick how much each one sounds like you. It takes about two minutes.</p>
    <p class="quiet"><b>What a screener is.</b> Think of a smoke alarm. It’s built to go off when there might be a fire, so it sometimes goes off for toast and occasionally stays quiet when it shouldn’t. A high score means it’s worth talking to a clinician. A low score doesn’t rule anything out.</p>
    <p class="quiet">Your answers stay on this page. They aren’t saved or included in your share link.</p>
    <p class="sources">Allison, Auyeung &amp; Baron-Cohen (2012), J. Am. Acad. Child Adolesc. Psychiatry 51(2):202–212. Items \u00a9 Autism Research Centre, University of Cambridge, free for non-profit use. <a href="https://www.autismresearchcentre.com/tests/autism-spectrum-quotient-10-items-aq-10-adult/" target="_blank" rel="noopener">About the AQ-10</a></p>
    <div class="row"><button class="btn" data-action="aq-begin">Begin</button><button class="btn link" data-action="aq-back">Back to results</button></div>
  </div>`;
}

function renderAq() {
  const i = state.aqI;
  const q = AQ10[i];
  const sel = state.aq[i];
  return `
  <div class="card">
    <div class="progress" aria-label="Statement ${i + 1} of ${AQ10.length}"><div class="track"><div class="fill" style="width:${(i / AQ10.length) * 100}%"></div></div><span>${i + 1} of ${AQ10.length}</span></div>
    <div class="stack">
      <h2 class="claim" tabindex="-1" data-focus>${esc(q.text)}</h2>
      <fieldset class="options" data-aq><legend class="sr-only">${esc(q.text)}</legend>
        ${AQ10_OPTIONS.map((o, j) => `<label class="opt"><input type="radio" name="aq" value="${j}" ${sel === j ? 'checked' : ''}><span class="dot"></span><span>${esc(o)}</span><span class="num" aria-hidden="true">${j + 1}</span></label>`).join('')}
      </fieldset>
    </div>
    <div class="task-foot">
      <button class="btn link" data-action="aq-prev" ${i === 0 ? 'disabled' : ''}>Back</button>
    </div>
  </div>`;
}

function renderAqResult() {
  const res = scoreAQ10(state.aq);
  if (!res) return renderAqIntro();
  const msg = res.atOrAbove
    ? `That’s at or above the cut-off of ${AQ10_CUTOFF} that UK guidance uses for suggesting a full assessment. It’s a reason to talk to a GP or clinician, not a diagnosis. Many people who score this high are not autistic.`
    : `That’s below the cut-off of ${AQ10_CUTOFF} used for suggesting a full assessment. Screeners miss some autistic people, especially those who have learned to mask. If you have your own reasons to wonder, they still count.`;
  return `
  <div class="card stack">
    <h1 tabindex="-1" data-focus>You scored ${res.score} out of ${res.max}</h1>
    <p>${esc(msg)}</p>
    <p class="quiet"><b>How it’s scored.</b> Each statement scores one point when your answer leans the way autistic people more often answer. Sometimes that’s agreeing (“I often notice small sounds”), sometimes disagreeing (“I find it easy to read between the lines”). “Slightly” and “definitely” count the same.</p>
    <p class="quiet"><b>Not linked to the first part.</b> Research finds that autistic adults are, on average, less swayed by how choices are framed. Averages don’t tell you about one person, so your counts above say nothing about this score.</p>
    <p class="sources">NICE guideline CG142, Autism spectrum disorder in adults. <a href="https://www.nice.org.uk/guidance/cg142" target="_blank" rel="noopener">nice.org.uk/guidance/cg142</a></p>
    <div class="row"><button class="btn" data-action="aq-back">Back to results</button></div>
  </div>`;
}

// ---------- settings ----------
function applySettings() {
  const root = document.documentElement;
  if (settings.theme === 'system') delete root.dataset.theme; else root.dataset.theme = settings.theme;
  if (settings.text === 'large') root.dataset.text = 'large'; else delete root.dataset.text;
  if (settings.motion === 'reduce') root.dataset.motion = 'reduce'; else delete root.dataset.motion;
}

function openSettings() {
  for (const key of ['theme', 'text', 'motion']) {
    const el = settingsDialog.querySelector(`input[name="${key}"][value="${settings[key]}"]`);
    if (el) el.checked = true;
  }
  const n = getHistory().length;
  settingsDialog.querySelector('#data-note').textContent = n
    ? `${n} past result${n === 1 ? '' : 's'}, kept in this browser only.`
    : 'No past results yet. They’re kept in this browser only.';
  const clear = settingsDialog.querySelector('[data-action="clear-history"]');
  clear.textContent = 'Clear past results';
  clear.disabled = n === 0;
  settingsDialog.querySelector('[data-action="export"]').disabled = n === 0;
  delete clear.dataset.armed;
  if (!settingsDialog.open) settingsDialog.showModal();
}

settingsDialog.addEventListener('change', (e) => {
  const { name, value } = e.target;
  if (!['theme', 'text', 'motion'].includes(name)) return;
  settings = { ...settings, [name]: value };
  save('settings', settings);
  applySettings();
});

// ---------- toast & clipboard ----------
let toastTimer;
function toast(msg, ms = 2200) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), ms);
}

async function copy(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { ok = false; }
    ta.remove();
    return ok;
  }
}

// ---------- events ----------
function start(fromScratch) {
  if (location.hash) history.replaceState(null, '', location.pathname + location.search);
  if (fromScratch) save('progress', undefined);
  const level = fresh().level;
  state = { ...fresh(), level, set: attemptsAt(level) };
  go('task');
}

document.addEventListener('click', async (e) => {
  const el = e.target.closest('[data-action]');
  if (!el || el.disabled) return;
  const a = el.dataset.action;
  if (a === 'home') {
    e.preventDefault();
    if (location.hash) history.replaceState(null, '', location.pathname + location.search);
    if (state.screen === 'task') saveProgress();
    state = fresh();
    render();
  } else if (a === 'start') start(true);
  else if (a === 'resume') {
    const p = loadProgress();
    if (!p) return start(true);
    state = { ...fresh(), level: p.level, set: p.set, i: p.i, responses: p.responses || {} };
    go('task');
  } else if (a === 'next') next();
  else if (a === 'back') back();
  else if (a === 'check') {
    const t = cur()[state.i];
    state.responses[t.id] = { ...(state.responses[t.id] || {}), checked: true };
    saveProgress();
    el.remove();
    const panel = document.createElement('div');
    panel.className = 'source-panel';
    panel.innerHTML = `<b>What the research says.</b> ${esc(t.check)}`;
    main.querySelector('.stack').appendChild(panel);
  } else if (a === 'share') {
    const url = location.origin + location.pathname + '#r=' + encodeShare(summarize(state.responses, cur()));
    toast((await copy(url)) ? 'Link copied. It holds only your four counts.' : 'Couldn’t copy. Your browser blocked the clipboard.');
  } else if (a === 'again') start(true);
  else if (a === 'settings') openSettings();
  else if (a === 'export') exportResults();
  else if (a === 'import') filePicker.click();
  else if (a === 'clear-history') {
    if (!el.dataset.armed) {
      el.dataset.armed = '1';
      el.textContent = 'Click again to clear';
      return;
    }
    save('history', undefined);
    openSettings();
    if (state.screen === 'intro') render();
    toast('Past results cleared.');
  } else if (a === 'aq-start') go('aqIntro');
  else if (a === 'aq-begin') go('aq', { aqI: 0, aq: [] });
  else if (a === 'aq-prev') go('aq', { aqI: Math.max(0, state.aqI - 1) });
  else if (a === 'aq-back') go('results');
});

// ---------- export / import ----------
function exportResults() {
  const history = getHistory();
  if (!history.length) return;
  const data = { app: 'DoYouThinkOnYourOwn', version: 3, exported: new Date().toISOString(), attempts: history };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'Do You Think On Your Own results.json';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  toast(`Exported ${history.length} attempt${history.length === 1 ? '' : 's'}.`);
}

function importText(text) {
  const parsed = parseExport(text);
  if (!parsed) {
    toast('That file isn\u2019t a Do You Think On Your Own results file.');
    return;
  }
  const { merged, added, skipped } = mergeHistory(getHistory(), parsed.attempts);
  if (!save('history', merged.slice(-200))) {
    toast('This browser is blocking storage, so results can\u2019t be saved here.');
    return;
  }
  const extra = [skipped && `${skipped} already here`, parsed.rejected && `${parsed.rejected} unreadable`].filter(Boolean).join(', ');
  toast(`Imported ${added} attempt${added === 1 ? '' : 's'}${extra ? ` (${extra})` : ''}.`);
  if (settingsDialog.open) openSettings();
  if (state.screen === 'intro' || state.screen === 'results') render();
}

async function importFile(file) {
  if (!file) return;
  if (file.size > 1_000_000) { toast('That file is too big to be a results file.'); return; }
  try { importText(await file.text()); } catch { toast('Couldn\u2019t read that file.'); }
}

const filePicker = Object.assign(document.createElement('input'), { type: 'file', accept: '.json,application/json', hidden: true });
filePicker.addEventListener('change', () => { importFile(filePicker.files[0]); filePicker.value = ''; });
document.body.appendChild(filePicker);

// Drop a file anywhere on the window.
document.addEventListener('dragover', (e) => {
  if ([...(e.dataTransfer?.types || [])].includes('Files')) { e.preventDefault(); document.body.classList.add('dropping'); }
});
document.addEventListener('dragleave', (e) => { if (!e.relatedTarget) document.body.classList.remove('dropping'); });
document.addEventListener('drop', (e) => {
  document.body.classList.remove('dropping');
  const file = e.dataTransfer?.files?.[0];
  if (!file) return;
  e.preventDefault();
  importFile(file);
});

// Paste a results file (or its text) with ⌘V, except while typing an answer.
document.addEventListener('paste', (e) => {
  if (e.target.matches?.('input[type="text"]')) return;
  const file = e.clipboardData?.files?.[0];
  if (file) { e.preventDefault(); importFile(file); return; }
  const text = e.clipboardData?.getData('text/plain') || '';
  if (text.includes('"DoYouThinkOnYourOwn"')) { e.preventDefault(); importText(text); }
});

let aqTimer;
main.addEventListener('change', (e) => {
  if (e.target.name === 'level') {
    state.level = levelOf(e.target.value);
    save('level', state.level);
    // Only the history below the card depends on the level; redraw it in place.
    const old = main.querySelector('.history');
    if (old) old.outerHTML = renderHistory(getHistory(), 'intro', state.level);
    wireTrend(main);
  } else if (e.target.name === 'opt') {
    const t = cur()[state.i];
    const r = state.responses[t.id] || {};
    const v = Number(e.target.value);
    const field = t.type === 'switch' || t.type === 'shift' ? (stage(t, r) === 'first' ? 'draft' : 'final') : 'choice';
    state.responses[t.id] = { ...r, [field]: v };
    saveProgress();
    syncNext();
  } else if (e.target.name === 'aq') {
    state.aq[state.aqI] = Number(e.target.value);
    // Short pause so the choice is seen before moving on.
    clearTimeout(aqTimer);
    aqTimer = setTimeout(() => {
      if (state.screen !== 'aq') return;
      if (state.aqI < AQ10.length - 1) go('aq', { aqI: state.aqI + 1 });
      else go('aqResult');
    }, 180);
  }
});

main.addEventListener('input', (e) => {
  if (e.target.name !== 'num') return;
  const t = cur()[state.i];
  state.responses[t.id] = { value: e.target.value };
  saveProgress();
  syncNext();
});

document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === ',') {
    e.preventDefault();
    openSettings();
    return;
  }
  if (settingsDialog.open || e.metaKey || e.ctrlKey || e.altKey) return;
  const inField = e.target.matches('input[type="text"]');
  if (/^[1-5]$/.test(e.key) && !inField && (state.screen === 'task' || state.screen === 'aq')) {
    const radio = main.querySelectorAll('input[type="radio"]')[Number(e.key) - 1];
    if (radio) {
      radio.checked = true;
      radio.focus();
      radio.dispatchEvent(new Event('change', { bubbles: true }));
    }
    return;
  }
  if (e.key === 'Enter') {
    if (e.target.matches('button, a, summary')) return; // native activation handles these
    if (state.screen === 'task') { e.preventDefault(); next(); }
    else if (state.screen === 'intro') { e.preventDefault(); main.querySelector('.hero .btn')?.click(); }
  }
});

function route() {
  const m = location.hash.match(/^#r=(.*)$/);
  if (m) {
    state = { ...fresh(), shared: decodeShare(decodeURIComponent(m[1])) };
    go('shared');
  } else if (state.screen === 'shared') {
    state = fresh();
    render();
  }
}
window.addEventListener('hashchange', route);

applySettings();
if (location.hash.startsWith('#r=')) route();
else render();

