# 🧪 QA Automation Project – My Store (UI + API Testing)
[![CircleCI](https://dl.circleci.com/status-badge/img/circleci/47K2vtfNpYFszw4jT5UsxD/6ciuWXFmnYjaAnS1STpyN2/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/circleci/47K2vtfNpYFszw4jT5UsxD/6ciuWXFmnYjaAnS1STpyN2/tree/main)



This project is a complete QA automation framework for testing both the UI and API.

🔍 UI Tests: We use NightwatchJS with the Page Object Model to test the My Store website. The tests check the Contact Us form, file upload, and product search features.

🔐 API Tests: We use Supertest to test all the routes from the mock-user-auth package. The tests include cases with correct and incorrect data, and with or without valid authorization tokens.

This project is easy to maintain and read. It also includes clear reports and documents that both developers and non-technical people can understand.

---

## 📁 Project Structure

```
## 📁 Project Structure

project-root/
│
├── .circleci/                       # CircleCI CI/CD config
│   └── config.yml                   # Main pipeline workflow
│
├── UI-test/
│   ├── Tests/                       # All UI test cases
│   │   ├── uiTests.js               # Main UI test suite
│   │   ├── report.js                # (Optional) Generate UI test reports
│   │   └── uploads/                 # Test files for upload
│   │       ├── test.txt
│   │       └── test.xls
│   │
│   └── page-objects/                # Page Object Model files
│       ├── contactUsPage.js
│       ├── homePage.js
│       └── searchResultsPage.js
│
├── tests_output/                    # Nightwatch test output folder
│   └── ui-test-report.html          # Final test result (HTML)
│
├── API-tests/
│   └── mock-user-auth/
│       ├── components/
│       │   └── mock/
│       │       └── routes/
│       │           └── index.js     # Mock API server
│       ├── tests/
│       │   └── auth.test.js         # Main API test file
│       ├── index.js
│       └── report.html              # Jest HTML test report
│
├── Bugs Report.docx                 # Manual bug documentation
├── TestCase&TestExecution.xlsx      # Manual test cases and execution tracking
├── nightwatch.conf.js               # NightwatchJS configuration
├── package.json                     # Project dependencies and scripts
├── package-lock.json
└── README.md                        # Project documentation

---

## ✅ Features Covered

### UI Tests (NightwatchJS + Page Object Model)

* Contact Us form:

  * Valid and invalid form submissions
  * Required/optional field combinations
  * File upload
  * Edge cases: long/short message, invalid email
* Search functionality:

  * Search for "dress" and verify that all results are relevant
  * Use of Page Object Model (no hardcoded selectors)

 Covered API Routes and Test Cases

1. POST /register

✅ Create user with valid email and password

❌ Register with empty email

❌ Register with empty password

❌ Register with invalid email format

❌ Register with existing email

❌ Register with short password (<6)

❌ Register with long password (>30)

2. POST /login

✅ Authenticate with correct credentials

❌ Authenticate with wrong credentials

3. GET /profile

✅ Get profile with valid token

❌ Access profile without token

4. PATCH /profile

✅ Update profile with valid token and valid data

❌ Update without token

❌ Update with invalid email (Bug: accepts invalid email!)

5. DELETE /profile

✅ Delete profile with valid token

❌ Delete profile with invalid token

6. GET /all-users

✅ Access with correct admin key

❌ Access without admin key

7. DELETE /all-users

✅ Delete all users with correct admin key

❌ Delete all users with wrong admin key

🐞 Known Bugs

Bug 1: Profile update accepts invalid email format

Route: PATCH /profile

Steps: Send { email: "wrong@gmail" }

Expected: Should return 400

Actual: Returns 200 and updates email

Severity: Medium



---

## 📦 Technologies Used

| Layer    | Tools                                                      |
| -------- | ---------------------------------------------------------- |
| UI       | NightwatchJS, ChromeDriver                                 |
| API      | Supertest, mock-user-auth                                  |
| Runner   | Jest                                     |
| Reports  | nightwatch-html-reporter, Jest-html-reporters |
| Language | JavaScript                                                 |

