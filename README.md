# 🧪 QA Automation Project – My Store (UI + API Testing)
This project is a complete QA automation framework for testing both the UI and API.

🔍 UI Tests: We use NightwatchJS with the Page Object Model to test the My Store website. The tests check the Contact Us form, file upload, and product search features.

🔐 API Tests: We use Supertest to test all the routes from the mock-user-auth package. The tests include cases with correct and incorrect data, and with or without valid authorization tokens.

This project is easy to maintain and read. It also includes clear reports and documents that both developers and non-technical people can understand.

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

