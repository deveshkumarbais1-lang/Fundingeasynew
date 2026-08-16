import { test, expect } from '@playwright/test';

async function openSignup(page) {
  await page.goto('/signup');
  await expect(page).toHaveURL(/\/signup$/);
  await expect(page.locator('#signupForm')).toBeVisible();
}

const founder = '.role-card[data-role="entrepreneur"]';
const investor = '.role-card[data-role="investor"]';

async function fillCommonRequiredFields(page) {
  await page.locator('input[name="name"]').fill('QA Test User');
  await page.locator('input[name="phone"]').fill('9876543210');
  await page.locator('input[name="email"]').fill('qa@example.com');
  await page.locator('#companyInput').fill('QA Test Ventures');
  await page.locator('#passwordInput').fill('StrongPass!2026');
}

test.describe('Signup deep journey', () => {
  test('Founder role selection toggles founder fields and hides investor fields', async ({ page }) => {
    await openSignup(page);
    await page.locator(founder).click();

    await expect(page.locator('#roleInput')).toHaveValue('entrepreneur');
    await expect(page.locator('#entrepreneurFields')).toBeVisible();
    await expect(page.locator('#investorFields')).toBeHidden();
    await expect(page.locator('#companyInput')).toBeVisible();
    await expect(page.locator('#passwordInput')).toBeVisible();
  });

  test('Investor role selection toggles investor fields and hides founder fields', async ({ page }) => {
    await openSignup(page);
    await page.locator(investor).click();

    await expect(page.locator('#roleInput')).toHaveValue('investor');
    await expect(page.locator('#investorFields')).toBeVisible();
    await expect(page.locator('#entrepreneurFields')).toBeHidden();
    await expect(page.locator('#companyOptional')).toBeVisible();
  });

  test('Required signup fields enforce browser validation before submission', async ({ page }) => {
    await openSignup(page);
    const form = page.locator('#signupForm');

    await expect(form.locator('input[required]')).toHaveCount(5);
    await expect(form.locator('input[name="name"]')).toHaveAttribute('required', '');
    await expect(form.locator('input[name="phone"]')).toHaveAttribute('required', '');
    await expect(form.locator('input[name="email"]')).toHaveAttribute('required', '');
    await expect(form.locator('#companyInput')).toHaveAttribute('required', '');
    await expect(form.locator('#passwordInput')).toHaveAttribute('required', '');
  });

  test('Founder signup form accepts valid required data without browser validation errors', async ({ page }) => {
    await openSignup(page);
    await page.locator(founder).click();
    await fillCommonRequiredFields(page);

    const invalid = await page.locator('#signupForm').evaluate(form => !form.checkValidity());
    expect(invalid).toBe(false);
  });

  test('Investor signup form accepts valid required data without browser validation errors', async ({ page }) => {
    await openSignup(page);
    await page.locator(investor).click();
    await fillCommonRequiredFields(page);

    const invalid = await page.locator('#signupForm').evaluate(form => !form.checkValidity());
    expect(invalid).toBe(false);
  });

  test('Signup remains usable on mobile for both roles', async ({ page }) => {
    test.skip(test.info().project.name !== 'mobile-chrome', 'Mobile coverage runs on the mobile project.');
    await openSignup(page);

    await expect(page.locator(founder)).toBeVisible();
    await expect(page.locator(investor)).toBeVisible();

    await page.locator(investor).click();
    await expect(page.locator('#roleInput')).toHaveValue('investor');
    await expect(page.locator('#investorFields')).toBeVisible();

    await page.locator(founder).click();
    await expect(page.locator('#roleInput')).toHaveValue('entrepreneur');
    await expect(page.locator('#entrepreneurFields')).toBeVisible();
  });
});

test.describe('Core route smoke coverage', () => {
  for (const path of ['/login', '/forgot-password', '/signup', '/onboarding', '/dashboard/entrepreneur', '/dashboard/investor']) {
    test(`${path} does not render the 404 page`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('#app')).not.toBeEmpty();
      await expect(page.locator('body')).not.toContainText(/404|couldn.?t find that page/i);
    });
  }
});
