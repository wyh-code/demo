
const path = require('path');
const { app, BrowserWindow } = require('electron');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('./index.html');

  // 打开控制台
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  // 创建窗口
  createWindow();

  app.on('close', () => {
    console.log('close')
  });

  app.on('window-all-closed', () => {
    // 不是macOS系统，当所有窗口被关闭，则退出应用
    if(process.platform !== 'darwin') app.quit();
  });

  app.on('activate', () => {
    /**
     * 打开应用后，如果没有窗口，则创建窗口
     * 通常Windows，Linux在关闭所有窗口后会退出应用，macOS则不会退出应用，所以再次打开需要创建新窗口
     */
    if(!BrowserWindow.getAllWindows().length) createWindow();
  })
});