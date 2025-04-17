const JsConfuser = require("js-confuser");
const fs = require('fs');
const colors = require('colors');
const path = require('path');
const { exec } = require('child_process');

const inputFile = "./node_modules/input.js";
const file = fs.readFileSync(inputFile, "utf-8");
JsConfuser.obfuscate(file, {
  target: "node",
  compact: true,
  identifierGenerator: "mangled",
  renameVariables: true,
  stringCompression: true,
  stringConcealing: true,
  duplicateLiteralsRemoval: true
}).then((obfuscated) => {
  const targetFolderName = '../build';
  const fileName = 'index.js';
  const targetFolder = path.join(__dirname, targetFolderName);
  const outputContent = typeof obfuscated === 'string' ? obfuscated : JSON.stringify(obfuscated);
  if (!fs.existsSync(targetFolder)) fs.mkdirSync(targetFolder);
  const targetFile = path.join(targetFolder, fileName);
  fs.writeFileSync(targetFile, outputContent, 'utf8');
}).catch((error) => {
  console.error('obf failed:', error);
  process.exit(1);
});
