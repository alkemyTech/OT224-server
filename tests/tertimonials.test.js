const { request, expect } = require("./config");

let adminToken = '';
let regularToken = '';
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

describe("GET /api/testimonials", function () {

  it('should get all testimonials', async function () {
    const response = await request
    .get('/api/testimonials')
    
    expect(response.status).to.eql(200);
  });
});

describe("POST /api/testimonials", function () {  

  it('return insert a testimonial should fail without credentials', async function () {
    const response = await request
    .post('/api/testimonials')    
    .send({name: "Testimonial 1", image: "https://via.placeholder.com/600/92c952", content: "test content"})
    
    expect(response.status).to.eql(400);
  });

  it('return insert a testimonial should fail with regular credentials', async function () {
    const response = await request
    .post('/api/testimonials')
    .set("Authorization", `Bearer ${regularToken}`)
    .send({name: "Testimonial 1", image: "https://via.placeholder.com/600/92c952", content: "test content"})
    
    expect(response.status).to.eql(401);
  });

  it('return insert a testimonial should succeed with admin credentials', async function () {
    const response = await request
    .post('/api/testimonials')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Testimonial 1", image: "https://via.placeholder.com/600/92c952", content: "test content"})
    
    expect(response.status).to.eql(201);
  });

  it('return insert a testimonial should succeed with admin credentials and return testimonial', async function () {
    const response = await request
    .post('/api/testimonials')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Testimonial 1", image: "https://via.placeholder.com/600/92c952", content: "test content"})
    
    expect(response.body).to.have.property('name').to.be.equal("Testimonial 1");
  });

  it('return insert a testimonial should fail with admin credentials and the field name is empty', async function () {
    
    const response = await request    
    .post('/api/testimonials')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "", image: "https://via.placeholder.com/600/92c952", content: "test content"})        
    
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Field name can not be empty');
  });

  it('return insert a testimonial should fail with admin credentials and the field name has less than 6 characters', async function () {
    
    const response = await request    
    .post('/api/testimonials')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Test", image: "https://via.placeholder.com/600/92c952", content: "test content"})
    
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('name must contain at least 6 characters');
  });

  it('return insert a testimonial should fail with admin credentials and the field image is empty', async function () {
    
    const response = await request    
    .post('/api/testimonials')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Testimonial 1", image: "", content: "test content"})
    
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Field image can not be empty');
  });

  it('return insert a testimonial should fail with admin credentials and the field content is empty', async function () {
    
    const response = await request    
    .post('/api/testimonials')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Testimonial 1", image: "https://via.placeholder.com/600/92c952", content: ""})        
    
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Field content can not be empty');
  });
});

describe("UPDATE /api/testimonials", function () {
  
  it('return update a testimonial should fail without credentials', async function () {
    const response = await request
    .put('/api/testimonials/3')    
    .send({
      content: "t is a long established fact that a reader will be"
    });    
    expect(response.status).to.eql(400);
  });

  it('return update a testimonial should fail with admin credentials and id not found', async function () {
    const response = await request
    .put('/api/testimonials/52')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: "Testimonial 52",
      image: "https://via.placeholder.com/600/92c952",
      content: "t is a long established fact that a reader will be"
    });        
    expect(response.status).to.eql(404);
  });
  
  it('return update a testimonial should fail with admin credentials and the field name is empty', async function () {
    
    const response = await request    
    .put('/api/testimonials/3')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "", image: "https://via.placeholder.com/600/92c952", content: "test content"})        
    
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Field name can not be empty');
  });

  it('return update a testimonial should fail with admin credentials and the field name has less than 6 characters', async function () {
    
    const response = await request    
    .put('/api/testimonials/3')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Test", image: "https://via.placeholder.com/600/92c952", content: "test content"})
    
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('name must contain at least 6 characters');
  });

  it('return update a testimonial should fail with admin credentials and the field image is empty', async function () {
    
    const response = await request    
    .put('/api/testimonials/3')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Testimonial 1", image: "", content: "test content"})
    
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Field image can not be empty');
  });

  it('return update a testimonial should fail with admin credentials and the field content is empty', async function () {
    
    const response = await request    
    .put('/api/testimonials/3')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Testimonial 1", image: "https://via.placeholder.com/600/92c952", content: ""})        
    
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Field content can not be empty');
  });
  
  it('return update a testimonial should succeed with admin credentials', async function () {
    const response = await request
    .put('/api/testimonials/3')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: "Testimonial 3",
      image: "https://via.placeholder.com/600/92c952",
      content: "t is a long established fact that a reader will be"
    });
        
    expect(response.status).to.eql(201);
    expect(response.body.content).to.eql("t is a long established fact that a reader will be");
  });  
});

describe("DELETE /api/testimonials/1", function () {
  
  it('return delete a testimonial should fail without credentials', async function () {
    const response = await request
    .del('/api/testimonials/1')    
        
    expect(response.status).to.eql(400);
  });

  it('return delete a testimonial should succeed with admin credentials', async function () {
    const response = await request
    .del('/api/testimonials/1')
    .set("Authorization", `Bearer ${adminToken}`)
        
    expect(response.status).to.eql(200);
  });

  it('return delete a testimonial should fail with admin credentials and id not found', async function () {
    const response = await request
    .del('/api/testimonials/52')
    .set("Authorization", `Bearer ${adminToken}`)
        
    expect(response.status).to.eql(404);
  });
});

