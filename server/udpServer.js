var PORT = 33333;
var HOST = '192.168.0.104';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var fs = require("fs");


server.on('listening', function () {
  var address = server.address();
  console.log('Server listening on: ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
  console.log(remote.address + ':' + remote.port + ' - ' + message);

  fs.readFile('test.txt', function(err, data){
    if (err){
      return console.log(err);
    }

    server.send(data, 0, message.length, remote.port, remote.address, function (error) {
      if (error) throw error;
      console.log("Dados enviados para: "+ remote.address);
      server.close();
    });

  });
});


server.bind(PORT, HOST);