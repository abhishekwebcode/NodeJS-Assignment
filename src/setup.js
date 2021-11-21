const rateLimit = require("express-rate-limit");
const rawBody = require("raw-body");
const {userDirectory} = require("./db/index");
const setupServer = app => {
  app.use(require('cors')())
  /**
   * If running behind a proxy
   * app.set('trust proxy', 1);
   */
  app.use(rateLimit({
    message:{
      success:false,
      reason:'RATE_LIMIT_EXCEEDED'
    },
    windowMs: 2 * 60 * 1000,
    max: 1000
  }));
  app.use(function (request, response, next) {
    rawBody(request, {
      length: request.headers['content-length'],
      limit: '0mb',
    }, function (err) {
      if (err) return next(err)
      next()
    })
  })
  app.use(function (request,response,next){
    const authHeader = request.header('Authorization');
    if (authHeader){
      const [,basicAuthValue] = authHeader.split('Basic ')
      if (basicAuthValue) {
        const [userIdValue,password] = Buffer.from(basicAuthValue,'base64').toString().split(':');
        const userId = parseInt(userIdValue,10);
        if (Number.isInteger(userId) && userId && password && userDirectory.auth.has(userId) && userDirectory.auth.get(userId)===password && userDirectory.admins.has(userId)) {
          response.locals.authenticated = 'admin';
        } else {
          return response.status(401).json({
            success:false,
            reason:'AUTH_INVALID'
          })
        }
      }
    }
    return next();
  });

}
module.exports={setupServer}