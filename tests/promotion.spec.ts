import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('Affiliate promotion creation flow', async ({ page }) => {
  // Increase overall test timeout to 2 minutes
  test.setTimeout(120000);

  // Generate fake data
  const promoName = faker.commerce.productName();  // e.g., 'Acers promotions'
  const formName = faker.hacker.noun();            // e.g., 'New Form'

  // Step 1: Login
  await page.goto('https://hf.buzops.com/portal');
  await page.getByRole('textbox', { name: 'User name/Email/Mobile Number' }).fill('staffaravind@gmail.com');
  await page.getByRole('textbox', { name: 'Password here...' }).fill('Pass@123');
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
  await frame.getByRole('button', { name: ' Add Promotion' }).click();

  // Fill Promotion Name with fake data
  await frame.getByRole('textbox', { name: 'Enter Promotion Name' }).fill(promoName);

  // Fill Form Name with fake data
  await frame.getByRole('textbox', { name: 'Enter Form Name' }).fill(formName);

  // Select Form
  await frame.getByText('Select a Form').click();
  await frame.getByText('Form Name', { exact: true }).click();

  // Add Reward
  await frame.getByRole('button', { name: 'Add Reward dropdownbutton' }).click();
  await frame.getByText('Sale Reward').click();
  await frame.getByText('35% commission for 2 charge').click();

  // Add Offer
  await frame.getByRole('button', { name: ' Add Offer' }).click();
  await frame.locator('div').filter({ hasText: /^\$7\.5 Off$/ }).click();

  // Create Promotion
  await frame.getByRole('button', { name: 'Create Promotion' }).click({ timeout: 60000 });

  // Confirm Done
  await frame.getByRole('button', { name: 'Done' }).click();
});
