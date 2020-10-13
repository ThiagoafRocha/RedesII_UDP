var PORT = 8000; // É a porta para conexão entre servidor e cliente
var HOST = '10.0.0.103'; // IP do servidor
var dgram = require('dgram');
var server = dgram.createSocket('udp4'); 
var fs = require("fs");


server.on('listening', function () {
  var address = server.address();
  console.log('Server listening on: ' + address.address + ":" + address.port);
}); // Função que executa o servidor e espera o cliente conectar

server.on('message', function (message, remote) {
  console.log(remote.address + ':' + remote.port + ' - ' + message); 
  // Recebe e imprime a mensagem do cliente que envia o nome do pdf escolhido.

  fs.readFile(`${message}`, function (err, data) {
    if (err) {
      return console.log(err);
    }

    server.send(data, 0, data.length, remote.port, remote.address, function (error) {
      if (error) throw error;
      console.log(`${message} enviado para: ${remote.address} \n`);
      // Envia ao cliente o pdf referente ao nome solicitado.
    });

  });
});

server.bind(PORT, HOST);