var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Ta rolando!');
}).listen(8081);
console.log('Servidor rodando em: http://localhost:8081/');