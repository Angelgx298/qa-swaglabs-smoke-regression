# Contributing to QA SwagLabs Smoke Regression

Thank you for your interest in contributing to this QA portfolio project! This document outlines the standards and processes for contributing to the repository.

## 🧪 Project Overview

This project is a comprehensive automated smoke test suite for the [Sauce Demo](https://www.saucedemo.com/) e-commerce application, built with **Playwright** and **TypeScript**. It serves as a demonstration of professional QA engineering practices.

## 🛠️ Getting Started

1.  **Fork the repository**
2.  **Clone your fork**:
    ```bash
    git clone https://github.com/YOUR_USERNAME/qa-swaglabs-smoke-regression.git
    ```
3.  **Install dependencies**:
    ```bash
    pnpm install
    ```
4.  **Install browsers**:
    ```bash
    pnpm exec playwright install
    ```

## 📝 Coding Standards

### TypeScript & Playwright

- **Strict Typing**: Avoid `any`. Define interfaces for data structures.
- **Page Object Model (POM)**: All selectors and page interactions must be encapsulated in Page Objects (if applicable) or clearly defined constants.
- **Selectors**: Use resilient selectors (e.g., `getByRole`, `getByText`) over CSS chains whenever possible.
- **Linting**: Ensure code passes linting rules.

### Test Case Design

- **Independence**: Tests must run in isolation. Use `beforeEach` for setup.
- **Naming**: Follow the pattern `SMK-XXX: Description`.
- **Assertions**: Use Playwright's web-first assertions (e.g., `await expect(locator).toBeVisible()`).

## 🚀 Running Tests

Before submitting a Pull Request, ensure all tests pass locally:

```bash
# Run all tests
pnpm test

# Run linting (if configured)
# pnpm lint
```

## 📥 Submitting a Pull Request

1.  Create a new branch for your feature or fix: `git checkout -b feature/amazing-test-case`.
2.  Commit your changes with clear, descriptive messages.
3.  Push to your fork and submit a Pull Request to the `main` branch.
4.  Provide a clear description of your changes and the reasoning behind them.

## 🐛 Reporting Bugs

If you find an issue with the test suite or documentation, please open an issue with:

- Description of the problem
- Steps to reproduce
- Expected vs. actual behavior

---

_Happy Testing!_
