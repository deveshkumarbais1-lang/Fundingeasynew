import { test, expect } from '@playwright/test';

test.describe('Authentication UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.navigateTo('/login'));
  });

  test('login form is present and submit starts disabled', async ({ page }) => {
    await expect(page.locator('#loginForm')).toBeVisible();
    await expect(page.locator('#emailInput')).toBeVisible();
    await expect(page.locator('#passwordInput')).toBeVisible();
    await expect(page.locator('#submitBtn')).toBeDisabled();
  });

  test('invalid email keeps login disabled', async ({ page }) => {
    await page.locator('#emailInput').fill('not-an-email');
    await page.locator('#passwordInput').fill('anything');
    await expect(page.locator('#submitBtn')).toBeDisabled();
  });

  test('valid email and non-empty password enable login', async ({ page }) => {
    await page.locator('#emailInput').fill('qa@example.com');
    await page.locator('#passwordInput').fill('not-a-real-password');
    await expect(page.locator('#submitBtn')).toBeEnabled();
  });

  test('password visibility toggle works', async ({ page }) => {
    const password = page.locator('#passwordInput');
    await password.fill('Secret123');
    await expect(password).toHaveAttribute('type', 'password');
    await page.locator('#togglePasswordBtn').click();
    await expect(password).toHaveAttribute('type', 'text');
    await expect(page.locator('#togglePasswordBtn')).toHaveText('Hide');
  });

  test('forgot password shows a clear sandbox message instead of navigating to a dead page', async ({ page }) => {
    await page.locator('#forgotPasswordLink').click();
    await expect(page.locator('#stateAlert')).toContainText(/password reset is disabled/i);
  });

  test('signup link routes to signup view', async ({ page }) => {
    await page.locator('a[data-link][href="/signup"]').click();
    await expect(page).toHaveURL(/\/signup$/);
    await expect(page.locator('#app')).not.toBeEmpty();
  });
});
