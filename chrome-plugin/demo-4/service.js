const http = require('http');

const ip = '127.0.0.1';
const port = 3000;

http
  .createServer((req, res) => {
    res.end('hello world!');
  })
  .listen(port, ip);
console.log(`server has started at ${ip}:${port}`);