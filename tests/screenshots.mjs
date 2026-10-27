// Regenerates docs/screenshots/*.png and the PNG icons. Run: npm run shots
// (expects the dev server on :8765: npm start).
import { chromium } from '@playwright/test';
import { mkdirSync, readFileSync } from 'node:fs';

const BASE = process.env.BASE || 'http://127.0.0.1:8765/';
const OUT = 'docs/screenshots';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

// Icons from the SVG, so every size stays in step with one source.
{
  const svg = readFileSync('assets/icon.svg', 'utf8');
  const page = await browser.newPage();
  for (const size of [32, 180, 512]) {
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(`<style>html,body{margin:0;background:transparent}svg{width:${size}px;height:${size}px;display:block}</style>${svg}`);
    await page.screenshot({ path: `assets/icon-${size}.png`, omitBackground: true });
  }
  await page.close();
}

// p1 a1 s1 o1 g1 p2 pc s2 a2 o2 p3 g2 — a mixed run so the results show every status.
const PLAN = [0, 1, { first: 0, final: 1 }, { first: 1, final: 1 }, '20', 1, 1, { first: 1, final: 1 }, 2, { first: 4, final: 3 }, 0, '29'];
const PLAN2 = [1, 0, { first: 0, final: 0 }, { first: 1, final: 2 }, '12', 0, 0, { first: 1, final: 1 }, 1, { first: 4, final: 4 }, 1, '11'];
const TYPES = ['pick', 'rate', 'switch', 'shift', 'number', 'pick', 'pick', 'switch', 'rate', 'shift', 'pick', 'number'];

async function answer(page, i, a) {
  if (typeof a === 'string') await page.locator('#num').fill(a);
  else if (typeof a === 'number') await page.locator('label.opt').nth(a).click();
  else {
    await page.locator('label.opt').nth(a.first).click();
    await page.locator('#next').click();
    await page.locator('label.opt').nth(TYPES[i] === 'switch' ? (a.final === a.first ? 0 : 1) : a.final).click();
  }
  await page.locator('#next').click();
}

async function shoot(scheme, viewport, tag) {
  const ctx = await browser.newContext({ colorScheme: scheme, viewport, deviceScaleFactor: 2, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(BASE);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `${OUT}/intro-${tag}.png` });
  await page.getByRole('button', { name: /^Start/ }).click();
  await page.locator('label.opt').nth(1).click();
  await page.screenshot({ path: `${OUT}/popularity-${tag}.png` });
  await page.locator('#next').click();
  await answer(page, 1, PLAN[1]);
  await page.locator('label.opt').nth(0).click();
  await page.locator('#next').click();
  await page.screenshot({ path: `${OUT}/switch-${tag}.png` });
  await page.locator('label.opt').nth(1).click();
  await page.locator('#next').click();
  for (let i = 3; i < PLAN.length; i++) await answer(page, i, PLAN[i]);
  // A second attempt on fresh questions, so the over-time chart has two points.
  await page.getByRole('button', { name: 'Take it again' }).click();
  for (let i = 0; i < PLAN2.length; i++) await answer(page, i, PLAN2[i]);
  await page.getByText('How these numbers are worked out').click();
  await page.waitForFunction(() => document.querySelector('.eq.ready') || !document.querySelector('.eq'), null, { timeout: 8000 }).catch(() => {});
  await page.locator('.metric').screenshot({ path: `${OUT}/metrics-${tag}.png` });
  await page.getByText('How these numbers are worked out').click();
  await page.locator('.moment summary').first().click();
  await page.screenshot({ path: `${OUT}/results-${tag}.png`, fullPage: true });
  await ctx.close();
}

await shoot('light', { width: 1100, height: 820 }, 'light');
await shoot('dark', { width: 1100, height: 820 }, 'dark');
await shoot('light', { width: 390, height: 844 }, 'phone');
await shoot('dark', { width: 390, height: 844 }, 'phone-dark');
await browser.close();
console.log('screenshots written to', OUT);
