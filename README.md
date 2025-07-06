# 🧪 QA Automation Project – My Store (UI + API Testing)

This project demonstrates a complete **end-to-end QA automation framework** for both UI and API testing.

* 🔍 The **UI tests** target the [My Store](http://automationpractice.multiformis.com) website using **NightwatchJS** with the **Page Object Model**, covering form validation, file upload, and search functionality.
* 🔐 The **API tests** are built using **Supertest** and cover all endpoints provided by the [mock-user-auth](https://www.npmjs.com/package/mock-user-auth) npm module, validating both **authorized** and **unauthorized** scenarios with **valid/invalid** data.

This framework is designed to ensure maintainability, reusability, and clear reporting with documentation accessible to both technical and non-technical stakeholders.

---

## 📁 Project Structure

```
project-root/
│
├── nightwatch/              # All NightwatchJS tests and page objects
│   ├── page-objects/      # Page Object files
│   └── reports/           # HTML test report
├── tests/             # UI test cases (Contact form, Search, etc.)
│
├── api-tests/             # All API tests using Supertest
│   ├── tests/             # Route-specific test files
│   └── reports/           # API test results (HTML/XML/manual)
│
├── Bugs Report.docx       # Word file with bug tickets for all found bugs
├── TestCase&TestExecution.xlsx        # Manual test cases for UI features
```

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

### API Tests (Supertest + mock-user-auth)

* `/login`, `/logout`, `/register`, `/profile`, etc.
* Test with:

  * Valid data and authorization
  * Invalid data and missing/invalid tokens
* Test runner: `jest`

---

## 📦 Technologies Used

| Layer    | Tools                                                      |
| -------- | ---------------------------------------------------------- |
| UI       | NightwatchJS, ChromeDriver                                 |
| API      | Supertest, mock-user-auth                                  |
| Runner   | Jest                                     |
| Reports  | nightwatch-html-reporter, Jest-html-reporters |
| Language | JavaScript                                                 |

