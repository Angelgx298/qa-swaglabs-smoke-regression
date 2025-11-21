import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";
import { InventoryPage } from "./pages/InventoryPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";

const CREDENTIALS = {
  standard: {
    username: process.env.SAUCE_USER || "standard_user",
    password: process.env.SAUCE_PASS || "secret_sauce",
  },
  locked: {
    username: "locked_out_user",
    password: "secret_sauce",
  },
};

const CHECKOUT_DATA = {
  firstName: "Test",
  lastName: "User",
  zipCode: "12345",
};

test.setTimeout(45_000);

test("SMK-001: Login with valid user lands on inventory", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login(CREDENTIALS.standard.username, CREDENTIALS.standard.password);
  await inventoryPage.verifyLoaded();
});

test("SMK-002: Login with locked_out_user shows error", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(CREDENTIALS.locked.username, CREDENTIALS.locked.password);
  await expect(await loginPage.getErrorMessage()).toBeVisible();
});

test("SMK-003: Sort by price low to high shows cheapest first", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login(CREDENTIALS.standard.username, CREDENTIALS.standard.password);
  await inventoryPage.verifyLoaded();

  await inventoryPage.sort("lohi");

  const pricesText = await inventoryPage.inventoryItemPrices.allTextContents();
  const prices = pricesText.map((p) => parseFloat(p.replace("$", "")));
  const sortedPrices = [...prices].sort((a, b) => a - b);

  expect(prices).toEqual(sortedPrices);
});

test("SMK-004: Sort by name Z to A shows reverse alphabetical", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login(CREDENTIALS.standard.username, CREDENTIALS.standard.password);
  await inventoryPage.verifyLoaded();

  await inventoryPage.sort("za");

  const names = await inventoryPage.inventoryItemNames.allTextContents();
  const sortedNames = [...names].sort().reverse();

  expect(names).toEqual(sortedNames);
});

test("SMK-005: Add to cart from list increments badge", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login(CREDENTIALS.standard.username, CREDENTIALS.standard.password);
  await inventoryPage.verifyLoaded();

  await inventoryPage.addItemToCart(0);
  await expect(inventoryPage.cartBadge).toHaveText("1");
});

test("SMK-006: Add to cart from PDP shows product in cart", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login(CREDENTIALS.standard.username, CREDENTIALS.standard.password);
  await inventoryPage.verifyLoaded();

  // Capture details of first item
  const firstItemName = await inventoryPage.inventoryItemNames.first().textContent();
  const firstItemPrice = await inventoryPage.inventoryItemPrices.first().textContent();

  // Go to PDP and add to cart
  await inventoryPage.openProductDetails(0);
  await page.getByRole("button", { name: /add to cart/i }).click();

  // Go to cart
  await inventoryPage.goToCart();
  
  const cartPage = new CartPage(page);
  await cartPage.verifyLoaded();
  
  await expect(page.locator(".cart_item_label")).toContainText(firstItemName!);
  await expect(page.locator(".inventory_item_price")).toContainText(firstItemPrice!);
});

test("SMK-007: Checkout happy path shows confirmation", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login(CREDENTIALS.standard.username, CREDENTIALS.standard.password);
  await inventoryPage.addItemToCart(0);
  await inventoryPage.goToCart();

  await cartPage.proceedToCheckout();
  await checkoutPage.fillInformation(
    CHECKOUT_DATA.firstName,
    CHECKOUT_DATA.lastName,
    CHECKOUT_DATA.zipCode
  );
  await checkoutPage.finishCheckout();
  await checkoutPage.verifyOrderComplete();
});

test("SMK-008: Cancel checkout returns to cart with cart preserved", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login(CREDENTIALS.standard.username, CREDENTIALS.standard.password);
  await inventoryPage.addItemToCart(0);
  
  await expect(inventoryPage.cartBadge).toHaveText("1");

  await inventoryPage.goToCart();
  await cartPage.proceedToCheckout();
  await checkoutPage.cancelCheckout();

  await cartPage.verifyLoaded();
  await expect(inventoryPage.cartBadge).toHaveText("1");
  await expect(cartPage.cartItems).toHaveCount(1);
});

test("SMK-009: Logout returns to login and invalidates session", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login(CREDENTIALS.standard.username, CREDENTIALS.standard.password);
  await inventoryPage.verifyLoaded();

  await page.getByRole("button", { name: "Open Menu" }).click();
  await page.getByRole("link", { name: "Logout" }).click();

  await expect(page).toHaveURL("https://www.saucedemo.com/");
  await expect(loginPage.usernameInput).toBeVisible();

  // Verify session invalidation
  await page.goto("https://www.saucedemo.com/inventory.html");
  await expect(page).toHaveURL("https://www.saucedemo.com/");
});
