
function injectScript(fileName) {
	const file_path = chrome.runtime.getURL(fileName)
	const script = document.createElement("script");
	script.setAttribute("type", "text/javascript");
	script.setAttribute("src", file_path);
	document.getElementsByTagName('body')[0].appendChild(script)
}
// 注入脚本
injectScript("./inject.js");

console.log('content:', window.demoName)