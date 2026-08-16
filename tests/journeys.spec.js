import { test, expect } from '@playwright/test';

async function openSignup(page) {
  await page.goto('/');

  const visibleSignup = page.locator('a[href="/signup"]:visible, button:visible').filter({ hasText: /sign up|get started|join/i }).first();

  if (await visibleSignup.count()) {
    await visibleSignup.click();
  } else {
    const menuToggle = page.locator('.nav-toggle:visible').first();
    if (await menuToggle.count()) {
      await menuToggle.click();
      const mobileSignup = page.locator('.nav-links.mobile-open a[href="/signup"]:visible').first();
      if (await mobileSignup.count()) {
        await mobileSignup.click();
      } else {
        await page.evaluate(() => window.navigateTo('/signup'));
      }
    } else {
      await page.evaluate(() => window.navigateTo('/signup'));
    }
  }

  await expect(page).toHaveURL(/\/signup$/);
  await expect(page.locator('#app')).not.toBeEmpty();
}

function founderEntry(page) {
  return page.locator('.role-card[data-role="entrepreneur"]');
}

function investorEntry(page) {
  return page.locator('.role-card[data-role="investor"]');
}

test.describe('Founder journey', () => {
  test('signup exposes a visible founder/entrepreneur entry point', async ({ page }) => {
    await openSignup(page);
    const entry = founderEntry(page);
    await expect(entry).toHaveCount(1);
    await expect(entry).toBeVisible();
    await expect(entry).toContainText(/founder|entrepreneur/i);
  });

  test('founder entry starts a valid journey without a dead route', async ({ page }) => {
    await openSignup(page);
    const entry = founderEntry(page);
    await expect(entry).toBeVisible();
    await entry.click();
    await expect(page.locator('#roleInput')).toHaveValue('entrepreneur');
    await expect(page.locator('#entrepreneurFields')).toBeVisible();
    await expect(page.locator('#investorFields')).toBeHidden();
    await expect(page.locator('body')).not.toContainText(/404|couldn.?t find that page/i);
  });
});

test.describe('Investor journey', () => {
  test('signup exposes a visible investor entry point', async ({ page }) => {
    await openSignup(page);
    const entry = investorEntry(page);
    await expect(entry).toHaveCount(1);
    await expect(entry).toBeVisible();
    await expect(entry).toContainText(/investor/i);
  });

  test('investor entry starts a valid journey without a dead route', async ({ page }) => {
    await openSignup(page);
    const entry = investorEntry(page);
    await expect(entry).toBeVisible();
    await entry.click();
    await expect(page.locator('#roleInput')).toHaveValue('investor');
    await expect(page.locator('#investorFields')).toBeVisible();
    await expect(page.locator('#entrepreneurFields')).toBeHidden();
    await expect(page.locator('body')).not.toContainText(/404|couldn.?t find that page/i);
  });
});

test('founder and investor entry points remain available on mobile', async ({ page }) => {
  test.skip(test.info().project.name !== 'mobile-chrome', 'Mobile journey coverage runs on the mobile project.');
  await openSignup(page);

  const founder = founderEntry(page);
  const investor = investorEntry(page);

  await expect(founder).toBeVisible();
  await expect(investor).toBeVisible();
});
