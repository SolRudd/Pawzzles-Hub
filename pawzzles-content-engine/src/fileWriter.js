const fs = require('fs');
const path = require('path');

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function postFileBase(post) {
  return `${post.id}-${slugify(post.title || post.headline || 'post')}`;
}

function writeTextFile(filePath, contents) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, contents, 'utf8');
}

function readTextFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function listFiles(dirPath, extension) {
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  return fs
    .readdirSync(dirPath)
    .filter((fileName) => fileName.endsWith(extension))
    .map((fileName) => path.join(dirPath, fileName));
}

module.exports = {
  ensureDir,
  listFiles,
  postFileBase,
  readTextFile,
  slugify,
  writeTextFile
};

