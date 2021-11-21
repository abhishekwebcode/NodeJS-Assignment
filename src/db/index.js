const dataStore = require('../../data/users.json');
const authStore = require('../../data/auth.json');
const getUserPassword = ({id}) => {
  return authStore[id];
}
const processData = rawData => {
  const dbObject = {
    users: new Map(),
    admins: new Set(),
    auth: new Map(),
  };
  rawData.forEach(user=>{
    dbObject.users.set(user.id,user);
    if (user.type==='admin'){
      dbObject.admins.add(user.id);
    }
    dbObject.auth.set(user.id,getUserPassword(user))
  })
  return dbObject;
}
module.exports = {
  userDirectory:processData(dataStore)
};