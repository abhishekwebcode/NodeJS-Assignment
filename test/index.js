const {describe,it} = require('mocha');
const {expect} = require('chai');
const {httpServer} = require('../src/index');
const {makeFetch} = require('supertest-fetch');
const users = require('../data/users.json');
const auth = require('../data/auth.json');
const mockSever = makeFetch(httpServer);
const getAdminToken = id =>
   Buffer.from(`${id}:${auth[id]}`).toString('base64')

describe('Tests',()=>{
  it('should get all the users as an admin',async ()=>{
    const adminUser = users.filter(user=>user.type==='admin');
    const [{id}] = adminUser;
    const response = await mockSever('/users',{
      method:'GET',
      headers:{
        'Authorization':'Basic '+getAdminToken(id)
      }
    }).then(res=>res.json());
    expect(response.success).to.be.equal(true);
    expect(response.users.length).to.be.equal(users.length);
  })
  it('shouldn\'t return all users when user is not admin',async ()=>{
    const guestUser = users.filter(user=>user.type!=='admin');
    const [{id}] = guestUser;
    const response = await mockSever('/users',{
      method:'GET',
      headers:{
        'Authorization':'Basic '+getAdminToken(id)
      }
    }).then(res=>res.json());
    expect(response.success).to.be.equal(false);
    expect(response.reason).to.be.equal('AUTH_INVALID');
  })
  it('should get the requesting user', async function () {
    const adminUser = users.filter(user=>user.type==='admin');
    const [{id}] = adminUser;
    const response = await mockSever('/users/'+id,{
      method:'GET',
      headers:{
        'Authorization':'Basic '+getAdminToken(id)
      }
    }).then(res=>res.json());
    expect(response.success).to.be.equal(true);
    expect(response.user).to.be.deep.equal(adminUser[0]);
  });
})