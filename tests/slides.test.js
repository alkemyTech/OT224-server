const { request, expect } = require("./config");
const fs = require('fs')
const path = require('path')



let adminToken = '';
let regularToken = '';
let orgId;
let slideId;

before(async function () {
  this.timeout(30000)
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

  const responseOrganization = await request
    .post('/api/organization/create')
    .send({
      'name': 'Random ong',
      'image': 'some url',
      'address': 'fake address1',
      'phone': '123456789',
      'email': 'fakeemail@email.com',
      'welcomeText': 'Lorem ipsum dolor sit amet. Et facilis vitae eum nihil maiores aut accusantium omnis et enim sint rem quia quia hic',
      'aboutUsText': 'Lorem ipsum dolor sit amet. Et facilis vitae eum nihil maiores aut accusantium omnis et enim sint rem quia quia hic'

    })
  
  const { id } = responseOrganization.body;
  
  orgId = id;
  
});

after(async function (){
  this.timeout(30000)
  const responseAdmin = await request
  .delete(`/api/organization/${orgId}`)
  .set("Authorization", `Bearer ${adminToken}`)
})

describe('POST /api/slides', function () {
 this.timeout(30000)

  it('should fail if no token is sent', async function () {
    const response = await request
      .post('/api/slides')

    expect(response.status).to.eql(400);
  });

  it('should fail if user is not admin', async function () {
    const response = await request
      .post('/api/slides')
      .set("Authorization", `Bearer ${regularToken}`)
    expect(response.status).to.eql(401);
  })

  it('should respond with status 403 if text field content is missing in the request body', async function () {
    const response = await request
      .post('/api/slides')
      .set("Authorization", `Bearer ${adminToken}`)
      .set('Content-Type', 'multipart/form-data')
      .field('organizationId', orgId)
      .attach('img', fs.readFileSync(path.join(__dirname, './img/dmlsbGFmaW9yaXRv.png')), 'dmlsbGFmaW9yaXRv.png')
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Slide text cannot be empty');
    expect(response.status).to.eql(403);
  })

  it('should respond with status 403 if organizationId field content is incorrect', async function () {
    const response = await request
      .post('/api/slides')
      .set("Authorization", `Bearer ${adminToken}`)
      .set('Content-Type', 'multipart/form-data')
      .field('text', 'Some random text')
      .attach('img', fs.readFileSync(path.join(__dirname, './img/dmlsbGFmaW9yaXRv.png')), 'dmlsbGFmaW9yaXRv.png')
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Invalid organization id');
    expect(response.status).to.eql(403);
  })

  it('should respond with status 400 if no files are being sent', async function () {
    const response = await request
      .post('/api/slides')
      .set("Authorization", `Bearer ${adminToken}`)
      .set('Content-Type', 'multipart/form-data')
      .field('text', 'Some random text')
      .field('organizationId', orgId)
    expect(response.body.msg).to.equal('no files were uploaded')
    expect(response.status).to.eql(400);
  })

  it('should respond with status 400 when the body is empty', async function () {

    const response = await request
      .post('/api/slides')
      .set("Authorization", `Bearer ${adminToken}`)
    expect(response.body.msg).to.equal('no files were uploaded')
    expect(response.status).to.eql(400);
  })

  it('should respond with status 200 if the slide was created', async function () {

    const response = await request
      .post('/api/slides')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set("Authorization", `Bearer ${adminToken}`)
      .field('text', 'Slide 5')
      .field('organizationId', orgId)
      .attach('img', fs.readFileSync(path.join(__dirname, './img/dmlsbGFmaW9yaXRv.png')), 'dmlsbGFmaW9yaXRv.png')
      slideId = response.body.slide.id;
    expect(response.body).to.have.property('slide').to.be.an('object')
    expect(response.status).to.eql(200);
  })
})

