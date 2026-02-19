/**
 * Responsive Image Generator
 * 
 * Generates 3 sizes for each image:
 * - 400w (for mobile cards ~319px displayed)
 * - 600w (for tablet cards)
 * - 800w (for desktop cards)
 * - Original (1000w) is used as-is
 * 
 * Requirements:
 * npm install sharp
 * 
 * Usage:
 * node scripts/resize-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public', 'images');
const SIZES = [400, 600, 800];
const QUALITY = 75;

async function resizeImages() {
  console.log('🖼️  Responsive Image Generator\n');
  console.log(`Source: ${PUBLIC_DIR}\n`);

  // Find all WebP images (exclude already resized ones like -400, -600, etc.)
  const files = fs.readdirSync(PUBLIC_DIR);
  
  // Match resized images: -400, -600, -800, -1000 (but not dish IDs like -001, -002)
  const isResized = (filename) => /-400\.webp$|-600\.webp$|-800\.webp$|-1000\.webp$/.test(filename);
  
  const images = files.filter(file => 
    file.endsWith('.webp') && !isResized(file)
  );
  
  console.log(`Found ${images.length} original images to process`);

  console.log(`Found ${images.length} original images\n`);

  let processed = 0;
  let errors = 0;

  for (const image of images) {
    const inputPath = path.join(PUBLIC_DIR, image);
    const baseName = image.replace('.webp', '');
    
    console.log(`Processing: ${image}`);

    for (const size of SIZES) {
      const outputName = `${baseName}-${size}.webp`;
      const outputPath = path.join(PUBLIC_DIR, outputName);

      try {
        await sharp(inputPath)
          .resize(size, size, {
            fit: 'cover',
            position: 'center',
            withoutEnlargement: true
          })
          .webp({ 
            quality: QUALITY,
            effort: 6
          })
          .toFile(outputPath);

        const stats = fs.statSync(outputPath);
        const sizeKB = Math.round(stats.size / 1024);
        console.log(`  ✓ Created ${outputName} (${sizeKB}KB)`);
        processed++;
      } catch (error) {
        console.error(`  ✗ Error creating ${outputName}:`, error.message);
        errors++;
      }
    }
  }

  console.log('\n📊 Summary:');
  console.log(`  ✓ Processed: ${processed} image variants`);
  console.log(`  ✗ Errors: ${errors}`);
  console.log('\n✅ Done!');
  console.log('\n💡 Next steps:');
  console.log('  1. Deploy to Vercel');
  console.log('  2. Verify images load correctly');
  console.log('  3. Check Network tab to confirm smaller images are loaded');
}

resizeImages().catch(console.error);
