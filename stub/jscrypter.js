const JsConfuser = require("js-confuser");
const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'stub.js');
const file = fs.readFileSync(inputFile, "utf-8");

JsConfuser.obfuscate(file, {
  target: "node",
  compact: false,
  minify: false,
  identifierGenerator: "randomized",
  renameVariables: true,
  renameGlobals: true,
  movedDeclarations: true,
  stringCompression: true,
  stringConcealing: true,
  stringSplitting: 1,
  hexadecimalNumbers: true,
  calculator: true,
  controlFlowFlattening: 1,
  stack: 1,
  dispatcher: true,
  opaquePredicates: 1,
  objectExtraction: true,
  globalConcealing: true,
  shuffle: true,
  duplicateLiteralsRemoval: true,
  deadCode: 1,
}).then((obfuscated) => {

  const buildDir = path.join(__dirname, '../build');
  const outputPath = path.join(buildDir, 'index.js');
  if (!fs.existsSync(buildDir)) fs.mkdirSync(buildDir, { recursive: true });
  const outputContent = typeof obfuscated === 'string' ? obfuscated : JSON.stringify(obfuscated);
  fs.writeFileSync(outputPath, outputContent, 'utf8');
  if (!fs.existsSync(outputPath)) throw new Error('index.js not created in build/');
  console.log(fs.readFileSync(outputPath, 'utf8').substring(0, 100) + '...');
  
}).catch((error) => {
  console.error('Error with obfuscation:', error);
  process.exit(1);
});
