#!/usr/bin/env node

/**
 * Setup script to inject LambdaTest credentials from .env file into lambdatest.yml
 * Run this script before executing tests: node setup-lambdatest-config.js
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config();

const configPath = path.join(__dirname, 'lambdatest.yml');

if (!fs.existsSync(configPath)) {
  console.error('Error: lambdatest.yml not found!');
  process.exit(1);
}

let configContent = fs.readFileSync(configPath, 'utf8');

// Check if credentials are set in environment
const username = process.env.LT_USERNAME;
const accessKey = process.env.LT_ACCESS_KEY;

if (!username || !accessKey) {
  console.warn('Warning: LT_USERNAME or LT_ACCESS_KEY not found in environment variables.');
  console.warn('Please ensure your .env file contains these values.');
  console.warn('The lambdatest.yml file will keep placeholder values.');
} else {
  // Replace placeholder values with actual credentials
  configContent = configContent.replace(/{YOUR_LAMBDATEST_USERNAME}/g, username);
  configContent = configContent.replace(/{YOUR_LAMBDATEST_ACCESS_KEY}/g, accessKey);
  
  fs.writeFileSync(configPath, configContent, 'utf8');
  console.log('✅ Successfully updated lambdatest.yml with credentials from .env file');
}

