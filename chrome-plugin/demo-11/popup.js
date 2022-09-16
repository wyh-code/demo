// 发送长链接
chrome.tabs.query({ active: true }, (tabs) => {
  console.log(tabs, '==tabs==')
  var port = chrome.tabs.connect(tabs[0].id, { name: 'popup-connect' });
  port.postMessage({ msg: '我是popup' });

  port.onMessage.addListener((msg) => {
    console.log(msg)
    view.innerText = JSON.stringify(msg)
  })

  btn.onclick = () => {
    port.postMessage({ msg: '我是popup', type: 'click' });
  }
});
