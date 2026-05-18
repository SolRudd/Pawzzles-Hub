const fs = require('fs');
const config = require('./config');

function loadCalendar() {
  if (!fs.existsSync(config.calendarPath)) {
    throw new Error(`Content calendar file not found: ${config.calendarPath}`);
  }

  const rawCalendar = fs.readFileSync(config.calendarPath, 'utf8');
  const posts = JSON.parse(rawCalendar);

  if (!Array.isArray(posts)) {
    throw new Error('Content calendar must be an array of post objects.');
  }

  for (const post of posts) {
    if (!config.allowedStatuses.includes(post.status)) {
      throw new Error(
        `${post.id || 'Unknown post'} has invalid status "${post.status}". ` +
          `Use one of: ${config.allowedStatuses.join(', ')}.`
      );
    }
  }

  return posts;
}

module.exports = loadCalendar;
