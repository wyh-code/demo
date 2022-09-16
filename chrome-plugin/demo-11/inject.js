
console.log('inject')
window.postMessage({
  msg: '你好！inject 注入成功!',
  form: 'inject'
}, '*');


// 接收 content 消息
window.addEventListener("message", (e) => {
  if(e.data.form === 'content'){
    console.log('收到 content 的消息: ', e);
  }
}, false);