/**
 * Bank Manager Page Object Model
 */
class BankManagerPage {
  constructor() {
    this.addCustomerButton = 'button[ng-click="addCustomer()"]';
    this.openAccountButton = 'button[ng-click="openAccount()"]';
    this.customersButton = 'button[ng-click="showCustomers()"]';
    this.deleteCustomerButton = '.delete_customer';
    this.logoutButton = 'button[ng-click="logout()"]';
    this.firstNameInput = 'input[placeholder="First Name"]';
    this.lastNameInput = 'input[placeholder="Last Name"]';
    this.postCodeInput = 'input[placeholder="Post Code"]';
    this.submitButton = 'button[type="submit"]';
    this.customersTable = '.table';
    this.searchInput = 'input[placeholder="Search Customer"]';
  }

  /**
   * Click Add Customer button
   */
  clickAddCustomer() {
    cy.get(this.addCustomerButton).click();
  }

  /**
   * Enter customer details
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} postCode
   */
  enterCustomerDetails(firstName, lastName, postCode) {
    cy.get(this.firstNameInput).type(firstName);
    cy.get(this.lastNameInput).type(lastName);
    cy.get(this.postCodeInput).type(postCode);
  }

  /**
   * Submit customer form
   */
  submitCustomerForm() {
    cy.get(this.submitButton).click();
  }

  /**
   * Click Open Account button
   */
  clickOpenAccount() {
    cy.get(this.openAccountButton).click();
  }

  /**
   * View all customers
   */
  viewAllCustomers() {
    cy.get(this.customersButton).click();
  }

  /**
   * Verify customers table is displayed
   */
  verifyCustomersTableDisplayed() {
    cy.get(this.customersTable).should('be.visible');
  }

  /**
   * Delete a customer
   * @param {number} rowIndex
   */
  deleteCustomer(rowIndex) {
    cy.get(this.deleteCustomerButton).eq(rowIndex).click();
  }

  /**
   * Logout from manager account
   */
  logout() {
    cy.get(this.logoutButton).click();
  }

  /**
   * Search for customer
   * @param {string} customerName
   */
  searchCustomer(customerName) {
    cy.get(this.searchInput).type(customerName);
  }
}

module.exports = new BankManagerPage();
