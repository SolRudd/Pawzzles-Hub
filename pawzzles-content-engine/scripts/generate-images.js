const path = require('path');
const config = require('../src/config');
const { generateImage } = require('../src/imageClient');
const { ensureDir, listFiles, readTextFile } = require('../src/fileWriter');

async function generateImages() {
  ensureDir(config.outputDirs.images);

  const promptFiles = listFiles(config.outputDirs.prompts, '.md');

  if (promptFiles.length === 0) {
    console.log('No prompt files found. Run npm run generate first.');
    return;
  }

  for (const promptFile of promptFiles) {
    const prompt = readTextFile(promptFile);
    const fileBase = path.basename(promptFile, '.md');
    const result = await generateImage({
      fileBase,
      prompt,
      outputDir: config.outputDirs.images
    });

    console.log(`Generated ${result.mode} image output: ${result.filePath}`);
  }
}

generateImages().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
