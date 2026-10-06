const fs = require('fs');

const creatorsFile = 'D:\\Bizleap\\pages\\creators.js';
let content = fs.readFileSync(creatorsFile, 'utf8');

// 1. Get folders and build array
const influencersDir = 'D:\\Bizleap\\public\\influencers pic';
const folders = fs.readdirSync(influencersDir);

let influencersData = [];
let maxId = 100;

folders.forEach(folder => {
    const folderPath = influencersDir + '\\\\' + folder;
    if (fs.statSync(folderPath).isDirectory()) {
        const files = fs.readdirSync(folderPath);
        const imageFile = files.find(f => f.match(/\.(png|jpg|jpeg|webp)$/i));
        if (imageFile) {
            const imagePath = "/influencers pic/" + folder + "/" + imageFile;
            const name = folder.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            
            maxId++;
            influencersData.push({
                id: maxId,
                name: name,
                location: "Nagpur",
                instagramLink: "#",
                gender: "female",
                contentStyle: "Lifestyle",
                followers: "-",
                engagement: "-",
                image: imagePath
            });
        }
    }
});

// 2. Remove specified ones
const namesToRemove = [
  "shakshi dung", "sakshi dung", "santoshi telgu", "sneha roy", "vatsala sharma", "vatsal sharma",
  "needhi sethi", "nidhi sethi", "samrin khan", "bhagyashree", "arpita chandekar",
  "sania", "usha", "poonam p", "priya rajput", "reetu agrawal", "ritu agrawal"
].map(n => n.toLowerCase());

influencersData = influencersData.filter(item => {
  const lowerName = item.name.toLowerCase();
  return !namesToRemove.some(n => lowerName.includes(n));
});

// 3. Apply overrides
influencersData = influencersData.map(item => {
  if (item.name === "Aira Shetty") item.imageClass = "object-cover object-[center_25%]";
  if (item.name === "Alandi Bhoyar") item.imageClass = "object-cover object-[center_20%]";
  if (item.name === "Angel Peter") item.imageClass = "object-cover object-[center_70%] !scale-110 group-hover:!scale-[1.15]";
  if (item.name === "Ankita Sampat") item.imageClass = "object-cover object-top";
  if (item.name === "Divya Suryavanshi") item.imageClass = "object-cover object-[center_30%]";
  if (item.name === "Shreya Singh") item.imageClass = "object-cover object-top";
  if (item.name === "Simran") item.imageClass = "object-cover object-top";
  return item;
});

// 4. Format string
let newArrayStr = 'const influencersData = [\n';
influencersData.forEach((item, index) => {
    let objStr = '  { ';
    const keys = Object.keys(item);
    keys.forEach((key, kIdx) => {
      let val = item[key];
      if (typeof val === 'string') val = '"' + val.replace(/"/g, '\\"') + '"';
      objStr += key + ': ' + val;
      if (kIdx < keys.length - 1) objStr += ', ';
    });
    objStr += ' }';
    if (index < influencersData.length - 1) objStr += ',\n';
});
newArrayStr += '\n];';

// 5. Safely replace
content = content.replace(/const influencersData\s*=\s*\[[\s\S]*?\];\s*/, newArrayStr + '\n\n');

// 6. Fix customSort if needed
content = content.replace(
    'influencer: customSort(influencersData, ["faimin malik", "aishwarya lad", "samrin khan"])',
    'influencer: customSort(influencersData, [])'
);

fs.writeFileSync(creatorsFile, content, 'utf8');
console.log('Injected successfully. Total items: ' + influencersData.length);
