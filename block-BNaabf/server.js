var http = require('http');
var path = require('path');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');



console.log(`...../project/client/index.html`);
console.log(__dirname + '/index.js');


var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    var parsedUrl = url.parse(req.url);
    if(req.method == 'GET' && parsedUrl.pathname == '/form'){
        fs.createReadStream('./form.html').pipe(res);
    }
    if(req.method == 'POST' && parsedUrl.pathname == '/form'){
        var store = '';
        req.on('data', (chunk) => {
            store += chunk;
        });
        req.on('end', () => {
            var parsedData = querystring.parse(store);
            res.write(JSON.stringify(parsedData));
            res.end();
        });
    }
}

server.listen(5678, () => {
    console.log('server started at 5678');
});