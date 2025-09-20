import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple script to copy the SVG and update favicon references
console.log('Setting up favicon files...');

// Read the current SVG
const svgPath = path.join(__dirname, 'public', 'favicon.svg');
const indexPath = path.join(__dirname, 'index.html');

if (fs.existsSync(svgPath)) {
    console.log('✓ favicon.svg exists and is ready to use');
    
    // Create a simple favicon.ico as a copy of the SVG (browsers will handle it)
    const icoPath = path.join(__dirname, 'public', 'favicon.ico');
    
    // For now, we'll create a simple text-based ico file
    // In a real production environment, you'd want to use proper ICO generation
    const simpleIco = fs.readFileSync(svgPath);
    fs.writeFileSync(icoPath, simpleIco);
    
    console.log('✓ favicon.ico created');
    
    // Update the browser cache busting by adding a timestamp to favicon references
    let htmlContent = fs.readFileSync(indexPath, 'utf8');
    const timestamp = Date.now();
    
    // Add cache busting parameter to favicon links
    htmlContent = htmlContent.replace(
        /href="\/favicon\.svg"/g, 
        `href="/favicon.svg?v=${timestamp}"`
    );
    htmlContent = htmlContent.replace(
        /href="\/favicon\.ico"/g, 
        `href="/favicon.ico?v=${timestamp}"`
    );
    
    fs.writeFileSync(indexPath, htmlContent);
    console.log('✓ Added cache busting to favicon links');
    
    console.log('✅ Favicon setup complete!');
    console.log('Clear your browser cache and refresh the page to see the updated favicon.');
} else {
    console.error('❌ favicon.svg not found in public directory');
}