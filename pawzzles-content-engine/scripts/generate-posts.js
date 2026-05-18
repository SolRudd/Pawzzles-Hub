const path = require('path');
const config = require('../src/config');
const loadBrandRules = require('../src/loadBrandRules');
const loadCalendar = require('../src/loadCalendar');
const { buildCaptionMarkdown, buildCaptionSet } = require('../src/captionBuilder');
const { buildImagePrompt } = require('../src/promptBuilder');
const { ensureDir, postFileBase, writeTextFile } = require('../src/fileWriter');

function buildBriefMarkdown(post, imagePrompt, captionSet) {
  const assetNotes = [
    `Dog image: ${post.dogImage || 'No dog image specified'}`,
    `Product image: ${post.productImage || 'No product image specified'}`,
    `QR image: ${post.qrImage || 'No QR image specified'}`
  ];

  return [
    `# ${post.id}: ${post.title}`,
    '',
    '## Post Metadata',
    `- Platform: ${Array.isArray(post.platform) ? post.platform.join(', ') : post.platform}`,
    `- Post type: ${post.postType}`,
    `- Theme: ${post.theme}`,
    `- Goal: ${post.goal}`,
    `- Status: ${post.status}`,
    '',
    '## Image Text',
    `- Headline: ${post.headline}`,
    `- Supporting text: ${post.supportingText}`,
    `- CTA: ${post.cta}`,
    '',
    '## Image Prompt',
    imagePrompt,
    '',
    '## Instagram Caption',
    captionSet.instagram,
    '',
    '## Facebook Caption',
    captionSet.facebook,
    '',
    '## CTA',
    captionSet.cta,
    '',
    '## Hashtags',
    captionSet.hashtags.join(' '),
    '',
    '## Suggested Alt Text',
    captionSet.altText,
    '',
    '## Asset Notes',
    assetNotes.map((note) => `- ${note}`).join('\n'),
    '',
    '## Designer / Reviewer Notes',
    captionSet.reviewerNotes.map((note) => `- ${note}`).join('\n')
  ].join('\n');
}

function generatePosts() {
  const brandRules = loadBrandRules();
  const posts = loadCalendar();
  const generatedPosts = posts;
  const imageQueueItems = [];

  ensureDir(config.outputDirs.prompts);
  ensureDir(config.outputDirs.captions);
  ensureDir(config.outputDirs.briefs);
  ensureDir(config.outputDirs.approved);
  ensureDir(config.outputDirs.rejected);
  ensureDir(config.outputDirs.scheduled);

  for (const post of generatedPosts) {
    const fileBase = postFileBase(post);
    const imagePrompt = buildImagePrompt(post, brandRules);
    const captionSet = buildCaptionSet(post);
    const captionMarkdown = buildCaptionMarkdown(post, captionSet);
    const briefMarkdown = buildBriefMarkdown(post, imagePrompt, captionSet);

    writeTextFile(path.join(config.outputDirs.prompts, `${fileBase}.md`), imagePrompt);
    writeTextFile(path.join(config.outputDirs.captions, `${fileBase}.md`), captionMarkdown);
    writeTextFile(path.join(config.outputDirs.briefs, `${fileBase}.md`), briefMarkdown);

    imageQueueItems.push([
      `## ${post.id}: ${post.title}`,
      '',
      `Status: ${post.status}`,
      `Post type: ${post.postType}`,
      '',
      'Copy this prompt into /image:',
      '',
      '```text',
      imagePrompt,
      '```'
    ].join('\n'));
  }

  writeTextFile(
    config.imageQueuePath,
    ['# Pawzzles Image Generation Queue', '', ...imageQueueItems].join('\n\n')
  );

  console.log(`Generated ${generatedPosts.length} Pawzzles post sets.`);
  console.log(`Prompts: ${config.outputDirs.prompts}`);
  console.log(`Captions: ${config.outputDirs.captions}`);
  console.log(`Briefs: ${config.outputDirs.briefs}`);
  console.log(`Image queue: ${config.imageQueuePath}`);
}

generatePosts();
