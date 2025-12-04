#!/bin/bash

# Cypress Banking Framework Setup Script

echo "================================"
echo "Cypress Banking Framework Setup"
echo "================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✓ Node.js is installed"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm first."
    exit 1
fi

echo "✓ npm is installed"

# Install dependencies
echo ""
echo "Installing dependencies..."
npm install

# Check if .env exists
if [ ! -f .env ]; then
    echo ""
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠ Please update .env file with your configuration"
fi

echo ""
echo "✓ Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Update .env file with your configuration"
echo "2. Run: npm run db:migrate (if using database)"
echo "3. Run: npm run test:open (to open Cypress)"
echo "4. Run: npm test (to execute tests)"
