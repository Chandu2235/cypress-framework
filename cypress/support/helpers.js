// Support for common utilities and helpers
export const waitForElement = (selector, timeout = 5000) => {
  cy.get(selector, { timeout }).should('be.visible');
};

export const clickElement = (selector) => {
  cy.get(selector).should('be.visible').click();
};

export const fillInput = (selector, value) => {
  cy.get(selector).clear().type(value);
};

export const verifyText = (selector, text) => {
  cy.get(selector).should('contain', text);
};

export const verifyElementVisible = (selector) => {
  cy.get(selector).should('be.visible');
};

export const verifyElementNotVisible = (selector) => {
  cy.get(selector).should('not.be.visible');
};

export const getTableRowCount = (tableSelector) => {
  return cy.get(`${tableSelector} tbody tr`).then(rows => rows.length);
};

export const getTableCellValue = (tableSelector, rowIndex, columnIndex) => {
  return cy.get(`${tableSelector} tbody tr`).eq(rowIndex).find('td').eq(columnIndex).text();
};
