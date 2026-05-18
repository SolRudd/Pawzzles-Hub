const fs = require('fs');
const path = require('path');
const readline = require('readline');
const config = require('../src/config');
const loadCalendar = require('../src/loadCalendar');
const { ensureDir, postFileBase } = require('../src/fileWriter');

const reviewFolders = {
  approved: config.outputDirs.approved,
  rejected: config.outputDirs.rejected,
  scheduled: config.outputDirs.scheduled
};

function getGeneratedBriefs() {
  if (!fs.existsSync(config.outputDirs.briefs)) {
    return [];
  }

  return fs
    .readdirSync(config.outputDirs.briefs)
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const filePath = path.join(config.outputDirs.briefs, fileName);
      const firstLine = fs.readFileSync(filePath, 'utf8').split('\n')[0] || '';
      const match = firstLine.match(/^#\s+([^:]+):\s+(.+)$/);

      return {
        fileName,
        filePath,
        postId: match ? match[1].trim() : fileName.split('-').slice(0, 2).join('-'),
        title: match ? match[2].trim() : fileName.replace(/\.md$/, '')
      };
    });
}

function findPostById(posts, postId) {
  return posts.find((post) => post.id.toLowerCase() === postId.toLowerCase());
}

function askQuestion(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer.trim()));
  });
}

function copyIfExists(sourcePath, targetPath) {
  if (!fs.existsSync(sourcePath)) {
    console.log(`Skipped missing file: ${sourcePath}`);
    return;
  }

  ensureDir(path.dirname(targetPath));
  fs.copyFileSync(sourcePath, targetPath);
  console.log(`Copied: ${targetPath}`);
}

function copyReviewFiles(post, decision) {
  const fileBase = postFileBase(post);
  const targetDir = reviewFolders[decision];

  ensureDir(targetDir);

  copyIfExists(
    path.join(config.outputDirs.briefs, `${fileBase}.md`),
    path.join(targetDir, `${fileBase}.brief.md`)
  );
  copyIfExists(
    path.join(config.outputDirs.captions, `${fileBase}.md`),
    path.join(targetDir, `${fileBase}.caption.md`)
  );
  copyIfExists(
    path.join(config.outputDirs.prompts, `${fileBase}.md`),
    path.join(targetDir, `${fileBase}.prompt.md`)
  );
}

function saveCalendar(posts, decision, postId, suggestedDate) {
  const post = findPostById(posts, postId);

  if (!post) {
    return;
  }

  if (decision === 'approved') {
    post.status = 'approved';
  }

  if (decision === 'scheduled') {
    post.status = 'scheduled';

    if (suggestedDate) {
      post.suggestedDate = suggestedDate;
    }
  }

  // Rejected is a review folder, not a calendar status. Keep the post editable as draft.
  if (decision === 'rejected') {
    post.status = 'draft';
  }

  fs.writeFileSync(config.calendarPath, `${JSON.stringify(posts, null, 2)}\n`, 'utf8');
}

async function reviewPosts() {
  const posts = loadCalendar();
  const briefs = getGeneratedBriefs();

  if (briefs.length === 0) {
    console.log('No generated briefs found. Run npm run generate first.');
    return;
  }

  console.log('Generated posts:');
  for (const brief of briefs) {
    console.log(`- ${brief.postId}: ${brief.title}`);
  }

  const [, , argPostId, argDecision, argSuggestedDate] = process.argv;
  let postId = argPostId;
  let decision = argDecision;
  let suggestedDate = argSuggestedDate;

  if (!postId || !decision) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    postId = await askQuestion(rl, '\nPost ID to review: ');
    decision = await askQuestion(rl, 'Decision (approved, rejected, scheduled): ');

    if (decision === 'scheduled') {
      suggestedDate = await askQuestion(rl, 'Suggested date (YYYY-MM-DD, optional): ');
    }

    rl.close();
  }

  decision = String(decision).toLowerCase();

  if (!reviewFolders[decision]) {
    console.log('Decision must be approved, rejected or scheduled.');
    process.exitCode = 1;
    return;
  }

  const post = findPostById(posts, postId);

  if (!post) {
    console.log(`No calendar post found for ID: ${postId}`);
    process.exitCode = 1;
    return;
  }

  copyReviewFiles(post, decision);
  saveCalendar(posts, decision, post.id, suggestedDate);

  console.log(`\nMarked ${post.id} as ${decision}.`);
}

reviewPosts().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

