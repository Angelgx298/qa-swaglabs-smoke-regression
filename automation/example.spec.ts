import { test, expect, type Page } from "@playwright/test";

const BASE_URL = "https://www.saucedemo.com/";
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

const SELECTORS = {
  inventory: ".inventory_list",
  inventoryItem: ".inventory_item",
  inventoryItemName: ".inventory_item_name",
  inventoryItemPrice: ".inventory_item_price",
  sortContainer: ".product_sort_container",
  cartBadge: ".shopping_cart_badge",
  cartLink: ".shopping_cart_link",
  cartItem: ".cart_item",
} as const;

const CHECKOUT_DATA = {
  firstName: "Test",
  lastName: "User",
  zipCode: "12345",
};

test.setTimeout(45_000);

async function loginAndWaitInventory(
  page: Page,
  username = CREDENTIALS.standard.username,
  password = CREDENTIALS.standard.password
): Promise<void> {
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
  await page.getByPlaceholder("Username").fill(username);
  await page.getByPlaceholder("Password").fill(password);
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL(/.*inventory/, { timeout: 15000 });
  await expect(page.locator(SELECTORS.inventory)).toBeVisible({
    timeout: 15000,
  });
  await page.waitForLoadState("networkidle");
}

async function addFirstItemToCart(page: Page): Promise<void> {
  await page
    .locator(SELECTORS.inventoryItem)
    .first()
    .getByRole("button", { name: /add to cart/i })
    .click();
}

test("SMK-001: Login with valid user lands on inventory", async ({ page }) => {
  await loginAndWaitInventory(page);
  await expect(page).toHaveURL(/.*inventory/);
  await expect(page.locator(SELECTORS.inventory)).toBeVisible();
});

test("SMK-002: Login with locked_out_user shows error", async ({ page }) => {
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
  await page.getByPlaceholder("Username").fill(CREDENTIALS.locked.username);
  await page.getByPlaceholder("Password").fill(CREDENTIALS.locked.password);
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("Epic sadface")).toBeVisible();
  await expect(page).toHaveURL(BASE_URL);
});

test("SMK-003: Sort by price low to high shows cheapest first", async ({
  page,
}) => {
  await loginAndWaitInventory(page);

  const sortSelect = page.locator(SELECTORS.sortContainer);
  await expect(sortSelect).toBeVisible({ timeout: 15000 });
  await sortSelect.selectOption("lohi");
  await page.waitForTimeout(500);

  const pricesText = await page
    .locator(SELECTORS.inventoryItemPrice)
    .allTextContents();
  const prices = pricesText.map((p) => parseFloat(p.replace("$", "")));
  const sortedPrices = [...prices].sort((a, b) => a - b);

  expect(prices).toEqual(sortedPrices);
});

test("SMK-004: Sort by name Z to A shows reverse alphabetical", async ({
  page,
}) => {
  await loginAndWaitInventory(page);

  const sortSelect = page.locator(SELECTORS.sortContainer);
  await expect(sortSelect).toBeVisible({ timeout: 15000 });
  await sortSelect.selectOption("za");
  await page.waitForTimeout(500);

  const names = await page
    .locator(SELECTORS.inventoryItemName)
    .allTextContents();
  const sortedNames = [...names].sort().reverse();

  expect(names).toEqual(sortedNames);
});

test("SMK-005: Add to cart from list increments badge", async ({ page }) => {
  await loginAndWaitInventory(page);
  await addFirstItemToCart(page);

  const badge = page.locator(SELECTORS.cartBadge);
  await expect(badge).toHaveText("1");
});

test("SMK-006: Add to cart from PDP shows product in cart", async ({
  page,
}) => {
  await loginAndWaitInventory(page);

  const firstItem = page.locator(SELECTORS.inventoryItem).first();
  const productName = await firstItem
    .locator(SELECTORS.inventoryItemName)
    .textContent();
  const productPrice = await firstItem
    .locator(SELECTORS.inventoryItemPrice)
    .textContent();

  await firstItem.locator(SELECTORS.inventoryItemName).click();
  await expect(page).toHaveURL(/.*inventory-item/);
  await page.getByRole("button", { name: /add to cart/i }).click();

  await page.locator(SELECTORS.cartLink).click();
  await expect(page).toHaveURL(/.*cart/);
  await expect(page.locator(".cart_item_label")).toContainText(productName);
  await expect(page.locator(SELECTORS.inventoryItemPrice)).toContainText(
    productPrice
  );
});

test("SMK-007: Checkout happy path shows confirmation", async ({ page }) => {
  await loginAndWaitInventory(page);
  await addFirstItemToCart(page);
  await page.locator(SELECTORS.cartLink).click();

  await page.getByRole("button", { name: "Checkout" }).click();
  await expect(page).toHaveURL(/.*checkout-step-one/);

  await page.getByPlaceholder("First Name").fill(CHECKOUT_DATA.firstName);
  await page.getByPlaceholder("Last Name").fill(CHECKOUT_DATA.lastName);
  await page.getByPlaceholder("Zip/Postal Code").fill(CHECKOUT_DATA.zipCode);
  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page).toHaveURL(/.*checkout-step-two/);
  await page.getByRole("button", { name: "Finish" }).click();

  await expect(page).toHaveURL(/.*checkout-complete/);
  await expect(page.getByText("Thank you for your order")).toBeVisible();
});

test("SMK-008: Cancel checkout returns to cart with cart preserved", async ({
  page,
}) => {
  await loginAndWaitInventory(page);
  await addFirstItemToCart(page);

  const badge = page.locator(SELECTORS.cartBadge);
  await expect(badge).toHaveText("1");

  await page.locator(SELECTORS.cartLink).click();
  await page.getByRole("button", { name: "Checkout" }).click();
  await page.getByRole("button", { name: "Cancel" }).click();

  await expect(page).toHaveURL(/.*cart/);
  await expect(badge).toHaveText("1");
  await expect(page.locator(SELECTORS.cartItem)).toHaveCount(1);
});

test("SMK-009: Logout returns to login and invalidates session", async ({
  page,
}) => {
  await loginAndWaitInventory(page);

  await page.getByRole("button", { name: "Open Menu" }).click();
  await page.getByRole("link", { name: "Logout" }).click();

  await expect(page).toHaveURL(BASE_URL);
  await expect(page.getByPlaceholder("Username")).toBeVisible();

  await page.goto(`${BASE_URL}inventory.html`);
  await expect(page).toHaveURL(BASE_URL);
});
