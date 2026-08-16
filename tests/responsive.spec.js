import { test, expect } from '@playwright/test';

test('mobile navigation can open and close on mobile viewport', async ({ page }) => {
  test.skip(test.info().project.name !== 'mobile-chrome', 'Mobile navigation is only tested on the mobile project.');

  await page.goto('/');
  const toggle = page.locator('.nav-toggle');
  const navLinks = page.locator('.nav-links');

  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect(navLinks).toHaveClass(/mobile-open/);
  await toggle.click();
  await expect(navLinks).not.toHaveClass(/mobile-open/);
});

test('page has no horizontal overflow on mobile', async ({ page }) => {
  test.skip(test.info().project.name !== 'mobile-chrome', 'Overflow check is only required for the mobile project.');

  await page.goto('/');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow, 'Horizontal page overflow detected').toBeLessThanOrEqual(1);
});
