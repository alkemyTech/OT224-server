const { request, expect } = require("./config");
const ModelRoles=require('../models').Role;

describe("/api/roles", function () {

let adminToken = '';
let regularToken = '';
let idTest='';
let idNotFound='a';

  before( async function () {
    const responseAdmin = await request
    .post("/api/auth/login")
    .send({
      'email': 'admin@test.com',
      'password': '1234test',
    });
    adminToken = responseAdmin.body.token;

    const responseRegular = await request
    .post("/api/auth/login")
    .send({
      'email': 'regular@test.com',
      'password': '1234test',
    });
    regularToken = responseRegular.body.token;

  });

  after(async function () {
    const respRoles=await ModelRoles.destroy({where:{id:idTest},force:true})
    console.log('AfterRespRoles',respRoles)
  });


  // CREATE ROLE
  it('create a role, fails without credentials', async function () {
    const response = await request
    .post('/api/roles')    
    .send({name: "Role Test", description: "description Test"})
    expect(response.status).to.eql(400)
    expect(response.body).to.be.an('object');
  });

  it('create a role, fails with regular user credentials', async function () {
    const response = await request
    .post('/api/roles')
    .set("Authorization", `Bearer ${regularToken}`)
    .send({name: "Role Test", description: "description Test"})
    expect(response.status).to.eql(401)
    expect(response.body).to.be.an('object');
  });

  it('create a role, with admin credentials, fails without name', async function () {
    const response = await request
    .post('/api/roles')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({description: "description Test"})
    expect(response.status).to.eql(403)
    expect(response.body).to.be.an('object');
  });

  it('create role, with admin credentials, fails with numbers in the name', async function () {
    const response = await request
    .post('/api/roles')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: 22, description: "description Test"})
    expect(response.status).to.eql(403)
    expect(response.body).to.be.an('object');
  });

  it('create role, with admin credentials, fails when description has non-string data', async function () {
    const response = await request
    .post('/api/roles')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Role Test", description: 2222})
    expect(response.status).to.eql(403)
    expect(response.body).to.be.an('object');
  });

  it('create a role, sucessful with admin credentials', async function () {
    const response = await request
    .post('/api/roles')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Role Test Create", description: "description Test"}) 
    expect(response.status).to.eql(201);
    expect(response.body).to.be.an('object');
    idTest=response.body.id
  });

  // GET ALL ROLES
  it('list all roles, fails without credentials', async function () {
    const response = await request
    .get('/api/roles') 
    expect(response.status).to.eql(400)
  });

  it('list all roles, fails with regular user credentials', async function () {
    const response = await request
    .get('/api/roles') 
    .set("Authorization", `Bearer ${regularToken}`)
    expect(response.status).to.eql(401)
  });

  it('list all roles, sucessful with admin credentials', async function () {
    const response = await request
    .get('/api/roles')
    .set("Authorization", `Bearer ${adminToken}`)
    expect(response.status).to.eql(200);
  });

  it('list all roles, sucessful with admin credentials', async function () {
    const response = await request
    .get('/api/roles')
    .set("Authorization", `Bearer ${adminToken}`)
    expect(response.status).to.eql(200)
  });
  
  // GET ONE ROLES
  it('list one role, fails without credentials', async function () {
    const response = await request
    .get(`/api/roles/${idTest}`) 
    expect(response.status).to.eql(400)
    expect(response.body).includes({msg:"The request does not have a token"});
  });

  it('list one role, fails with regular user credentials', async function () {
    const response = await request
    .get(`/api/roles/${idTest}`) 
    .set("Authorization", `Bearer ${regularToken}`)
    expect(response.status).to.eql(401)
    expect(response.body).to.be.an('object');
  });

  it('list one role, with admin credentials, fails when id not found', async function () {
    const response = await request
    .get(`/api/roles/${idNotFound}`)
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Role demo 500", description: "description Test"})       
    expect(response.status).to.eql(404)
    expect(response.body).includes('id not found');
  }); 

  it('list one role, sucessful with admin credentials', async function () {
    const response = await request
    .get(`/api/roles/${idTest}`)
    .set("Authorization", `Bearer ${adminToken}`)
    expect(response.status).to.eql(200)
    expect(response.body).to.be.an('object');
  });

  // UPDATE ROLES
  it('update a role, fails without credentials', async function () {
    const response = await request
    .put(`/api/roles/${idTest}`)    
    .send({name: "Role Test", description: "description Test"})
    expect(response.status).to.eql(400)
    expect(response.body).includes({msg:"The request does not have a token"});
  });

  it('update a role, fails with regular user credentials', async function () {
    const response = await request
    .put(`/api/roles/${idTest}`)   
    .set("Authorization", `Bearer ${regularToken}`)
    .send({name: "Role Test", description: "description Test"})
    expect(response.status).to.eql(401)
    expect(response.body).to.be.an('object');
  });

  it('update a role, with admin credentials, fails without name', async function () {
    const response = await request
    .put(`/api/roles/${idTest}`)   
    .set("Authorization", `Bearer ${adminToken}`)
    .send({description: "description Test"})
    expect(response.status).to.eql(403)
    expect(response.body).to.be.an('object');
  });

  it('update role, with admin credentials, fails with numbers in the name', async function () {
    const response = await request
    .put(`/api/roles/${idTest}`)   
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: 22, description: "description Test"})
    expect(response.status).to.eql(403)
    expect(response.body).to.be.an('object');
  });

  it('update role, with admin credentials, fails if name when less than 3 letters', async function () {
    const response = await request
    .put(`/api/roles/${idTest}`)   
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Ca", description: "description Test"})
    expect(response.status).to.eql(403)
    expect(response.body).to.be.an('object');
  });

  it('update role, with admin credentials, fails when description has non-string data', async function () {
    const response = await request
    .put(`/api/roles/${idTest}`)   
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Role Test", description: 2222})
    expect(response.status).to.eql(403)
    expect(response.body).to.be.an('object');
  });

  it('update a role, with admin credentials, fails when id not found', async function () {
    const response = await request
    .put(`/api/roles/${idNotFound}`)
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Role Test", description: "description Test"})       
    expect(response.status).to.eql(404)
    expect(response.body).includes('id not found');
  }); 
  
  it('update a role, sucessful with admin credentials', async function () {
    const response = await request
    .put(`/api/roles/${idTest}`)   
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Role Test Updated", description: "description Test updated"})
    expect(response.status).to.eql(201)
    expect(response.body).to.be.an('object');
  });

  // DELETE ROLE
  it('delete a role, fails withouth credentials', async function () {
    const response = await request
    .del(`/api/roles/${idTest}`)   
    expect(response.status).to.eql(400)
    expect(response.body).includes({msg:"The request does not have a token"});
  });

  it('delete a role, fails with regular user credentials', async function () {
    const response = await request
    .del(`/api/roles/${idTest}`)   
    .set("Authorization", `Bearer ${regularToken}`)  
    expect(response.status).to.eql(401)
    expect(response.body).to.be.an('object');
  });

  it('delete a role, with admin credentials, fails when id not found', async function () {
    const response = await request
    .del(`/api/roles/${idNotFound}`)
    .set("Authorization", `Bearer ${adminToken}`)
    expect(response.status).to.eql(404)
    expect(response.body).includes('id not found');
  });

  it('delete a role,  sucessful with admin credentials', async function () {
    const response = await request
    .del(`/api/roles/${idTest}`)     
    .set("Authorization", `Bearer ${adminToken}`)
    expect(response.status).to.eql(200)
    expect(response.body).to.be.an('object');
  });

});