var http = require('http');
var ioredis = require('ioredis');

http.createServer(function (req, res) 
{
  console.log('inicando response \n ');
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('--ta rolando! \n');

var ipredis = "192.168.99.100";

  if(process.env.IP_REDIS_FIAP)
  {
    console.log("setando o ip do redis com base na variavel de ambiente")
    ipredis = process.env.IP_REDIS_FIAP
  }

  console.log("-------------------------");
  console.log("valores configurados");
  console.log("ipredis = [" + ipredis+"]");
  console.log("-------------------------");


  var objIoredis = new ioredis(6379, ipredis);

  getRedis(objIoredis, "novotoggle").then(resultado => {
    res.write("Resultado: ["+ JSON.stringify(resultado)+"] \n");
  }).catch(err => {
    res.write("deu ruim: ["+JSON.stringify(err)+"] \n");
  }).finally(_ => {
    res.write("--acabou \n");
    res.end();
  })

  console.log('finalizando response \n');
}).listen(8081);

console.log('Servidor rodando em: http://localhost:8081/');

function getRedis(objIoredis, nomeChave)
{
  return new Promise((resolve, reject) =>
  {
      objIoredis.get(nomeChave
        , function (err, result) 
        {
          if (err) {
              console.log('deu ruim');
              reject();
          } else {
            console.log(JSON.parse(result));
            resolve(JSON.parse(result));
          }
        });
  });
}