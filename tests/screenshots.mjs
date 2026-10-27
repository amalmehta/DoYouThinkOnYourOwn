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

const PLAN = ['20', 2, 1, 0, 1, '4', 0, 2, null, 1, '15', 2];

async function shoot(scheme, viewport, tag) {
  const ctx = await browser.newContext({ colorScheme: scheme, viewport, deviceScaleFactor: 2, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(BASE);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `${OUT}/intro-${tag}.png` });
  await page.getByRole('button', { name: /^Start/ }).click();
  await page.locator('#num').fill('20');
  await page.locator('#next').click();
  await page.locator('label.opt').nth(2).click();
  await page.getByRole('button', { name: 'Check the source' }).click();
  await page.screenshot({ path: `${OUT}/task-${tag}.png` });
  await page.locator('#next').click();
  await page.screenshot({ path: `${OUT}/crowd-${tag}.png` });
  for (const a of PLAN.slice(2)) {
    if (typeof a === 'string') await page.locator('#num').fill(a);
    else if (a !== null) await page.locator('label.opt').nth(a).click();
    await page.locator('#next').click();
  }
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
