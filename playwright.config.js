// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  timeout: 120000, // 2 mins per test by default
  use: {
    headless: false, // Set to true for headless mode
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on', // Always save video
    screenshot: 'only-on-failure', // Optional: take screenshots too
  },
  reporter: [['html', { open: 'always' }]], // Change to 'always' to auto-open report
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    }
    // Add Firefox or WebKit here if needed
  ],
});
