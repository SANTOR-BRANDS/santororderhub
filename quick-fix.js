const fs = require('fs');
let content = fs.readFileSync('src/data/menuData.ts', 'utf8');
content = content.replace(/category: 'extra-pls'/g, "category: 'extra'");
fs.writeFileSync('src/data/menuData.ts', content, 'utf8');
console.log('✅ Fixed all category instances');
