const fs = require('fs');
let content = fs.readFileSync('pages/creators.js', 'utf8');

// 1. Revert to columns-2 for mobile and reduce the gap slightly on mobile
content = content.replace(/className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6 lg:gap-8"/g, 'className="columns-2 sm:columns-2 lg:columns-3 xl:columns-4 gap-2 sm:gap-6 lg:gap-8"');

// 2. Reduce the padding of the main container on mobile to give cards more space
// Current: <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
content = content.replace(/className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20"/g, 'className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 pb-20"');

// Also there is another wrapper with padding:
// <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8 flex flex-col items-start text-left">
// We shouldn't necessarily touch that if it's just the header/filters, but we can so it aligns.
content = content.replace(/className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8/g, 'className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 pt-16 pb-8');


fs.writeFileSync('pages/creators.js', content);
console.log('Restored 2 columns, reduced gap/padding on mobile.');
