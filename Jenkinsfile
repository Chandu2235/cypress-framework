pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timestamps()
        timeout(time: 1, unit: 'HOURS')
    }

    parameters {
        choice(name: 'SPEC', choices: ['cypress/e2e/smoke/**/*.cy.js', 'cypress/e2e/regression/**/*.cy.js', 'cypress/e2e/**/*.cy.js'], description: 'Select test spec')
        choice(name: 'BROWSER', choices: ['chrome', 'firefox', 'edge'], description: 'Select browser')
    }

    environment {
        BASE_URL = 'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login'
        DB_HOST = 'localhost'
        DB_USER = 'root'
        DB_PASSWORD = credentials('db_password')
        TESTRAIL_EMAIL = credentials('testrail_email')
        TESTRAIL_API_KEY = credentials('testrail_api_key')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    echo 'Installing dependencies...'
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    echo "Running tests with ${params.BROWSER} browser..."
                    sh "npm run test -- --spec '${params.SPEC}' --browser ${params.BROWSER}"
                }
            }
        }

        stage('Database Migration') {
            steps {
                script {
                    echo 'Running database migrations...'
                    sh 'npm run db:migrate'
                }
            }
        }

        stage('Report Generation') {
            steps {
                script {
                    echo 'Generating test reports...'
                    sh 'npx mochawesome-merge "cypress/reports/mochawesome*.json" > cypress/reports/mochawesome.json'
                    sh 'npx mochawesome-report-generator cypress/reports/mochawesome.json -o cypress/reports/html'
                }
            }
        }

        stage('TestRail Integration') {
            steps {
                script {
                    echo 'Publishing results to TestRail...'
                    sh 'npm run testrail:report'
                }
            }
        }
    }

    post {
        always {
            // Archive test reports
            archiveArtifacts artifacts: 'cypress/reports/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/screenshots/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/videos/**', allowEmptyArchive: true

            // Publish HTML report
            publishHTML([
                reportDir: 'cypress/reports/html',
                reportFiles: 'mochawesome.html',
                reportName: 'Cypress Test Report'
            ])

            // Clean workspace
            cleanWs()
        }

        success {
            echo 'Tests executed successfully!'
            emailext(
                subject: 'Cypress Tests - SUCCESS',
                body: 'All tests passed successfully.',
                to: '${DEFAULT_RECIPIENTS}'
            )
        }

        failure {
            echo 'Tests failed!'
            emailext(
                subject: 'Cypress Tests - FAILURE',
                body: 'Some tests failed. Check the report for details.',
                to: '${DEFAULT_RECIPIENTS}'
            )
        }
    }
}
