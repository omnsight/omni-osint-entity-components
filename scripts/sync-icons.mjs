import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { globSync } from 'glob';
import { iconToSVG } from '@iconify/utils';
import { transform } from '@svgr/core';
import path from 'node:path';

const ICON_COMMENT_PATTERN = /icon:\s*(?:[\w\.]+|undefined|null|'[^']*'|"[^"]*"),?\s*\/\/\s*icon:\s*([\w-]+:[\w-]+)/g;
const OUTPUT_DIR = './src/assets/icons/generated';

async function generateIconComponent(fullName) {
  const [prefix, name] = fullName.split(':');
  
  // 1. Format the name (mdi:tank -> IconMdiTank)
  const componentName = `Icon${prefix.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')}${name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')}`;
  
  // 2. Define the expected file path
  const fileName = `${prefix}-${name}.tsx`;
  const filePath = path.join(OUTPUT_DIR, fileName);

  // 3. THE SKIP LOGIC: Check if the file already exists
  if (existsSync(filePath)) {
    // console.log(`⏭️ Skipping download: ${fullName} (Already exists)`);
    return componentName; 
  }

  // 4. Only fetch if the file is missing
  console.log(`🌐 Fetching from Iconify: ${fullName}...`);
  try {
    const response = await fetch(`https://api.iconify.design/${prefix}.json?icons=${name}`);
    const data = await response.json();
    const iconData = data.icons[name];
    const width = data.width || 16;
    const height = data.height || 16;
    const viewBox = `0 0 ${width} ${height}`;
    console.log(`Icon ${fullName} has width ${width} and height ${height}`);

    if (!iconData) {
      console.error(`❌ Icon ${fullName} not found in Iconify API`);
      return null;
    }

    const renderData = iconToSVG(iconData, { viewBox: viewBox });
    console.log(`Icon viewbox - ${viewBox}`);
 
    // Force Heroicons-style 24x24 container
    const rawSvg = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="${viewBox}"
      fill="currentColor"
    >
      ${renderData.body}
    </svg>
    `;

    const template = (variables, { tpl }) => tpl`
import type { SVGProps } from 'react';

export const ${variables.componentName} = ({ size = 24, ...props }: SVGProps<SVGSVGElement> & { size?: number | string }) => (
  ${variables.jsx}
);
`;

    const componentCode = await transform(
      rawSvg,
      {
        plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
        typescript: true,
        icon: false,
        svgProps: {
          width: '{size}',
          height: '{size}',
          viewBox: viewBox,
        },
        replaceAttrValues: { 'black': 'currentColor', '#000': 'currentColor' },
        template,
      },
      { componentName }
    );

    const iconUrl = `https://icon-sets.iconify.design/${fullName.replace(':', '/')}`;
    const finalCode = `// From: ${iconUrl}\n${componentCode}`;

    writeFileSync(filePath, finalCode);
    console.log(`✅ Generated new icon: ${fileName}`);
    return componentName;

  } catch (error) {
    console.error(`Error processing ${fullName}:`, error);
    return null;
  }
}

async function processFiles() {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  const files = globSync('src/**/*.{ts,tsx}');

  for (const file of files) {
    let content = readFileSync(file, 'utf-8');
    let hasChanged = false;
    
    // Find all matches in the current file
    const matches = [...content.matchAll(ICON_COMMENT_PATTERN)];
    
    for (const match of matches) {
      const [fullMatch, iconIdentifier] = match;
      
      // 1. ACTUALLY CALL the generator
      const componentName = await generateIconComponent(iconIdentifier);
      
      if (componentName) {
        const importPath = `@/assets/icons/generated/${iconIdentifier.replace(':', '-')}`;
        const importStatement = `import { ${componentName} } from '${importPath}';\n`;

        // 2. Replace the line: icon: undefined, // icon: mdi:tank -> icon: IconMdiTank, // icon: mdi:tank
        const replacement = `icon: ${componentName}, // icon: ${iconIdentifier}`;
        content = content.replace(fullMatch, replacement);

        // 3. Add import to top if not already there
        if (!content.includes(importPath)) {
          content = importStatement + content;
        }
        hasChanged = true;
      }
    }

    if (hasChanged) {
      writeFileSync(file, content);
      console.log(`✨ Rewrote: ${file}`);
    }
  }
}

processFiles().catch(console.error);
