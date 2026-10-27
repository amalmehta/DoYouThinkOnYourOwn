import { test, expect } from '@playwright/test';

// One answer per task, in task order: g1 a1 c1 i1 a2 g2 c2 a3 i2 c3 g3 a4.
// Numbers are typed; indexes pick the nth option; null keeps a pre-ticked answer.
const ALL_ALONG = ['20', 2, 1, 0, 3, '50', 1, 2, null, 0, '15', 2];
const NONE_ALONG = ['10', 0, 0, 1, 1, '4', 0, 0, 1, 1, '29', 1];

async function answer(page, a) {
  if (typeof a === 'string') await page.locator('#num').fill(a);
  else if (a !== null) await page.locator('label.opt').nth(a).click();
  await page.locator('#next').click();
}

async function runAll(page, plan) {
  await page.getByRole('button', { name: /^Start/ }).click();
  for (const a of plan) await answer(page, a);
  await expect(page.getByRole('heading', { name: 'Where you went along' })).toBeVisible();
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

test('going along every time is counted per kind', async ({ page }) => {
  await runAll(page, ALL_ALONG);
  const cards = page.locator('.kinds .kcard');
  await expect(cards.nth(0)).toContainText('Went along every time (4 of 4)');
  await expect(cards.nth(1)).toContainText('Went along every time (3 of 3)');
  await expect(cards.nth(2)).toContainText('Went along every time (2 of 2)');
  await expect(cards.nth(3)).toContainText('Went along every time (3 of 3)');
  await expect(page.locator('.status.along')).toHaveCount(12);
});

test('never going along, with sources opened in a moment', async ({ page }) => {
  await runAll(page, NONE_ALONG);
  await expect(page.locator('.status.along')).toHaveCount(0);
  await expect(page.locator('.kinds')).toContainText('Didn’t go along (0 of 4)');
  const first = page.locator('.moment').first();
  await first.locator('summary').click();
  await expect(first.locator('.reveal')).toContainText('The twist.');
  await expect(first.locator('.sources a').first()).toHaveAttribute('href', /^https:\/\//);
  await expect(first.locator('.invented')).toContainText('invented');
});

test('a gut answer that is neither tempting nor right shows as Neither', async ({ page }) => {
  const plan = [...NONE_ALONG];
  plan[10] = '30';
  await runAll(page, plan);
  await expect(page.locator('.status.neither')).toHaveCount(1);
});

test('Next stays disabled until there is a real answer', async ({ page }) => {
  await page.getByRole('button', { name: /^Start/ }).click();
  const next = page.locator('#next');
  await expect(next).toBeDisabled();
  await page.locator('#num').fill('ten');
  await expect(next).toBeDisabled();
  await page.locator('#num').fill('10');
  await expect(next).toBeEnabled();
  await next.click();
  await expect(page.locator('#next')).toBeDisabled();
  // Rapid clicks on a disabled Next never skip a question.
  await page.locator('#next').click({ force: true, clickCount: 5 });
  await expect(page.getByText('2 of 12')).toBeVisible();
});

test('checking the source shows the evidence and is remembered in the results', async ({ page }) => {
  await page.getByRole('button', { name: /^Start/ }).click();
  await answer(page, '10');
  await page.getByRole('button', { name: 'Check the source' }).click();
  await expect(page.locator('.source-panel')).toContainText('BMJ');
  await expect(page.getByRole('button', { name: 'Check the source' })).toHaveCount(0);
  for (const a of NONE_ALONG.slice(1)) await answer(page, a);
  await expect(page.locator('.moment').first()).toContainText('checked the source');
});

test('the pre-ticked answer is ticked and labelled Recommended', async ({ page }) => {
  await page.getByRole('button', { name: /^Start/ }).click();
  for (const a of NONE_ALONG.slice(0, 8)) await answer(page, a);
  await expect(page.getByText('9 of 12')).toBeVisible();
  await expect(page.locator('input[name="opt"]').first()).toBeChecked();
  await expect(page.locator('.chip')).toHaveText('Recommended');
  await expect(page.locator('#next')).toBeEnabled();
});

test('keyboard only: Enter, number keys and typing', async ({ page }) => {
  await page.keyboard.press('Enter');
  await expect(page.getByText('1 of 12')).toBeVisible();
  for (const a of ALL_ALONG) {
    if (typeof a === 'string') await page.keyboard.type(a);
    else if (a !== null) await page.keyboard.press(String(a + 1));
    await page.keyboard.press('Enter');
  }
  await expect(page.getByRole('heading', { name: 'Where you went along' })).toBeVisible();
  await expect(page.locator('.status.along')).toHaveCount(12);
});

test('quitting mid-way and coming back resumes at the same question', async ({ page }) => {
  await page.getByRole('button', { name: /^Start/ }).click();
  for (const a of NONE_ALONG.slice(0, 5)) await answer(page, a);
  await page.reload();
  await page.getByRole('button', { name: /Resume at 6 of 12/ }).click();
  await expect(page.getByText('6 of 12')).toBeVisible();
  for (const a of NONE_ALONG.slice(5)) await answer(page, a);
  await expect(page.locator('.status.along')).toHaveCount(0);
  await page.getByRole('link', { name: /Home/ }).click();
  await expect(page.getByRole('heading', { name: 'Your past results' })).toBeVisible();
  await expect(page.getByRole('button', { name: /Resume/ })).toHaveCount(0);
});

test('a shared link shows a friend’s counts; a broken one says so', async ({ page }) => {
  await page.goto('/#r=v1.2-0-2-1');
  await expect(page.getByRole('heading', { name: 'A friend’s result' })).toBeVisible();
  await expect(page.locator('.kcard').first()).toContainText('Went along 2 of 4 times');
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
  expect(text).toMatch(/#r=v1\.4-3-2-3$/);
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
  await expect(page.locator('.status.along')).toHaveCount(12);
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

test('phone width never scrolls sideways', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  for (const a of [null, ...NONE_ALONG]) {
    if (a === null) await page.getByRole('button', { name: /^Start/ }).click();
    else await answer(page, a);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  }
});
