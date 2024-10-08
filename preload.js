const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    pressBack: () => ipcRenderer.invoke('pressBack'),
    pressHome: () => ipcRenderer.invoke('pressHome'),
    pressMenu: () => ipcRenderer.invoke('pressMenu'),
    sendOpenApp: (packageName) => ipcRenderer.send('open-app', packageName),
    sendPressKeyApp: (keyCode) => ipcRenderer.send('press-key', keyCode),
    sendTouchApp: (xPath, timeOut, touchType, delay) => ipcRenderer.send('touch', xPath, timeOut, touchType, delay),
    sendSwipeSimpleApp: (direction) => ipcRenderer.send('swipe-simple', direction),
    sendSwipeCustomApp: (startX, startY, endX, endY, duration) => ipcRenderer.send('swipe-custom', startX, startY, endX, endY, duration),
    sendActionApp: (action) => ipcRenderer.send('device-actions', action),
    sendToggleApp: (service) => ipcRenderer.send('toggle-service', service),
    sendCloseApp: (packageName) => ipcRenderer.send('close-app', packageName),
    sendUnInstallApp: (packageName) => ipcRenderer.send('uninstall-app', packageName),
    sendIsInstallApp: (packageName) => ipcRenderer.send('isinstall-app', packageName),
    sendTransferFileApp: (action, localFilePath, remoteFilePath) => ipcRenderer.send('transfer-file', action, localFilePath, remoteFilePath),
    sendTypeTextApp: (selector, seconds, text) => ipcRenderer.send('type-text', selector, seconds, text),
    sendScreenShotApp: (options) => ipcRenderer.send('screen-shot', options),
    sendInstallApp: (apkPath) => ipcRenderer.send('install-app', apkPath),
    onOpenAppReply: (callback) => ipcRenderer.on('open-app-reply', callback),

    onOpenScreenApp: () => ipcRenderer.invoke('start-ws-scrcpy'),
    onCloseScreenApp: () => ipcRenderer.invoke('stop-ws-scrcpy'),

});
