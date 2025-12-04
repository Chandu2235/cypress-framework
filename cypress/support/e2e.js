// Custom commands
Cypress.Commands.add('login', (username, password) => {
  const loginPage = require('../pageObjects/LoginPage');
  loginPage.visitLoginPage();
  loginPage.login(username, password);
});

Cypress.Commands.add('selectCustomerLogin', () => {
  const loginPage = require('../pageObjects/LoginPage');
  loginPage.selectCustomerLogin();
});

Cypress.Commands.add('selectBankManagerLogin', () => {
  const loginPage = require('../pageObjects/LoginPage');
  loginPage.selectBankManagerLogin();
});

Cypress.Commands.add('loginAsCustomer', (customerName) => {
  cy.selectCustomerLogin();
  const dashboardPage = require('../pageObjects/CustomerDashboardPage');
  dashboardPage.selectCustomer(customerName);
  dashboardPage.clickLoginButton();
});

Cypress.Commands.add('loginAsManager', () => {
  cy.selectBankManagerLogin();
});

// Before each test hook
beforeEach(() => {
  // Clear local storage and cookies
  cy.clearAllCookies();
  cy.clearLocalStorage();
});

// After each test hook
afterEach(() => {
  // Optional: clear session
  cy.clearAllCookies();
});
