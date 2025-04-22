const JsConfuser = require("js-confuser");
const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'stub.js'); // Chemin absolu
const file = fs.readFileSync(inputFile, "utf-8");

JsConfuser.obfuscate(file, {
  "compact": false, // Reduces the code to a compact form
  "controlFlowFlattening": 1, // Mixes the control flow to make the code harder to follow
  "deadCode": 1, // Adds unnecessary code to disrupt understanding
  "dispatcher": 1, // Uses a dispatcher to make the code more complex
  "duplicateLiteralsRemoval": 1, // Removes duplicate literals
  "globalConcealing": true, // Conceals global variables and function names
  "hexadecimalNumbers": true, // Uses hexadecimal numbers to make them less readable
  "identifierGenerator": "randomized", // Generates random variable names
  "minify": false, // Minifies the code to reduce its size
  "movedDeclarations": true, // Moves declarations to complicate the program logic
  "objectExtraction": true, // Extracts object properties to make the code less straightforward
  "opaquePredicates": 1, // Uses opaque predicates to add impossible code paths
  "preset": "medium", // Uses a medium protection preset
  "renameGlobals": true, // Renames global variables to complicate reading
  "renameVariables": true, // Renames local variables to complicate reading
  "shuffle": true, // Shuffles the code to disrupt logic
  "stack": 1, // Uses stack manipulation to make the code harder to follow
  "stringConcealing": true, // Conceals strings to make their content less obvious
  "stringSplitting": 1, // Splits strings to complicate reconstruction
  "target": "node" // Targets Node.js
}).then((obfuscated) => {
  const buildDir = path.join(__dirname, '../build');
  const outputPath = path.join(buildDir, 'index.js');
  
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
  }
  const outputContent = typeof obfuscated === 'string' ? obfuscated : JSON.stringify(obfuscated);

  fs.writeFileSync(outputPath, outputContent, 'utf8');
  if (!fs.existsSync(outputPath)) {
    throw new Error('INDEX.JR NON CREE DANS BUILD/');
  }
  console.log('Verification du fichier:');
  console.log(fs.readFileSync(outputPath, 'utf8').substring(0, 100) + '...');
  console.log('Build créé avec succès dans /build/index.js');
  
}).catch((error) => {
  console.error('Erreur d\'obfuscation:', error);
  process.exit(1);
});
