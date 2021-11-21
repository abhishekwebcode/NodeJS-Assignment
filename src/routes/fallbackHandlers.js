function fallbackHandlers(app){
  app.use(function (request,response){
    return response.status(404).json({
      success:false,
      reason:'NOT FOUND'
    })
  })
  app.use(function (error,request,response,next){
    /**
     * Use SENTRY ERROR LOGGING or something like Bunyan in production
     * This can fill up the console, for debug purposes only
     */
    console.error(error);
    return response.status(500).json({
      success:false,
      reason:'INTERNAL_SERVER_ERROR'
    })
  })
}
module.exports={fallbackHandlers}