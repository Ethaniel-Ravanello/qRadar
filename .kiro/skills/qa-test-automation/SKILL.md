---
name: qa-test-automation
description: End-to-end (E2E) and integration test automation using Playwright, Jest, Vitest, or Cypress. Use when writing reliable regression tests, building Page Object Model (POM) architectures, and eliminating flakiness.
license: MIT
compatibility: Kiro, Claude Code, Cursor, Antigravity
metadata:
  category: quality-assurance
  complexity: intermediate
---

# QA Test Automation

Runbook for writing non-flaky automated UI and integration tests.

## 1. Element Locator Best Practices
Use resilient user-facing locators in order of preference:
1. `page.getByRole('button', { name: 'Submit' })`
2. `page.getByLabel('Username')`
3. `page.getByPlaceholder('Enter your email')`
4. `page.getByText('Welcome back')`
5. `page.getByTestId('submit-btn')`
*Avoid fragile CSS selectors and absolute XPath chains.*

## 2. Eliminating Flakiness
- **No Fixed Sleeps**: Never use `page.waitForTimeout()` or `time.sleep()`.
- **Web-First Assertions**: Always use built-in polling assertions:
  ```typescript
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toHaveText('Dashboard');
  ```
- **Network Idle / State Wait**: Wait for expected API responses or DOM states:
  ```typescript
  await page.waitForResponse(resp => resp.url().includes('/api/v1/auth') && resp.status() === 200);
  ```

## 3. Page Object Model (POM)
- Encapsulate page selectors and user flows inside dedicated page classes:
  - Methods should represent actions (e.g. `loginPage.login(user, pass)`).
  - Getters or properties should return locators (not raw selector strings).
- Keep test files (`*.spec.ts`) clean, readable, and focused on business assertion scenarios.
