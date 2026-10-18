# DemoBlaze Playwright Automation

End-to-end UI test automation for [DemoBlaze](https://www.demoblaze.com/), a demo e-commerce site, built with Playwright Test and the Page Object Model (POM). The project also includes a small set of login tests for [SauceDemo](https://www.saucedemo.com/).

## Tech Stack

- Node.js (LTS)
- Playwright Test (`@playwright/test` ^1.60.0)
- Allure reporting (`allure-playwright` ^3.8.0)
- GitHub Actions for CI

## Project Structure

```
ProjectDemo/
├── .github/workflows/playwright.yml   # CI pipeline
├── page_object/                       # Page Object classes
│   ├── PomanagerProject.js            # Aggregator: exposes all page objects
│   ├── Signup.js
│   ├── Login.js
│   ├── Logout.js
│   ├── Category.js
│   ├── Product.js
│   ├── Cart.js
│   └── SaucedemoLogin.js
├── tests/                             # Test specs
│   ├── signup_testcase.spec.js
│   ├── loginfun_testcase.spec.js
│   ├── logoutfun_testcase.spec.js
│   ├── purchase_testcase.spec.js
│   └── saucedemo_login.spec.js
├── Utils/                             # Test data (JSON)
│   ├── usernamePasswordData.json
│   └── purchaseDetailsData.json
├── utils/                             # Duplicate copy of Utils/ (see Known Issues)
├── globalSetup.js                     # Generates unique usernames before a signup run
├── playwright.config.js               # Default config (Chromium, all tests)
└── playwright.config1.js              # DemoBlaze config with project dependencies
```

## Test Coverage

The DemoBlaze suite contains 13 tests across four areas.

| Area | Spec file | What it covers |
| --- | --- | --- |
| Sign up | `signup_testcase.spec.js` | Registers each user in the test data with a unique username, plus a check that the sign-up modal can be opened and closed. |
| Login | `loginfun_testcase.spec.js` | Valid login for each user, invalid username, wrong password, and both invalid. Verifies the welcome message and the alert text. |
| Logout | `logoutfun_testcase.spec.js` | Login followed by logout for each user, then checks that the "Sign up" link is visible again. |
| Purchase | `purchase_testcase.spec.js` | Adds a product to the cart from its category, places the order, fills in the checkout form, and confirms the "Thank you for your purchase!" message. |

The SauceDemo spec (`saucedemo_login.spec.js`) covers a valid login, invalid credentials, and a locked-out user.

## Prerequisites

- Node.js LTS (18 or later)
- npm
- Allure CLI (`npx allure`), only if you want the Allure report

## Setup

```bash
npm ci
npx playwright install --with-deps chromium
```

## Running the Tests

Run the full DemoBlaze flow with dependencies. This uses `playwright.config1.js`, which runs the projects in this order: `signup` → `login` → `purchase`, and `signup` → `logout`.

```bash
npx playwright test -c playwright.config1.js
```

Run a single project:

```bash
npx playwright test -c playwright.config1.js --project=signup
npx playwright test -c playwright.config1.js --project=login
npx playwright test -c playwright.config1.js --project=purchase
npx playwright test -c playwright.config1.js --project=logout
```

Run the default config, which includes the SauceDemo tests:

```bash
npx playwright test
```

Run a single spec file:

```bash
npx playwright test tests/purchase_testcase.spec.js
```

### Important: Running the Signup Project

`globalSetup.js` runs only when the `signup` project is part of the run. It appends a timestamp to each `baseUsername` in `Utils/usernamePasswordData.json` and writes the result back to that file. Because DemoBlaze does not allow duplicate usernames, run the `signup` project before `login` or `logout` whenever you need fresh users. If you run `login` or `logout` alone, they use the usernames already saved in the file.

## Test Data

`Utils/usernamePasswordData.json` contains the base usernames and passwords used for sign-up, login, and logout. Each entry has the form `{ "baseUsername", "username", "password" }`.

`Utils/purchaseDetailsData.json` contains the purchase scenarios. Each entry includes the product name, category, and checkout details (name, country, city, card, month, year).

Do not commit real credentials. Move them to environment variables or a `.env` file before sharing the project.

## Reports

Two reporters are configured:

- HTML report: generated in `playwright-report/`. Open it with `npx playwright show-report`.
- Allure report: raw results are written to `allure-results/`. Generate and open the report with `npx allure serve allure-results`.

Failed tests are retried on CI and save a trace on the first retry.

## Continuous Integration

The workflow in `.github/workflows/playwright.yml` runs on pushes and pull requests to `main` or `master`. It installs dependencies, installs the Playwright browsers, runs `npx playwright test` with the default config, and uploads `playwright-report/` as an artifact kept for 30 days. The job times out after 60 minutes.

## Configuration Notes

- `playwright.config.js` runs tests in parallel on Chromium (Desktop Chrome). On CI it uses 2 retries and 1 worker. Mobile and branded-browser projects are commented out.
- `playwright.config1.js` uses a single worker, runs headed (`headless: false`), takes a screenshot for every test, and sets `baseURL` to `https://www.demoblaze.com`.

## Known Issues and Recommendations

1. **Duplicate test data folders.** `Utils/` and `utils/` hold identical files. The imports use both spellings. Keep one folder and update the imports.
2. **Hard-coded credentials.** `purchase_testcase.spec.js` logs in as `holl55`, and `loginfun_testcase.spec.js` uses fixed usernames and passwords. Move these values into test data or environment variables.
3. **CI uses the wrong config for DemoBlaze.** The CI workflow runs the default config, which has no `globalSetup` and no project dependencies. Repeated runs would try to sign up the same usernames and fail. Point CI at `playwright.config1.js` or add the same setup to the default config.
4. **Source data is modified at runtime.** `globalSetup.js` rewrites `usernamePasswordData.json` during each signup run. Consider generating users in memory or in a separate output file.
5. **Headed mode is hard-coded.** `playwright.config1.js` sets `headless: false`, so it cannot run on CI as written. Read the value from an environment variable.
6. **Invalid-login test depends on existing data.** The wrong-password test uses `mkeydrs777` as a valid username. If that account is removed from DemoBlaze, the test fails for the wrong reason.
7. **Generated artifacts are committed.** `allure-report/`, `allure-results/`, and the screenshots in the project root should be added to `.gitignore`.
8. **Mixed module styles.** `playwright.config.js` uses `import`, while `playwright.config1.js` and the specs use `require`. Choose one style.
9. **URLs are hard-coded in page objects.** `Login.js` and `Signup.js` use absolute URLs instead of `baseURL`. Use relative paths so the site address can change in one place.
10. **Empty `package.json` scripts.** Add scripts such as `"test": "playwright test"`, `"test:demoblaze": "playwright test -c playwright.config1.js"`, and `"report": "allure serve allure-results"` so the commands above are easy to run.
