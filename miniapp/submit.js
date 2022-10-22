
const fs = require('fs');
const axios = require('axios');
const qs = require('qs');
const data = require('./data.json');

const { single_list, multi_list, judge_list, answer_item_id } = data.data;
const req = [];
const getParams = (item, index, is_submit) => {
  return {
    id:	answer_item_id,
    type:	item.answer_method_id,
    index,
    result: item.self_answer.result,
    is_submit: is_submit ? 2 : 1
  }
}

single_list.forEach((item, index) => {
  if(index > 0){
    req.push(getParams(item, index))
  }
})
multi_list.forEach((item, index) => {
  req.push(getParams(item, index))
})
judge_list.forEach((item, index) => {
  req.push(getParams(item, index, index ===judge_list.length - 1))
})

function sleep(wait){
  let t = +new Date;
  while(+new Date < t + wait){}
}

function request(index){
  if(req[index]){
    console.log(req[index])
    axios.post('https://qinglian.junhecms.com/api/user/submit_answer', qs.stringify(req[index]), {
      headers: {
        accept:	'*/*',
        'content-type':	'application/x-www-form-urlencoded',
        'user-agent':	'Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E217 MicroMessenger/6.8.0(0x16080000) NetType/WIFI Language/en Branch/Br_trunk MiniProgramEnv/Mac',
        'content-length':	qs.stringify(req[index]).length,
        'referer': 'https://servicewechat.com/wx612bd346ea895c7a/2/page-frame.html',
        'token': 'd4741ca4-3196-472b-83e5-594acb37b50f',
        'accept-language':	'zh-CN,zh-Hans;q=0.9',
        'istiyan': '1',
        'accept-encoding': 'gzip, deflate, br'
      }
    }).then(res => {
      console.log(res.data)
      sleep(Math.random() * 1000)
      request(index + 1)
    })
  }else{
    console.log('请求结束')
  }
}
request(0)

// fs.writeFileSync('./params.json', JSON.stringify(req))





