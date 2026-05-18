const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// Tiny .env loader so this project does not need extra dependencies.
function loadEnvFile() {
  const envPath = path.join(rootDir, '.env');

  if (!fs.existsSync(envPath)) {
    return;
  }

  const lines = fs.readFileSync(envPath, 'utf8').split('\n');

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const equalsIndex = trimmed.indexOf('=');

    if (equalsIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, equalsIndex).trim();
    const value = trimmed.slice(equalsIndex + 1).trim().replace(/^["']|["']$/g, '');

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadEnvFile();

const config = {
  rootDir,
  brandRulesPath: path.join(rootDir, 'brand-assets', 'brand-rules.md'),
  calendarPath: path.join(rootDir, 'data', 'content-calendar.json'),
  imagePromptTemplatePath: path.join(rootDir, 'prompts', 'image-prompt-template.md'),
  captionTemplatePath: path.join(rootDir, 'prompts', 'caption-template.md'),
  outputDirs: {
    briefs: path.join(rootDir, 'output', 'briefs'),
    captions: path.join(rootDir, 'output', 'captions'),
    prompts: path.join(rootDir, 'output', 'prompts'),
    images: path.join(rootDir, 'output', 'images'),
    approved: path.join(rootDir, 'output', 'approved'),
    rejected: path.join(rootDir, 'output', 'rejected'),
    scheduled: path.join(rootDir, 'output', 'scheduled')
  },
  metaCsvPath: path.join(rootDir, 'output', 'meta-schedule.csv'),
  imageQueuePath: path.join(rootDir, 'output', 'image-generation-queue.md'),
  allowedStatuses: ['draft', 'prompt-ready', 'image-ready', 'approved', 'scheduled', 'posted'],
  image: {
    mode: process.env.IMAGE_MODE || 'mock',
    size: process.env.IMAGE_SIZE || '1080x1080'
  }
};

module.exports = config;
