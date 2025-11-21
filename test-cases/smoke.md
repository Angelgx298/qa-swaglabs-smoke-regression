# Smoke Test Suite – Sauce Demo

## 📋 Overview

This document contains the complete smoke test suite for the Sauce Demo e-commerce application. These test cases represent critical path testing designed to verify essential functionality before full regression testing.

**Purpose**: Verify core user journeys in the e-commerce flow  
**Test Level**: Smoke (Critical Path)  
**Total Test Cases**: 9  
**Automation Coverage**: 9/9 (100%)  
**Last Updated**: November 2025

### Coverage Summary

| Priority | Count | Percentage |
| -------- | ----- | ---------- |
| High     | 6     | 67%        |
| Medium   | 3     | 33%        |

### Module Distribution

| Module             | Test Cases | Automation File                      |
| ------------------ | ---------- | ------------------------------------ |
| Login & Auth       | 2          | `automation/example.spec.ts:58-71`   |
| Inventory Sorting  | 2          | `automation/example.spec.ts:73-108`  |
| Shopping Cart      | 2          | `automation/example.spec.ts:110-141` |
| Checkout Flow      | 2          | `automation/example.spec.ts:143-179` |
| Session Management | 1          | `automation/example.spec.ts:181-194` |

---

## Test Cases

### SMK-001: Login with Valid User

**Module**: Login & Authentication  
**Priority**: High  
**Automation**: ✅ Automated (`example.spec.ts:58`)

**Objective**: Verify that valid users can successfully authenticate and access the application

**Prerequisites**:

- Application is accessible at https://www.saucedemo.com/
- User account `standard_user` is active

**Test Data**:

- Username: `standard_user`
- Password: `secret_sauce`

**Steps**:

1. Navigate to https://www.saucedemo.com/
2. Enter username: `standard_user`
3. Enter password: `secret_sauce`
4. Click the **Login** button

**Expected Result**:

- User is redirected to inventory page
- URL contains `/inventory`
- Product inventory list is visible
- No error messages displayed

---

### SMK-002: Login with Locked User

**Module**: Login & Authentication  
**Priority**: High  
**Automation**: ✅ Automated (`example.spec.ts:64`)

**Objective**: Verify that locked users cannot access the application and receive appropriate error messaging

**Prerequisites**:

- Application is accessible at https://www.saucedemo.com/

**Test Data**:

- Username: `locked_out_user`
- Password: `secret_sauce`

**Steps**:

1. Navigate to https://www.saucedemo.com/
2. Enter username: `locked_out_user`
3. Enter password: `secret_sauce`
4. Click the **Login** button

**Expected Result**:

- Error message displayed: "Epic sadface: Sorry, this user has been locked out."
- User remains on login page
- URL remains at base `/` path
- No access granted to protected pages

---

### SMK-003: Sort Products by Price (Low to High)

**Module**: Inventory – Sorting  
**Priority**: High  
**Automation**: ✅ Automated (`example.spec.ts:73`)

**Objective**: Verify product sorting functionality correctly orders items by ascending price

**Prerequisites**:

- User is logged in as `standard_user`
- Inventory page is loaded

**Test Data**: None

**Steps**:

1. Login as `standard_user`
2. On inventory page, click sort dropdown
3. Select "Price (low to high)" option
4. Observe product order

**Expected Result**:

- Products are reordered by price
- Lowest priced item appears first
- Highest priced item appears last
- Prices are in ascending order: `$7.99 → $9.99 → $15.99 → ... → $49.99`

---

### SMK-004: Sort Products by Name (Z to A)

**Module**: Inventory – Sorting  
**Priority**: Medium  
**Automation**: ✅ Automated (`example.spec.ts:92`)

**Objective**: Verify product sorting functionality correctly orders items in reverse alphabetical order

**Prerequisites**:

- User is logged in as `standard_user`
- Inventory page is loaded

**Test Data**: None

**Steps**:

1. Login as `standard_user`
2. On inventory page, click sort dropdown
3. Select "Name (Z to A)" option
4. Observe product order

**Expected Result**:

- Products are reordered alphabetically in reverse
- Item starting with 'T' appears first
- Item starting with 'B' appears last
- Order follows: Z → Y → X → ... → B → A

---

### SMK-005: Add Product to Cart from Inventory List

**Module**: Shopping Cart – Add from List  
**Priority**: High  
**Automation**: ✅ Automated (`example.spec.ts:110`)

**Objective**: Verify users can add products to cart directly from inventory list view

**Prerequisites**:

- User is logged in as `standard_user`
- Cart is empty (badge not visible or shows "0")

**Test Data**: Any single product from inventory list

**Steps**:

1. Login as `standard_user`
2. On inventory page, locate any product
3. Click **Add to cart** button on product card
4. Observe cart badge in header

