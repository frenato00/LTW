const http = require('http');
const url = require('url');
const model = require('./model.js');
const headers = {
    'plain': {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        'Connection': 'keep-alive'
    },

    'options' : {
        'Access-Control-Allow-Headers': 'content-type',
        'Access-Control-Allow-Max-Age': 86400,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Origin': null
    }
};


function doPost(pathname) {
    let answer = {};

    switch(pathname){
        case '/ranking':
            answer.status = 200;
            model.ranking();
            answer.body = model.data;
            break;
        
        case '/register':
            model.register(chunk);
            answer.body = model.data;
            if (answer.body == {}) {
                answer.status = 200;
            }
            else {
                answer.status = 400;
            }
            break;

        default:
            answer.status = 400;
    }

    return answer;
}

const server = http.createServer((request, response) => {
    const preq = url.parse(request.url, true);
    const pathname = preq.pathname;
    let answer = {};

    switch(request.method) {
        case 'POST':
            answer = doPost(pathname);
            answer.style = "plain";
            break;

        case 'OPTIONS' :
            answer.status = 204;
            answer.style = "options";
            break;

        default:
            answer.status = 400;
            answer.style = "plain";
    }

    response.writeHead(answer.status, headers[answer.style]);
    response.end(answer.body);
});

server.listen(9093);
