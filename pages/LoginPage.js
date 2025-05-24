const { By, Key, until } = require('selenium-webdriver');

class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.url = 'https://app.ninjarmm.com/auth/#/login';

    this.selectors = {
      email: By.id('email'),
      password: By.id('password'),
      keepMeSignedInLabel: By.css('label[for="staySignedIn"]'),
      signInButton: By.css('button.btn.btn-primary[type="submit"]'),
      forgotPasswordLink: By.css('a[href="#/resetPassword"]'),
      registerLink: By.css('a[href="#/register"]'),
      errorMessage: By.css('div.alert.alert-danger'),
      mfaHeader: By.css('h2.css-1hie37q.eo7gr5w0'),
    };
  }

  async isMfaHeaderVisible() {
  return this.isElementPresent(this.selectors.mfaHeader);
  }

  async open() {
    await this.driver.get(this.url);
    await this.driver.wait(until.elementLocated(this.selectors.email), 5000);
  }

  async login(email, password, useEnterKey = false) {
    const emailField = await this.driver.findElement(this.selectors.email);
    await emailField.clear();
    await emailField.sendKeys(email);

    const passwordField = await this.driver.findElement(this.selectors.password);
    await passwordField.clear();
    if (password !== null) {
      await passwordField.sendKeys(password);
    }

    if (useEnterKey) {
      await passwordField.sendKeys(Key.ENTER);
    } else {
      await this.driver.findElement(this.selectors.signInButton).click();
    }

    await this.driver.sleep(3000);
  }

  async isElementPresent(locator) {
    try {
      await this.driver.findElement(locator);
      return true;
    } catch {
      return false;
    }
  }

  async isErrorMessageVisible() {
    return this.isElementPresent(this.selectors.errorMessage);
  }

  async clickKeepMeSignedIn() {
    const label = await this.driver.findElement(this.selectors.keepMeSignedInLabel);
    await label.click();
  }

  async clickForgotPassword() {
    await this.driver.findElement(this.selectors.forgotPasswordLink).click();
    await this.driver.sleep(2000);
  }

  async clickRegisterLink() {
    await this.driver.findElement(this.selectors.registerLink).click();
    await this.driver.sleep(2000);
  }
}

module.exports = LoginPage;