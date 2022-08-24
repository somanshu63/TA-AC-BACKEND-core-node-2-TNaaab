var path = require('path');
var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');



console.log(__dirname + `/server.js`);
console.log(__dirname + `/app.js`);
console.log(path.relative('server.js', 'index.html'));
console.log(path.resolve() + '/index.html');


var server1 = http.createServer((req, res) => {
    var parsedUrl = url.parse(req.url, true);
    var store = "";
    if(req.method == 'POST' && parsedUrl.pathname == '/'){
        req.on('data', (chunk) => {
            store += chunk;
        });
        req.on('end', () => {
            res.write(store);
            res.statusCode = 201;
            res.end();            
        });
    }
});
server1.listen(5000, () => {
    console.log('server listed at 5k');
});


var serve2 = http.createServer((req, res) => {
    var parsedUrl = url.parse(req.url, true);
    var store = "";
    if(req.method == 'POST' && parsedUrl.pathname == '/'){
        req.on('data', (chunk) => {
            store += chunk;
        });
        req.on('end', () => {
            store = querystring.parse(store);
            res.write(JSON.stringify(store));
            res.statusCode = 201;
            res.end();          
        });
    }
});
serve2.listen(6000, () => {
    console.log('server listed at 6k');
});




var server3 = http.createServer((req, res) => {
    var parsedUrl = url.parse(req.url, true);
    var store = "";
    if(req.method == 'POST' && parsedUrl.pathname == '/'){
        req.on('data', (chunk) => {
            store += chunk;
        });
        req.on('end', () => {
            if(req.headers['content-type'] == 'application/json'){
                res.write(store);
                res.statusCode = 201;
                res.end();
            }

            if(req.headers['content-type'] == 'application/x-www-form-urlencoded'){
                store = querystring.parse(store);
                res.write(JSON.stringify(store));
                res.statusCode = 201;
                res.end();
            }
        });
    }
});

server3.listen(9000, () => {
    console.log('server listed at 9k');
});



var server4 = http.createServer((req, res) => {
    var parsedUrl = url.parse(req.url, true);
    var store = "";
        req.on('data', (chunk) => {
            store += chunk;
        });
        req.on('end', () => {
            if(req.headers['content-type'] == 'application/json'){
                res.write(`<h1>${store.name}</h1><h2>${store.email}</h2>`);
                res.end();
            }
        });
});

server4.listen(8000, () => {
    console.log('server listed at 8k');
});


var server5 = http.createServer((req, res) => {
    var parsedUrl = url.parse(req.url, true);
    console.log(req.headers['content-type']);
    var store = "";
        req.on('data', (chunk) => {
            store += chunk;
        });
        req.on('end', () => {
            if(req.headers['content-type'] == 'application/x-www-form-urlencoded'){
                store = querystring.parse(store);
                res.write(`<h1>${store.name}</h1><h2>${store.email}</h2>`);
                res.end();
            }
        });
});

server5.listen(8500, () => {
    console.log('server listed at 8.5k');
});