const express = require('express');
const app = express();

//Porta onde o servidor roda
const portS = 8080
//prota e IP do servidor destino 
const PORT = 8000;
const HOST = '10.0.0.103';

const dgram = require('dgram');
const fs = require("fs");
const { request } = require('http');

//Inicia o servidpr Cliente
app.listen(portS, () => {
    console.log('Server on 8080')
})

//Rota para download da imagem requisitada pelo usuário
app.get('/download/:id', function (req, res) {
    const { id } = req.params
    console.log(id)
    let arquivo = ""
    if (id == 0) {
        arquivo = 'Porquinhos.pdf'
        aux = 'Porquinhos.pdf'
    } else if (id == 1) {
        arquivo = 'Branca.pdf'
        aux = 'Branca.pdf'
    } else {
        arquivo = 'JoaoMaria.pdf'
        aux = 'JoaoMaria.pdf'
    }
    //mensagem a ser enviada
    const message = new Buffer.from(aux);
    //destino de escrita do arquivo
    const wstream = fs.createWriteStream(`../Interface/${arquivo}`);

    //função executada ao fim da transferencia
    wstream.on('finish', function () {
        console.log('Arquivo recuperado');
    });

    //cria o socket de comunicação
    const client = dgram.createSocket('udp4');

    //Envia uma mensagem, seu tamanho e destino e retorna um erro caso exista
    client.send(message, 0, message.length, PORT, HOST, function (err, bytes) {
        if (err) throw err;
        console.log(`UDP message: ${message} sent to ${HOST}:${PORT}`);
    });

    //executa caso o cliete receba uma mensagem do servidor
    client.on('message', function (msg) {
        wstream.write(msg);
        wstream.end();
        console.log("Recebendo Arquivo! ");
        client.close();
    });

    //Fim conexão

    //flags para visualização e recuparação dos dados 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-Width, Content-Type, Accept");
    res.send('Recebido com sucesso!');
});