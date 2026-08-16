import { test, expect } from '@playwright/test';

async function openSignup(page) {
  await page.goto('/');
  const signup = page.locator('a[href="/signup"], button').filter({ hasText: /sign up|get started|join/i }).first();
  if (await signup.count()) {
    await signup.click();
  } else {
    await page.evaluate(() => window.navigateTo('/signup'));
  }
  await expect(page).toHaveURL(/\/signup$/);
  await expect(page.locator('#app')).not.toBeEmpty();
}

async function findJourneyEntry(page, pattern) {
  const candidates = page.locator('a, button, [role="button"], label').filter({ hasText: pattern });
  const count = await candidates.count();
  if (!count) return null;
  return candidates.first();
}

test.describe('Founder journey', () => {
  test('signup exposes a founder/entrepreneur entry point', async ({ page }) => {
    await openSignup(page);
    const entry = await findJourneyEntry(page, /founder|entrepreneur|business/i);
    expect(entry, 'Signup page should expose a Founder/Entrepreneur entry point').not.toBeNull();
    await expect(entry).toBeVisible();
  });

  test('founder entry starts a valid journey without a dead route', async ({ page }) => {
    await openSignup(page);
    const entry = await findJourneyEntry(page, /founder|entrepreneur|business/i);
    expect(entry, 'Founder/Entrepreneur entry point is missing').not.toBeNull();
    await entry.click();
    await expect(page.locator('#app')).not.toBeEmpty();
    await expect(page.locator('body')).not.toContainText(/404|couldn.?t find that page/i);
  });
});

test.describe('Investor journey', () => {
  test('signup exposes an investor entry point', async ({ page }) => {
    await openSignup(page);
    const entry = await findJourneyEntry(page, /investor|invest/i);
    expect(entry, 'Signup page should expose an Investor entry point').not.toBeNull();
    await expect(entry).toBeVisible();
  });

  test('investor entry starts a valid journey without a dead route', async ({ page }) => {
    await openSignup(page);
    const entry = await findJourneyEntry(page, /investor|invest/i);
    expect(entry, 'Investor entry point is missing').not.toBeNull();
    await entry.click();
    await expect(page.locator('#app')).not.toBeEmpty();
    await expect(page.locator('body')).not.toContainText(/404|couldn.?t find that page/i);
  });
});


test('founder and investor entry points remain available on mobile', async ({ page }) => {
  test.skip(test.info().project.name !== 'mobile-chrome', 'Mobile journey coverage runs on the mobile project.');
  await openSignup(page);
  const founder = await findJourneyEntry(page, /founder|entrepreneur|business/i);
  const investor = await findJourneyEntry(page, /investor|invest/i);
  expect(founder, 'Founder entry point missing on mobile').not.toBeNull();
  expect(investor, 'Investor entry point missing on mobile').not.toBeNull();
  await expect(founder).toBeVisible();
  await expect(investor).toBeVisible();
});
