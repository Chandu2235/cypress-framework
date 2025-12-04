<img width="1918" height="1075" alt="image" src="https://github.com/user-attachments/assets/e2bc5570-259a-4e98-a80e-396dd9dd5e75" />

VSCode with github copilot integration 

<img width="1918" height="1078" alt="image" src="https://github.com/user-attachments/assets/7c2e5228-0aed-417d-980f-0f9681c01c8c" />

<img width="1918" height="1032" alt="image" src="https://github.com/user-attachments/assets/dbda081b-8c92-4ac8-bdda-b740c3f67f47" />

# Cypress Banking Framework

## Features

- **Page Object Model (POM)**: Organized page objects for maintainability
- **Modular Test Structure**: Separated smoke and regression test suites
- **CI/CD Integration**: Jenkins pipeline for automated testing
- **Docker Support**: Containerized test environment with Docker & Docker Compose
- **Database Integration**: MySQL database for test data management
- **TestRail Integration**: Automated test result reporting to TestRail
- **Multi-browser Support**: Chrome, Firefox, Edge browser testing
- **Reporting**: Mochawesome reports with HTML output
- **GitHub Actions**: Automated workflows for CI/CD

## Project Structure

```
cypress-banking-framework/
├── cypress/
│   ├── e2e/
│   │   ├── smoke/              # Smoke tests
│   │   └── regression/         # Regression tests
│   ├── pageObjects/            # POM page objects
│   ├── support/                # Custom commands and helpers
│   ├── fixtures/               # Test data
│   ├── plugins/                # Cypress plugins
│   └── reporters/              # Report configuration
├── scripts/
│   ├── db/                     # Database scripts
│   ├── testrail/               # TestRail integration
│   └── jenkins/                # Jenkins utilities
├── config/
│   └── database.js             # Database configuration
├── docker/
│   └── Dockerfile              # Docker image configuration
├── .github/
│   └── workflows/              # GitHub Actions workflows
├── cypress.config.js           # Cypress configuration
├── package.json                # Project dependencies
├── Jenkinsfile                 # Jenkins pipeline
├── docker-compose.yml          # Docker Compose configuration
├── .env.example                # Environment variables template
└── README.md                   # This file
```

## Prerequisites

- Node.js (v18+)
- npm or yarn
- Docker & Docker Compose (for containerized testing)
- MySQL 8.0 (for database integration)
- TestRail account (for test reporting)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cypress-banking-framework
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Setup database**
   ```bash
   npm run db:migrate
   ```

## Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
BASE_URL=https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=banking_db
TESTRAIL_URL=https://your-instance.testrail.io
TESTRAIL_EMAIL=your-email@example.com
TESTRAIL_API_KEY=your-api-key
TESTRAIL_PROJECT_ID=1
TESTRAIL_SUITE_ID=1
```

### Cypress Configuration

Edit `cypress.config.js` for custom settings:
- `baseUrl`: Application URL
- `viewportWidth/Height`: Browser viewport dimensions
- `defaultCommandTimeout`: Command timeout in milliseconds

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode
```bash
npm run test:headed
```

### Open Cypress Test Runner
```bash
npm run test:open
```

### Run specific test suites
```bash
# Smoke tests only
npm run test:smoke

# Regression tests only
npm run test:regression
```

### Run tests on specific browser
```bash
npm run test:chrome
npm run test:firefox
```

### Debug mode
```bash
npm run test:debug
```

## Page Objects

### LoginPage.js
Handles login functionality
- `visitLoginPage()`: Navigate to login page
- `login(username, password)`: Login with credentials
- `selectCustomerLogin()`: Select customer login option
- `selectBankManagerLogin()`: Select bank manager login option

### CustomerDashboardPage.js
Manages customer dashboard interactions
- `selectCustomer(customerName)`: Select customer from dropdown
- `clickDeposits()`: Click deposits button
- `clickWithdrawals()`: Click withdrawals button
- `clickTransactions()`: View transactions

### BankManagerPage.js
Handles bank manager operations
- `clickAddCustomer()`: Add new customer
- `enterCustomerDetails()`: Fill customer form
- `viewAllCustomers()`: View customers list
- `deleteCustomer()`: Delete customer

## Database Integration

### Setup Database
```bash
npm run db:migrate
```

### Supported Database Operations
- Create/Read/Update/Delete operations
- Test data management
- Test result storage

### Database Functions (config/database.js)
```javascript
// Get user data
await getUserData(userId);

// Get all customers
await getAllCustomers();

// Insert test data
await insertTestData(testData);

