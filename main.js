const { app, BrowserWindow } = require('electron');
const path = require('path');
const { initAutoUpdate } = require('./modules/updates-win/electron-updater');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true
    }
  });
  win.loadFile(path.join(__dirname, 'index.html')).catch(() => {
    win.loadURL('data:text/html,<h1>Soulvan Racing</h1><p>Starter scaffold</p>');
  });
}

app.whenReady().then(() => {
  initAutoUpdate();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});