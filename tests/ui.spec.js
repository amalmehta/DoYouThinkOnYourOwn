import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

// One answer per task, in task order: p1 a1 s1 o1 g1 p2 pc s2 a2 o2 p3 g2.
// A number picks the nth option; a string is typed; {first, final} answers a
// two-step task (switch: option indexes; shift: 0..4 on the agree scale).
const ALL_ALONG = [0, 2, { first: 0, final: 1 }, { first: 0, final: 1 }, '20', 0, 1, { first: 1, final: 0 }, 3, { first: 4, final: 3 }, 0, '15'];
const NONE_ALONG = [1, 0, { first: 0, final: 0 }, { first: 0, final: 0 }, '10', 1, 1, { first: 1, final: 1 }, 1, { first: 4, final: 4 }, 1, '29'];
const TYPES = ['pick', 'rate', 'switch', 'shift', 'number', 'pick', 'pick', 'switch', 'rate', 'shift', 'pick', 'number'];

async function answerAt(page, idx, a) {
  if (typeof a === 'string') await page.locator('#num').fill(a);
  else if (typeof a === 'number') await page.locator('label.opt').nth(a).click();
  else {
    await page.locator('label.opt').nth(a.first).click();
    await page.locator('#next').click();
    // Switch reveal lists Keep first, then Change; the shift reveal is the 5-point scale again.
    const nth = TYPES[idx] === 'switch' ? (a.final === a.first ? 0 : 1) : a.final;
    await page.locator('label.opt').nth(nth).click();
  }
  await page.locator('#next').click();
}

async function runAll(page, plan) {
  await page.getByRole('button', { name: /^Start/ }).click();
  for (let i = 0; i < plan.length; i++) await answerAt(page, i, plan[i]);
  await expect(page.getByRole('heading', { name: 'Where you followed the herd' })).toBeVisible();
}

test.beforeEach(async ({ page }) => {
  page.on('pageerror', (e) => { throw e; });
  await page.goto('/');
});

test('intro explains the twist and the privacy promise', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Do you think on your own?' })).toBeVisible();
  await expect(page.getByText('Some questions hide a twist')).toBeVisible();
  await expect(page.getByText('Nothing leaves this device')).toBeVisible();
});

test('going along every time is counted per kind, herd first', async ({ page }) => {
  await runAll(page, ALL_ALONG);
  const cards = page.locator('.kinds .kcard');
  await expect(cards.nth(0)).toContainText('Popularity');
  await expect(cards.nth(0)).toContainText('Went along every time (3 of 3)');
  await expect(cards.nth(1)).toContainText('Went along every time (2 of 2)');
  await expect(cards.nth(2)).toContainText('Opinion shift');
  await expect(page.getByRole('heading', { name: 'For comparison' })).toBeVisible();
  await expect(page.locator('.status.along')).toHaveCount(11);
  await expect(page.getByText('With no crowd shown, you picked the option that fit')).toBeVisible();
});

