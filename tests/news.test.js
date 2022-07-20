const { request, expect } = require("./config");

describe("GET api/news", function () {
    let adminToken = '';
    let regularToken = '';
    let newId;
    const NOT_EXISTING_ID = 0;

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

    it('create a news, fails without credentials', async function () {
        const response = await request
        .post('/api/news')
        .send({name: "news", image: "https://via.placeholder.com/600/92c952", content: "content", categoryId: 1, type: "type" })

        expect(response.status).to.eql(400);
    });

    it('create a news, fails with regular user credentials', async function () {
        const response = await request
        .post('/api/news')
        .set("Authorization", `Bearer ${regularToken}`)
        .send({name: "news", image: "https://via.placeholder.com/600/92c952", content: "content", categoryId: 1, type: "type" })

        expect(response.status).to.eql(401);
    });

    it('create a news, with admin credentials, fails without name', async function () {
        const response = await request
        .post('/api/news')
        .set("Authorization", `Bearer ${adminToken}`)
        .send({name:"", image: "https://via.placeholder.com/600/92c952", content: "content", categoryId: 1, type: "type" })

        expect(response.body.error).to.have.nested.property('[0].msg').to.eql('El campo no puede estar vacio');
    });

    it('create a news, with admin credentials, fails without image', async function () {
        const response = await request
        .post('/api/news')
        .set("Authorization", `Bearer ${adminToken}`)
        .send({name: "news", content: "content", categoryId: 1, type: "type" })

        expect(response.body.error).to.have.nested.property('[0].msg').to.eql('El campo no puede estar vacio');
    });

    it('create a news, with admin credentials, fails without content', async function () {
        const response = await request
        .post('/api/news')
        .set("Authorization", `Bearer ${adminToken}`)
        .send({name: "news", image: "https://via.placeholder.com/600/92c952" , categoryId: 1, type: "type" })

        expect(response.body.error).to.have.nested.property('[0].msg').to.eql('El campo no puede estar vacio');
    });

    it('create a news, with admin credentials, fails without categoryId', async function () {
        const response = await request
        .post('/api/news')
        .set("Authorization", `Bearer ${adminToken}`)
        .send({name: "news", image: "https://via.placeholder.com/600/92c952" , content: "content", type: "type"  })

        expect(response.body.error).to.have.nested.property('[0].msg').to.eql('El campo no puede estar vacio');
    });

    it('create a news, successful with admin credentials', async function () {
        const response = await request
        .post('/api/news')
        .set("Authorization", `Bearer ${adminToken}`)
        .send({name: "news", image: "https://via.placeholder.com/600/92c952", content: "content", categoryId: 1, type: "type" })
        
        newId = response.body.id;
        
        expect(response.status).to.eql(201);
    });

    it('should get all news', async function () {
        const response = await request
        .get('/api/news')
        .set("Authorization", `Bearer ${adminToken}`)
        
        expect(response.status).to.eql(200);
    });
    
    it('list get one news, fails without credentials', async function () {
        const response = await request
        .get(`/api/news/${newId}`)
        
        expect(response.status).to.eql(400);
    });
    
    it('list get one news, fails with regular user credentials', async function () {
        const response = await request
        .get(`/api/news/${newId}`) 
        .set("Authorization", `Bearer ${regularToken}`)
        
        expect(response.status).to.eql(401);
    });

    it('list get one news, , with admin credentials, fails when id not found', async function (){
        const response = await request
        .get(`/api/news/${NOT_EXISTING_ID}`)
        .set("Authorization", `Bearer ${adminToken}`)

        expect(response.status).to.eql(404);
    })
    
    it('list get one news, with admin credentials, successful with admin credentials', async function () {
        const response = await request
        .get(`/api/news/${newId}`) 
        .set("Authorization", `Bearer ${adminToken}`)
        
        expect(response.status).to.eql(200);
    });
    
    it('update a news, fails without credentials', async function () {
        const response = await request
        .put(`/api/news/${newId}`) 
        .send({name: "news", image: "https://via.placeholder.com/600/92c952", content: "content", categoryid: 1, type: "type" })
        
        expect(response.status).to.eql(400);
    });
    
    it('update a news, fails with regular user credentials', async function () {
        const response = await request
        .put(`/api/news/${newId}`)
        .set("Authorization", `Bearer ${regularToken}`)
        .send({name: "news", image: "https://via.placeholder.com/600/92c952", content: "content", categoryId: 1, type: "type" })
        
        expect(response.status).to.eql(401);
    });
    
    
    it('update a news, with admin credentials, fails without name', async function () {
        const response = await request
        .put(`/api/news/${newId}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({name:"", image: "https://via.placeholder.com/600/92c952", content: "content", categoryId: 1, type: "type" })
        
        expect(response.body.error).to.have.nested.property('[0].msg').to.eql('El campo no puede estar vacio');
    });
    
    it('update a news, with admin credentials, fails without image', async function () {
        const response = await request
        .put(`/api/news/${newId}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({name: "news", content: "content", categoryId: 1, type: "type" })
        
        expect(response.body.error).to.have.nested.property('[0].msg').to.eql('El campo no puede estar vacio');
    });
    
    it('update a news, with admin credentials, fails without content', async function () {
        const response = await request
        .put(`/api/news/${newId}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({name: "news", image: "https://via.placeholder.com/600/92c952" , categoryId: 1, type: "type" })
    
        expect(response.body.error).to.have.nested.property('[0].msg').to.eql('El campo no puede estar vacio');
    });

    it('update a news, with admin credentials, fails without categoryId', async function () {
        const response = await request
        .put(`/api/news/${newId}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({name: "news", image: "https://via.placeholder.com/600/92c952" , content: "content", type: "type"  })
    
        expect(response.body.error).to.have.nested.property('[0].msg').to.eql('El campo no puede estar vacio');
    });

    it('update a news, with admin credentials, fails when id not found', async function (){
        const response = await request
        .put(`/api/news/${NOT_EXISTING_ID}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({name: "news", image: "https://via.placeholder.com/600/92c952",content: "content", categoryId: 1, type: "type" })
        
        expect(response.status).to.eql(404);
    })

    it('update a news, successful with admin credentials', async function () {
        const response = await request
        .put(`/api/news/${newId}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({name:"news", image:"https://via.placeholder.com/600/92c952", content:"content", categoryId: 1, type:"type" })

        expect(response.status).to.eql(201);
    });
    
    it('delete a news, fails without credentials', async function (){
        const response = await request
        .delete(`/api/news/${newId}`)

        expect(response.status).to.eql(400);
    });

    it('delete a news, fails with regular user credentials', async function () {
        const response = await request
        .delete(`/api/news/${newId}`)
        .set("Authorization", `Bearer ${regularToken}`)
        
        expect(response.status).to.eql(401);
    });

    it('delete a news, with admin credentials, fails when id not found', async function () {
        const response = await request
        .delete(`/api/news/${NOT_EXISTING_ID}`)
        .set("Authorization", `Bearer ${adminToken}`)
        
        expect(response.status).to.eql(404);
    });

    it('delete a news, successful with admin credentials', async function () {
        const response = await request
        .delete(`/api/news/${newId}`)
        .set("Authorization", `Bearer ${adminToken}`)
        
        expect(response.status).to.eql(200);
    });
})