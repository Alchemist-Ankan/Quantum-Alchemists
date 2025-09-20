import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generatePngFavicon() {
    console.log('Generating PNG favicon from SVG...');
    
    const svgPath = path.join(__dirname, 'public', 'favicon.svg');
    const pngPath = path.join(__dirname, 'public', 'favicon.png');
    
    try {
        if (!fs.existsSync(svgPath)) {
            console.error('❌ favicon.svg not found');
            return;
        }
        
        // Read SVG file
        const svgBuffer = fs.readFileSync(svgPath);
        
        // Convert SVG to PNG
        await sharp(svgBuffer)
            .resize(32, 32) // Standard favicon size
            .png()
            .toFile(pngPath);
            
        console.log('✓ favicon.png created (32x32)');
        
        // Also create 16x16 version
        const png16Path = path.join(__dirname, 'public', 'favicon-16x16.png');
        await sharp(svgBuffer)
            .resize(16, 16)
            .png()
            .toFile(png16Path);
            
        console.log('✓ favicon-16x16.png created');
        
        // Create 32x32 version
        const png32Path = path.join(__dirname, 'public', 'favicon-32x32.png');
        await sharp(svgBuffer)
            .resize(32, 32)
            .png()
            .toFile(png32Path);
            
        console.log('✓ favicon-32x32.png created');
        
        // Create Apple Touch Icon (180x180)
        const appleTouchPath = path.join(__dirname, 'public', 'apple-touch-icon.png');
        await sharp(svgBuffer)
            .resize(180, 180)
            .png()
            .toFile(appleTouchPath);
            
        console.log('✓ apple-touch-icon.png created (180x180)');
        
        console.log('✅ All favicon formats generated successfully!');
        
    } catch (error) {
        console.error('❌ Error generating PNG favicon:', error.message);
    }
}

generatePngFavicon();