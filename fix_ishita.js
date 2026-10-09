const fs = require('fs');
let content = fs.readFileSync('pages/creators.js', 'utf8');

// Ishita -> rename to "Ishita Bhatti" and 14.7K
content = content.replace(/name:\s*"Ishita"([^]*?)followers:\s*"[^"]*"/g, 'name: "Ishita Bhatti"$1followers: "14.7K"');

fs.writeFileSync('pages/creators.js', content);
console.log('Fixed Ishita!');
