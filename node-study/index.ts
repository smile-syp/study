const http = require('node:http');
const assertApi = require('./api/assert');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req: any, res: any) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World1');
});


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})