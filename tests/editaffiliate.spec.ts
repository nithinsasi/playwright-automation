import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://hf.buzops.com/portal');
  await page.getByRole('textbox', { name: 'User name/Email/Mobile Number' }).click();
  await page.getByRole('textbox', { name: 'User name/Email/Mobile Number' }).fill('roronoaz@test.com');
  await page.getByRole('textbox', { name: 'Password here...' }).click();
  await page.getByRole('textbox', { name: 'Password here...' }).fill('Zoro@123');
  await page.getByRole('button', { name: 'SIGN IN' }).click();
  await page.getByRole('link', { name: '󰃦 Affiliate Program' }).click();
  await page.locator('#myiFrame').contentFrame().getByRole('menubar').getByText('Affiliates').click();
  await page.locator('#myiFrame').contentFrame().getByText('Ram Kumar').click();
  await page.locator('#myiFrame').contentFrame().getByRole('button', { name: '󰚼 Edit Profile' }).click();
  await page.locator('#myiFrame').contentFrame().getByRole('textbox', { name: 'Enter Phone Number' }).click();
  await page.locator('#myiFrame').contentFrame().getByRole('textbox', { name: 'Enter Phone Number' }).fill('(642) 646-28462');
  await page.locator('#myiFrame').contentFrame().getByRole('button', { name: 'Toggle calendar' }).click();
  await page.locator('#myiFrame').contentFrame().getByRole('button', { name: 'November' }).click();
  await page.locator('#myiFrame').contentFrame().getByRole('listitem').filter({ hasText: '2000' }).click();
  await page.locator('#myiFrame').contentFrame().locator('[id="90f4670e-20ce-417c-a444-85855f351aea1075573800000"]').getByText('Feb').click();
  await page.locator('#myiFrame').contentFrame().locator('[id="90f4670e-20ce-417c-a444-85855f351aea-1937280600000"]').getByText('12').click();
  await page.locator('#myiFrame').contentFrame().getByText('Please Select').click();
  await page.locator('#myiFrame').contentFrame().getByRole('option', { name: 'Arkansas' }).click();
  await page.locator('#myiFrame').contentFrame().getByRole('textbox', { name: 'Enter Zip Code' }).click();
  await page.locator('#myiFrame').contentFrame().getByRole('textbox', { name: 'Enter Zip Code' }).fill('35346');
  await page.locator('#myiFrame').contentFrame().getByRole('button', { name: 'Save' }).click();
});