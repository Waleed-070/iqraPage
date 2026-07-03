import fs from 'fs';
const html = fs.readFileSync('character - Copy/index.html', 'utf8');
const match = html.match(/<svg[\s\S]*?<\/svg>/);
if (match) {
  fs.writeFileSync('public/animated-character.svg', match[0], 'utf8');
  console.log('Saved SVG!');
} else {
  console.log('No SVG found.');
}