**Expected Result**:

- Cart badge appears in top-right corner
- Badge displays "1"
- Button text changes to "Remove"
- Product is added to cart

---

### SMK-006: Add Product to Cart from Product Detail Page

**Module**: Shopping Cart – Add from PDP  
**Priority**: Medium  
**Automation**: ✅ Automated (`example.spec.ts:118`)

**Objective**: Verify users can add products to cart from the Product Detail Page (PDP)

**Prerequisites**:

- User is logged in as `standard_user`
- Cart is empty

**Test Data**: Any single product

**Steps**:

1. Login as `standard_user`
2. On inventory page, click on any product **name** or **image**
3. Verify Product Detail Page loads (URL contains `/inventory-item`)
4. Click **Add to cart** button
5. Click cart icon in header
6. Verify cart page loads

**Expected Result**:

- Product appears in cart with correct:
  - Product name
  - Product price
  - Quantity (1)
- Cart badge displays "1"
- Cart contains exactly one item

---

### SMK-007: Complete Checkout Flow (Happy Path)

**Module**: Checkout – Success Flow  
**Priority**: High  
**Automation**: ✅ Automated (`example.spec.ts:143`)

**Objective**: Verify users can successfully complete an order from cart to confirmation

**Prerequisites**:

- User is logged in as `standard_user`
- At least one product in cart

**Test Data**:

- First Name: `Test`
- Last Name: `User`
- Zip/Postal Code: `12345`

**Steps**:

1. Login as `standard_user`
2. Add any item to cart
3. Click cart icon and verify cart page loads
4. Click **Checkout** button
5. On checkout step one, fill in:
   - First Name: `Test`
   - Last Name: `User`
   - Zip/Postal Code: `12345`
6. Click **Continue** button
7. On checkout step two (overview), verify order details
8. Click **Finish** button

**Expected Result**:

- Order confirmation page displays (URL: `/checkout-complete`)
- Success message appears: "Thank you for your order"
- Pony Express icon displayed
- Cart is cleared (badge removed)

---

### SMK-008: Cancel Checkout Process

**Module**: Checkout – Cancellation  
**Priority**: Medium  
**Automation**: ✅ Automated (`example.spec.ts:163`)

**Objective**: Verify users can cancel checkout and return to cart without losing items

**Prerequisites**:

- User is logged in as `standard_user`
- At least one product in cart

**Test Data**: Any single product

**Steps**:

1. Login as `standard_user`
2. Add one item to cart
3. Click cart icon
4. Click **Checkout** button
5. On checkout information page, click **Cancel** button

**Expected Result**:

- User is redirected back to cart page (URL: `/cart.html`)
- Cart still contains the item (not cleared)
- Cart badge still displays "1"
- Item quantity and details preserved

---

### SMK-009: Logout and Session Invalidation

**Module**: Session Management  
**Priority**: High  
**Automation**: ✅ Automated (`example.spec.ts:181`)

**Objective**: Verify logout functionality properly terminates user session

**Prerequisites**:

- User is logged in as `standard_user`

**Test Data**: None

**Steps**:

1. Login as `standard_user`
2. Click hamburger menu (☰) in top-left corner
3. Click **Logout** link in menu
4. Verify redirect to login page
5. Attempt to directly access `/inventory.html` via URL

**Expected Result**:

- User is logged out and redirected to login page
- Login form is visible (username/password fields)
- Session is invalidated
- Direct access to `/inventory.html` redirects back to login page
- No cached session allows unauthorized access

---

## Test Execution Notes

### Environment

- **Browser**: Chromium (via Playwright)
- **Base URL**: https://www.saucedemo.com/
- **Test Runner**: Playwright Test
- **Execution Mode**: Headless by default (can run headed with `--headed` flag)

### Test Data

All test credentials are publicly available test accounts:

- Standard user: `standard_user` / `secret_sauce`
- Locked user: `locked_out_user` / `secret_sauce`

### Automation Mapping

Each test case has a 1:1 mapping to an automated test in `automation/example.spec.ts`. Line numbers are provided for easy reference.

### Dependencies

Tests are designed to be **independent** and can run in any order. Each test:

- Starts with a fresh browser context
- Performs its own login (if needed)
- Does not rely on state from previous tests

---

## Summary

- **Total Test Cases**: 9
- **High Priority**: 6 (67%)
- **Medium Priority**: 3 (33%)
- **Automation Status**: 9/9 automated (100%)
- **Framework**: Playwright + TypeScript
- **CI/CD**: Automated execution via GitHub Actions on every push

**Coverage Assessment**: This smoke test suite covers all critical user paths in the e-commerce application, ensuring core functionality is validated before deeper testing.
