const fs = require('fs');
const path = require('path');
const config = require('../src/config');
const loadCalendar = require('../src/loadCalendar');
const { ensureDir, postFileBase } = require('../src/fileWriter');

function csvCell(value) {
  const stringValue = value === undefined || value === null ? '' : String(value);
  return `"${stringValue.replaceAll('"', '""')}"`;
}

function getSection(markdown, heading, nextHeading) {
  const start = markdown.indexOf(`## ${heading}`);

  if (start === -1) {
    return '';
  }

  const contentStart = start + `## ${heading}`.length;
  const end = nextHeading ? markdown.indexOf(`## ${nextHeading}`, contentStart) : -1;
  const section = end === -1 ? markdown.slice(contentStart) : markdown.slice(contentStart, end);

  return section.trim();
}

function getCaptionData(fileBase) {
  const captionPath = path.join(config.outputDirs.captions, `${fileBase}.md`);

  if (!fs.existsSync(captionPath)) {
    return {
      instagram: '',
      facebook: '',
      cta: '',
      hashtags: ''
    };
  }

  const markdown = fs.readFileSync(captionPath, 'utf8');

  return {
    instagram: getSection(markdown, 'Instagram Caption', 'Facebook Caption'),
    facebook: getSection(markdown, 'Facebook Caption', 'CTA'),
    cta: getSection(markdown, 'CTA', 'Hashtag Set'),
    hashtags: getSection(markdown, 'Hashtag Set', 'Suggested Alt Text')
  };
}

function getImageFile(fileBase) {
  const extensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];

  for (const extension of extensions) {
    const imagePath = path.join(config.outputDirs.images, `${fileBase}${extension}`);

    if (fs.existsSync(imagePath)) {
      return path.relative(config.rootDir, imagePath);
    }
  }

  return '';
}

function getReviewedIds(folderPath) {
  if (!fs.existsSync(folderPath)) {
    return new Set();
  }

  return new Set(
    fs
      .readdirSync(folderPath)
      .filter((fileName) => fileName.endsWith('.brief.md'))
      .map((fileName) => fileName.split('-').slice(0, 2).join('-'))
  );
}

function getExportPosts(posts) {
  const approvedIds = getReviewedIds(config.outputDirs.approved);
  const scheduledIds = getReviewedIds(config.outputDirs.scheduled);
  const statusById = new Map();

  for (const post of posts) {
    if (post.status === 'approved') {
      statusById.set(post.id, 'approved');
    }

    if (post.status === 'scheduled') {
      statusById.set(post.id, 'scheduled');
    }

    if (approvedIds.has(post.id) && !statusById.has(post.id)) {
      statusById.set(post.id, 'approved');
    }

    if (scheduledIds.has(post.id)) {
      statusById.set(post.id, 'scheduled');
    }
  }

  return posts
    .filter((post) => statusById.has(post.id))
    .map((post) => ({ post, status: statusById.get(post.id) }));
}

function asPlatformList(platform) {
  return Array.isArray(platform) ? platform : [platform];
}

function exportMetaCsv() {
  const posts = loadCalendar();
  const exportPosts = getExportPosts(posts);
  const rows = [
    ['postId', 'platform', 'title', 'caption', 'cta', 'hashtags', 'imageFile', 'suggestedDate', 'status']
  ];

  for (const { post, status } of exportPosts) {
    const fileBase = postFileBase(post);
    const captions = getCaptionData(fileBase);
    const imageFile = getImageFile(fileBase);

    for (const platform of asPlatformList(post.platform)) {
      const caption = platform === 'facebook' ? captions.facebook : captions.instagram;

      rows.push([
        post.id,
        platform,
        post.title,
        caption,
        captions.cta || post.cta,
        captions.hashtags,
        imageFile,
        post.suggestedDate || '',
        status
      ]);
    }
  }

  const csv = rows.map((row) => row.map(csvCell).join(',')).join('\n');

  ensureDir(path.dirname(config.metaCsvPath));
  fs.writeFileSync(config.metaCsvPath, `${csv}\n`, 'utf8');

  console.log(`Exported ${rows.length - 1} Meta planning rows.`);
  console.log(`CSV: ${config.metaCsvPath}`);
}

exportMetaCsv();