// Delete test data
await deleteTestData(id);
```

## TestRail Integration

### Setup TestRail
1. Configure `.env` with TestRail credentials
2. Update `TESTRAIL_PROJECT_ID` and `TESTRAIL_SUITE_ID`

### Report Results to TestRail
```bash
npm run testrail:report
```

### TestRail Functions (scripts/testrail/testrail-reporter.js)
```javascript
// Get test cases
await getTestCases();

// Add test result
await addTestResult(runId, caseId, statusId, comment);

// Create test run
await createTestRun(runName, caseIds);

// Close test run
await closeTestRun(runId);
```

## Docker Usage

### Build Docker image
```bash
docker build -f docker/Dockerfile -t cypress-banking-tests .
```

### Run tests in Docker
```bash
docker run --rm cypress-banking-tests
```

### Using Docker Compose
```bash
# Start services
docker-compose up

# Stop services
docker-compose down

# View logs
docker-compose logs -f cypress
```

## Jenkins CI/CD

### Setup Jenkins Job
1. Create new Pipeline job in Jenkins
2. Point to `Jenkinsfile` in repository
3. Configure credentials:
   - `db_password`: Database password
   - `testrail_email`: TestRail email
   - `testrail_api_key`: TestRail API key

### Pipeline Stages
1. **Checkout**: Get latest code
2. **Install Dependencies**: Install npm packages
3. **Run Tests**: Execute test suite
4. **Database Migration**: Run migrations
5. **Report Generation**: Generate HTML reports
6. **TestRail Integration**: Publish results

### Parameters
- `SPEC`: Select test specification
- `BROWSER`: Choose browser (chrome/firefox/edge)

## GitHub Actions

### Workflows
- **cypress-tests.yml**: Automated test execution on push/PR

### Triggers
- Push to main/develop branches
- Pull requests to main/develop
- Scheduled daily execution (2 AM UTC)

### Features
- Multi-browser testing (Chrome, Firefox)
- Artifact upload
- Pull request comments with results

## Custom Commands

Available custom commands in `cypress/support/e2e.js`:

```javascript
// Login as customer
cy.loginAsCustomer('Harry Potter');

// Login as bank manager
cy.loginAsManager();

// Login with credentials
cy.login(username, password);
```

## Test Examples

### Smoke Test Example
```javascript
describe('Login Page - Smoke Tests', () => {
  it('User should see login buttons', () => {
    cy.visit('/');
    cy.contains('button', 'Customer Login').should('be.visible');
  });
});
```

### Regression Test Example
```javascript
describe('Customer Dashboard', () => {
  beforeEach(() => {
    cy.loginAsCustomer('Harry Potter');
  });

  it('Customer should view accounts', () => {
    cy.get('.table').should('be.visible');
  });
});
```

## Reporting

### Mochawesome Reports
Reports are generated in `cypress/reports/` directory:
- `mochawesome.html`: HTML report
- `mochawesome.json`: JSON data

### Access Reports
```bash
# Generate and open report
npm run test
# Open cypress/reports/html/mochawesome.html in browser
```

## Troubleshooting

### Tests failing locally but passing in CI/CD
- Check environment variables in `.env`
- Verify database connectivity
- Ensure correct browser is installed

### Database connection errors
- Verify MySQL is running
- Check database credentials in `.env`
- Ensure database exists

### TestRail integration not working
- Verify TestRail credentials
- Check API key permissions
- Confirm project and suite IDs

### Docker issues
- Rebuild image: `docker-compose build --no-cache`
- Check Docker daemon is running
- Review container logs: `docker-compose logs`

## Best Practices

1. **Page Objects**: Always use page objects for UI interactions
2. **Test Data**: Use fixtures for test data
3. **Selectors**: Use semantic selectors (data-test, id) over CSS
4. **Waits**: Use explicit waits instead of hardcoded delays
5. **Comments**: Document complex test logic
6. **DRY**: Reuse common functions in support files
7. **Naming**: Use descriptive test and variable names

## Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes and commit: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Submit pull request

## License

MIT License - see LICENSE file for details

## Support

For issues or questions:
1. Check existing GitHub issues
2. Review troubleshooting section
3. Create new issue with detailed information

## Resources

- [Cypress Documentation](https://docs.cypress.io)
- [Page Object Model](https://docs.cypress.io/guides/references/best-practices#Organizing-Tests)
- [TestRail API](https://www.guidepoint.com/display/TRKB/User+Guide)
- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [Docker Documentation](https://docs.docker.com/)

---
