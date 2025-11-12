# Smoke Test Suite – Sauce Demo

### SMK-001

    ID: SMK-001
    Module: Login
    Priority: High
    Data: user=standard_user, pass=secret_sauce
    Steps: 1) Open saucedemo.com 2) Enter creds 3) Click Login
    Expected: Inventory page loads (URL contains /inventory).

### SMK-002

    ID: SMK-002
    Module: Login
    Priority: High
    Data: user=locked_out_user, pass=secret_sauce
    Steps: 1) Open 2) Enter creds 3) Login
    Expected: Error message displayed; stays on login.

### SMK-003

    ID: SMK-003
    Module: Inventory – Sort
    Priority: High
    Data: none
    Steps: 1) Login as standard_user 2) Sort by Price (low to high)
    Expected: First item has lowest price; last has highest.

### SMK-004

    ID: SMK-004
    Module: Inventory – Sort
    Priority: Medium
    Data: none
    Steps: 1) Login 2) Sort by Name (Z to A)
    Expected: Items listed in reverse alphabetical order.

### SMK-005

    ID: SMK-005
    Module: Cart – Add from List
    Priority: High
    Data: 1 product
    Steps: 1) Login 2) Add product from list 3) Check cart icon
    Expected: Cart badge increments to 1.

### SMK-006

    ID: SMK-006
    Module: Cart – Add from PDP
    Priority: Medium
    Data: 1 product via PDP
    Steps: 1) Login 2) Open product 3) Add to cart 4) Open cart
    Expected: Product present in cart with correct name/price.

### SMK-007

    ID: SMK-007
    Module: Checkout – Happy Path
    Priority: High
    Data: Valid first/last name, zip
    Steps: 1) Login 2) Add item 3) Open cart 4) Checkout 5) Fill data 6) Finish
    Expected: Order confirmation screen displayed.

### SMK-008

    ID: SMK-008
    Module: Checkout – Cancel
    Priority: Medium
    Data: 1 item in cart
    Steps: 1) Login 2) Add item 3) Start checkout 4) Cancel
    Expected: Return to inventory; cart preserved.

### SMK-009

    ID: SMK-009
    Module: Session – Logout
    Priority: High
    Data: none
    Steps: 1) Login 2) Logout via menu
    Expected: Back to login; session invalidated.
