const fs = require('fs');
const path = require('path');

const linkFilePath = path.join(__dirname, 'src', 'link.json');
const stubFilePath = path.join(__dirname, '..', 'stub', 'stub.js');
const linkData = JSON.parse(fs.readFileSync(linkFilePath, 'utf8'));
const newUrl = linkData.url;
let stubContent = fs.readFileSync(stubFilePath, 'utf8');
stubContent = stubContent.replace('BINDER-LINK-HERE', newUrl);
fs.writeFileSync(stubFilePath, stubContent, 'utf8');
console.log(`Replaced 'BINDER-LINK-HERE' with the URL from link.json in ${stubFilePath}`);
