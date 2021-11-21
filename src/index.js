const express = require('express');
const http = require('http');
/**@type {*|Express}*/
const app = express();
const {setupServer}=require('./setup')
const {attachRoutes}=require('./routes/index')
setupServer(app);
attachRoutes(app);
const httpServer = http.createServer(app);
module.exports={
  httpServer
}