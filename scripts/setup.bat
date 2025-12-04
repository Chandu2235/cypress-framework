@echo off
REM Cypress Banking Framework Setup Script for Windows

echo ================================
echo Cypress Banking Framework Setup
echo ================================

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo Node.js is not installed. Please install Node.js first.
    exit /b 1
)

echo ✓ Node.js is installed

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo npm is not installed. Please install npm first.
    exit /b 1
)

echo ✓ npm is installed

REM Install dependencies
echo.
echo Installing dependencies...
call npm install

REM Check if .env exists
if not exist .env (
    echo.
    echo Creating .env file from .env.example...
    copy .env.example .env
    echo ⚠ Please update .env file with your configuration
)

echo.
echo ✓ Setup completed successfully!
echo.
echo Next steps:
echo 1. Update .env file with your configuration
echo 2. Run: npm run db:migrate (if using database)
echo 3. Run: npm run test:open (to open Cypress)
echo 4. Run: npm test (to execute tests)
