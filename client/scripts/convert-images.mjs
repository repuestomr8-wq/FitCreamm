import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const imgDir = path.join(process.cwd(), 'src/assets/img');
const outputDir = path.join(process.cwd(), 'src/assets/img');

const files = fs.readdirSync(imgDir).filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg'));

async function convert() {
  for (const file of files) {
    const inputPath = path.join(imgDir, file);
    const outputName = file.replace(/\.(jpg|jpeg)$/i, '.webp');
    const outputPath = path.join(outputDir, outputName);

    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(outputPath);

    console.log(`Convertido: ${file} -> ${outputName}`);
  }
  console.log('Conversión completa.');
}

convert().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
