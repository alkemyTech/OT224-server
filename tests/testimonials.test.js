const { request, expect } = require("./config");
const Testimonial= require('../models').Testimonial
const fs = require('fs')
const path = require('path')

let adminToken = '';
let regularToken = '';
let testimonial;

describe("ROUTE /api/testimonials", function () {
  this.timeout(30000)

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
        const result = await Testimonial.destroy({
            where:{
                id:testimonial.id
            },
            force:true
        })
        console.log(result)
  });   

  /* POST /api/testimonial */
  it('return insert a testimonial should succeed with admin credentials', async function () {
    const response = await request
      .post('/api/testimonials')
      .set("Authorization", `Bearer ${adminToken}`)
      .set('Content-Type', 'multipart/form-data')
      .field('name', 'Testimonial 2')
      .attach('image', fs.readFileSync(path.join(__dirname, './img/dmlsbGFmaW9yaXRv.png')), 'dmlsbGFmaW9yaXRv.png')
      .field('content', 'test content')
    expect(response.status).to.eql(201);
    testimonial = response.body    
  });

  it('return insert a testimonial should fail without credentials', async function () {
    const response = await request
    .post('/api/testimonials')    
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .field('name', 'Testimonial 1')
    .attach('image', fs.readFileSync(path.join(__dirname, './img/dmlsbGFmaW9yaXRv.png')), 'dmlsbGFmaW9yaXRv.png')
    .field('content', 'test content')
    
    expect(response.status).to.eql(400);
  });

  it('return insert a testimonial should fail with regular credentials', async function () {
    const response = await request
    .post('/api/testimonials')
    .set("Authorization", `Bearer ${regularToken}`)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .field('name', 'Testimonial 1')
    .attach('image', fs.readFileSync(path.join(__dirname, './img/dmlsbGFmaW9yaXRv.png')), 'dmlsbGFmaW9yaXRv.png')
    .field('content', 'test content')
    
    expect(response.status).to.eql(401);
  });

  it('return insert a testimonial should fail with admin credentials and the field name is empty', async function () {
    
    const response = await request    
    .post('/api/testimonials')
    .set("Authorization", `Bearer ${adminToken}`)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .field('name', '')
    .attach('image', fs.readFileSync(path.join(__dirname, './img/dmlsbGFmaW9yaXRv.png')), 'dmlsbGFmaW9yaXRv.png')
    .field('content', 'test content')
    
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Field name can not be empty');
  });

  it('return insert a testimonial should fail with admin credentials and the field name has less than 6 characters', async function () {
    
    const response = await request    
    .post('/api/testimonials')
    .set("Authorization", `Bearer ${adminToken}`)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .field('name', 'Test')
    .attach('image', fs.readFileSync(path.join(__dirname, './img/dmlsbGFmaW9yaXRv.png')), 'dmlsbGFmaW9yaXRv.png')
    .field('content', 'test content')
    
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('name must contain at least 6 characters');
  });

  it('return insert a testimonial should fail with admin credentials and the field content is empty', async function () {
    
    const response = await request    
    .post('/api/testimonials')
    .set("Authorization", `Bearer ${adminToken}`)
    .set('Content-Type', 'multipart/form-data')    
    .field('name', 'Testimonial 1')
    .attach('image', fs.readFileSync(path.join(__dirname, './img/dmlsbGFmaW9yaXRv.png')), 'dmlsbGFmaW9yaXRv.png')      
    .field('content', '')
    
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Field content can not be empty');
  });

  it('return insert a testimonial should fail with admin credentials and the field image is empty', async function () {
    const response = await request
      .post('/api/testimonials')
      .set("Authorization", `Bearer ${adminToken}`)      
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .field('name', 'Testimonial 1')      
      .field('content', 'test content')
    expect(response.body.msg).to.equal('no files were uploaded')
    expect(response.status).to.eql(400);
  }) 

  /* GET /api/testimonials */
  it('should get all testimonials fail whitout token', async function () {
    const response = await request
    .get('/api/testimonials')
    
    expect(response.status).to.eql(400);
  });
  
  it('should get all testimonials fail with regular credentials', async function () {
    const response = await request
    .get('/api/testimonials')
    .set("Authorization", `Bearer ${regularToken}`)
    expect(response.status).to.eql(401);
  });

  it('should get all testimonials succeed with admin credentials', async function () {
    const response = await request
    .get('/api/testimonials')
    .set("Authorization", `Bearer ${adminToken}`)
    expect(response.status).to.eql(200);
  });

  /* GET /api/testimonials/:id */
  it('should get a testimonial by id fail whitout token', async function () {
    const { id } = testimonial
    const response = await request
    .get(`/api/testimonials/${id}`)        
    
    expect(response.status).to.eql(400);
  });
  
  it('should get a testimonial by id fail with regular credentials', async function () {
    const { id } = testimonial
    const response = await request
    .get(`/api/testimonials/${id}`)        
    .set("Authorization", `Bearer ${regularToken}`)
    expect(response.status).to.eql(401);
  });

  it('should get a testimonial by id succeed with admin credentials', async function () {
    const { id } = testimonial
    const response = await request
    .get(`/api/testimonials/${id}`)        
    .set("Authorization", `Bearer ${adminToken}`)
    expect(response.status).to.eql(200);
  });

  /* UPDATE /api/testimonials/:id */ 

  it('return update a testimonial should fail without credentials', async function () {
    const { id } = testimonial
    const response = await request
      .put(`/api/testimonials/${id}`)        
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .field('name', 'Testimonial 1')
      .attach('image', fs.readFileSync(path.join(__dirname, './img/dmlsbGFmaW9yaXRv.png')), 'dmlsbGFmaW9yaXRv.png')
      .field('content', 'test content')      
    expect(response.status).to.eql(400);
  });  
  
  it('return update a testimonial should fail with admin credentials and the field name is empty', async function () {
    const { id } = testimonial
    const response = await request    
      .put(`/api/testimonials/${id}`)        
      .set("Authorization", `Bearer ${adminToken}`)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .field('name', '')
      .attach('image', fs.readFileSync(path.join(__dirname, './img/dmlsbGFmaW9yaXRv.png')), 'dmlsbGFmaW9yaXRv.png')
      .field('content', 'test content')        
    
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Field name can not be empty');
  });

  it('return update a testimonial should fail with admin credentials and the field name has less than 6 characters', async function () {
    const { id } = testimonial
    const response = await request    
      .put(`/api/testimonials/${id}`)        
      .set("Authorization", `Bearer ${adminToken}`)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .field('name', 'Test')
      .attach('image', fs.readFileSync(path.join(__dirname, './img/dmlsbGFmaW9yaXRv.png')), 'dmlsbGFmaW9yaXRv.png')
      .field('content', 'test content')        
    
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('name must contain at least 6 characters');
  });

  it('return update a testimonial should fail with admin credentials and the field content is empty', async function () {
    const { id } = testimonial
    const response = await request    
      .put(`/api/testimonials/${id}`)        
      .set("Authorization", `Bearer ${adminToken}`)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .field('name', 'Testimonial 1')
      .attach('image', fs.readFileSync(path.join(__dirname, './img/dmlsbGFmaW9yaXRv.png')), 'dmlsbGFmaW9yaXRv.png')
      .field('content', '')        
    
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Field content can not be empty');
  });
  
  it('return update a testimonial should succeed with admin credentials', async function () {
    const { id } = testimonial
    const response = await request
      .put(`/api/testimonials/${id}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .field('name', 'Testimonial 1')
      .attach('image', fs.readFileSync(path.join(__dirname, './img/dmlsbGFmaW9yaXRv.png')), 'dmlsbGFmaW9yaXRv.png')
      .field('content', 'Content test updated')
        
    expect(response.status).to.eql(201);    
  });

  it('return update a testimonial should succeed with admin credentials whithout image', async function () {
    const { id } = testimonial
    const response = await request
      .put(`/api/testimonials/${id}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .field('name', 'Testimonial 1')      
      .field('content', 'Content test updated')
        
    expect(response.status).to.eql(201);    
  });

  /* DELETE /api/testimonials/:id */
  it('return delete a testimonial should fail without credentials', async function () {
    const { id } = testimonial
    const response = await request
    .del(`/api/testimonials/${id}`)   
        
    expect(response.status).to.eql(400);
  });

  it('return delete a testimonial should succeed with admin credentials', async function () {
    const { id } = testimonial
    const response = await request
    .del(`/api/testimonials/${id}`)   
    .set("Authorization", `Bearer ${adminToken}`)
        
    expect(response.status).to.eql(200);
  });

  it('return delete a testimonial should fail with admin credentials and id not found', async function () {
    const { id } = testimonial
    const response = await request
    .del(`/api/testimonials/${id}`)   
    .set("Authorization", `Bearer ${adminToken}`)
        
    expect(response.status).to.eql(404);
  });
  /* UPDATE /api/testimonials/:id */ 
  it('return update a testimonial should fail with admin credentials and id not found', async function () {
    const { id } = testimonial
    const response = await request
      .put(`/api/testimonials/${id}`)        
      .set("Authorization", `Bearer ${adminToken}`)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .field('name', 'Testimonial 1')
      .attach('image', fs.readFileSync(path.join(__dirname, './img/dmlsbGFmaW9yaXRv.png')), 'dmlsbGFmaW9yaXRv.png')
      .field('content', 'test content')        
    expect(response.status).to.eql(404);
  }); 
  
  /*GET /api/testimonials/:id */
  it('should get a testimonial by id fail with admin credentials if the id does not exist ', async function () {
    const { id } = testimonial
    const response = await request
    .get(`/api/testimonials/${id}`)        
    .set("Authorization", `Bearer ${adminToken}`)
    expect(response.status).to.eql(404);
  });
});

