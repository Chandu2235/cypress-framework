# Quick Start Guide - Cypress Banking Framework

## ⚡ 5 Minute Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment
```bash
cp .env.example .env
```
Edit `.env` with your settings (database, TestRail credentials if needed)

### Step 3: Run Tests
```bash
npm run test:open     # Open Cypress Test Runner (Recommended for first time)
npm test             # Run all tests headless
npm run test:smoke   # Run smoke tests only
```

## 📁 Key Directories

| Directory | Purpose |
|-----------|---------|
| `cypress/e2e/smoke` | Quick sanity tests |
| `cypress/e2e/regression` | Comprehensive test suite |
| `cypress/pageObjects` | Page Object Models |
| `cypress/support` | Custom commands and helpers |
| `cypress/fixtures` | Test data (testData.json) |

## 🔧 Common Commands

```bash
# Test Execution
npm test              # Run all tests
npm run test:open    # Open Cypress interactive mode
npm run test:headed  # Run with browser visible
npm run test:chrome  # Run on Chrome
npm run test:firefox # Run on Firefox

# Linting & Code Quality
npm run lint         # Check code quality

# Database
npm run db:migrate   # Setup database tables

# TestRail Reporting
npm run testrail:report  # Send results to TestRail
```

## 🐳 Docker Usage

```bash
# Run tests in Docker
docker-compose up

# View logs
docker-compose logs -f cypress

# Cleanup
docker-compose down
```

## 📝 Test Structure Example

```javascript
import LoginPage from '../pageObjects/LoginPage';

describe('Login Tests', () => {
  beforeEach(() => {
    LoginPage.visitLoginPage();
  });

  it('Should login as customer', () => {
    cy.loginAsCustomer('Harry Potter');
    cy.contains('Welcome Harry Potter').should('be.visible');
  });
});
```

## 📊 Test Reports

After running tests, view reports:
```bash
# Mochawesome HTML report
open cypress/reports/html/mochawesome.html

# Screenshots on failure
cypress/screenshots/

# Video recordings
cypress/videos/
```

## 🔌 Page Objects Available

### LoginPage
- `visitLoginPage()` - Navigate to login
- `selectCustomerLogin()` - Choose customer login
- `selectBankManagerLogin()` - Choose manager login

### CustomerDashboardPage
- `selectCustomer(name)` - Select customer
- `clickDeposits()` - Deposits button
- `clickWithdrawals()` - Withdrawals button
- `logout()` - Sign out

### BankManagerPage
- `clickAddCustomer()` - Add new customer
- `viewAllCustomers()` - List all customers
- `logout()` - Sign out

## 🚀 Custom Commands Available

```javascript
cy.loginAsCustomer('Harry Potter')     // Quick customer login
cy.loginAsManager()                     // Quick manager login
cy.login(username, password)            // Standard login
```

## 💾 Database Integration

```bash
npm run db:migrate    # Create database tables

# Tables created:
# - users
# - customers
# - accounts
# - transactions
# - test_results
```

## 🔴 Troubleshooting

| Issue | Solution |
|-------|----------|
| Tests not running | Run `npm install` again |
| Database errors | Check `.env` DB settings, ensure MySQL is running |
| Port conflicts | Change port in `.env` or docker-compose.yml |
| Timeout errors | Increase timeout in `cypress.config.js` |

## 📚 Useful Links

- [Cypress Docs](https://docs.cypress.io)
- [Banking App URL](https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login)
- [Project README](./README.md)
- [Configuration Guide](./cypress.config.js)

## 🎯 Next Steps

1. ✅ Setup complete!
2. Modify `.env` for your environment
3. Run `npm run test:open` to explore tests
4. Update test data in `cypress/fixtures/testData.json`
5. Add your own test cases in `cypress/e2e/`
6. Setup Jenkins/TestRail when ready

## 📞 Support

- Check `.github/copilot-instructions.md` for detailed setup
- Review `README.md` for comprehensive documentation
- Examine existing tests for examples

---

**Happy Testing! 🚀**