test('never going along, with sources opened in a moment', async ({ page }) => {
  await runAll(page, NONE_ALONG);
  await expect(page.locator('.status.along')).toHaveCount(0);
  await expect(page.locator('.kinds').first()).toContainText('Didn\u2019t go along (0 of 3)');
  const first = page.locator('.moment').first();
  await first.locator('summary').click();
  await expect(first.locator('.reveal')).toContainText('The twist.');
  await expect(first.locator('.sources a').first()).toHaveAttribute('href', /^https:\/\//);
  await expect(first.locator('.invented')).toContainText('invented');
});

test('switching: the crowd appears only after you answer, and a wrong first answer is not counted', async ({ page }) => {
  await page.getByRole('button', { name: /^Start/ }).click();
  await answerAt(page, 0, 1);
  await answerAt(page, 1, 0);
  await expect(page.getByText('3 of 12')).toBeVisible();
  await expect(page.getByText(/of people who answered chose/)).toHaveCount(0);
  await page.locator('label.opt').nth(1).click(); // the crowd's (wrong) answer first
  await page.locator('#next').click();
  await expect(page.getByText('71% of people who answered chose $70 with 10% off.')).toBeVisible();
  await expect(page.locator('#next')).toBeDisabled();
  await page.locator('label.opt').nth(0).click();
  await page.locator('#next').click();
  const plan = NONE_ALONG.slice(3);
  for (let i = 0; i < plan.length; i++) await answerAt(page, i + 3, plan[i]);
  await expect(page.locator('.status.neither')).toHaveCount(2); // this switch + the control chip
});

test('opinion: the group is shown two steps from your answer', async ({ page }) => {
  await page.getByRole('button', { name: /^Start/ }).click();
  for (let i = 0; i < 3; i++) await answerAt(page, i, NONE_ALONG[i]);
  await page.keyboard.press('2'); // Disagree
  await page.keyboard.press('Enter');
  await expect(page.getByText('Most people who answered said')).toContainText('Agree');
  await expect(page.locator('.mark')).toHaveCount(2);
});

test('Next stays disabled until there is a real answer', async ({ page }) => {
  await page.getByRole('button', { name: /^Start/ }).click();
  const next = page.locator('#next');
  await expect(next).toBeDisabled();
  await page.locator('#next').click({ force: true, clickCount: 5 });
  await expect(page.getByText('1 of 12')).toBeVisible();
  await page.locator('label.opt').nth(1).click();
  await expect(next).toBeEnabled();
  await next.click();
  await answerAt(page, 1, 0);
  await answerAt(page, 2, NONE_ALONG[2]);
  await answerAt(page, 3, NONE_ALONG[3]);
  await page.locator('#num').fill('ten');
  await expect(page.locator('#next')).toBeDisabled();
});

test('checking the source shows the evidence and is remembered in the results', async ({ page }) => {
  await page.getByRole('button', { name: /^Start/ }).click();
  await answerAt(page, 0, 1);
  await page.locator('label.opt').nth(0).click();
  await page.getByRole('button', { name: 'Check the source' }).click();
  await expect(page.locator('.source-panel')).toContainText('BMJ');
  await page.locator('#next').click();
  for (let i = 2; i < 12; i++) await answerAt(page, i, NONE_ALONG[i]);
  await expect(page.locator('[data-kind="authority"] .moment').first()).toContainText('checked the source');
});

test('keyboard only: Enter, number keys and typing', async ({ page }) => {
  await page.keyboard.press('Enter');
  await expect(page.getByText('1 of 12')).toBeVisible();
  for (let i = 0; i < ALL_ALONG.length; i++) {
    const a = ALL_ALONG[i];
    if (typeof a === 'string') await page.keyboard.type(a);
    else if (typeof a === 'number') await page.keyboard.press(String(a + 1));
    else {
      await page.keyboard.press(String(a.first + 1));
      await page.keyboard.press('Enter');
      const nth = TYPES[i] === 'switch' ? (a.final === a.first ? 0 : 1) : a.final;
      await page.keyboard.press(String(nth + 1));
    }
    await page.keyboard.press('Enter');
  }
  await expect(page.getByRole('heading', { name: 'Where you followed the herd' })).toBeVisible();
  await expect(page.locator('.status.along')).toHaveCount(11);
});

test('quitting mid-way, even mid-reveal, resumes at the same step', async ({ page }) => {
  await page.getByRole('button', { name: /^Start/ }).click();
  await answerAt(page, 0, 1);
  await answerAt(page, 1, 0);
  await page.locator('label.opt').nth(0).click();
  await page.locator('#next').click(); // now on the reveal
  await page.reload();
  await page.getByRole('button', { name: /Resume at 3 of 12/ }).click();
  await expect(page.getByText(/71% of people/)).toBeVisible();
  await page.locator('label.opt').nth(0).click();
  await page.locator('#next').click();
  for (let i = 3; i < 12; i++) await answerAt(page, i, NONE_ALONG[i]);
  await expect(page.locator('.status.along')).toHaveCount(0);
  await page.getByRole('link', { name: /Home/ }).click();
  await expect(page.getByRole('heading', { name: 'Your results over time' })).toBeVisible();
  await expect(page.getByRole('button', { name: /Resume/ })).toHaveCount(0);
});

test('a shared link shows a friend’s counts; a broken one says so', async ({ page }) => {
  await page.goto('/#r=v2.2-0-1-1-0');
  await expect(page.getByRole('heading', { name: 'A friend’s result' })).toBeVisible();
  await expect(page.locator('.kcard').first()).toContainText('Went along 2 of 3 times');
  await page.goto('/#r=v1.9-9-9');
  await expect(page.getByRole('heading', { name: 'This link doesn’t hold a result' })).toBeVisible();
  await page.getByRole('button', { name: 'Start' }).click();
  await expect(page.getByText('1 of 12')).toBeVisible();
  expect(page.url()).not.toContain('#r=');
});

test('share builds a link with only the counts', async ({ page, browserName, context }) => {
  test.skip(browserName !== 'chromium', 'clipboard permission is Chromium-only in Playwright');
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await runAll(page, ALL_ALONG);
  await page.getByRole('button', { name: /Copy a link/ }).click();
  await expect(page.locator('#toast')).toContainText('Link copied');
  const text = await page.evaluate(() => navigator.clipboard.readText());
  expect(text).toMatch(/#r=v2\.3-2-2-2-2$/);
});

test('settings: theme and text size apply at once and survive a reload', async ({ page }) => {
  await page.getByRole('button', { name: 'Settings' }).click();
  await page.locator('label', { hasText: 'Dark' }).click();
  await page.locator('label', { hasText: 'Large' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('html')).toHaveAttribute('data-text', 'large');
  await page.getByRole('button', { name: 'Done' }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(bg).toBe('rgb(23, 21, 19)');
});

test('settings open with the keyboard shortcut and clear history with a second click', async ({ page }) => {
  await runAll(page, NONE_ALONG);
  await page.keyboard.press('ControlOrMeta+Comma');
  await expect(page.locator('#settings')).toBeVisible();
  await expect(page.locator('#data-note')).toContainText('1 past result');
  const clear = page.getByRole('button', { name: 'Clear past results' });
  await clear.click();
  await page.getByRole('button', { name: 'Click again to clear' }).click();
  await expect(page.locator('#data-note')).toContainText('No past results yet');
});

test('works when storage is blocked', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new Error('blocked'); } });
  });
  await page.goto('/');
  await runAll(page, ALL_ALONG);
  await expect(page.locator('.status.along')).toHaveCount(11);
});

