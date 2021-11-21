module.exports=app=>{
  app.get('/users',function (request,response,next) {
    if (response.locals.authenticated==='admin') {
      return response.json({
        success:true,
        users: require('../../../data/users.json')
      })
    }
    return response.status(401).json({
      success:false,
      reason:'UNAUTHORIZED'
    })
  });
}