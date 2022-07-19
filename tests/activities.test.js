const { request, expect } = require("./config");

let adminToken, regularToken, activityId = null;
const baseRequest = {name: "Activity 1", content: "activity content", image: "https://via.placeholder.com/600/92c952"}
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

describe("POST /api/activities", function () {  

  it('return insert a activity should fail without credentials', async function () {
    const response = await request
    .post('/api/activities')    
    .send(baseRequest)
    
    expect(response.status).to.eql(400);
  });

  it('return insert a activity should fail with regular credentials', async function () {
    const response = await request
    .post('/api/activities')
    .set("Authorization", `Bearer ${regularToken}`)
    .send(baseRequest)
    
    expect(response.status).to.eql(401);
  });

  it('return insert a activity should succeed with admin credentials', async function () {
    const response = await request
    .post('/api/activities')
    .set("Authorization", `Bearer ${adminToken}`)
    .send(baseRequest)
    
    expect(response.status).to.eql(201);
    activityId = response.body.id
  });

  it('return insert a activity should succeed with admin credentials and return ', async function () {
    const response = await request
    .post('/api/activities')
    .set("Authorization", `Bearer ${adminToken}`)
    .send(baseRequest)
    
    expect(response.body).to.have.property('name').to.be.equal("Activity 1");
  });

  it('return insert a activity should fail with admin credentials and the field name is empty', async function () {
    const response = await request    
    .post('/api/activities')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "", content: "act content", image: "https://via.placeholder.com/600/92c952"})        
    
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('should not be empty');
  });

  it('return insert a activity should fail with admin credentials and the field name has less than 6 characters', async function () {
    
    const response = await request    
    .post('/api/activities')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Act", content: "act content", image: "https://via.placeholder.com/600/92c952"})
    
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('should has 6 characters');
  });

  it('return insert a activity should fail with admin credentials and the field image is empty', async function () {
    
    const response = await request    
    .post('/api/activities')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Activity 1", content: "act content", image: ""})
    
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('should not be empty');
  });

  it('return insert a activity should fail with admin credentials and the field content is empty', async function () {
    
    const response = await request    
    .post('/api/activities')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Activity 1", content: "", image: "https://via.placeholder.com/600/92c952"})        
    
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('should not be empty');
  });
});

describe("GET /api/activities", function () {
  
  it("returns all activity should fail without credentials", async function () {
    const response = await request
    .get("/api/activities");

    expect(response.status).to.eql(400);
  });

  it("returns all activity should succeed with regular credentials", async function () {
    const response = await request
    .get("/api/activities")
    .set("Authorization", `Bearer ${regularToken}`);

    expect(response.status).to.eql(200);
  });

  it("returns all activity should succeed with admin credentials", async function () {
    const response = await request
    .get("/api/activities")
    .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).to.eql(200);
  });

  it("returns all activity should succeed with admin credentials and return activities", async function () {
    const response = await request
    .get("/api/activities")
    .set("Authorization", `Bearer ${adminToken}`);

    expect(response.body).to.have.nested.property('data').to.have.lengthOf.greaterThan(0);
  });
});

describe("GET /api/activities/:id", function () {

  it("returns all activity should fail without credentials", async function () {
    const response = await request
    .get("/api/activities");

    expect(response.status).to.eql(400);
  });

  it('return get a activity should fail with admin credentials and id not found', async function () {
    const response = await request
    .put('/api/activities/0')
    .set("Authorization", `Bearer ${adminToken}`)
    .send(baseRequest);        
    expect(response.status).to.eql(404);
  });

  it('returns all activity should succeed with regular credentials', async function () {
    const response = await request
    .get(`/api/activities/${activityId}`)
    .set("Authorization", `Bearer ${regularToken}`)
    expect(response.status).to.eql(200);
  });

  it("returns all activity should succeed with admin credentials", async function () {
    const response = await request
    .get("/api/activities")
    .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).to.eql(200);
  });


});

describe("UPDATE /api/activities/:id", function () {
  
  it('return update a activity should fail without credentials', async function () {
    const response = await request
    .put(`/api/activities/${activityId}`)    
    .send({
      content: "content activity"
    });    
    expect(response.status).to.eql(400);
  });

  it('return update a activity should fail with admin credentials and id not found', async function () {
    const response = await request
    .put('/api/activities/0')
    .set("Authorization", `Bearer ${adminToken}`)
    .send(baseRequest);        
    expect(response.status).to.eql(404);
  });
  
  it('return update a activity should fail with admin credentials and the field name is empty', async function () {
    
    const response = await request    
    .put(`/api/activities/${activityId}`)
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "", image: "https://via.placeholder.com/600/92c952", content: "act content"})        
    
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('should not be empty');
  });

  it('return update a activity should fail with admin credentials and the field name has less than 6 characters', async function () {
    
    const response = await request    
    .put('/api/activities/3')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Act", image: "https://via.placeholder.com/600/92c952", content: "act content"})
    
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('should has 6 characters');
  });

  it('return update a activities should fail with admin credentials and the field image is empty', async function () {
    
    const response = await request    
    .put(`/api/activities/${activityId}`)
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Activity 1", image: "", content: "act content"})
    
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('should not be empty');
  });

  it('return update a activity should fail with admin credentials and the field content is empty', async function () {
    
    const response = await request    
    .put(`/api/activities/${activityId}`)
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "activities 1", image: "https://via.placeholder.com/600/92c952", content: ""})        
    
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('should not be empty');
  });
  
  it('return update a activity should succeed with admin credentials', async function () {
    const response = await request
    .put(`/api/activities/${activityId}`)
    .set("Authorization", `Bearer ${adminToken}`)
    .send(baseRequest);
        
    expect(response.status).to.eql(201);
  });  
});

describe("DELETE /api/activities/:id", function () {
  
  it('return delete a activity should fail without credentials', async function () {
    const response = await request
    .del(`/api/activities/${activityId}`)    
        
    expect(response.status).to.eql(400);
  });

  it('return delete a activity should fail with admin credentials and id not found', async function () {
    const response = await request
    .put('/api/activities/0')
    .set("Authorization", `Bearer ${adminToken}`)
    .send(baseRequest);        
    expect(response.status).to.eql(404);
  });

  it('return delete a activity should succeed with admin credentials', async function () {
    const response = await request
    .del(`/api/activities/${activityId}`)
    .set("Authorization", `Bearer ${adminToken}`)
        
    expect(response.status).to.eql(200);
  });

  it('return delete a activity should fail with admin credentials and id not found', async function () {
    const response = await request
    .del('/api/activities/0')
    .set("Authorization", `Bearer ${adminToken}`)
        
    expect(response.status).to.eql(404);
  });
});