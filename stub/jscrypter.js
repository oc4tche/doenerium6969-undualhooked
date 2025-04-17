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
  // pack: true,
  identifierGenerator: "randomized",
  // hexadecimalNumbers: true,
  renameVariables: true,
  renameGlobals: true,
  renameLabels: true,
  movedDeclarations: true,
  stringCompression: true,
  stringConcealing: true,
  stringSplitting: true,
  // calculator: true,// maybe
  // objectExtraction: true,// maybe
  globalConcealing: true,
  // shuffle: true,
  duplicateLiteralsRemoval: true,
  controlFlowFlattening: 0.3, // reduit a 0.3 (maybe
  // flatten: true,
  dispatcher: true,// maybe
  opaquePredicates: true,
  deadCode: true,
  astScrambler: true,
  variableMasking: true,
  lock: {
    // endDate: `${config.Expiry}`,// maybe
    selfDefending: true,
    integrity: true,
    antiDebug: true,
  },
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
