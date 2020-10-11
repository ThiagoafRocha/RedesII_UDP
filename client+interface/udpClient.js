

function printConsole() {

  var PORT = 33333;
  var HOST = '192.168.0.104';

  var dgram = require('dgram');
  var message = new Buffer.from('Me mande este arquivo');
  var fs = require("fs");

  var wstream = fs.createWriteStream('text.txt');

  wstream.on('finish', function () {
    console.log('Arquivo recuperado');
  });

  var client = dgram.createSocket('udp4');


  client.send(message, 0, message.length, PORT, HOST, function (err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + HOST + ':' + PORT);
  });


  client.on('message', function (msg) {
    wstream.write(msg);
    wstream.end();
    console.log("Mensagem devolvida! ");
    client.close();
  });
}