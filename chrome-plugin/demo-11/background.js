// 监听来自content-script的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
 console.log('收到来自content-script的消息：');
 console.log(request, sender, sendResponse);
 sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
});


// 异步返回
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
//   sendResponse('稍等。。。。')
//   // todo。。。。

//   setTimeout(() => {
//     // 选中当前宿主页面
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       chrome.tabs.sendMessage(tabs[0].id, { type: "from-background" }, response => {
//         console.log("content 回复的消息", response);
//       })
//     });
//   })
// });

// 接收长链接
// chrome.runtime.onConnect.addListener(function (port) {
// 	console.log(port);
// 	if (port.name == 'content-connect') {
// 		port.onMessage.addListener(function (msg) {
// 			console.log('收到长连接消息：', msg);
// 			port.postMessage({ msg: '我是backgeound，收到了你的消息'+JSON.stringify(msg) });

//       setTimeout(() => {
//         port.postMessage({ msg: '我是backgeound，这是延迟消息' })
//       }, 3000)
// 		});
// 	}
// });

