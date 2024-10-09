const { app, BrowserWindow, ipcMain } = require('electron');
const {autoUpdater} = require('electron-updater');
const path = require('path');
const url = require('url');

const SERVER = 'https://github.com/aggarwaldevops/sampleapp/releases'; // Replace with your GitHub repo
const COW_FILE = 'latest.yml'; // GitHub releases information file

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    win.loadFile(path.join(__dirname, 'www/index.html'));
}

app.on('ready', () => {
    createWindow();
    autoUpdater.checkForUpdatesAndNotify();
});

autoUpdater.on('update-available', () => {
    console.log('Update available');
});

autoUpdater.on('update-downloaded', () => {
    autoUpdater.quitAndInstall();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
