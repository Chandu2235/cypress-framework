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
                    echo 'Installing npm dependencies...'
                    if (isUnix()) {
                        sh 'npm install'
                    } else {
                        bat 'npm install'
                    }
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    echo "Running Cypress tests in ${params.BROWSER} browser..."

                    if (isUnix()) {
                        sh "npm run test -- --spec \"${params.SPEC}\" --browser ${params.BROWSER}"
                    } else {
                        bat "npm run test -- --spec \"${params.SPEC}\" --browser ${params.BROWSER}"
                    }
                }
            }
        }

        stage('Database Migration') {
            steps {
                script {
                    echo "Running DB migrations..."
                    if (isUnix()) {
                        sh 'npm run db:migrate'
                    } else {
                        bat 'npm run db:migrate'
                    }
                }
            }
        }

        stage('Report Generation') {
            steps {
                script {
                    echo 'Generating Mochawesome report...'

                    if (isUnix()) {
                        sh 'npx mochawesome-merge "cypress/reports/mochawesome*.json" > cypress/reports/mochawesome.json'
                        sh 'npx mochawesome-report-generator cypress/reports/mochawesome.json -o cypress/reports/html'
                    } else {
                        bat 'npx mochawesome-merge "cypress\\reports\\mochawesome*.json" > cypress\\reports\\mochawesome.json'
                        bat 'npx mochawesome-report-generator cypress\\reports\\mochawesome.json -o cypress\\reports\\html'
                    }
                }
            }
        }

        stage('TestRail Integration') {
            steps {
                script {
                    echo 'Uploading results to TestRail...'

                    if (isUnix()) {
                        sh 'npm run testrail:report'
                    } else {
                        bat 'npm run testrail:report'
                    }
                }
            }
        }
    }

    post {
        always {

            // Archive all reports & videos
            archiveArtifacts artifacts: 'cypress/reports/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/screenshots/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/videos/**', allowEmptyArchive: true

            // Publish HTML report using explicit HtmlPublisher step for broader plugin compatibility
            step([$class: 'HtmlPublisher', reportTargets: [[
                reportName: 'Cypress Test Report',
                reportDir: 'cypress/reports/html',
                reportFiles: 'mochawesome.html',
                keepAll: true,
                alwaysLinkToLastBuild: true,
                allowMissing: true
            ]]])

            cleanWs()
        }

        success {
            echo 'Tests executed SUCCESSFULLY!'
            emailext(
                subject: 'Cypress Tests - SUCCESS',
                body: 'All tests passed successfully. ✔',
                to: '${DEFAULT_RECIPIENTS}'
            )
        }

        failure {
            echo 'Cypress Tests FAILED!'
            emailext(
                subject: 'Cypress Tests - FAILURE',
                body: 'Some tests failed. Please check attached report.',
                to: '${DEFAULT_RECIPIENTS}'
            )
        }
    }
}
