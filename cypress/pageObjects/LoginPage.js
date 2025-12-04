/**
 * Login Page Object Model
 */
class LoginPage {
  constructor() {
    this.userNameInput = 'input[ng-model="user.name"]';
    this.passwordInput = 'input[ng-model="user.password"]';
    this.loginButton = 'button[ng-click="login()"]';
    this.errorMessage = '.error';
    this.customerLoginBtn = 'button:contains("Customer Login")';
    this.bankManagerBtn = 'button:contains("Bank Manager Login")';
  }

  /**
   * Navigate to login page
   */
  visitLoginPage() {
    cy.visit('/');
  }

  /**
   * Enter username
   * @param {string} username
   */
  enterUsername(username) {
    cy.get(this.userNameInput).clear().type(username);
  }

  /**
   * Enter password
   * @param {string} password
   */
  enterPassword(password) {
    cy.get(this.passwordInput).clear().type(password);
  }

  /**
   * Click login button
   */
  clickLoginButton() {
    cy.get(this.loginButton).click();
  }

  /**
   * Verify error message
   * @param {string} expectedMessage
   */
  verifyErrorMessage(expectedMessage) {
    cy.get(this.errorMessage).should('contain', expectedMessage);
  }

  /**
   * Login with valid credentials
   * @param {string} username
   * @param {string} password
   */
  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLoginButton();
  }

  /**
   * Select customer login
   */
  selectCustomerLogin() {
    cy.contains('button', 'Customer Login').click();
  }

  /**
   * Select bank manager login
   */
  selectBankManagerLogin() {
    cy.contains('button', 'Bank Manager Login').click();
  }
}

module.exports = new LoginPage();
