/**
 * TestRail Reporter
 */
require('dotenv').config();
const axios = require('axios');

const TESTRAIL_URL = process.env.TESTRAIL_URL;
const TESTRAIL_EMAIL = process.env.TESTRAIL_EMAIL;
const TESTRAIL_API_KEY = process.env.TESTRAIL_API_KEY;
const PROJECT_ID = process.env.TESTRAIL_PROJECT_ID;
const SUITE_ID = process.env.TESTRAIL_SUITE_ID;

// Create axios instance with basic auth
const testrailApi = axios.create({
  baseURL: `${TESTRAIL_URL}/index.php?/api/v2`,
  auth: {
    username: TESTRAIL_EMAIL,
    password: TESTRAIL_API_KEY,
  },
});

/**
 * Get all test cases
 */
async function getTestCases() {
  try {
    const response = await testrailApi.get(
      `/get_cases/${PROJECT_ID}&suite_id=${SUITE_ID}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching test cases:', error.message);
    return null;
  }
}

/**
 * Add test result to TestRail
 * @param {number} runId - Test run ID
 * @param {number} caseId - Test case ID
 * @param {number} statusId - Result status (1: Passed, 5: Failed)
 * @param {string} comment - Result comment
 */
async function addTestResult(runId, caseId, statusId, comment = '') {
  try {
    const response = await testrailApi.post(`/add_result_for_case/${runId}/${caseId}`, {
      status_id: statusId,
      comment: comment,
    });
    return response.data;
  } catch (error) {
    console.error('Error adding test result:', error.message);
    return null;
  }
}

/**
 * Create test run
 * @param {string} runName - Name of the test run
 * @param {array} caseIds - Array of test case IDs
 */
async function createTestRun(runName, caseIds = []) {
  try {
    const response = await testrailApi.post(`/add_run/${PROJECT_ID}`, {
      suite_id: SUITE_ID,
      name: runName,
      case_ids: caseIds.length > 0 ? caseIds : undefined,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating test run:', error.message);
    return null;
  }
}

/**
 * Close test run
 * @param {number} runId - Test run ID
 */
async function closeTestRun(runId) {
  try {
    const response = await testrailApi.post(`/close_run/${runId}`, {});
    return response.data;
  } catch (error) {
    console.error('Error closing test run:', error.message);
    return null;
  }
}

/**
 * Get test run results
 * @param {number} runId - Test run ID
 */
async function getTestRunResults(runId) {
  try {
    const response = await testrailApi.get(`/get_results_for_run/${runId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching test run results:', error.message);
    return null;
  }
}

module.exports = {
  getTestCases,
  addTestResult,
  createTestRun,
  closeTestRun,
  getTestRunResults,
};
