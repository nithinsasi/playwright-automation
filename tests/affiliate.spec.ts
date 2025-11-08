import { test, expect } from '@playwright/test';

test('Affiliate promotion creation flow', async ({ page }) => {
  // Increase overall test timeout to 2 minutes
  test.setTimeout(120000);

  // Step 1: Login (using environment variables)
  await page.goto('https://hf.buzops.com/portal');
  await page.getByRole('textbox', { name: 'User name/Email/Mobile Number' })
    .fill(process.env.TEST_USERNAME || 'test@example.com');
  await page.getByRole('textbox', { name: 'Password here...' })
    .fill(process.env.TEST_PASSWORD || 'password');
  await page.getByRole('button', { name: 'SIGN IN' }).click();

  // Step 2: Navigate to Owner section
  await page.getByRole('link', { name: 'Owner' }).click();

  // Step 3: Go to Affiliate Program page
  await page.goto('https://hf.buzops.com/Common/Club/AffiliateProgram#!/');

  // Step 4: Interact with iframe using frameLocator
  const frame = page.frameLocator('#myiFrame');

  // Wait for Promotions tab and click
  await frame.getByText('Promotions').waitFor({ timeout: 60000 });
  await frame.getByText('Promotions').click();

  // Add Promotion
  await frame.getByRole('button', { name: 'Add Promotion' }).click();

  // Select promotion type
  await frame.locator('select[name="PromotionType"]').selectOption('4');

  // Select discount option
  await frame.getByText('$7.5 Off')
    .filter({ hasText: /^\$7\.5 Off$/ })
    .locator('span')
    .first()
    .click();

  // Navigate to Settings
  await frame.getByText('Settings').click();

  // Set attribution type
  await frame.locator('div').filter({ hasText: /^Last Interaction$/ }).locator('span').first().click();

  // Complete promotion
  await frame.getByRole('button', { name: 'Done' }).click();
  
  // TODO: Add assertions to verify promotion created successfully
  // await expect(frame.getByText('Promotion created')).toBeVisible();
});

