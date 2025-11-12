# QA Smoke & Regression Pack – Sauce Demo

![Playwright Tests](https://github.com/Angelgx298/qa-swaglabs-smoke-regression/actions/workflows/playwright.yml/badge.svg)

A QA portfolio project demonstrating manual test case design and automated E2E testing with Playwright + TypeScript.

## 🎯 Quick Links

- [Test Cases](./test-cases/smoke.md) – 9 smoke test cases
- [Automation Code](./automation/example.spec.ts) – Playwright tests
- [Latest Report](https://github.com/Angelgx298/qa-swaglabs-smoke-regression/actions) – CI artifacts

## 📋 Scope

**Target**: [Sauce Demo](https://www.saucedemo.com/)  
**Coverage**: Login, Inventory, Cart, Checkout, Session  
**Automation**: 9/9 smoke tests automated

## 🧪 Test Suite

| Module         | Cases | Priority    | Automated |
| -------------- | ----- | ----------- | --------- |
| Login          | 2     | High        | ✅        |
| Inventory Sort | 2     | High/Medium | ✅        |
| Cart           | 2     | High/Medium | ✅        |
| Checkout       | 2     | High/Medium | ✅        |
| Session        | 1     | High        | ✅        |

[View test cases →](./test-cases/smoke.md)

## 🛠️ Tech Stack

- Playwright + TypeScript
- pnpm
- GitHub Actions

## 🚀 Running Locally

### Prerequisites

Node.js 20+ and pnpm

### Setup & Run

```
pnpm install
pnpm exec playwright install --with-deps chromium
```

### Run tests

```
SAUCE_USER=standard_user SAUCE_PASS=secret_sauce pnpm test
```

### View report

```
pnpm test:report
```

## 📁 Structure

```
├── automation/ # Playwright tests
├── test-cases/ # Manual test cases
├── .github/workflows/ # CI configuration
└── playwright.config.ts
```

## 👤 Author

**Ángel Ruiz Nadal**  [Contact email]()
Junior QA Engineer

📨 angelruiznadal@gmail.com  
💼 [LinkedIn](https://linkedin.com/in/angel-ruiz-nadal)
