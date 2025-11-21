import { type Page, type Locator, expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator(".cart_item");
    this.checkoutButton = page.getByRole("button", { name: "Checkout" });
  }

  async verifyLoaded() {
    await expect(this.page).toHaveURL(/.*cart/);
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
