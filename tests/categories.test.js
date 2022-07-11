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


describe("GET /api/categories", function () {

  it('list all categories whithout pagination, fails without credentials', async function () {
    const response = await request
    .get('/api/categories') 
    expect(response.status).to.eql(400);
  });

  it('list all categories whithout pagination, fails with regular user credentials', async function () {
    const response = await request
    .get('/api/categories') 
    .set("Authorization", `Bearer ${regularToken}`)
    expect(response.status).to.eql(401);
  });

  it('list all categories whithout pagination, sucessful with admin credentials', async function () {
    const response = await request
    .get('/api/categories')
    .set("Authorization", `Bearer ${adminToken}`)
    expect(response.status).to.eql(200);
  });

  it('list all categories with pagination, sucessful with admin credentials', async function () {
    const response = await request
    .get('/api/categories?page=2')
    .set("Authorization", `Bearer ${adminToken}`)
    expect(response.status).to.eql(200);
  });

});


describe("GET ONE /api/categories/:id", function () {

  it('list one category, fails without credentials', async function () {
    const response = await request
    .get('/api/categories/1') 
    expect(response.status).to.eql(400);
  });

  it('list one category, fails with regular user credentials', async function () {
    const response = await request
    .get('/api/categories/1') 
    .set("Authorization", `Bearer ${regularToken}`)
    expect(response.status).to.eql(401);
  });

  it('list one category, with admin credentials, fails when id not found', async function () {
    const response = await request
    .get('/api/categories/500')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Category demo 500", description: "demo accusamus beatae ad facilis cum similique qui sunt", image: "https://via.placeholder.com/600/92c952" })       
    expect(response.status).to.eql(404);
  }); 

  it('list one category, sucessful with admin credentials', async function () {
    const response = await request
    .get('/api/categories/1')
    .set("Authorization", `Bearer ${adminToken}`)
    expect(response.status).to.eql(200);
  });

});


describe("POST /api/categories", function () {  

  it('create a category, fails without credentials', async function () {
    const response = await request
    .post('/api/categories')    
    .send({name: "Category demo 1", description: "demo accusamus beatae ad facilis cum similique qui sunt", image: "https://via.placeholder.com/600/92c952" })
    expect(response.status).to.eql(400);
  });

  it('create a category, fails with regular user credentials', async function () {
    const response = await request
    .post('/api/categories')
    .set("Authorization", `Bearer ${regularToken}`)
    .send({name: "Category demo 1", description: "demo accusamus beatae ad facilis cum similique qui sunt", image: "https://via.placeholder.com/600/92c952" })
    expect(response.status).to.eql(401);
  });

  it('create a category, with admin credentials, fails without name', async function () {
    const response = await request
    .post('/api/categories')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({description: "demo accusamus beatae ad facilis cum similique qui sunt", image: "https://via.placeholder.com/600/92c952" })
    expect(response.status).to.eql(403);
  });

  it('create category, with admin credentials, fails with spaces in the name', async function () {
    const response = await request
    .post('/api/categories')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "    ", description: "demo accusamus beatae ad facilis cum similique qui sunt", image: "https://via.placeholder.com/600/92c952" })
    expect(response.status).to.eql(403);
  });

  it('create category, with admin credentials, fails with numbers in the name', async function () {
    const response = await request
    .post('/api/categories')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: 22, description: "demo accusamus beatae ad facilis cum similique qui sunt", image: "https://via.placeholder.com/600/92c952" })
    expect(response.status).to.eql(403);
  });

  it('create category, with admin credentials, fails if name when less than 3 letters', async function () {
    const response = await request
    .post('/api/categories')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Ca", description: "demo accusamus beatae ad facilis cum similique qui sunt", image: "https://via.placeholder.com/600/92c952" })
    expect(response.status).to.eql(403);
  });

  it('create category, with admin credentials, fails when name already exists in database', async function () {
    const response = await request
    .post('/api/categories')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Category demo 1", description: "demo accusamus beatae ad facilis cum similique qui sunt", image: "https://via.placeholder.com/600/92c952" })
    expect(response.status).to.eql(403);
  });

  it('create category, with admin credentials, fails when description has non-string data', async function () {
    const response = await request
    .post('/api/categories')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Category demo 1", description: 2222, image: "https://via.placeholder.com/600/92c952" })
    expect(response.status).to.eql(403);
  });

  it('create category, with admin credentials, fails when description has non-string data', async function () {
    const response = await request
    .post('/api/categories')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Category demo 1", description:"demo accusamus beatae ad facilis cum similique qui sunt", image: 222 })
    expect(response.status).to.eql(403);
  });

  it('create category, with admin credentials, fails when description not be url', async function () {
    const response = await request
    .post('/api/categories')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Category demo 1", description:"demo accusamus beatae ad facilis cum similique qui sunt", image: "imagen 1" })
    expect(response.status).to.eql(403);
  });

  it('create a category, sucessful with admin credentials', async function () {
    const response = await request
    .post('/api/categories')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Category demo 40", description: "demo accusamus beatae ad facilis cum similique qui sunt", image: "https://via.placeholder.com/600/92c952" })
    expect(response.status).to.eql(201);
  });
  
});
  

