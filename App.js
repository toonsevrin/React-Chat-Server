var server = require('http').createServer();
var io = require('socket.io')(server);
io.on('connection', function(client){
    console.log("Connection received");
    client.on('sendmsg', function(data){
            console.log("Received " + data);
            let json = JSON.parse(data.toString());
            if(!json.name|| !json.msg|| !json.timestamp) {//Should also check typesafety but whatever
                console.log("Received a message without a name or msg field :(");
                return;
            }
            json.timestamp = Date.now();
            io.sockets.emit("chat", JSON.stringify(json));
    });
});
server.listen(8080);
console.log("Listening on port 8080!");