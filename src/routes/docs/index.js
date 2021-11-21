const path = require("path");

function attachSwaggerRoutes(app){
  app.get('/docs/swagger.json',function (request,response){
    return response.json(require('../../../docs/doc.json'))
  });
  app.get('/docs',function (request,response){
    response.sendFile(path.resolve(__dirname,'../../../docs/index.html'));
  });
}
module.exports={
  attachSwaggerRoutes
}