import { test, expect } from '@playwright/test';

test('Affiliate signup flow', async ({ page }) => {
  // Set default timeout for all waiting operations
  page.setDefaultTimeout(30000);

  // Navigate and wait for the page to be ready
  await page.goto('https://hf.buzops.com/portal', { waitUntil: 'networkidle' });

  // Login process with explicit waits
  const usernameField = page.getByRole('textbox', { name: 'User name/Email/Mobile Number' });
  await usernameField.waitFor({ state: 'visible' });
  await usernameField.click();
  await usernameField.fill(process.env.TEST_USERNAME || 'test@example.com');

  const passwordField = page.getByRole('textbox', { name: 'Password here...' });
  await passwordField.waitFor({ state: 'visible' });
  await passwordField.click();
  await passwordField.fill(process.env.TEST_PASSWORD || 'password');

  await page.getByRole('button', { name: 'SIGN IN' }).click();

  // Wait for navigation after login
  await page.waitForLoadState('networkidle');

  // Click Owner link and wait for the page to settle
  const ownerLink = page.getByRole('link', { name: 'Owner' });
  await ownerLink.waitFor({ state: 'visible', timeout: 15000 });
  await ownerLink.click();
  await page.waitForLoadState('networkidle');

  // Navigate to Affiliate Program
  await page.goto('https://hf.buzops.com/Common/Club/AffiliateProgram#!/');
  await page.waitForLoadState('networkidle');

  // Wait for iframe to be available
  const frame = page.frameLocator('#myiFrame');

  // Wait for and click Affiliate tab
  await frame.getByText('Affiliate', { exact: true }).waitFor({ timeout: 30000 });
  await frame.getByText('Affiliate', { exact: true }).click();

  // Wait for loading to complete
  await page.waitForSelector('#page-loading', { state: 'hidden', timeout: 30000 });

  // Click Settings tab
  await frame.getByText('Settings').click();

  // Interact with signup form checkbox
  await frame.locator('label').filter({ hasText: 'Sign Up Form' }).locator('span').first().click();

  // TODO: Complete the signup flow and add assertions
  // await expect(frame.getByText('Signup successful')).toBeVisible();
});
