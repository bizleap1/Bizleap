const fs = require('fs');
let content = fs.readFileSync('pages/creators.js', 'utf8');

// Helper to generate a random string like "15.2K", "34.7K", etc. above 12K.
function getRandomFollowers() {
    const val = (Math.random() * (150 - 12) + 12).toFixed(1);
    return val + 'K';
}

// 1. First, replace all `followers: "..."` with random if they are "-" or currently have some value?
// The user said "and baki isme random 12 k ke upper followers dikhana random" 
// which means for all influencers in the data (or at least those that we don't specifically override), give them >12K.
// We will replace ALL `followers: "..."` with a random one FIRST, 
// then override the specific ones. 
// Wait, replacing ALL followers might replace Magazine readership or other fields if they share the `followers` key.
// Only influencers have `followers`. Magazines have `readership`. Digital has `reach`. Newspapers have `circulation`.
// So replacing `followers: "..."` globally is safe for influencers.

content = content.replace(/followers:\s*"[^"]*"/g, () => {
    return 'followers: "' + getRandomFollowers() + '"';
});

// Now apply specific overrides:

// Aira Shetty -> 46.3K
content = content.replace(/(name:\s*"Aira Shetty"[^}]*?)followers:\s*"[^"]*"/g, '$1followers: "46.3K"');

// Ishita Bhatti -> 14.7K
content = content.replace(/(name:\s*"Ishita Bhatti"[^}]*?)followers:\s*"[^"]*"/g, '$1followers: "14.7K"');

// Parul -> rename to "Parul Meshram" and 25.5K
content = content.replace(/name:\s*"Parul"([^]*?)followers:\s*"[^"]*"/g, 'name: "Parul Meshram"$1followers: "25.5K"');

// Jheel -> rename to "Jheel Chabbariya" and 77.5K
content = content.replace(/name:\s*"Jheel"([^]*?)followers:\s*"[^"]*"/g, 'name: "Jheel Chabbariya"$1followers: "77.5K"');

// Saumya -> rename to "Somya Kodan" and 339K
let saumyaReplaced = false;
content = content.replace(/name:\s*"Saumya"([^]*?)followers:\s*"[^"]*"/g, (match, p1) => {
    if (!saumyaReplaced) {
        saumyaReplaced = true;
        return 'name: "Somya Kodan"' + p1 + 'followers: "339K"';
    }
    return match; 
});

fs.writeFileSync('pages/creators.js', content);
console.log('Followers and names updated successfully!');
