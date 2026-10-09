const fs = require('fs');
let content = fs.readFileSync('pages/creators.js', 'utf8');

content = content.replace(/className="columns-2 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 sm:gap-6 lg:gap-8"/g, 'className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6 lg:gap-8"');

fs.writeFileSync('pages/creators.js', content);
console.log('Mobile view fixed');
