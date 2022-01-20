const http = require('http');
const url = require('url');
const fs = require('fs');

function doPost(pathname) {
    let answer = {};

    switch(pathname){
        case '/ranking':
            
            break;
        
        case '/register':
            break;

        default:
            answer.status = 400;
    }
}

const server = http.createServer((request, response) => {
    const preq = url.parse(request.url, true);
    const pathname = preq.pathname;
    let answer = {}

    switch(request.method()) {
        case 'GET':
            doGet(pathname, request, response);
            break;

        case 'POST':
            doPost(pathname);
            break;

        default:
            answer.status = 400;
    }
}).listen(9093);