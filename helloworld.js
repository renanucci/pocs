var http = require('http');
var ioredis = require('ioredis');

http.createServer(function (req, res) 
{
  console.log("v1.7");
  console.log('inicando response para a URL ['+req.url+']----------------------------------------------------');
  if(req.url != "/" && req.url != "/favicon.ico")
  {
    var nomechave = req.url.replace("/","");
    console.log("nomechave = ["+nomechave+"]");

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('--ta rolando! \n');

    var ipredis = "meuredis2";

    if(process.env.IP_REDIS_FIAP)
    {
      console.log("setando o ip do redis com base na variavel de ambiente")
      ipredis = process.env.IP_REDIS_FIAP
      console.log("setado o ip do redis com base na variavel de ambiente")
    }

    console.log("-------------------------");
    console.log("valores configurados");
    console.log("ipredis = [" + ipredis+"]");
    console.log("-------------------------");



    var objIoredis = new ioredis(6379, ipredis);
    console.log('redis instanciado');

    getRedis(objIoredis, nomechave).then(resultado => {
      res.write("Resultado: ["+ JSON.stringify(resultado)+"] \n");
    }).catch(err => {
      res.write("deu ruim: ["+JSON.stringify(err)+"] \n");
    }).finally(_ => {
      res.write("--acabou \n");
      res.end();
      console.log('finalizando response---------------------------------------------------- \n\n\n');
    })
  }
  else
  {
    res.end();
    console.log('finalizando response---------------------------------------------------- \n\n\n');
  }


}).listen(8081);

console.log('Servidor rodando na porta 8081/');

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