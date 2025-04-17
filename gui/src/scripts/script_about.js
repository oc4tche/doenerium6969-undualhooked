const { shell } = require('electron')

const sidebar = document.querySelector('.sidebar');
const togglebtn = document.querySelector('.toggle-btn');

togglebtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

const githubLink = 'https://github.com/oc4tche/doenerium6969-unhooked';
document.getElementById('github-link').addEventListener('click', () => {
    shell.openExternal(githubLink);
});

const discordLink = 'https://t.me/vatfraudster';
document.getElementById('discord-link').addEventListener('click', () => {
    shell.openExternal(discordLink);
});

document.addEventListener('DOMContentLoaded', () => {
    const url = 'https://raw.githubusercontent.com/oc4tche/doenerium6969-unhooked/main/gui/about';
    const aboutTextElement = document.getElementById('about-text');
    const cacheBustingUrl = `${url}?t=${new Date().getTime()}`;
    fetch(cacheBustingUrl)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(data => {
            aboutTextElement.innerHTML = data;
        })
        .catch(error => {
            console.error('Error fetching the about text:', error);
            aboutTextElement.innerHTML = '<p>Failed to load content. Please try again later.</p>';
        });
});
