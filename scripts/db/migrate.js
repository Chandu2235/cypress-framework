/**
 * Database Migration Script
 */
require('dotenv').config();
const db = require('../config/database');

/**
 * Create database tables
 */
async function runMigrations() {
  try {
    console.log('Starting database migrations...');

    // Create users table
    await db.executeQuery(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Users table created');

    // Create customers table
    await db.executeQuery(`
      CREATE TABLE IF NOT EXISTS customers (
        id INT PRIMARY KEY AUTO_INCREMENT,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        post_code VARCHAR(10),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Customers table created');

    // Create accounts table
    await db.executeQuery(`
      CREATE TABLE IF NOT EXISTS accounts (
        id INT PRIMARY KEY AUTO_INCREMENT,
        customer_id INT NOT NULL,
        account_type VARCHAR(50),
        balance DECIMAL(10, 2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (customer_id) REFERENCES customers(id)
      )
    `);
    console.log('Accounts table created');

    // Create transactions table
    await db.executeQuery(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INT PRIMARY KEY AUTO_INCREMENT,
        account_id INT NOT NULL,
        transaction_type VARCHAR(50),
        amount DECIMAL(10, 2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (account_id) REFERENCES accounts(id)
      )
    `);
    console.log('Transactions table created');

    // Create test_results table
    await db.executeQuery(`
      CREATE TABLE IF NOT EXISTS test_results (
        id INT PRIMARY KEY AUTO_INCREMENT,
        test_name VARCHAR(255) NOT NULL,
        status VARCHAR(50),
        duration INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Test results table created');

    console.log('All migrations completed successfully!');
    await db.closeConnection();
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
}

// Run migrations
runMigrations();
