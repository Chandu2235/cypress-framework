/**
 * Customer Dashboard Page Object Model
 */
class CustomerDashboardPage {
  constructor() {
    this.customerSelect = 'select[ng-model="custId"]';
    this.loginButton = 'button[ng-click="getAccountss()"]';
    this.accountsTable = '.table';
    this.logoutButton = 'button[ng-click="logout()"]';
    this.deposits = 'button[ng-click="deposits()"]';
    this.withdrawals = 'button[ng-click="withdrawals()"]';
    this.transactions = 'button[ng-click="transactions()"]';
  }

  /**
   * Select customer from dropdown
   * @param {string} customerName
   */
  selectCustomer(customerName) {
    cy.get(this.customerSelect).select(customerName);
  }

  /**
   * Click login button on dashboard
   */
  clickLoginButton() {
    cy.get(this.loginButton).click();
  }

  /**
   * Verify customer is logged in
   * @param {string} customerName
   */
  verifyCustomerLoggedIn(customerName) {
    cy.contains('Welcome ' + customerName).should('be.visible');
  }

  /**
   * Click deposits button
   */
  clickDeposits() {
    cy.get(this.deposits).click();
  }

  /**
   * Click withdrawals button
   */
  clickWithdrawals() {
    cy.get(this.withdrawals).click();
  }

  /**
   * Click transactions button
   */
  clickTransactions() {
    cy.get(this.transactions).click();
  }

  /**
   * Logout from customer account
   */
  logout() {
    cy.get(this.logoutButton).click();
  }

  /**
   * Verify accounts table is visible
   */
  verifyAccountsTableVisible() {
    cy.get(this.accountsTable).should('be.visible');
  }
}

module.exports = new CustomerDashboardPage();
