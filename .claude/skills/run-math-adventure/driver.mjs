#!/usr/bin/env node

/**
 * Math Adventure interactive driver.
 *
 * Usage:
 *   node driver.mjs launch      — start the dev server
 *   node driver.mjs url         — print the local URL
 *   node driver.mjs screenshot  — take a screenshot (requires browser open)
 *   node driver.mjs status      — check if dev server is running
 */

import http from 'http';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:5173';
const TIMEOUT = 5000;

async function request(url) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => reject(new Error('Timeout')), TIMEOUT);
    http.get(url, (res) => {
      clearTimeout(timeoutId);
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', reject);
  });
}

async function checkStatus() {
  try {
    const { status } = await request(`${BASE_URL}/`);
    return status === 200;
  } catch {
    return false;
  }
}

async function launch() {
  console.log('Starting dev server...');
  const child = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    shell: true,
  });
  return child;
}

async function main() {
  const cmd = process.argv[2];

  switch (cmd) {
    case 'launch':
      await launch();
      break;

    case 'url':
      console.log(BASE_URL);
      break;

    case 'status':
      const running = await checkStatus();
      console.log(running ? 'Dev server is running' : 'Dev server is not running');
      process.exit(running ? 0 : 1);
      break;

    case 'screenshot':
      console.log('Note: Screenshot requires a browser window to be open.');
      console.log('Open the app in your browser first: ' + BASE_URL);
      console.log('This is a manual step on Windows; use chromium-cli on Linux.');
      process.exit(0);
      break;

    default:
      console.log('Usage: node driver.mjs [launch|url|status|screenshot]');
      process.exit(1);
  }
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
