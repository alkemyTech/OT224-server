const { request, expect } = require("./config");

let adminToken, regularToken, commentId = null;
const baseRequest = {"user_id":"30", "body": "Comment 20 characters", "news_id":"1" }
before( async () =>{
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

describe("POST /api/comments", function () {  

  it('return insert a Comment should fail without credentials', async function () {
    const response = await request
    .post('/api/comments')    
    .send(baseRequest)
    
    expect(response.status).to.eql(400);
  });

  it('return insert a Comment should fail with regular credentials', async function () {
    const response = await request
    .post('/api/comments')
    .set("Authorization", `Bearer ${regularToken}`)
    .send(baseRequest)
    
    expect(response.status).to.eql(401);
  });

  it('return insert a Comment should succeed with admin credentials', async function () {
    const response = await request
    .post('/api/comments')
    .set("Authorization", `Bearer ${adminToken}`)
    .send(baseRequest)


    expect(response.status).to.eql(201);
    commentId = response.body.id
  });

  it('return insert a Comment should succeed with Comment 20 characters ', async function () {
    const response = await request
    .post('/api/comments')
    .set("Authorization", `Bearer ${adminToken}`)
    .send(baseRequest)
    
    expect(response.body).to.have.property('body').to.be.equal("Comment 20 characters");
  });

  it('return insert a Comment should fail with admin credentials and the field user_id must be a number', async function () {
    const response = await request    
    .post('/api/comments')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({news_id: "a", body: "comment 20 characters", user_id: "1"})        
    
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('must be a number');
  });

  it('return insert a Comment should fail with admin credentials and the field news_id must be a number', async function () {
    
    const response = await request    
    .post('/api/comments')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({user_id: "1", body: "Comment 20 characters" , news_id: "a"})
    
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('must be a number');
  });

  it('return insert a Comment should fail with admin credentials and the field user_id does not exist', async function () {
    
    const response = await request    
    .post('/api/comments')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({user_id: "0", body: "Comment 20 characters" , news_id: "1"})
    
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('user_id does not exist');
  });

  it('return insert a Comment should fail with admin credentials and the field news_id does not exist', async function () {
    
    const response = await request    
    .post('/api/comments')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({user_id: "1", body: "Comment 20 characters" , news_id: "0"})        
    
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('news_id does not exist');
  });

  it('return insert a Comment should fail with admin credentials and the field user_id does not exist', async function () {
    
    const response = await request    
    .post('/api/comments')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({user_id: "0", body: "Comment 20 characters" , news_id: "1"})
    
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('user_id does not exist');
  });

  it('return insert a Comment should fail with admin credentials and the field news_id cannot be empty', async function () {
    
    const response = await request    
    .post('/api/comments')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({user_id: "1", body: "Comment 20 characters" , news_id: ""})        
    
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('The field cannot be empty');
  });

  it('return insert a Comment should fail with admin credentials and the field user_id cannot be empty', async function () {
    
    const response = await request    
    .post('/api/comments')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({user_id: "", body: "Comment 20 characters" , news_id: "1"})        
    
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('The field cannot be empty');
  });

  it('return insert a Comment should fail with admin credentials and the field body cannot be empty', async function () {
    
    const response = await request    
    .post('/api/comments')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({user_id: "2", body: "" , news_id: "1"})        
    
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('The field cannot be empty');
  });
});

describe("GET /api/comments", function () {
  
  it("returns all Comment should fail without credentials", async function () {
    const response = await request
    .get("/api/comments");

    expect(response.status).to.eql(400);
  });

  it("returns all Comment should succeed with regular credentials", async function () {
    const response = await request
    .get(`/api/comments`)
    .set("Authorization", `Bearer ${regularToken}`);

    expect(response.status).to.eql(200);
  });

  it("returns all Comment should succeed with admin credentials", async function () {
    const response = await request
    .get(`/api/comments`)
    .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).to.eql(200);
  });
});

describe("GET /api/comments/:id", function () {

  it("returns all Comment should fail without credentials", async function () {
    const response = await request
    .get("/api/comments");

    expect(response.status).to.eql(400);
  });

  it('return get a Comment should fail with admin credentials and id not found', async function () {
    const response = await request
    .put('/api/comments/0')
    .set("Authorization", `Bearer ${adminToken}`)
    .send(baseRequest);        
    expect(response.status).to.eql(404);
  });

  it('returns all Comment should succeed with regular credentials', async function () {
    const response = await request
    .get(`/api/comments/${commentId}`)
    .set("Authorization", `Bearer ${regularToken}`)
    expect(response.status).to.eql(200);
  });

  it("returns all Comment should succeed with admin credentials", async function () {
    const response = await request
    .get(`/api/comments/${commentId}`)
    .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).to.eql(200);
  });


});

