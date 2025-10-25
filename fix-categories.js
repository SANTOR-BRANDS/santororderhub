const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/menuData.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace all remaining instances
content = content.replace(/category: 'extra-pls'/g, "category: 'extra'");

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Fixed all categories');
