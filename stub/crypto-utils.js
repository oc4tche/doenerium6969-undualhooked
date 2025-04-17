const crypto = require('crypto');
const { spawn } = require('child_process');

function encrypt(text, masterkey) {
  const iv = crypto.randomBytes(16);
  const salt = crypto.randomBytes(16);
  const key = crypto.pbkdf2Sync(masterkey, salt, 100000, 32, 'sha512');
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return { encryptedData: encrypted, salt: salt.toString('base64'), iv: iv.toString('base64') };
}

function decrypt(encdata, masterkey, salt, iv) {
  const key = crypto.pbkdf2Sync(masterkey, Buffer.from(salt, 'base64'), 100000, 32, 'sha512');
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'base64'));
  let decrypted = decipher.update(encdata, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

function executeSecondCrypterScript() {
  const childProcess = spawn('node', ['jscrypter.js'], { cwd: __dirname, stdio: 'inherit' });

  childProcess.on('error', (error) => {
    console.error(`Script execution error: ${error.message}`);
  });

  return new Promise((resolve) => {
    childProcess.on('exit', (code) => {
      if (code !== 0) console.error(`Script exited with code ${code}`);
      resolve();
    });
  });
}

module.exports = { encrypt, decrypt, executeSecondCrypterScript };