
const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');

const createWindow = () => {
  const win = new BrowserWindow({
    show: false,
    width: 600,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true,
    }
  })

  win.loadFile('./index.html');

  win.on('ready-to-show', () => {
    win.show();
  })

  // 打开控制台
  win.webContents.openDevTools();

  // 生命周期
  win.webContents.on('dom-ready', () => {
    console.log('2-dom-ready')
  })

  win.webContents.on('did-finish-load', () => {
    console.log('3-did-finish-load: 窗口页面dom加载完毕')
  })

  win.on('close', () => {
    console.log('4-close: 窗口关闭')
  })

  win.on('closed', () => {
    console.log('closed: 窗口关闭')
  })
}

app.whenReady().then(() => {
  console.log('1-ready')
  // 创建窗口
  createWindow();

  app.on('close', () => {
    console.log('close')
  });

  // 当监听 window-all-closed 生命周期后，需要手动执行 app.quit() 才会触发quit相关生命周期
  app.on('window-all-closed', () => {
    console.log('5-window-all-closed: 所有窗口都关闭');
    // 不是macOS系统，当所有窗口被关闭，则退出应用
    if(process.platform !== 'darwin') app.quit();
  });

  app.on('before-quit', () => {
    console.log('6-before-quit: 应用退出前');
  })

  app.on('will-quit', () => {
    console.log('7-will-quit: 应用退出');
  })

  app.on('quit', () => {
    console.log('8-will-quit: 应用已经退出');
  })

  app.on('activate', () => {
    /**
     * 打开应用后，如果没有窗口，则创建窗口
     * 通常Windows，Linux在关闭所有窗口后会退出应用，macOS则不会退出应用，所以再次打开需要创建新窗口
     */
    if(!BrowserWindow.getAllWindows().length) createWindow();
  })

  // 监听渲染进程事件
  ipcMain.on('create-new-window', async () => {
    console.log('btn click')
    createWindow()
  })
});
