import { test, expect } from '@playwright/test';

test('mobile navigation can open and close', async ({ page }) => {
  await page.goto('/');
  const toggle = page.locator('.nav-toggle');
  const navLinks = page.locator('.nav-links');

  if (await toggle.count()) {
    await toggle.click();
    await expect(navLinks).toHaveClass(/mobile-open/);
    await toggle.click();
    await expect(navLinks).not.toHaveClass(/mobile-open/);
  } else {
    test.skip(true, 'Mobile navigation toggle is not present on this viewport.');
  }
});

test('page has no horizontal overflow on mobile', async ({ page }) => {
  await page.goto('/');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow, 'Horizontal page overflow detected').toBeLessThanOrEqual(1);
});
