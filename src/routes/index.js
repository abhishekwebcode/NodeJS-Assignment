const allUsers=require('./get/all')
const specificUser=require('./get/specific')
const {attachSwaggerRoutes}=require('./docs/index')
const {fallbackHandlers}=require('./fallbackHandlers')
function attachRoutes(app) {
  allUsers(app);
  specificUser(app);
  attachSwaggerRoutes(app);
  fallbackHandlers(app);
}
module.exports={attachRoutes}