// tests/google-search.spec.js
const { test, expect } = require('@playwright/test');
let testName = 'Automation-Test'+Date.now();
let URL='https://www.fadvassessments.com/onlinetesting/gamma.html';
let testURL='https://gamma.skillcheck.com/';
test('Create and take an assessment in skill check', async ({ page }) => {
  //testName='Automation-Test1745856835879';
  LoginToSkillCheck(page, URL,'marc2', 'Administrator', 'Sk1llCheck!');
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
await LoginToSkillCheck(page,URL,'QATEST', 'Administrator', 'Sk1llCheck!');
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
  
    await page.waitForTimeout(2000);
  
    // Answer another question
    await page.locator('#button2').click({ force: true });
    await page.locator('button#btnAnswerComplete').click();
  
    //await page.waitForTimeout(2000);
  
    // Continue
    await page.locator('button#btnContinue').click();
  
    //await page.waitForTimeout(2000);
  
    // Exit
    await page.locator('button#btnExitTestSession').click();
  
    //await page.waitForTimeout(2000);
  
    // Assertions for result images
    const rows = page.locator('table tbody tr');
  
    await expect(rows.nth(1).locator('td').nth(2).locator('img'))
      .toHaveAttribute('alt', /Incorrect/);
  
    await expect(rows.nth(2).locator('td').nth(2).locator('img'))
      .toHaveAttribute('alt', /Not Attempted/);
  
    await expect(rows.nth(3).locator('td').nth(2).locator('img'))
      .toHaveAttribute('alt', /Correct/);
      await page.waitForTimeout(5000);
});
async function LoginToSkillCheck(page,url,ID, username, password) {
  await page.goto(url);
  await page.fill('input[name="ID"]', ID);
  await page.fill('input[name="username"]', username);
  await page.fill('input[name="password"]', password);
  await page.click('input[name="login"]');
}

async function addQuestionToTest(page, questionName, topic, questionText, options) {
  await page.locator('span', { hasText: 'Add question' }).click();

  // Click floating add button (force if needed)
  //await page.waitForSelector('a[data-tooltip="Create New Question"]');
  const buttons = page.locator('a[data-tooltip="Create New Question"]');
  const count = await buttons.count();
  console.log('Create New Question button count: ', count);
  
  // If two buttons, click the second
  if (count >= 2) {
      await buttons.nth(1).click();
  } else if (count === 1) {
      await buttons.first().click();
  } else {
      throw new Error('Create New Question button not found!');
  }
  // Fill in the question form
  await page.locator('input#new_question_name').fill(questionName);
  await page.locator('input#new_question_topic').fill(topic);
  await page.locator('textarea#new_question_text').fill(questionText);

  // Fill options
  await page.locator('input#option_input_0').fill(options[0]);
  await page.locator('input#option_input_1').fill(options[1]);

  // Click to add new option
  await page.locator('input#addOptionText').click();

  // Fill third option
  await page.locator('input#option_input_2').fill(options[2]);

  // Save the question
  await page.locator('#doSaveQuestionButton').click();

  // Close the dialog
  await page.locator('a', { hasText: 'Close' }).click();

  // Assert that new question exists
  await expect(page.locator('text=['+topic+'] '+questionName+'')).toBeVisible();
}
