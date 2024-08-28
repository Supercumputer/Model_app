const { app, BrowserWindow, ipcMain } = require('electron')
const { fork } = require('child_process');
const {
    startApp,
    closeApp,
    pressBack,
    pressHome,
    pressMenu,
    inStallApp,
    unInStallApp,
    isInStallApp,
    deciceActions,
    toggleService,
    transferFile,
    touch,
    swipeSimple,
    swipeCustom,
    typeText,
    screenShot,
    pressKey
} = require('./adbFunctions');

const path = require('node:path');


const isDev = process.env.NODE_ENV !== 'development'

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
        }
    })

    if (isDev) {
        win.webContents.openDevTools()
    }

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
    const wsScrcpy = fork(path.join(__dirname, 'ws-scrcpy/dist/index.js'));
    ipcMain.handle('pressBack', () => pressBack());
    ipcMain.handle('pressHome', () => pressHome());
    ipcMain.handle('pressMenu', () => pressMenu());
    ipcMain.on('device-actions', (event, action) => deciceActions(event, action));

    ipcMain.on('toggle-service', (event, service) => toggleService(event, service));

    ipcMain.on('open-app', (event, packageName) => startApp(event, packageName))

    ipcMain.on('close-app', (event, packageName) => closeApp(event, packageName));

    ipcMain.on('uninstall-app', (event, packageName) => unInStallApp(event, packageName));

    ipcMain.on('isinstall-app', (event, packageName) => isInStallApp(event, packageName));

    ipcMain.on('install-app', (event, apkPath) => inStallApp(event, apkPath));

    ipcMain.on('touch', (event, xpath, timeOut, touchType, delay) => touch(event, xpath, timeOut, touchType, delay));

    ipcMain.on('swipe-simple', (event, direction) => swipeSimple(event, direction));

    ipcMain.on('swipe-custom', (event, startX, startY, endX, endY, duration) => swipeCustom(event, startX, startY, endX, endY, duration));

    ipcMain.on('transfer-file', (event, action, localFilePath, remoteFilePath) =>
        transferFile(event, action, localFilePath, remoteFilePath)
    );

    ipcMain.on('type-text', (event, selector, seconds, text) =>
        typeText(event, selector, seconds, text)
    );

    ipcMain.on('screen-shot', (event, options) => screenShot(event, options));

    ipcMain.on('press-key', (event, keyCode) => pressKey(event, keyCode));

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
