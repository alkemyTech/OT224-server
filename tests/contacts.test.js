const { request, expect } = require("./config");


var adminToken = '';
var regularToken = '';
before(async function () {
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

describe("POST /api/contacts", function () {

    it('return insert a contact should succeed', async function () {
        const response = await request
            .post('/api/contacts')
            .send({ name: "Diego Molinas", phone: "1125343209", email: "diego4@gmail.com", message: "message from Diego Molinas" })
        expect(response.status).to.eql(200);
    });

    it('return insert a contact should fail and the field name is empty', async function () {

        const response = await request
            .post('/api/contacts')
            .send({ name: "", phone: "1125343209", email: "diegom4@gmail.com", message: "message from Diego Molinas" })
        expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Please enter your name!');
    });

    it('return insert a contact should fail and the field email is empty', async function () {

        const response = await request
            .post('/api/contacts')
            .send({ name: "Diego Molinas", phone: "1125343209", email: "", message: "message from Diego Molinas" })
        expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Please enter your email');
    });

    it('return insert a contact should fail and the field email is invalid', async function () {

        const response = await request
            .post('/api/contacts')
            .send({ name: "Diego Molinas", phone: "1125343209", email: "diegom4gmail.com", message: "message from Diego Molinas" })
        expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Please enter a valid email');
    });

    it('return insert a contact should fail and the field email is unique', async function () {

        const response = await request
            .post('/api/contacts')
            .send({ name: "Diego Molinas", phone: "1125343209", email: "diegom3@gmail.com", message: "message from Diego Molinas" })
        expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Email already registered');
    });

});

describe("GET /api/contacts", function () {

    it('return get all contacts should fail without credentials', async function () {
        const response = await request
            .get('/api/contacts')
        expect(response.status).to.eql(400);
    });
    it('return get all contacts should fail with regular credentials', async function () {
        const response = await request
            .get('/api/contacts')
            .set("Authorization", `Bearer ${regularToken}`)
        expect(response.status).to.eql(401);
    });
    it('return get all contacts should should succeed with admin credentials', async function () {
        const response = await request
            .get('/api/contacts')
            .set("Authorization", `Bearer ${adminToken}`)
        expect(response.status).to.eql(200);
    });
});

describe("GET /api/contacts/6", function () {

    it('return get contact by id should fail without credentials', async function () {
        const response = await request
            .get('/api/contacts/6')
        expect(response.status).to.eql(400);
    });
    it('return get contact by id should fail with regular credentials', async function () {
        const response = await request
            .get('/api/contacts/6')
            .set("Authorization", `Bearer ${regularToken}`)
        expect(response.status).to.eql(401);
    });
    it('return get contact by id should fail with admin credentials and id not found', async function () {
        const response = await request
            .get('/api/contacts/23')
            .set("Authorization", `Bearer ${adminToken}`)
        expect(response.status).to.eql(404);
    });
    it('return get contact by id should succeed with admin credentials', async function () {
        const response = await request
            .get('/api/contacts/6')
            .set("Authorization", `Bearer ${adminToken}`)
        expect(response.status).to.eql(200);
    });
    
});

describe("UPDATE /api/contacts/13", function () {

    it('return update a contact should fail without credentials', async function () {
        const response = await request
            .put('/api/contacts/13')
            .send({ name: "Diego Molinas", phone: "1125343222", email: "diegom3@gmail.com", message: "New message from Diego Molinas" });
        expect(response.status).to.eql(400);
    });

    it('return update a contact should fail with regular credentials', async function () {
        const response = await request
            .put('/api/contacts/13')
            .set("Authorization", `Bearer ${regularToken}`)
            .send({ name: "Diego Molinas", phone: "1125343222", email: "diegom3@gmail.com", message: "New message from Diego Molinas" });
        expect(response.status).to.eql(401);
    });

    it('return update a contact should fail with admin credentials and id not found', async function () {
        const response = await request
            .put('/api/contacts/22')
            .set("Authorization", `Bearer ${adminToken}`)
            .send({ name: "Diego Molinas", phone: "1125343222", email: "diegom3@gmail.com", message: "New message from Diego Molinas" });
        expect(response.status).to.eql(404);
    });

    it('return update a contact should succeed with admin credentials', async function () {
        const response = await request
            .put('/api/contacts/13')
            .set("Authorization", `Bearer ${adminToken}`)
            .send({ name: "Diego Molinas", phone: "1125343222", email: "diegom3@gmail.com", message: "New message from Diego Molinas" });
        expect(response.status).to.eql(200);
    });
});

describe("DELETE /api/contacts/11", function () {

    it('return delete a contact should fail without credentials', async function () {
        const response = await request
            .del('/api/contacts/11')

        expect(response.status).to.eql(400);
    });

    it('return delete a contact should fail with regular credentials', async function () {
        const response = await request
            .del('/api/contacts/11')
            .set("Authorization", `Bearer ${regularToken}`)

        expect(response.status).to.eql(401);
    });

    it('return delete a contact should fail with admin credentials and id not found', async function () {
        const response = await request
            .del('/api/contacts/22')
            .set("Authorization", `Bearer ${adminToken}`)

        expect(response.status).to.eql(404);
    });

    it('return delete a contact should succeed with admin credentials', async function () {
        const response = await request
            .del('/api/contacts/11')
            .set("Authorization", `Bearer ${adminToken}`)

        expect(response.status).to.eql(200);
    });

});

