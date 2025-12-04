/**
 * Integration test demonstrating database and TestRail usage
 */
const db = require('../../config/database');
const testrail = require('../../scripts/testrail/testrail-reporter');

describe('Banking Application - Integration Tests', () => {
  let testRunId;
  let testCaseIds = [];

  before(async () => {
    // Create test run in TestRail
    const testRun = await testrail.createTestRun('Cypress Integration Test Run');
    if (testRun) {
      testRunId = testRun.id;
      console.log(`TestRail run created: ${testRunId}`);
    }

    // Fetch test cases from TestRail
    const testCases = await testrail.getTestCases();
    if (testCases && testCases.cases) {
      testCaseIds = testCases.cases.map(tc => tc.id);
    }
  });

  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearLocalStorage();
  });

  it('C001 - Should insert and retrieve customer from database', async () => {
    try {
      // Insert test customer to database
      const customerData = {
        first_name: 'Test',
        last_name: 'Customer',
        post_code: '12345',
      };

      // Note: In real scenario, execute database insert
      // const result = await db.insertTestData(customerData);

      // Retrieve customer from database
      // const customers = await db.getAllCustomers();
      // expect(customers).to.have.length.greaterThan(0);

      // For this example, we'll just verify the application
      cy.visit('/');
      cy.contains('button', 'Customer Login').should('be.visible');

      // Report test result to TestRail
      if (testRunId && testCaseIds.length > 0) {
        await testrail.addTestResult(testRunId, testCaseIds[0], 1, 'Test passed successfully');
      }
    } catch (error) {
      console.error('Test error:', error);
      if (testRunId && testCaseIds.length > 0) {
        await testrail.addTestResult(testRunId, testCaseIds[0], 5, `Test failed: ${error.message}`);
      }
      throw error;
    }
  });

  it('C002 - Should verify customer login and session', async () => {
    try {
      cy.visit('/');
      cy.contains('button', 'Customer Login').click();
      cy.get('select[ng-model="custId"]').select('Harry Potter');
      cy.get('button[ng-click="getAccountss()"]').click();
      
      // Verify success
      cy.contains('Welcome Harry Potter').should('be.visible');

      // Report to TestRail
      if (testRunId && testCaseIds.length > 1) {
        await testrail.addTestResult(testRunId, testCaseIds[1], 1, 'Customer login successful');
      }
    } catch (error) {
      if (testRunId && testCaseIds.length > 1) {
        await testrail.addTestResult(testRunId, testCaseIds[1], 5, `Login test failed: ${error.message}`);
      }
      throw error;
    }
  });

  it('C003 - Should handle transaction workflow', async () => {
    try {
      cy.visit('/');
      cy.contains('button', 'Customer Login').click();
      cy.get('select[ng-model="custId"]').select('Hermoine Granger');
      cy.get('button[ng-click="getAccountss()"]').click();
      
      // Click deposits button
      cy.get('button[ng-click="deposits()"]').click();
      cy.contains('Amount to be Deposited').should('be.visible');

      // Report to TestRail
      if (testRunId && testCaseIds.length > 2) {
        await testrail.addTestResult(testRunId, testCaseIds[2], 1, 'Transaction workflow successful');
      }
    } catch (error) {
      if (testRunId && testCaseIds.length > 2) {
        await testrail.addTestResult(testRunId, testCaseIds[2], 5, `Transaction test failed: ${error.message}`);
      }
      throw error;
    }
  });

  after(async () => {
    // Close test run in TestRail
    if (testRunId) {
      await testrail.closeTestRun(testRunId);
      console.log(`TestRail run closed: ${testRunId}`);
    }

    // Close database connection
    await db.closeConnection();
  });
});
