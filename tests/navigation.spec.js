import { test, expect } from '@playwright/test';

test('main navigation links do not point to obvious dead placeholders', async ({ page }) => {
  await page.goto('/');
  const links = await page.locator('a[href]').evaluateAll(anchors =>
    anchors
      .map(a => ({ href: a.getAttribute('href'), text: (a.textContent || '').trim() }))
      .filter(x => x.href && x.href.startsWith('/') && !x.href.startsWith('//'))
  );

  const unique = [...new Map(links.map(x => [x.href, x])).values()];
  expect(unique.length).toBeGreaterThan(0);

  for (const link of unique) {
    expect(link.href).not.toMatch(/^\/undefined/);
    expect(link.href).not.toMatch(/^\/null/);
  }
});

test('unknown SPA route renders a clear not-found state', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => window.navigateTo('/this-route-should-not-exist-qa'));
  await expect(page.locator('#app')).toContainText(/404|not found|couldn.?t find that page|page.*exist/i);
});
