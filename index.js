const process = require('process');
const {httpServer}=require('./src/index');
/**@type {number}*/
const port = process.env.PORT || 3000;
httpServer.listen(port,()=>{
  console.log(`LISTENING ON PORT: ${port}`);
  console.log(`GO TO http://localhost:${port}/docs to run api commands on the server`);
});

/**
 * Try to open documentation in browser
 */
try {
  if (process.env['NODE_ENV']!=='production') {
    const process = require('process');
    const url = 'http://localhost:3000/docs';
    const start = (process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open');
    require('child_process').exec(start + ' ' + url);
  }
} catch (e){console.error(e)}