import { type Page, type Locator, expect } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly zipCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder("First Name");
    this.lastNameInput = page.getByPlaceholder("Last Name");
    this.zipCodeInput = page.getByPlaceholder("Zip/Postal Code");
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.finishButton = page.getByRole("button", { name: "Finish" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });
    this.completeHeader = page.getByText("Thank you for your order");
  }

  async fillInformation(firstName: string, lastName: string, zipCode: string) {
    await expect(this.page).toHaveURL(/.*checkout-step-one/);
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.zipCodeInput.fill(zipCode);
    await this.continueButton.click();
  }

  async finishCheckout() {
    await expect(this.page).toHaveURL(/.*checkout-step-two/);
    await this.finishButton.click();
  }

  async cancelCheckout() {
    await this.cancelButton.click();
  }

  async verifyOrderComplete() {
    await expect(this.page).toHaveURL(/.*checkout-complete/);
    await expect(this.completeHeader).toBeVisible();
  }
}
