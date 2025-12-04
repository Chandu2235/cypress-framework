/**
 * Database Configuration
 */
require('dotenv').config();

const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'banking_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

let pool = null;

/**
 * Create database connection pool
 */
async function createPool() {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
}

/**
 * Execute query
 * @param {string} query
 * @param {array} values
 */
async function executeQuery(query, values = []) {
  const pool = await createPool();
  const connection = await pool.getConnection();
  try {
    const [results] = await connection.execute(query, values);
    return results;
  } finally {
    connection.release();
  }
}

/**
 * Get user data from database
 * @param {number} userId
 */
async function getUserData(userId) {
  const query = 'SELECT * FROM users WHERE id = ?';
  return executeQuery(query, [userId]);
}

/**
 * Get all customers
 */
async function getAllCustomers() {
  const query = 'SELECT * FROM customers';
  return executeQuery(query);
}

/**
 * Insert test data
 * @param {object} testData
 */
async function insertTestData(testData) {
  const query = 'INSERT INTO test_data SET ?';
  return executeQuery(query, [testData]);
}

/**
 * Delete test data
 * @param {number} id
 */
async function deleteTestData(id) {
  const query = 'DELETE FROM test_data WHERE id = ?';
  return executeQuery(query, [id]);
}

/**
 * Close database connection
 */
async function closeConnection() {
  if (pool) {
    await pool.end();
  }
}

module.exports = {
  createPool,
  executeQuery,
  getUserData,
  getAllCustomers,
  insertTestData,
  deleteTestData,
  closeConnection,
};
