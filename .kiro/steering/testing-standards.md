---
inclusion: fileMatch
fileMatch: "**/*.{spec,test}.{ts,js,py,go}"
---

# Testing & QA Standards

## 1. Locator Strategy (Playwright / E2E)
- Priority: `getByRole()` > `getByLabel()` > `getByPlaceholder()` > `getByTestId()` > CSS.
- Never use unstable XPath or fragile DOM hierarchy chains (`div > div > span:nth-child(2)`).

## 2. Zero Flakiness
- Never use fixed sleep/timer pauses (`sleep()`, `setTimeout()`, `waitForTimeout()`).
- Always use auto-waiting assertions (e.g. `expect(locator).toBeVisible()`).

## 3. Test Structure & Maintenance
- Group tests logically with `describe` blocks and meaningful test titles.
- Isolate test state: tests must run independently without depending on test execution order.
- Clean up test fixtures and synthetic test records after test runs.
