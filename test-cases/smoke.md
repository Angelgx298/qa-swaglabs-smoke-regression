# Smoke Test Suite – Sauce Demo

## Test Cases

### SMK-001: Login with valid user

- **Module**: Login
- **Priority**: High
- **Test Data**: user=standard_user, pass=secret_sauce
- **Steps**:
  1. Open saucedemo.com
  2. Enter credentials
  3. Click Login
- **Expected Result**: Inventory page loads (URL contains `/inventory`)

---

### SMK-002: Login with locked user

- **Module**: Login
- **Priority**: High
- **Test Data**: user=locked_out_user, pass=secret_sauce
- **Steps**:
  1. Open saucedemo.com
  2. Enter locked user credentials
  3. Click Login
- **Expected Result**: Error message "Epic sadface" displayed; remains on login page

---

### SMK-003: Sort by price (low to high)

- **Module**: Inventory – Sort
- **Priority**: High
- **Test Data**: None
- **Steps**:
  1. Login as standard_user
  2. Select sort by Price (low to high)
- **Expected Result**: Items displayed with lowest price first, highest price last

---

### SMK-004: Sort by name (Z to A)

- **Module**: Inventory – Sort
- **Priority**: Medium
- **Test Data**: None
- **Steps**:
  1. Login as standard_user
  2. Select sort by Name (Z to A)
- **Expected Result**: Items listed in reverse alphabetical order

---

### SMK-005: Add to cart from list

- **Module**: Cart – Add from List
- **Priority**: High
- **Test Data**: 1 product from inventory list
- **Steps**:
  1. Login as standard_user
  2. Click "Add to cart" on any product from list
  3. Check cart badge
- **Expected Result**: Cart badge increments to 1

---

### SMK-006: Add to cart from PDP

- **Module**: Cart – Add from PDP
- **Priority**: Medium
- **Test Data**: 1 product via Product Detail Page
- **Steps**:
  1. Login as standard_user
  2. Click on product name to open detail page
  3. Click "Add to cart"
  4. Open cart
- **Expected Result**: Product present in cart with correct name and price

---

### SMK-007: Checkout happy path

- **Module**: Checkout – Happy Path
- **Priority**: High
- **Test Data**: firstName=Test, lastName=User, zipCode=12345
- **Steps**:
  1. Login as standard_user
  2. Add any item to cart
  3. Open cart
  4. Click Checkout
  5. Fill customer information
  6. Click Continue
  7. Click Finish
- **Expected Result**: Order confirmation screen displayed with "Thank you for your order"

---

### SMK-008: Cancel checkout

- **Module**: Checkout – Cancel
- **Priority**: Medium
- **Test Data**: 1 item in cart
- **Steps**:
  1. Login as standard_user
  2. Add item to cart
  3. Open cart
  4. Click Checkout
  5. Click Cancel
- **Expected Result**: Returns to cart page; cart preserved with 1 item

---

### SMK-009: Logout

- **Module**: Session – Logout
- **Priority**: High
- **Test Data**: None
- **Steps**:
  1. Login as standard_user
  2. Open menu
  3. Click Logout
  4. Attempt to access inventory.html directly
- **Expected Result**: Redirected to login page; session invalidated

---

## Summary

- **Total**: 9 test cases
- **High Priority**: 6
- **Medium Priority**: 3
- **Automation Status**: 9/9 automated (Playwright)
