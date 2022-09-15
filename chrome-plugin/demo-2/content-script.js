

console.log('content-script.js')

console.log(document.getElementsByTagName('body'))


setTimeout(() => {
  console.log('content-script-setTimeout：', window.demoName)
}, 2000)