describe("UPDATE /api/categories/:id", function () {

  it('update a category, fails without credentials', async function () {
    const response = await request
    .put('/api/categories/1')    
    .send({name: "Category demo 1", description: "demo accusamus beatae ad facilis cum similique qui sunt", image: "https://via.placeholder.com/600/92c952" })
    expect(response.status).to.eql(400);
  });

  it('update a category, fails with regular user credentials', async function () {
    const response = await request
    .put('/api/categories/1')
    .set("Authorization", `Bearer ${regularToken}`)
    .send({name: "Category demo 1", description: "demo accusamus beatae ad facilis cum similique qui sunt", image: "https://via.placeholder.com/600/92c952" }) 
    expect(response.status).to.eql(401);
  });

  it('update a category, with admin credentials, fails without name', async function () {
    const response = await request
    .put('/api/categories/1')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({description: "demo accusamus beatae ad facilis cum similique qui sunt", image: "https://via.placeholder.com/600/92c952" })
    expect(response.status).to.eql(403);
  });

  it('update category, with admin credentials, fails with spaces in the name', async function () {
    const response = await request
    .put('/api/categories/1')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "    ", description: "demo accusamus beatae ad facilis cum similique qui sunt", image: "https://via.placeholder.com/600/92c952" })
    expect(response.status).to.eql(403);
  });

  it('update category, with admin credentials, fails with numbers in the name', async function () {
    const response = await request
    .put('/api/categories/1')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: 22, description: "demo accusamus beatae ad facilis cum similique qui sunt", image: "https://via.placeholder.com/600/92c952" })
    expect(response.status).to.eql(403);
  });

  it('update category, with admin credentials, fails if name when less than 3 letters', async function () {
    const response = await request
    .put('/api/categories/1')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Ca", description: "demo accusamus beatae ad facilis cum similique qui sunt", image: "https://via.placeholder.com/600/92c952" })
    expect(response.status).to.eql(403);
  });

  it('update category, with admin credentials, fails when name already exists in database', async function () {
    const response = await request
    .put('/api/categories/1')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Category demo 6", description: "demo accusamus beatae ad facilis cum similique qui sunt", image: "https://via.placeholder.com/600/92c952" })
    expect(response.status).to.eql(403);
  });

  it('update category, with admin credentials, fails when description has non-string data', async function () {
    const response = await request
    .put('/api/categories/1')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Category demo 1", description: 2222, image: "https://via.placeholder.com/600/92c952" })
    expect(response.status).to.eql(403);
  });

  it('update category, with admin credentials, fails when description has non-string data or not be url ', async function () {
    const response = await request
    .put('/api/categories/1')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Category demo 1", description:"demo accusamus beatae ad facilis cum similique qui sunt", image: 222 })
    expect(response.status).to.eql(403);
  });

  it('update category, with admin credentials, fails when description not be url ', async function () {
    const response = await request
    .put('/api/categories/1')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Category demo 1", description:"demo accusamus beatae ad facilis cum similique qui sunt", image: "imagen 1" })
    expect(response.status).to.eql(403);
  });

  it('update a category, with admin credentials, fails when id not found', async function () {
    const response = await request
    .put('/api/categories/500')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Category demo 500", description: "demo accusamus beatae ad facilis cum similique qui sunt", image: "https://via.placeholder.com/600/92c952" })       
    expect(response.status).to.eql(404);
  }); 
  
  it('update a category, sucessful with admin credentials', async function () {
    const response = await request
    .put('/api/categories/1')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Category demo 1", description: "demo accusamus beatae ad facilis cum similique qui sunt", image: "https://via.placeholder.com/600/92c952" })
    expect(response.status).to.eql(200);
  });

});


describe("DELETE /api/categories/:id", function () {
  
  it('delete a category, fails withouth credentials', async function () {
    const response = await request
    .del('/api/categories/2') 
    expect(response.status).to.eql(400);
  });

  it('delete a category, fails with regular user credentials', async function () {
    const response = await request
    .del('/api/categories/2')
    .set("Authorization", `Bearer ${regularToken}`)  
    expect(response.status).to.eql(401);
  });

  it('delete a category, with admin credentials, fails when id not found', async function () {
    const response = await request
    .del('/api/categories/500')
    .set("Authorization", `Bearer ${adminToken}`)
    expect(response.status).to.eql(404);
  });

  it('delete a category, with admin credentials, fails when the category has associated news', async function () {
    const response = await request
    .del('/api/categories/10')
    .set("Authorization", `Bearer ${adminToken}`)    
    expect(response.status).to.eql(403);
  });

  it('delete a category,  sucessful with admin credentials', async function () {
    const response = await request
    .del('/api/categories/11')    
    .set("Authorization", `Bearer ${adminToken}`)
    expect(response.status).to.eql(200);
  });
  
});