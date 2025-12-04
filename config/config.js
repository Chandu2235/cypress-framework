/**
 * Test configuration and environment setup
 */
require('dotenv').config();

const config = {
  baseUrl: process.env.BASE_URL || 'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login',
  environment: process.env.NODE_ENV || 'development',
  
  // Database
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    name: process.env.DB_NAME || 'banking_db',
  },
  
  // TestRail
  testrail: {
    url: process.env.TESTRAIL_URL,
    email: process.env.TESTRAIL_EMAIL,
    apiKey: process.env.TESTRAIL_API_KEY,
    projectId: process.env.TESTRAIL_PROJECT_ID || 1,
    suiteId: process.env.TESTRAIL_SUITE_ID || 1,
  },
  
  // Jenkins
  jenkins: {
    url: process.env.JENKINS_URL || 'http://localhost:8080',
    buildNumber: process.env.CI_BUILD_NUMBER,
    buildUrl: process.env.CI_BUILD_URL,
  },
  
  // Test configuration
  test: {
    timeout: 10000,
    retries: 1,
    headless: process.env.HEADLESS !== 'false',
  },
};

module.exports = config;
