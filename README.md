# QA Automation Project – Sauce Demo E2E Testing

![Playwright Tests](https://github.com/Angelgx298/qa-swaglabs-smoke-regression/actions/workflows/playwright.yml/badge.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)

## 📖 Overview

This project demonstrates professional QA engineering practices through comprehensive test case design and automated end-to-end (E2E) testing. Built as a portfolio piece, it showcases expertise in manual test strategy, test automation, CI/CD integration, and quality assurance best practices.

**Application Under Test**: [Sauce Demo](https://www.saucedemo.com/) – An e-commerce demonstration website

The project includes complete smoke test coverage for critical user journeys, all automated using Playwright with TypeScript, integrated into a CI/CD pipeline via GitHub Actions.

## ✨ Key Features

- **Comprehensive Test Coverage**: 9 smoke test cases covering critical e-commerce flows
- **100% Automation**: All manual test cases automated with Playwright
- **Professional Test Documentation**: Detailed test cases with clear steps, expected results, and priorities
- **CI/CD Integration**: Automated test execution on every push via GitHub Actions
- **Type-Safe Automation**: Written in TypeScript for maintainability and reliability
- **Defect Tracking**: Sample defect reports demonstrating QA analysis capabilities
- **Best Practices**: Follows Page Object Model concepts, DRY principles, and industry standards

## 🎯 Quick Links

- 📋 [Test Cases Documentation](./test-cases/smoke.md) – 9 comprehensive smoke test scenarios
- 🤖 [Automation Code](./automation/example.spec.ts) – Playwright TypeScript implementation
- 🐛 [Sample Defect Report](./defects/DEF-001.md) – Accessibility defect example
- 📊 [CI/CD Pipeline](https://github.com/Angelgx298/qa-swaglabs-smoke-regression/actions) – Latest test execution results

## 🧪 Test Coverage

### Scope

**Target Application**: [Sauce Demo](https://www.saucedemo.com/)  
**Test Level**: Smoke Testing (Critical Path)  
**Coverage Areas**: Authentication, Product Browsing, Shopping Cart, Checkout Flow, Session Management  
**Automation Rate**: 9/9 (100%)

### Test Suite Breakdown

| Module              | Test Cases | Priority    | Automation Status | Coverage |
| ------------------- | ---------- | ----------- | ----------------- | -------- |
| Login & Auth        | 2          | High        | ✅ Automated      | 100%     |
| Inventory Sorting   | 2          | High/Medium | ✅ Automated      | 100%     |
| Shopping Cart       | 2          | High/Medium | ✅ Automated      | 100%     |
| Checkout Flow       | 2          | High/Medium | ✅ Automated      | 100%     |
| Session Management  | 1          | High        | ✅ Automated      | 100%     |

📄 [View detailed test cases →](./test-cases/smoke.md)

## 🛠️ Technology Stack

| Category           | Technology                                                      | Purpose                                 |
| ------------------ | --------------------------------------------------------------- | --------------------------------------- |
| **Test Framework** | [Playwright](https://playwright.dev/) v1.56+                   | E2E browser automation                  |
| **Language**       | [TypeScript](https://www.typescriptlang.org/) 5.x              | Type-safe test code                     |
| **Package Manager**| [pnpm](https://pnpm.io/) 10.x                                  | Fast, efficient dependency management   |
| **CI/CD**          | [GitHub Actions](https://github.com/features/actions)          | Automated test execution on every push  |
| **Browser**        | Chromium (via Playwright)                                       | Test execution environment              |

**Why Playwright?**
- Cross-browser support (Chromium, Firefox, WebKit)
- Fast and reliable test execution
- Modern web testing features (auto-wait, network interception)
- Excellent TypeScript support
- Built-in reporting and tracing

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** 20.x or higher ([Download](https://nodejs.org/))
- **pnpm** 10.x or higher (install via `npm install -g pnpm`)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Angelgx298/qa-swaglabs-smoke-regression.git
   cd qa-swaglabs-smoke-regression
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Install Playwright browsers**
   ```bash
   pnpm exec playwright install --with-deps chromium
   ```

### Running Tests

#### Execute all tests
```bash
SAUCE_USER=standard_user SAUCE_PASS=secret_sauce pnpm test
```

#### Run tests in headed mode (watch browser)
```bash
SAUCE_USER=standard_user SAUCE_PASS=secret_sauce pnpm test:headed
```

#### Run tests in UI mode (interactive)
```bash
SAUCE_USER=standard_user SAUCE_PASS=secret_sauce pnpm test:ui
```

#### View HTML test report
```bash
pnpm test:report
```

> **Note**: The application credentials (`standard_user` / `secret_sauce`) are public test credentials provided by Sauce Demo for testing purposes.

## 📁 Project Structure

```
qa-swaglabs-smoke-regression/
├── .github/
│   └── workflows/
│       └── playwright.yml      # CI/CD pipeline configuration
├── automation/
│   └── example.spec.ts         # Playwright test automation suite
├── defects/
│   └── DEF-001.md              # Sample defect report (accessibility issue)
├── test-cases/
│   └── smoke.md                # Manual test case documentation
├── playwright.config.ts        # Playwright configuration
├── package.json                # Project dependencies and scripts
└── README.md                   # This file
```

## 🧠 Testing Approach

### Strategy

This project follows a **risk-based testing approach**, focusing on:
1. **Critical User Journeys**: Login, product selection, cart management, checkout
2. **High-Impact Scenarios**: Authentication failures, data validation, session handling
3. **Smoke Test Level**: Essential functionality verification suitable for build validation

### Test Design Principles

- **Independence**: Each test can run independently without dependencies
- **Clarity**: Clear naming conventions (SMK-001, SMK-002, etc.)
- **Maintainability**: Reusable helper functions and constants
- **Reliability**: Explicit waits and robust selectors
- **Traceability**: Direct mapping between manual test cases and automated tests

## 📊 CI/CD Pipeline

Every push to the repository triggers an automated test run via GitHub Actions:

- ✅ Automated test execution on latest Chromium
- 📊 HTML report generation
- 🔄 Retry on failure (2 retries in CI)
- 📦 Test artifacts stored for 30 days

View the latest pipeline results: [GitHub Actions](https://github.com/Angelgx298/qa-swaglabs-smoke-regression/actions)

## 🐛 Defect Management

This repository includes a sample defect report ([DEF-001](./defects/DEF-001.md)) demonstrating:
- Professional defect documentation structure
- Accessibility testing awareness (WCAG compliance)
- Clear reproduction steps and evidence
- Severity/priority assessment
- Suggested fix with technical details

## 📈 Skills Demonstrated

This project showcases the following QA engineering competencies:

- ✅ Test case design and documentation
- ✅ E2E test automation (Playwright + TypeScript)
- ✅ CI/CD pipeline integration
- ✅ Version control (Git/GitHub)
- ✅ Defect identification and reporting
- ✅ Accessibility testing awareness
- ✅ Professional documentation practices

## 👤 Author

**Ángel Ruiz Nadal**
Junior QA Engineer

📨 [angelruiznadal@gmail.com](mailto:angelruiznadal@gmail.com)  
💼 [LinkedIn](https://linkedin.com/in/angel-ruiz-nadal)  
🐙 [GitHub](https://github.com/Angelgx298)

---

<p align="center">
  <i>This project is part of my QA engineering portfolio, demonstrating professional testing practices and automation skills.</i>
</p>
