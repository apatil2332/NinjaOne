
# NinjaRMM Login Test Automation (Selenium + JavaScript)

This project automates the login page test cases for [NinjaRMM](https://app.ninjarmm.com/auth/#/login) using **Selenium WebDriver** in **Node.js**, structured using the **Page Object Model (POM)**.

---

##  Project Structure

```
ninjarmm-login-tests/
├── package.json
├── reports/test_report.html  # Generated HTML test report
├── README.md                 # This documentation
├── /tests/
│   └── login.test.js         # Main test file (entry point)
├── /pages/
│   └── LoginPage.js          # Page Object Model class for Login Page
└── /utils/
    └── helpers.js            # Utility functions
```

---

##  Features & Test Cases

| #   | Test Case Description |
|-----|------------------------|
| 0   | Verify presence of all login page elements |
| 1   | Test "Keep me signed in" checkbox |
| 2   | Invalid email format |
| 3   | Correct email, wrong password |
| 4   | Non-registered email |
| 5   | Both fields empty |
| 6   | Valid email, empty password |
| 7   | Empty email, valid password |
| 8   | Valid email and password (expect success) |
| 9   | Valid login using Enter key |
| 10  | Click "Forgot your password?" link |
| 11  | Click "Do not have an account?" link |

---

##  Prerequisites

- Node.js (v16+ recommended)
- Google Chrome
- ChromeDriver installed (matching your Chrome version)

Install below Modules
```
npm install selenium-webdriver
npm install chromedriver
npm install selenium-webdriver chromedriver

```

---

##  Setup Instructions

1. **Clone the Repository**

```bash
git clone https://github.com/apatil2332/NinjaOne.git
cd ninjaOne
```

2. **Install Dependencies**

## you dont need to  to installl any dependencies manually because I have already added all node modules in the git repository.

3. **Directory Setup**

Ensure the following folders and files exist:

- `/pages/LoginPage.js`
- `/tests/loginTests.js`
- `/utils/helpers.js`

4.  In the loginTests.js file update your registers and activated "Email id " and "Password" 




5. *Run this command**
```bash
node tests/loginTests.js
```
## Also you can check the sucessfull generated Artifact in Github Action workflow after every push It will run the script automatically



It will:

- Launch Chrome
- Run all login test cases
- Print pass/fail in terminal
- Generate a `test_report.html` file in the root directory


After running the tests, open `test_report.html` in your browser.

It includes:

- Test case names
- Pass/Fail status
- Error or mismatch messages

---



**Animesh Patil**  
 [patil.animesh107@gmail.com]