describe('PUT /api/slides/:id', function () {

  it('should fail if no token is sent', async function () {
    const response = await request
      .put(`/api/slides/${slideId}`)

    expect(response.status).to.eql(400);
  });

  it('should fail if user is not admin', async function () {
    const response = await request
      .put(`/api/slides/${slideId}`)
      .set("Authorization", `Bearer ${regularToken}`)
    expect(response.status).to.eql(401);
  })
 
   it('should return status 404 when the slide does not exist ', async function () {
    const response = await request
    .put('/api/slides/0')
    .set("Authorization", `Bearer ${adminToken}`)
    .set('Content-Type', 'multipart/form-data')
    .field('text','Random text')
    .field('organizationId', 1)
    expect(response.status).to.eql(404);
  })

   it('should return status 200 if the slide was succesfully updated', async function () {
    const response = await request
    .put(`/api/slides/${slideId}`)
    .set("Authorization", `Bearer ${adminToken}`)
    .set('Content-Type', 'multipart/form-data')
    .field('text','New text 2')
    .field('organizationId', orgId)
    .field('order', 3)
    expect(response.body).to.have.property('msg').to.eql('The slide was succesfully updated')
    expect(response.status).to.eql(200)
  }) 

 })

 describe('GET /api/slides/:id', function () {

  it('should fail if no token is sent', async function () {
    const response = await request
      .get(`/api/slides/${slideId}`)

    expect(response.status).to.eql(400);
  });

  it('should fail if user is not admin', async function () {
    const response = await request
      .get(`/api/slides/${slideId}`)
      .set("Authorization", `Bearer ${regularToken}`)
    expect(response.status).to.eql(401);
  })


  it('should respond with status 404 if invalid id is sent ', async function () {
    const response = await request
      .get('/api/slides/12324')
      .set("Authorization", `Bearer ${adminToken}`)

    expect(response.status).to.eql(404);
  })

  it('should respond with status 200 and return the correct slide ', async function () {
    const response = await request
      .get(`/api/slides/${slideId}`)
      .set("Authorization", `Bearer ${adminToken}`)
    expect(response.body).to.be.an('object').to.have.all.keys('id','text','order','imageUrl','thumbnailUrl','organizationId','createdAt','deletedAt','updatedAt')
    expect(response.status).to.eql(200);
  })

 })
  
 describe('GET /api/slides', function () {

  it('should fail if no token is sent', async function () {
    const response = await request
      .get('/api/slides')

    expect(response.status).to.eql(400);
  });

  it('should fail if user is not admin', async function () {
    const response = await request
      .get('/api/slides')
      .set("Authorization", `Bearer ${regularToken}`)
    expect(response.status).to.eql(401);
  })

  it('should respond with status code 200 and with an object containing the page parameters and array of the data', async function () {
    const response = await request
      .get('/api/slides')
      .set("Authorization", `Bearer ${adminToken}`)
    expect(response.body).to.be.an('object').to.have.all.keys('previousPage','currentPage','nextPage','totalPages','total','limit','data')
    expect(response.body.data).to.be.an('array')
    expect(response.status).to.eql(200);
  })

 })
  
 describe('DELETE /api/slides/:id', function () {

   it('should fail if no token is sent', async function () {
    const response = await request
      .delete(`/api/slides/${slideId}`)

    expect(response.status).to.eql(400);
  });

  it('should fail if user is not admin', async function () {
    const response = await request
      .delete(`/api/slides/${slideId}`)
      .set("Authorization", `Bearer ${regularToken}`)
    expect(response.status).to.eql(401);
  })

  it('should return status 404 when the slide does not exist ', async function () {
    const response = await request
    .delete('/api/slides/12313')
    .set("Authorization", `Bearer ${adminToken}`)
    expect(response.status).to.eql(404);
  })

  it('should return status 200 when the slide has been succesfully removed ', async function () {
    const response = await request
    .delete(`/api/slides/${slideId}`)
    .set("Authorization", `Bearer ${adminToken}`)
    expect(response.body).to.have.property('message').to.eql(`id ${slideId} deleted!`)
    expect(response.status).to.eql(200);
  })

 })
 


