var http = require('http');
var querystring = require('querystring');


var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    var store = ""
    console.log(req.headers['content-type']);
    req.on('data', (chunk) => {
        store += chunk;
    });

    req.on('end', () => {
        if(req.headers['content-type'] == 'application/json'){
            res.end(store);
        }

        if(req.headers['content-type'] == 'application/x-www-form-urlencoded'){
            store = querystring.parse(store);
            res.end(JSON.stringify(store));
        }
    });
}

server.listen(7000);