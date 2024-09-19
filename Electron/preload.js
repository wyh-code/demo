const { contextBridge, ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  app.innerText = 'app start';

  console.log('process.versions: ', process.versions)
})

contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel, data) => {
    if(channel === 'create-new-window') {
      console.log('exposeInMainWorld: create-new-window')
      ipcRenderer.send(channel, data)
    }
  },
  // receive: (channel, func) => {
  //   if (channel === 'fromMain') {
  //     // 接收来自主进程的消息
  //     ipcRenderer.on(channel, (event, ...args) => func(...args));
  //   }
  // }
})
