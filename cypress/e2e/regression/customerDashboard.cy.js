import LoginPage from '../pageObjects/LoginPage';
import CustomerDashboardPage from '../pageObjects/CustomerDashboardPage';

describe('Customer Dashboard - Regression Tests', () => {
  beforeEach(() => {
    LoginPage.visitLoginPage();
    cy.loginAsCustomer('Harry Potter');
  });

  it('C101 - Customer should be able to view accounts', () => {
    CustomerDashboardPage.verifyAccountsTableVisible();
  });

  it('C102 - Customer should be able to click deposits button', () => {
    CustomerDashboardPage.clickDeposits();
    cy.contains('Amount to be Deposited').should('be.visible');
  });

  it('C103 - Customer should be able to click withdrawals button', () => {
    CustomerDashboardPage.clickWithdrawals();
    cy.contains('Amount to be Withdrawn').should('be.visible');
  });

  it('C104 - Customer should be able to view transactions', () => {
    CustomerDashboardPage.clickTransactions();
    cy.get('.table').should('be.visible');
  });

  it('C105 - Customer should be able to logout', () => {
    CustomerDashboardPage.logout();
    cy.contains('button', 'Customer Login').should('be.visible');
  });
});
