const fs = require('fs');
const path = require('path');
const Tesseract = require('tesseract.js');

const directoryPath = path.join(__dirname, 'public', 'new logos');

async function checkLogos() {
    try {
        const files = fs.readdirSync(directoryPath);
        for (const file of files) {
            if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
                const filePath = path.join(directoryPath, file);
                try {
                    const result = await Tesseract.recognize(filePath, 'eng');
                    const text = result.data.text.toUpperCase();
                    if (text.includes('ELLIPSES') || text.includes('ELLIPSE')) {
                        console.log(`FOUND ELLIPSES: ${file}`);
                    }
                    if (text.includes('ARVIND') || text.includes('PHARMA')) {
                        console.log(`FOUND ARVIND: ${file}`);
                    }
                } catch (e) {
                    // Ignore errors for individual files
                }
            }
        }
        console.log("Finished OCR check.");
    } catch (err) {
        console.log('Unable to scan directory: ' + err);
    }
}

checkLogos();
