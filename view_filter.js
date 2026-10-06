const fs = require('fs');
const content = fs.readFileSync('D:/Bizleap/pages/creators.js', 'utf8');

const startIdx = content.indexOf('return (');
const endIdx = content.indexOf(' {/* Full Width Grid */}');

console.log(content.substring(startIdx, endIdx));
