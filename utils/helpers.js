async function isElementPresent(driver, locator) {
  try {
    await driver.findElement(locator);
    return true;
  } catch {
    return false;
  }
}

module.exports = { isElementPresent };
