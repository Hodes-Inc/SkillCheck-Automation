// tests/google-search.spec.js
const { test, expect } = require('@playwright/test');
const { LoginToSkillCheck, addQuestionToTest } = require('../utils/common');
const config = require('../config/config');
let testName = 'Automation-Test'+Date.now();
test('Create and take an assessment in skill check', async ({ page }) => {
  try{
  //testName='Automation-Test1745856835879';
  await LoginToSkillCheck(page, config.adminURL,config.users.admin.accountID, config.users.admin.username, config.users.admin.password);  
  await page.waitForTimeout(3000);
  await page.click('a:has-text("Test Builder")'); 
  await page.click('a:has-text("I understand")');
  await page.click('span#questionFormMenuItem');
  console.log(testName);
  await page.fill('input#testTitleDisplay', testName);
  await page.fill('input#testDescription', 'This test is created through automation');
  await page.selectOption('#numAttempts', { label: 'No Limit' }, { force: true });
  await page.selectOption('#estAdminTime', { label: '5 minutes' }, { force: true });
  await page.locator('#itemCountDisplay').click();
  //Add first question
  // Click 'Add question' button
  await addQuestionToTest(page, 'Java1', 'Automation-Java', 'Which component is used to compile, debug and execute the java programs?', ['JRE', 'JDK', 'JVM']);
  //Add second question
  await addQuestionToTest(page, 'Java2', 'Automation-Java', 'Which of the following is not a Java feature?', ['Object-oriented', 'Use of pointers', 'Dynamic']);
  //Add third question
  await addQuestionToTest(page, 'Java3', 'Automation-Java', 'Which of these cannot be used for a variable name in Java?', ['identifier', 'identifier & keyword', 'keyword']);
  await page.waitForTimeout(3000);
  await page.locator('#saveTestButton').click();
  await page.waitForTimeout(3000);
  // Click the "Publish Test" button
  await page.locator('a#publishTestButton').click();
  //await page.waitForTimeout(8000);
  // Click the "Do Publish" button
  await page.locator('a#doPublishButton').click();
  //await page.waitForResponse(3000);
  await LoginToSkillCheck(page, config.adminURL,config.users.candidate.accountID, config.users.candidate.username, config.users.candidate.password);  
  //await page.waitForTimeout(3000);
    // Click 'Launch a Session'
    await page.locator('div.box', { hasText: 'Launch a Session' }).click();

  console.log(testName);
    // Wait for the session to be ready (better to wait for selector)
    
  
    // Open the first mat-select dropdown
    await page.locator('mat-select').first().locator('.mat-select-trigger').click();
  
    await page.waitForTimeout(2000);
  
    // Type in test name
    await page.locator('#mat-input-0').fill(testName);
    await page.keyboard.press('Enter');
  
    await page.waitForTimeout(2000);
  
    // Assert that testName is visible
    //await expect(page.locator(`text=${testName}`)).toBeVisible();
  
    // Click on the specific test name with tokens
    await page.locator('label', { hasText:`${testName} (Tokens: 1)`}).click();

  
    // Click buttons in flow
    await page.locator('button', { hasText: 'ADD AVAILABLE' }).click();
    await page.locator('button', { hasText: 'Next' }).click();
    await page.locator('button', { hasText: 'Start Test' }).click();
  
    await page.waitForTimeout(2000);
  
    // Fill user details
    await page.locator('input[name="txtFirstName"]').fill('Automation');
    await page.locator('input#txtLastName').fill('Test');
    await page.locator('input#txtEmail').fill('Test@gmail.com');
  
    await page.locator('button', { hasText: 'Next' }).click();
  
    //await page.waitForTimeout(2000);
  
    await page.locator('button#btnBeginTest').click();
  
    // Answer first question
    await page.locator('#options_btn0').click({ force: true });
    await page.locator('button#btnAnswerComplete').click();
  
    //await page.waitForTimeout(2000);
  
    // Skip next question
    await page.locator('#btnAnswerSkip').click();
  
    await page.waitForTimeout(3000);
  
    // Answer another question
    await page.locator('#button2').click({ force: true });
    await page.locator('button#btnAnswerComplete').click();
  
    await page.waitForTimeout(2000);
  
    // Continue
    await page.locator('button#btnContinue').click();
  
    await page.waitForTimeout(2000);
  
    // Exit
    await page.locator('button#btnExitTestSession').click();
  
    await page.waitForTimeout(3000);
  
    // Assertions for result images
    const rows = page.locator('table tbody tr');
  
    await expect(rows.nth(1).locator('td').nth(2).locator('img'))
      .toHaveAttribute('alt', /Incorrect/);
  
    await expect(rows.nth(2).locator('td').nth(2).locator('img'))
    .toHaveAttribute('alt', /Correct/);
      
    await expect(rows.nth(3).locator('td').nth(2).locator('img'))
    .toHaveAttribute('alt', /Not Attempted/);
    //delete created test  
    await LoginToSkillCheck(page, config.adminURL,config.users.admin.accountID, config.users.admin.username, config.users.admin.password);  
    await page.waitForTimeout(3000);
    await page.click('a:has-text("Test Builder")'); 
    await page.click('a:has-text("I understand")');
    await page.click('li#openTestButton');
    await page.waitForTimeout(5000);
    await page.locator('a', { hasText: `${testName}` }).click();
    await page.waitForTimeout(5000);
    await page.click('a#deleteTestButton');
    await page.click('a#doDeleteButton');
    //await page.waitForTimeout(9000);
  }catch(e){
    console.error('Error happened:', e);
    const videoPath = await page.video().path();
    console.log('Saved video at:', videoPath);
    throw e; // rethrow so the test still fails
  }
});



