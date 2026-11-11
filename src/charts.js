// The results-over-time chart and the typeset equations. Pure HTML/SVG
// strings plus small wiring; no chart library.
import { wilson, pct } from './scoring.js';
import { LEVELS, levelOf } from './tasks.js';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const day = (iso) => new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });

// Herd rate per attempt at one level: a dot at the rate with a whisker for its
// 95% range. Primed attempts (a repeated question set) are hollow. One series,
// so no legend; levels get separate charts because their rates aren't comparable.
export function renderTrend(history) {
  const rows = history.slice(-20).map((a, i) => {
    const r = a.herd.possible ? a.herd.along / a.herd.possible : null;
    return { ...a, n: i + 1, rate: r, range: wilson(a.herd.along, a.herd.possible) };
  }).filter((a) => a.rate !== null);
  if (!rows.length) return '';
  const W = 600, H = 220, L = 44, R = 16, T = 14, B = 34;
  const x = (i) => (rows.length === 1 ? L + (W - L - R) / 2 : L + (i * (W - L - R)) / (rows.length - 1));
  const y = (v) => T + (1 - v) * (H - T - B);
  const grid = [0, 0.25, 0.5, 0.75, 1].map((g) => `
    <line x1="${L}" x2="${W - R}" y1="${y(g)}" y2="${y(g)}" class="grid"/>
    <text x="${L - 8}" y="${y(g) + 4}" class="tick" text-anchor="end">${pct(g)}</text>`).join('');
  const marks = rows.map((a, i) => {
    const cx = x(i);
    const tip = `Attempt ${a.n}, ${day(a.date)}: ${pct(a.rate)} (${a.herd.along} of ${a.herd.possible}), likely ${pct(a.range.low)}–${pct(a.range.high)}${a.primed ? '. Repeated questions, so primed.' : ''}`;
    return `
    <g class="mark${a.primed ? ' primed' : ''}">
      <line x1="${cx}" x2="${cx}" y1="${y(a.range.high)}" y2="${y(a.range.low)}" class="whisker"/>
      <circle cx="${cx}" cy="${y(a.rate)}" r="5.5" class="dot"/>
      <text x="${cx}" y="${H - 12}" class="tick" text-anchor="middle">${a.n}</text>
      <circle cx="${cx}" cy="${y(a.rate)}" r="16" class="hit" tabindex="0" role="img" aria-label="${esc(tip)}" data-tip="${esc(tip)}"/>
    </g>`;
  }).join('');
  const line = rows.length > 1
    ? `<polyline class="trend" points="${rows.map((a, i) => `${x(i)},${y(a.rate)}`).join(' ')}"/>`
    : '';
  return `
  <figure class="trend-fig">
    <div class="trend-wrap">
      <svg viewBox="0 0 ${W} ${H}" role="group" aria-label="Herd rate for each attempt, with its likely range">
        ${grid}${line}${marks}
        <text x="${L - 8}" y="${H - 12}" class="tick" text-anchor="end">Try</text>
      </svg>
      <div class="tip" role="status" hidden></div>
    </div>
    <figcaption class="quiet">Dot: herd rate. Line through it: the likely range. Hollow: questions you’d already seen.</figcaption>
  </figure>`;
}

// Every attempt at every level, numbered in the order taken.
export function renderTable(history) {
  const rows = history.slice(-50).filter((a) => a.herd.possible);
  if (!rows.length) return '';
  return `
  <details class="idea"><summary>Show all attempts as a table</summary>
    <table class="trend-table">
      <thead><tr><th>#</th><th>Date</th><th>Level</th><th>Herd rate</th><th>Likely range</th><th>Opinion shift</th><th></th></tr></thead>
      <tbody>${rows.map((a, i) => {
        const range = wilson(a.herd.along, a.herd.possible);
        return `<tr><td>${i + 1}</td><td>${esc(day(a.date))}</td><td>${esc(LEVELS[levelOf(a.level)].name)}</td><td>${pct(a.herd.along / a.herd.possible)} (${a.herd.along}/${a.herd.possible})</td><td>${pct(range.low)}–${pct(range.high)}</td><td>${a.shift === null ? '—' : a.shift.toFixed(1)}</td><td>${a.primed ? 'primed' : ''}</td></tr>`;
      }).join('')}</tbody>
    </table>
  </details>`;
}

