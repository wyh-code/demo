
function injectScript(fileName) {
	const file_path = chrome.runtime.getURL(fileName)
	const script = document.createElement("script");
	script.setAttribute("type", "text/javascript");
	script.setAttribute("src", file_path);
	document.getElementsByTagName('body')[0].appendChild(script)
}
// 注入脚本
injectScript("./inject.js");

console.log('content')

// 接收 inject 消息
window.addEventListener("message", (e) => {
	if (e.data.form === 'inject') {
		console.log('收到 inject 的消息: ', e);
		window.postMessage({
			msg: '你好, content 接收到了你的消息',
			form: 'content'
		}, '*');


		// 通知backgroubd，脚本注入成功
		chrome.runtime.sendMessage({ msg: '脚本注入成功！' }, (response) => {
			console.log('收到来自后台的回复：' + response);
		});

		// 接收消息
		chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
			console.log('收到来自background的消息：');
			console.log(request, sender, sendResponse);
			sendResponse('background，我已收到你的消息：' + JSON.stringify(request));
		});
	}
}, false);


// 发送长连接
// const port = chrome.runtime.connect({name: "content-connect"});
// port.postMessage({msg: "我是 content-connect"});
// port.onMessage.addListener(function(msg) {
// 		console.log(msg)
// });

// 接收长连接
// chrome.runtime.onConnect.addListener(function (port) {
// 	console.log(port);
// 	if (port.name == 'popup-connect') {
// 		port.postMessage({ msg: '我是content，通信接通了' });
// 	}

// 	port.onMessage.addListener(function(msg) {
// 			console.log(msg)
// 	});
// });