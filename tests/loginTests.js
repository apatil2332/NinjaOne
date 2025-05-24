	const fs = require('fs');
const { Builder } = require('selenium-webdriver');
const LoginPage = require('../pages/LoginPage');


//Enter your valid and activated emailid and password
const VALID_EMAIL = 'patil.animesh107@gmail.com';
const VALID_PASSWORD = 'Dbeckham@2332';

async function runTests() {
  const driver = await new Builder().forBrowser('chrome').build();
  const loginPage = new LoginPage(driver);

  const testResults = [];

  function addResult(name, passed, message = '') {
    testResults.push({ name, passed, message });
    console.log(`${passed ? '✅ PASS' : '❌ FAIL'} - ${name} ${message ? '| ' + message : ''}`);
  }

  async function runLoginErrorTest(name, email, password, shouldSeeError) {
    await loginPage.open();
    try {
      await loginPage.login(email, password);
      const errorVisible = await loginPage.isErrorMessageVisible();
      const passed = errorVisible === shouldSeeError;
      addResult(name, passed, `Expected error: ${shouldSeeError ? 'Yes' : 'No'} | Found: ${errorVisible ? 'Yes' : 'No'}`);
    } catch (e) {
      addResult(name, false, e.message);
    }
  }

  try {
    // Test 0: Login page elements
    await loginPage.open();
    const testName0 = 'Check all login page fields and links presence';
    try {
      const checks = [
        { label: 'Email', result: await loginPage.isElementPresent(loginPage.selectors.email) },
        { label: 'Password', result: await loginPage.isElementPresent(loginPage.selectors.password) },
        { label: 'Keep me signed in', result: await loginPage.isElementPresent(loginPage.selectors.keepMeSignedInLabel) },
        { label: 'Sign In button', result: await loginPage.isElementPresent(loginPage.selectors.signInButton) },
        { label: 'Forgot password link', result: await loginPage.isElementPresent(loginPage.selectors.forgotPasswordLink) },
        { label: 'Register link', result: await loginPage.isElementPresent(loginPage.selectors.registerLink) },
      ];
      const missing = checks.filter(item => !item.result).map(item => item.label);
      addResult(testName0, missing.length === 0, missing.length ? `Missing elements: ${missing.join(', ')}` : '');
    } catch (e) {
      addResult(testName0, false, e.message);
    }

    // Test 1: Keep me signed in
    const testName1 = 'Verify "Keep me signed in" functionality';
    await loginPage.open();
    try {
      await loginPage.clickKeepMeSignedIn();
      await loginPage.login(VALID_EMAIL, VALID_PASSWORD);
      addResult(testName1, true);
    } catch (e) {
      addResult(testName1, false, e.message);
    }

    // Tests 2–7: Invalid inputs
    await runLoginErrorTest('Test 2: Invalid email format', 'invalid-email', VALID_PASSWORD, true);
    await runLoginErrorTest('Test 3: Incorrect password', VALID_EMAIL, 'wrongPassword', true);
    await runLoginErrorTest('Test 4: Non-existent email', 'nonexistent@example.com', 'somePassword', true);
    await runLoginErrorTest('Test 5: Both fields empty', '', '', true);
    await runLoginErrorTest('Test 6: Valid email, empty password', VALID_EMAIL, '', true);
    await runLoginErrorTest('Test 7: Empty email, valid password', '', '', true);


     


    await driver.navigate().refresh();
    await driver.sleep(2000);

    await loginPage.open();
    try {
      await loginPage.clickKeepMeSignedIn();
      await loginPage.login(VALID_EMAIL, VALID_PASSWORD);
    } catch (e) {
    }

    // Test 8: Valid login
// Test 8: Valid login credentials
    const testName8 = 'Test 8: Valid login credentials with MFA check';
    await loginPage.open();
    try {
      await loginPage.login(VALID_EMAIL, VALID_PASSWORD);
      const mfaVisible = await loginPage.isMfaHeaderVisible();
      addResult(testName8, mfaVisible, mfaVisible ? '' : 'Multi-Factor Authentication header not found.');
    } catch (e) {
      addResult(testName8, false, e.message);
}

    // Test 9: Valid login using Enter key
    await loginPage.open();
    const testName9 = 'Test 9: Valid login using Enter key with MFA check';
    try {
      await loginPage.login(VALID_EMAIL, VALID_PASSWORD, true);
      const mfaVisible = await loginPage.isMfaHeaderVisible();
      addResult(testName9, mfaVisible, mfaVisible ? '' : 'Multi-Factor Authentication header not found.');
    } catch (e) {
      addResult(testName9, false, e.message);
    }

    // Test 10: Forgot your password
    await loginPage.open();
    const testName10 = 'Click on "Forgot your password?" link';
    try {
      await loginPage.clickForgotPassword();
      addResult(testName10, true);
    } catch (e) {
      addResult(testName10, false, e.message);
    }

    // Test 11: Do not have an account
    await loginPage.open();
    const testName11 = 'Click on "Do not have an account?" link';
    try {
      await loginPage.clickRegisterLink();
      addResult(testName11, true);
    } catch (e) {
      addResult(testName11, false, e.message);
    }

  } finally {
    // HTML report
    const html = `
<html>
<head>
  <title>Login Test Report</title>
  <style>
    body { font-family: Arial; margin: 20px; }
    table { border-collapse: collapse; width: 100%; }
    th, td { padding: 10px; border: 1px solid #ccc; }
    th { background: #eee; }
    tr.pass { background: #c8e6c9; }
    tr.fail { background: #ffcdd2; }
  </style>
</head>
<body>
  <h1>Login Test Automation Report</h1>
  <table>
    <thead><tr><th>Test Case</th><th>Status</th><th>Message</th></tr></thead>
    <tbody>
      ${testResults.map(({ name, passed, message }) => `
        <tr class="${passed ? 'pass' : 'fail'}">
          <td>${name}</td>
          <td>${passed ? '✅ PASS' : '❌ FAIL'}</td>
          <td>${message}</td>
        </tr>`).join('')}
    </tbody>
  </table>
</body>
</html>
`;
    fs.writeFileSync('reports/test_report.html', html);
    console.log('\n Report saved to reports/test_report.html');

    await driver.quit();
  }
}

runTests();