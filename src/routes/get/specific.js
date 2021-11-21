const {userDirectory} = require("../../db/index");
module.exports = app => {
  app.get('/users/:id',function (request,response,next) {
    let id = null;
    if (request.params.hasOwnProperty('id')) {
      id = parseInt(request.params.id,10);
    }
    if (id === null && Number.isInteger(id)===false) {
      return response.status(403).json({
        success:false,
        reason:'ID_PARAMETER_INVALID'
      })
    }

    if (response.locals.authenticated==='admin') {
      if (userDirectory.users.has(id)===false) {
        return response.status(403).json({
          success:false,
          reason:'ID_PARAMETER_INVALID'
        })
      }
      return response.json({
        success:true,
        user: userDirectory.users.get(id)
      })
    }
    return response.json({
      warning:'You are not authenticated',
      success:true,
      user: userDirectory.users.get(id)
    })
  });
}