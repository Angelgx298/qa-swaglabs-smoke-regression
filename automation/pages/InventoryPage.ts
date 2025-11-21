import { type Page, type Locator, expect } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly inventoryList: Locator;
  readonly sortContainer: Locator;
  readonly inventoryItems: Locator;
  readonly inventoryItemNames: Locator;
  readonly inventoryItemPrices: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryList = page.locator(".inventory_list");
    this.sortContainer = page.locator(".product_sort_container");
    this.inventoryItems = page.locator(".inventory_item");
    this.inventoryItemNames = page.locator(".inventory_item_name");
    this.inventoryItemPrices = page.locator(".inventory_item_price");
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.cartLink = page.locator(".shopping_cart_link");
  }

  async verifyLoaded() {
    await expect(this.page).toHaveURL(/.*inventory/, { timeout: 15000 });
    await expect(this.inventoryList).toBeVisible({ timeout: 15000 });
  }

  async sort(option: "az" | "za" | "lohi" | "hilo") {
    await this.sortContainer.selectOption(option);
    // Wait for sorting to complete by checking the first item is visible
    await this.inventoryItemNames.first().waitFor({ state: "visible" });
  }

  async addItemToCart(index: number = 0) {
    await this.inventoryItems
      .nth(index)
      .getByRole("button", { name: /add to cart/i })
      .click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async openProductDetails(index: number = 0) {
    await this.inventoryItemNames.nth(index).click();
  }
}
