
console.log('--renderer--')
const createWin = document.getElementById('createWin');
createWin.addEventListener('click', () => {
  console.log('create-new-window: ', window.ipcRenderer)
  window.ipcRenderer.send('create-new-window')
})