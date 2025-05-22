// utils/softAssert.js
const errors = [];

async function softExpect(fn, label = '') {
  try {
    await fn();
  } catch (err) {
    const message = label ? `${label}: ${err.message}` : err.message;
    errors.push(message);
    console.error('❌ Soft assertion failed:', message);
  }
}

function assertAll() {
  if (errors.length > 0) {
    const summary = errors.join('\n');
    throw new Error(`\nSoft assertions failed:\n${summary}`);
  }
}

function resetSoftAsserts() {
  errors.length = 0;
}

module.exports = {
  softExpect,
  assertAll,
  resetSoftAsserts
};