// Hover and keyboard focus show the same tooltip.
export function wireTrend(root) {
  const wrap = root.querySelector('.trend-wrap');
  if (!wrap) return;
  const tip = wrap.querySelector('.tip');
  const show = (el) => {
    tip.textContent = el.dataset.tip;
    tip.hidden = false;
    const box = wrap.getBoundingClientRect();
    const b = el.getBoundingClientRect();
    const left = Math.min(Math.max(b.left - box.left + b.width / 2, 90), box.width - 90);
    tip.style.left = `${left}px`;
    tip.style.top = `${b.top - box.top - 8}px`;
  };
  const hide = () => { tip.hidden = true; };
  wrap.querySelectorAll('.hit').forEach((el) => {
    el.addEventListener('mouseenter', () => show(el));
    el.addEventListener('focus', () => show(el));
    el.addEventListener('mouseleave', hide);
    el.addEventListener('blur', hide);
  });
}

// ---------- equations ----------
const EQ = {
  rate: 'r = \\frac{k}{n}',
  range: '\\text{range} = \\frac{r + \\frac{z^2}{2n} \\;\\pm\\; z\\sqrt{\\frac{r(1-r)}{n} + \\frac{z^2}{4n^2}}}{1 + \\frac{z^2}{n}}',
  shift: 's = \\frac{1}{m}\\sum_{i=1}^{m}\\bigl(2 - \\lvert f_i - g_i \\rvert\\bigr)',
};

export function renderMath(h, range, shift) {
  return `
  <details class="idea math" data-math>
    <summary>How these numbers are worked out</summary>
    <div class="body">
      <ol class="steps">
        <li>
          <p><b>Herd rate.</b> The share of herd questions where you went along, out of those where going along was possible.</p>
          <div class="eq" data-tex="${esc(EQ.rate)}"></div>
          <p class="defs"><i>k</i> = herd questions where you went along (yours: ${h.along}). <i>n</i> = herd questions where going along was possible (yours: ${h.possible}). The no-crowd control doesn’t count, and nor does a switching question whose first answer already matched the crowd.</p>
        </li>
        <li>
          <p><b>Likely range (95% Wilson interval).</b> The herd rates that could easily have produced answers like yours. Think of flipping a coin 7 times: 3 heads doesn’t prove the coin is fair or biased. With so few questions, the range is wide, and that width is the honest size of one attempt.</p>
          <div class="eq" data-tex="${esc(EQ.range)}"></div>
          <p class="defs"><i>r</i> = your herd rate. <i>n</i> = as above. <i>z</i> = 1.96, which sets the range to cover 95%. Yours: ${pct(range.low)} to ${pct(range.high)}. It works better than the textbook “rate ± 1.96 standard errors” at small <i>n</i>: it never goes below 0% or above 100%, and isn’t zero-width when you went along 0 or every time.</p>
        </li>
        <li>
          <p><b>Opinion shift.</b> How far you moved toward the group, on average, in steps of the agree scale.</p>
          <div class="eq" data-tex="${esc(EQ.shift)}"></div>
          <p class="defs"><i>m</i> = opinion questions (2). <i>f<sub>i</sub></i> = your final answer, <i>g<sub>i</sub></i> = the group’s position, both on the 5-step scale. The group is always shown 2 steps from your first answer, so 2 means you moved all the way to it, 0 means you stayed, and a negative number means you moved away. Yours: ${shift === null ? '—' : shift.toFixed(1)}.</p>
        </li>
      </ol>
      <p class="principle">The reusable idea: a rate from a handful of tries is a rough estimate. Always say how many tries it came from, and show the range.</p>
    </div>
  </details>`;
}

// KaTeX loads only when the explanation is opened. If it can't load
// (offline), the equations stay hidden and the plain-word definitions remain.
let katexPromise;
function loadKatex() {
  if (window.katex) return Promise.resolve(window.katex);
  if (!katexPromise) {
    katexPromise = new Promise((resolve, reject) => {
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css';
      document.head.appendChild(css);
      const js = document.createElement('script');
      js.src = 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js';
      js.onload = () => (window.katex ? resolve(window.katex) : reject(new Error('katex missing')));
      js.onerror = reject;
      document.head.appendChild(js);
    });
  }
  return katexPromise;
}

export function wireMath(root) {
  const d = root.querySelector('[data-math]');
  if (!d) return;
  d.addEventListener('toggle', async () => {
    if (!d.open || d.dataset.rendered) return;
    try {
      const katex = await loadKatex();
      d.querySelectorAll('.eq').forEach((el) => {
        katex.render(el.dataset.tex, el, { displayMode: true, throwOnError: false });
        el.classList.add('ready');
      });
      d.dataset.rendered = '1';
    } catch {
      d.querySelectorAll('.eq').forEach((el) => el.remove());
    }
  });
}
