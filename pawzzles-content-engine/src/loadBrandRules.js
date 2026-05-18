const fs = require('fs');
const config = require('./config');

function loadBrandRules() {
  if (!fs.existsSync(config.brandRulesPath)) {
    throw new Error(`Brand rules file not found: ${config.brandRulesPath}`);
  }

  return fs.readFileSync(config.brandRulesPath, 'utf8');
}

module.exports = loadBrandRules;

