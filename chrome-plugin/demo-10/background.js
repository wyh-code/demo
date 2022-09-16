// 当窗口中的活动选项卡更改时触发，监听tabs变化
chrome.tabs.onActivated.addListener((tabs) => {
  console.log(tabs, '==tabs-onActivated==')

  chrome.tabs.query({ active: true }, (tabs) => {
    console.log(tabs, '==tabs==')
  });
})