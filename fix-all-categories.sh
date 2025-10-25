#!/bin/bash
# Fix all category: 'extra-pls' to category: 'extra' in menuData.ts
sed -i "s/category: 'extra-pls'/category: 'extra'/g" src/data/menuData.ts
echo "✅ Fixed all categories in menuData.ts"
