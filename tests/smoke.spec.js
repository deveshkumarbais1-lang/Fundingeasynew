import { test, expect } from '@playwright/test';

const publicRoutes = [
  ['/', 'Funding Easy'],
  ['/login', 'Welcome back'],
  ['/signup', 'Create'],
  ['/how-it-works', 'How It Works'],
  ['/why-us', 'Why Funding Easy'],
  ['/about', 'About'],
  ['/faq', 'Frequently Asked Questions'],
  ['/security', 'Security'],
  ['/contact', 'Contact'],
  ['/privacy', 'Privacy'],
  ['/terms', 'Terms'],
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
      await expect(page.locator('body')).toContainText(new RegExp(expectedText, 'i'));
    });
  }
});
