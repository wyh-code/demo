const data = require('./data.json');

const fs = require('fs');

const list = data.data.list;

let result = list.map((item, index) => {

  return {
    id: index + 1,
    result: item.self_answer.result
  }
})


fs.writeFileSync('./da.json', JSON.stringify(result))