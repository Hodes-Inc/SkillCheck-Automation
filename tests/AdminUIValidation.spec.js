const { test, expect } = require('@playwright/test');
const config = require('../config/config');
const { LoginToSkillCheck, addQuestionToTest } = require('../utils/common');
const { softExpect, assertAll, resetSoftAsserts } = require('../utils/softAssert');
const gridTitles = [
    'Completed Tests',
    'Quick Links',
    'Pending Sessions',
    'Account Status',
    'Test Completion Rate',
    'Testing Activity',
    'Top Test Titles',
    'User Activity (Past 90 Days)'
    
  ];
test('Verify all grids and Quick Links are displayed or not', async ({ page }) => {
    await LoginToSkillCheck(page, config.adminURL,config.users.candidate.accountID, config.users.candidate.username, config.users.candidate.password);  
    await page.waitForTimeout(3000);
    for (const title of gridTitles) {
        await softExpect(
          () => expect(page.locator('label.widgetlabel', { hasText: title })).toBeVisible(),
          `Missing grid: ${title}`
        );
      }
   
    await softExpect(() => expect(page.locator('div[routerlink="/home/administertests"]')).toBeVisible(), 'Missing link Launch a Session');
    await softExpect(() => expect(page.locator('div[routerlink="/home/invitation"]')).toBeVisible(), 'Missing link Email Session Invitations');
    await softExpect(() => expect(page.locator('div[routerlink="/home/testinglinks"]')).toBeVisible(), 'Missing link Create Session Links');
    await softExpect(() => expect(page.locator('div[routerlink="/home/pendingsessions"]')).toBeVisible(), 'Missing link Manage Sessions');
    await softExpect(() => expect(page.locator('div[routerlink="/home/settings"]')).toBeVisible(), 'Missing link Account Settings');
    await softExpect(() => expect(page.locator('div[routerlink="/home/advancedoptions"]')).toBeVisible(), 'Missing link Advanced Options');
    await softExpect(() => expect(page.locator('div[routerlink="/home/scoressearch"]')).toBeVisible(), 'Missing link Search for scores');
    await softExpect(() => expect(page.locator('div', { hasText: 'Test Builder' })).toBeVisible(), 'Missing link Test Builder');
    await softExpect(() => expect(page.locator('div[mattooltip="View account activity and usage reports"]')).toBeVisible(), 'Missing link Reports');
    await softExpect(() => expect(page.locator('div[mattooltip="ODI Manager"]')).toBeVisible(),'Missing link ODI Manager');
    assertAll();
});