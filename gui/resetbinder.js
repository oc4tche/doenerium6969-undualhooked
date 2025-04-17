const fs = require('fs');
const path = require('path');

const stubFilePath = path.join(__dirname, '..', 'stub', 'stub.js');
let stubContent = fs.readFileSync(stubFilePath, 'utf8');
stubContent = stubContent.replace(/const url = '.*';/, "const url = 'BINDER-LINK-HERE';");
fs.writeFileSync(stubFilePath, stubContent, 'utf8');
console.log(`Replaced the URL with 'BINDER-LINK-HERE' in ${stubFilePath}`);