test('AQ-10 screener is optional, separate, and scored', async ({ page }) => {
  await runAll(page, NONE_ALONG);
  await page.getByRole('button', { name: 'Take the screener' }).click();
  await expect(page.getByText('not a diagnosis').or(page.getByText('smoke alarm'))).toBeVisible();
  await page.getByRole('button', { name: 'Begin' }).click();
  for (let i = 0; i < 10; i++) {
    await expect(page.getByText(`${i + 1} of 10`)).toBeVisible();
    await page.locator('label.opt').nth(1).click(); // Slightly agree on every statement
  }
  // Slightly agree everywhere scores the four agree-keyed items.
  await expect(page.getByRole('heading', { name: 'You scored 4 out of 10' })).toBeVisible();
  await expect(page.getByText('below the cut-off of 6')).toBeVisible();
  await page.getByRole('button', { name: 'Back to results' }).click();
  await expect(page.locator('.status.along')).toHaveCount(0);
});

test('results lead with the herd rate and its range', async ({ page }) => {
  await runAll(page, ALL_ALONG);
  await expect(page.locator('.hero-num')).toHaveText('100%');
  await expect(page.locator('.metric')).toContainText('7 of the 7 herd questions');
  await expect(page.locator('.metric')).toContainText('Likely range 65%\u2013100%');
  await expect(page.locator('.metric')).toContainText('moved 1.0 step toward the group');
  await page.getByText('How these numbers are worked out').click();
  await expect(page.locator('.defs').first()).toContainText('yours: 7');
});