describe("UPDATE /api/comments/:id", function () {
  
  it('return update a Comment should fail without credentials', async function () {
    const response = await request
    .put(`/api/comments/${commentId}`)    
    .send({
      body: "comment 200 characters"
    });    
    expect(response.status).to.eql(400);
  });

  it('return update a Comment should fail with admin credentials and id not found', async function () {
    const response = await request
    .put('/api/comments/0')
    .set("Authorization", `Bearer ${adminToken}`)
    .send(baseRequest);        
    expect(response.status).to.eql(404);
  });
  
  it('return update a Comment should fail with admin credentials and the field user_id is empty', async function () {
    
    const response = await request    
    .put(`/api/comments/${commentId}`)
    .set("Authorization", `Bearer ${adminToken}`)
    .send({user_id: "", body: "comment 20 characters", news_id: "1"})        
    
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('The field cannot be empty');
  });

  it('return update a Comment should fail with admin credentials and the field body has less than 20 characters', async function () {
    
    const response = await request    
    .put(`/api/comments/${commentId}`)
    .set("Authorization", `Bearer ${adminToken}`)
    .send({user_id: "2", body: "comment", news_id: "1"})
    
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('The minimum length must be 20 characters');
  });

  it('return update a comments should fail with admin credentials and the field body is empty', async function () {
    
    const response = await request    
    .put(`/api/comments/${commentId}`)
    .set("Authorization", `Bearer ${adminToken}`)
    .send({user_id: "2", body: "", news_id: "1"})
    
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('The field cannot be empty');
  });

  it('return update a Comment should fail with admin credentials and the field user_id is empty', async function () {
    
    const response = await request    
    .put(`/api/comments/${commentId}`)
    .set("Authorization", `Bearer ${adminToken}`)
    .send({user_id: "", body: "comment" , news_id: "1"})        
    
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('The field cannot be empty');
  });
  
  it('return update a Comment should succeed with admin credentials', async function () {
    const response = await request
    .put(`/api/comments/${commentId}`)
    .set("Authorization", `Bearer ${adminToken}`)
    .send(baseRequest);
        
    expect(response.status).to.eql(201);
  });  
});

describe("DELETE /api/comments/:id", function () {
  
  it('return delete a Comment should fail without credentials', async function () {
    const response = await request
    .del(`/api/comments/${commentId}`)    
        
    expect(response.status).to.eql(400);
  });

  it('return delete a Comment should fail with admin credentials and id not found', async function () {
    const response = await request
    .put('/api/comments/0')
    .set("Authorization", `Bearer ${adminToken}`)
    .send(baseRequest);        
    expect(response.status).to.eql(404);
  });

  it('return delete a Comment should succeed with admin credentials', async function () {
    const response = await request
    .del(`/api/comments/${commentId}`)
    .set("Authorization", `Bearer ${adminToken}`)
        
    expect(response.status).to.eql(200);
  });

  it('return delete a Comment should fail with admin credentials and id not found', async function () {
    const response = await request
    .del('/api/comments/0')
    .set("Authorization", `Bearer ${adminToken}`)
        
    expect(response.status).to.eql(404);
  });
});