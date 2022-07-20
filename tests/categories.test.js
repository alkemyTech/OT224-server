const { request, expect } = require("./config");
const ModelCategories= require('../models').Categories;
const ModelNews= require('../models').News;

describe("/api/categories", function () {

let adminToken = '';
let regularToken = '';
let idTest='';
let idNews='';
let newsCatgoryId='';
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
    const respCategories=await ModelCategories.destroy({where:{id:idTest},force:true})
    console.log('AfterRespCategories',respCategories)

    const respNews=await ModelNews.destroy({where:{id:idNews},force:true})
    console.log('AfterRespNews',respNews)
  });

  // CREATE NEWS WITH CATEGORYID FOR TEST DELETE CATEGORY
  it('create a news, sucessful with admin credentials', async function () {
    const response = await request
    .post('/api/news')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name:"NewsforCategoryTest", image:"https://NewsforCategoryTest.com/600/92c952", type:"news",content: "NewsforCategoryTest", categoryId:10, deletdAt:null}) 
    expect(response.status).to.eql(201);
    expect(response.body).to.be.an('object')
    idNews=response.body.id
    newsCatgoryId=response.body.categoryId
  });

  // CREATE CATEGORY
  it('create a category, fails without credentials', async function () {
    const response = await request
    .post('/api/categories')    
    .send({name: "Category Test", description: "descripcion Test", image: "https://Test.com/600/92c952" })
    expect(response.status).to.eql(400)
  });

  it('create a category, fails with regular user credentials', async function () {
    const response = await request
    .post('/api/categories')
    .set("Authorization", `Bearer ${regularToken}`)
    .send({name: "Category Test", description: "descripcion Test", image: "https://Test.com/600/92c952" })
    expect(response.status).to.eql(401)
  });

  it('create a category, with admin credentials, fails without name', async function () {
    const response = await request
    .post('/api/categories')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({description: "description Test", image: "https://Test.com/600/92c952" })
    expect(response.status).to.eql(403)
    expect(response.body).to.be.an('object')
  });

  it('create category, with admin credentials, fails with spaces in the name', async function () {
    const response = await request
    .post('/api/categories')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "    ", description: "description Test", image: "https://Test.com/600/92c952" })
    expect(response.status).to.eql(403)
    expect(response.body).to.be.an('object')
  });

  it('create category, with admin credentials, fails with numbers in the name', async function () {
    const response = await request
    .post('/api/categories')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: 22, description: "description Test", image: "https://Test.com/600/92c952" })
    expect(response.status).to.eql(403)
    expect(response.body).to.be.an('object')
  });

  it('create category, with admin credentials, fails if name when less than 3 letters', async function () {
    const response = await request
    .post('/api/categories')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Ca", description: "description Test", image: "https://Test.com/600/92c952" })
    expect(response.status).to.eql(403)
    expect(response.body).to.be.an('object')
  });

  it('create category, with admin credentials, fails when name already exists in database', async function () {
    const response = await request
    .post('/api/categories')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Category demo 1", description: "description Test", image: "https://Test.com/600/92c952" })
    expect(response.status).to.eql(403)
    expect(response.body).to.be.an('object')
  });

  it('create category, with admin credentials, fails when description has non-string data', async function () {
    const response = await request
    .post('/api/categories')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Category Test", description: 2222, image: "https://Test.com/600/92c952" })
    expect(response.status).to.eql(403)
    expect(response.body).to.be.an('object')
  });

  it('create category, with admin credentials, fails when image has non-string data', async function () {
    const response = await request
    .post('/api/categories')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Category Test", description:"description Test", image: 222 })
    expect(response.status).to.eql(403)
    expect(response.body).to.be.an('object')
  });

  it('create category, with admin credentials, fails when image not be url', async function () {
    const response = await request
    .post('/api/categories')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Category Test", description:"description Test", image: "imagen Test" })
    expect(response.status).to.eql(403)
    expect(response.body).to.be.an('object')
  });

  it('create a category, sucessful with admin credentials', async function () {
    const response = await request
    .post('/api/categories')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Category Test Create", description: "description Test", image: "https://Test.com/600/92c952" }) 
    expect(response.status).to.eql(201);
    expect(response.body).to.be.an('object')
    idTest=response.body.id
  });

  // GET ALL CATEGORIES
  it('list all categories whithout pagination, fails without credentials', async function () {
    const response = await request
    .get('/api/categories') 
    expect(response.status).to.eql(400)
  });

  it('list all categories whithout pagination, fails with regular user credentials', async function () {
    const response = await request
    .get('/api/categories') 
    .set("Authorization", `Bearer ${regularToken}`)
    expect(response.status).to.eql(401)
  });

  it('list all categories whithout pagination, sucessful with admin credentials', async function () {
    const response = await request
    .get('/api/categories')
    .set("Authorization", `Bearer ${adminToken}`)
    expect(response.status).to.eql(200);
    expect(response.body).to.be.an('object')
  });

  it('list all categories with pagination, sucessful with admin credentials', async function () {
    const response = await request
    .get('/api/categories?page=2')
    .set("Authorization", `Bearer ${adminToken}`)
    expect(response.status).to.eql(200)
    expect(response.body).to.be.an('object');
  });
  
  // GET ONE CATEGORY
  it('list one category, fails without credentials', async function () {
    const response = await request
    .get(`/api/categories/${idTest}`) 
    expect(response.status).to.eql(400)
    expect(response.body).includes({msg:"The request does not have a token"});
  });

  it('list one category, fails with regular user credentials', async function () {
    const response = await request
    .get(`/api/categories/${idTest}`) 
    .set("Authorization", `Bearer ${regularToken}`)
    expect(response.status).to.eql(401)
  });

  it('list one category, with admin credentials, fails when id not found', async function () {
    const response = await request
    .get(`/api/categories/${idNotFound}`)
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Category demo 500", description: "demo accusamus beatae ad facilis cum similique qui sunt", image: "https://via.placeholder.com/600/92c952" })       
    expect(response.status).to.eql(404)
    expect(response.body).includes('id not found');
  }); 

  it('list one category, sucessful with admin credentials', async function () {
    const response = await request
    .get(`/api/categories/${idTest}`)
    .set("Authorization", `Bearer ${adminToken}`)
    expect(response.status).to.eql(200)
    expect(response.body).to.be.an('object');
  });

  // UPDATE CATEGORY
  it('update a category, fails without credentials', async function () {
    const response = await request
    .put(`/api/categories/${idTest}`)    
    .send({name: "Category Test", description: "description Test", image: "https://Test.com/600/92c952" })
    expect(response.status).to.eql(400)
    expect(response.body).includes({msg:"The request does not have a token"});
  });

  it('update a category, fails with regular user credentials', async function () {
    const response = await request
    .put(`/api/categories/${idTest}`)   
    .set("Authorization", `Bearer ${regularToken}`)
    .send({name: "Category Test", description: "description Test", image: "https://Test.com/600/92c952" })
    expect(response.status).to.eql(401)
  });

  it('update a category, with admin credentials, fails without name', async function () {
    const response = await request
    .put(`/api/categories/${idTest}`)   
    .set("Authorization", `Bearer ${adminToken}`)
    .send({description: "description Test", image: "https://Test.com/600/92c952" })
    expect(response.status).to.eql(403)
    expect(response.body).to.be.an('object')
  });

  it('update category, with admin credentials, fails with spaces in the name', async function () {
    const response = await request
    .put(`/api/categories/${idTest}`)   
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "    ", description: "description Test", image: "https://Test.com/600/92c952" })
    expect(response.status).to.eql(403)
    expect(response.body).to.be.an('object')
  });

  it('update category, with admin credentials, fails with numbers in the name', async function () {
    const response = await request
    .put(`/api/categories/${idTest}`)   
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: 22, description: "description Test", image: "https://Test.com/600/92c952" })
    expect(response.status).to.eql(403)
    expect(response.body).to.be.an('object')
  });

  it('update category, with admin credentials, fails if name when less than 3 letters', async function () {
    const response = await request
    .put(`/api/categories/${idTest}`)   
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Ca", description: "description Test", image: "https://Test.com/600/92c952" })
    expect(response.status).to.eql(403)
    expect(response.body).to.be.an('object')
  });

  it('update category, with admin credentials, fails when name already exists in database', async function () {
    const response = await request
    .put(`/api/categories/${idTest}`)   
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Category demo 6", description: "description Test", image: "https://Test.com/600/92c952" })
    expect(response.status).to.eql(403)
    expect(response.body).to.be.an('object')
  });

  it('update category, with admin credentials, fails when description has non-string data', async function () {
    const response = await request
    .put(`/api/categories/${idTest}`)   
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Category Test", description: 2222, image: "https://Test.com/600/92c952" })
    expect(response.status).to.eql(403)
    expect(response.body).to.be.an('object')
  });

  it('update category, with admin credentials, fails when image has non-string data  ', async function () {
    const response = await request
    .put(`/api/categories/${idTest}`)   
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Category Test", description:"description Test", image: 222 })
    expect(response.status).to.eql(403)
    expect(response.body).to.be.an('object')
  });

  it('update category, with admin credentials, fails when image not be url ', async function () {
    const response = await request
    .put(`/api/categories/${idTest}`)   
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Category Test", description:"description Test", image: "imagen Test" })
    expect(response.status).to.eql(403)
    expect(response.body).to.be.an('object')
  });

  it('update a category, with admin credentials, fails when id not found', async function () {
    const response = await request
    .put(`/api/categories/${idNotFound}`)
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Category Test", description: "description Test", image: "https://Test.com/600/92c952" })       
    expect(response.status).to.eql(404)
    expect(response.body).includes('id not found');
  }); 
  
  it('update a category, sucessful with admin credentials', async function () {
    const response = await request
    .put(`/api/categories/${idTest}`)   
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Category Test Updated", description: "description Test updated", image: "https://Test.com/600/92c952" })
    expect(response.status).to.eql(201)
    expect(response.body).to.be.an('object');
  });

  // DELETE CATEGORY
  it('delete a category, fails withouth credentials', async function () {
    const response = await request
    .del(`/api/categories/${idTest}`)   
    expect(response.status).to.eql(400)
    expect(response.body).includes({msg:"The request does not have a token"});
  });

  it('delete a category, fails with regular user credentials', async function () {
    const response = await request
    .del(`/api/categories/${idTest}`)   
    .set("Authorization", `Bearer ${regularToken}`)  
    expect(response.status).to.eql(401)
  });

  it('delete a category, with admin credentials, fails when id not found', async function () {
    const response = await request
    .del(`/api/categories/${idNotFound}`)
    .set("Authorization", `Bearer ${adminToken}`)
    expect(response.status).to.eql(404)
    expect(response.body).includes('id not found');
  });

  it('delete a category, with admin credentials, fails when the category has associated news', async function () {
    const response = await request
    .del(`/api/categories/${newsCatgoryId}`)
    .set("Authorization", `Bearer ${adminToken}`)   
    expect(response.status).to.eql(403)
    expect(response.body).includes({msg:"the category has news associated, can't delete it !"});
  });

  it('delete a category,  sucessful with admin credentials', async function () {
    const response = await request
    .del(`/api/categories/${idTest}`)     
    .set("Authorization", `Bearer ${adminToken}`)
    expect(response.status).to.eql(200)
    expect(response.body).to.be.an('object');
  });

});