test('second attempt gets fresh questions, and the chart appears', async ({ page }) => {
  await runAll(page, NONE_ALONG);
  await expect(page.getByText('This is your first attempt')).toBeVisible();
  await page.getByRole('button', { name: 'Take it again' }).click();
  await expect(page.getByRole('heading', { name: /kettle/ })).toBeVisible();
  for (let i = 0; i < ALL_ALONG.length; i++) await answerAt(page, i, ALL_ALONG[i]);
  await expect(page.locator('.trend-wrap .dot')).toHaveCount(2);
  await page.locator('.trend-wrap .hit').first().focus();
  await expect(page.locator('.trend-wrap .tip')).toContainText('Attempt 1');
  await page.getByText('Show as a table').click();
  await expect(page.locator('.trend-table tbody tr')).toHaveCount(2);
  await expect(page.getByText('1 fresh set left')).toBeVisible();
});

test('export, then import into a clean browser by upload, drop and paste', async ({ page, browserName }, testInfo) => {
  await runAll(page, NONE_ALONG);
  const [download] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: 'Export' }).first().click()]);
  expect(download.suggestedFilename()).toBe('Do You Think On Your Own results.json');
  const path = testInfo.outputPath('results.json');
  await download.saveAs(path);
  const text = readFileSync(path, 'utf8');
  expect(JSON.parse(text).attempts).toHaveLength(1);

  // Upload button
  await page.evaluate(() => localStorage.clear());
  await page.goto('/');
  const [chooser] = await Promise.all([page.waitForEvent('filechooser'), page.getByRole('button', { name: 'Import' }).click()]);
  await chooser.setFiles(path);
  await expect(page.locator('#toast')).toContainText('Imported 1 attempt');
  await expect(page.getByText('One attempt so far')).toBeVisible();

  // Importing the same file again skips the duplicate.
  const [chooser2] = await Promise.all([page.waitForEvent('filechooser'), page.getByRole('button', { name: 'Import' }).click()]);
  await chooser2.setFiles(path);
  await expect(page.locator('#toast')).toContainText('Imported 0 attempts (1 already here)');

  // Drop anywhere
  await page.evaluate(() => localStorage.clear());
  await page.goto('/');
  await page.evaluate((t) => {
    const dt = new DataTransfer();
    dt.items.add(new File([t], 'r.json', { type: 'application/json' }));
    document.querySelector('main').dispatchEvent(new DragEvent('drop', { dataTransfer: dt, bubbles: true, cancelable: true }));
  }, text);
  await expect(page.locator('#toast')).toContainText('Imported 1 attempt');

  // Paste the text, and reject junk
  await page.evaluate(() => localStorage.clear());
  await page.goto('/');
  await page.evaluate((t) => {
    const dt = new DataTransfer();
    dt.setData('text/plain', t);
    document.body.dispatchEvent(new ClipboardEvent('paste', { clipboardData: dt, bubbles: true, cancelable: true }));
  }, text);
  await expect(page.locator('#toast')).toContainText('Imported 1 attempt');
  const [chooser3] = await Promise.all([page.waitForEvent('filechooser'), page.getByRole('button', { name: 'Import' }).click()]);
  await chooser3.setFiles({ name: 'bad.json', mimeType: 'application/json', buffer: Buffer.from('{"nope":1}') });
  await expect(page.locator('#toast')).toContainText('isn\u2019t a Do You Think On Your Own results file');
});

test('phone width never scrolls sideways', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.getByRole('button', { name: /^Start/ }).click();
  for (let i = 0; i < NONE_ALONG.length; i++) {
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    await answerAt(page, i, NONE_ALONG[i]);
  }
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});
