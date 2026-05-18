const fs = require('fs');
const path = require('path');
const { ensureDir } = require('./fileWriter');

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function promptPreview(prompt) {
  return prompt
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 180);
}

function createMockSvg({ fileBase, prompt, outputDir }) {
  ensureDir(outputDir);

  const filePath = path.join(outputDir, `${fileBase}.svg`);
  const preview = escapeHtml(promptPreview(prompt));

  // The mock SVG proves the image pipeline works before a paid API is connected.
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080">
  <rect width="1080" height="1080" fill="#FFF4E5"/>
  <circle cx="918" cy="166" r="96" fill="#FFD6BF"/>
  <circle cx="172" cy="886" r="126" fill="#BFD8C2"/>
  <rect x="110" y="128" width="860" height="824" rx="52" fill="#FFFBF4" stroke="#0F9CA8" stroke-width="10"/>
  <text x="540" y="276" text-anchor="middle" font-family="Arial, sans-serif" font-size="72" font-weight="700" fill="#08737E">Pawzzles</text>
  <text x="540" y="354" text-anchor="middle" font-family="Arial, sans-serif" font-size="42" fill="#F47A3D">Mock image placeholder</text>
  <text x="170" y="492" font-family="Arial, sans-serif" font-size="30" fill="#2F2A27">
    <tspan x="170" dy="0">Prompt preview:</tspan>
    <tspan x="170" dy="52">${preview}</tspan>
  </text>
  <g fill="none" stroke="#0F9CA8" stroke-width="12" stroke-linecap="round">
    <path d="M794 732c34-46 96-32 96 22 0 58-96 106-96 106s-96-48-96-106c0-54 62-68 96-22z"/>
  </g>
  <g fill="#F47A3D">
    <circle cx="276" cy="720" r="22"/>
    <circle cx="328" cy="690" r="18"/>
    <circle cx="382" cy="720" r="22"/>
    <ellipse cx="330" cy="772" rx="68" ry="48"/>
  </g>
</svg>`;

  fs.writeFileSync(filePath, svg, 'utf8');

  return {
    mode: 'mock',
    filePath
  };
}

async function generateImage({ fileBase, prompt, outputDir }) {
  return createMockSvg({ fileBase, prompt, outputDir });
}

module.exports = {
  generateImage
};
