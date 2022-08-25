var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');
const useDir = __dirname + '/users/';

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    var parsedUrl = url.parse(req.url, true);
    console.log(parsedUrl);
    var store = '';

    req.on('data', (chunk) => {
        store += chunk;
    });

    req.on('end', () => {
        if(req.method == 'POST' && parsedUrl.pathname == '/users'){
            var username = JSON.parse(store).username;
            fs.open(useDir + username + '.json', "wx", (err, fd) => {
                fs.writeFile(fd, store, (err) => {
                    if(err) console.log(err);
                    fs.close(fd, (err) => {
                        res.end(`${username} successfully created`);
                    });
                });
            });
        }
        if(req.method == 'GET' && parsedUrl.pathname == '/users'){
            var username = parsedUrl.query.username;
            fs.readFile(useDir + username + '.json', (err, user) => {
                res.end(user);
            });
        }
        if(req.method == 'DELETE' && parsedUrl.pathname == '/users'){
            var username = parsedUrl.query.username;
            fs.unlink(useDir + username + '.json', (err, done) => {
                if(err){
                     console.log(err);
                }else{
                    res.end(`deleted ${username}`);
                }
            });
        }
        if(req.method == 'PUT' && parsedUrl.pathname == '/users'){
            var username = parsedUrl.query.username;
            fs.open(useDir + username + '.json', "r+", (err, fd) => {
                if(err) console.log(err);
                fs.ftruncate(fd, 100 , (err) => {
                    if(err) console.log(err)
                })
                fs.writeFile(fd, store, (err) => {
                    if(err) console.log(err);
                    fs.close(fd, (err) => {
                        res.end(`${username} successfully updated`);
                    });
                });
            });
        }
    });
}

server.listen(5000, () => {
    console.log('server started at 5000')
});