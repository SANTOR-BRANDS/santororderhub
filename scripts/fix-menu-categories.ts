import * as fs from 'fs';

// Read the menuData.ts file
const filePath = 'src/data/menuData.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Replace all instances of 'extra-pls' with 'extra'
content = content.replace(/category: 'extra-pls'/g, "category: 'extra'");

// Write the file back
fs.writeFileSync(filePath, content, 'utf8');

console.log('✅ Fixed all category: extra-pls -> category: extra');
