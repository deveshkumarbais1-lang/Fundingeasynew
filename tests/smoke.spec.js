import { test, expect } from '@playwright/test';

const publicRoutes = [
  ['/', /Funding Easy/i],
  ['/login', /Welcome back/i],
  ['/signup', /Create/i],
  ['/how-it-works', /How It Works/i],
  ['/why-us', /The Funding Easy Advantage|Why.*Choose Us/i],
  ['/about', /Our Mission|Democratizing Private Capital/i],
  ['/faq', /Frequently Asked Questions/i],
  ['/security', /Security/i],
  ['/contact', /Contact/i],
  ['/privacy', /Privacy/i],
  ['/terms', /Terms/i],
];

test.describe('FundingEasy smoke tests', () => {
  test('homepage renders without browser errors', async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });

    await page.goto('/');
    await expect(page.locator('#app')).not.toBeEmpty();
    await expect(page.locator('body')).toContainText(/Funding Easy/i);
    expect(errors, `Browser errors found: ${errors.join('\n')}`).toEqual([]);
  });

  for (const [route, expectedText] of publicRoutes) {
    test(`public route ${route} renders`, async ({ page }) => {
      await page.goto('/');
      await page.evaluate((target) => window.navigateTo(target), route);
      await expect(page).toHaveURL(new RegExp(`${route.replace('/', '\\/')}(?:\\?.*)?$`));
      await expect(page.locator('#app')).not.toBeEmpty();
      await expect(page.locator('body')).toContainText(expectedText);
    });
  }
});
