const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

function executeSecondCrypterScript() {
  const buildDir = path.join(__dirname, '../build');
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
  }

  const childProcess = spawn('node', [path.join(__dirname, 'jscrypter.js')], {
    cwd: buildDir,
    stdio: 'inherit'
  });

  return new Promise((resolve) => {
    childProcess.on('exit', (code) => {
      if (code !== 0) console.error(`Script exited with code ${code}`);
      resolve();
    });
  });
}

module.exports = { executeSecondCrypterScript };
