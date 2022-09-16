
console.log('background.js')

fetch('http://127.0.0.1:3000').then(res => res.text()).then(res => {
  console.log(res)
})