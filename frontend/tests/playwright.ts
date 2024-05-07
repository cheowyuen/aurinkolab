import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('localhost:5173');
  
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/AurinkoLab/);
});

test("the main page has a link : Contact", async ({ page }) => {
  await page.goto('localhost:5173');
  // Expect to have a link --Contact- in the main page
  await page.locator(`a >> text='Contact'`).click();

});


test("the main page has a link : Apply Now", async ({ page }) => {
  await page.goto('localhost:5173');
  /**Expect to have a link --Apply Now-- in the main page */
  await page.locator(`a >> text='Apply Now'`).click();

});

