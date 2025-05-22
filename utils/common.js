const { expect } = require('@playwright/test');
async function LoginToSkillCheck(page,url,ID, username, password) {
    await page.goto(url);
    await page.getByPlaceholder('AccountID').fill(ID);
    await page.getByPlaceholder('Username').fill(username);
    await page.getByPlaceholder('Password').fill(password);
    await page.locator('button.signIn', { hasText: 'Sign In' }).click();

    // await page.fill('input[name="ID"]', ID);
    // await page.fill('input[name="username"]', username);
    // await page.fill('input[name="password"]', password);
    // await page.click('input[name="login"]');
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
  // Export all methods
module.exports = {
    LoginToSkillCheck,
    addQuestionToTest
  };
  