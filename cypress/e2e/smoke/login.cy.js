import LoginPage from '../pageObjects/LoginPage';

describe('Login Page - Smoke Tests', () => {
  beforeEach(() => {
    LoginPage.visitLoginPage();
  });

  it('C001 - User should see customer and bank manager login buttons', () => {
    cy.contains('button', 'Customer Login').should('be.visible');
    cy.contains('button', 'Bank Manager Login').should('be.visible');
  });

  it('C002 - User should be able to select Customer Login', () => {
    cy.loginAsCustomer('Harry Potter');
    cy.contains('Welcome Harry Potter').should('be.visible');
  });

  it('C003 - User should be able to select Bank Manager Login', () => {
    cy.loginAsManager();
    cy.contains('Logged in successfully').should('exist');
  });

  it('C004 - Customer should be able to logout', () => {
    cy.loginAsCustomer('Harry Potter');
    cy.get('button[ng-click="logout()"]').click();
    cy.contains('button', 'Customer Login').should('be.visible');
  });
});
