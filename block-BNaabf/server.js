var http = require('http');
var path = require('path');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');



console.log(`...../project/client/index.html`);
console.log(__dirname + '/index.js');


var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    var parsedUrl = url.parse(req.url, true);
    console.log(req.method, parsedUrl.pathname);

    var store = '';
    req.on('data', (chunk) => {
        store += chunk;
    });
    req.on('end', () => {
        if(req.method == 'GET' && parsedUrl.pathname == '/form'){
            fs.readFile('./form.html', (err, content) => {
                res.end(content);
            });
        }
        if(req.method == 'POST' && parsedUrl.pathname == '/form'){
            res.setHeader('content-type', 'text/html');
            var parsedData = querystring.parse(store);
            res.write(`<h2>${parsedData.name}</h2>`)
            res.write(`<h3>${parsedData.email}</h3>`)
            res.write(`<h3>${parsedData.age}</h3>`)
            res.end();
        }
    });
    
    
}

server.listen(5678, () => {
    console.log('server started at 5678');
});