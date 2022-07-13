const { request, expect } = require("./config");
const Contact= require('../models').Contacts

var adminToken = '';
var regularToken = '';
var contact;



describe("ROUTE /api/contacts", function () {
    this.timeout(10000)

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
    after(async function () {
        await Contact.destroy({
            where:{
                id:contact.id
            },
            force:true
        })
        
    })


    it('return insert a contact should succeed', async function () {
        const response = await request
            .post('/api/contacts')
            .send({ name: "Diego Molinas", phone: "1125343209", email: "diegoOT224@mail.com.ar", message: "message from Diego Molinas" })
        expect(response.status).to.eql(200);
        contact = response.body.contact

    });

    it('return insert a contact should fail and the field name is empty', async function () {

        const response = await request
            .post('/api/contacts')
            .send({ name: "", phone: "1125343209", email: "diegoOT224@mail.com.ar", message: "message from Diego Molinas" })
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
            .send({ name: "Diego Molinas", phone: "1125343209", email: "diegoOT224mail.com.ar", message: "message from Diego Molinas" })
        expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Please enter a valid email');
    });

    it('return insert a contact should fail and the field email is unique', async function () {

        const response = await request
            .post('/api/contacts')
            .send({ name: "Diego Molinas", phone: "1125343209", email: "diegoOT224@mail.com.ar", message: "message from Diego Molinas" })
        expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Email already registered');
    });

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

    it('return get contact by id should fail without credentials', async function () {
        const { id } = contact
        const response = await request
            .get(`/api/contacts/${id}`)
        expect(response.status).to.eql(400);
    });
    it('return get contact by id should fail with regular credentials', async function () {
        const { id } = contact
        const response = await request
            .get(`/api/contacts/${id}`)
            .set("Authorization", `Bearer ${regularToken}`)
        expect(response.status).to.eql(401);
    });
    it('return get contact by id should fail with admin credentials and id not found', async function () {
        const response = await request
            .get('/api/contacts/1000')
            .set("Authorization", `Bearer ${adminToken}`)
        expect(response.status).to.eql(404);
    });
    it('return get contact by id should succeed with admin credentials', async function () {
        const { id } = contact
        const response = await request
            .get(`/api/contacts/${id}`)
            .set("Authorization", `Bearer ${adminToken}`)
        expect(response.status).to.eql(200);
    });

    it('return update contact by id should fail without credentials', async function () {
        const { id } = contact
        const response = await request
            .put(`/api/contacts/${id}`)
            .send({ name: "Diego Molinas", phone: "1125343222", email: "diegoOT224@mail.com.ar", message: "New message from Diego Molinas" });
        expect(response.status).to.eql(400);
    });

    it('return update contact by id should fail with regular credentials', async function () {
        const { id } = contact
        const response = await request
            .put(`/api/contacts/${id}`)
            .set("Authorization", `Bearer ${regularToken}`)
            .send({ name: "Diego Molinas", phone: "1125343222", email: "diegoOT224@mail.com.ar", message: "New message from Diego Molinas" });
        expect(response.status).to.eql(401);
    });

    it('return update contact by id should fail with admin credentials and id not found', async function () {
        const response = await request
            .put('/api/contacts/1000')
            .set("Authorization", `Bearer ${adminToken}`)
            .send({ name: "Diego Molinas", phone: "1125343222", email: "diegoOT224@gmail.com", message: "New message from Diego Molinas" });
        expect(response.status).to.eql(404);
    });

    it('return update contact by id should succeed with admin credentials', async function () {
        const { id } = contact
        const response = await request
            .put(`/api/contacts/${id}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .send({ name: "Diego Molinas", phone: "1125343221", email: "diegoOT224@mail.com.ar", message: "New message from Diego Molinas" });
        expect(response.status).to.eql(200);
    });

    it('return delete contact by id should fail without credentials', async function () {
        const { id } = contact
        const response = await request
            .del(`/api/contacts/${id}`)

        expect(response.status).to.eql(400);
    });

    it('return delete contact by id should fail with regular credentials', async function () {
        const { id } = contact
        const response = await request
            .del(`/api/contacts/${id}`)
            .set("Authorization", `Bearer ${regularToken}`)

        expect(response.status).to.eql(401);
    });

    it('return delete contact by id should fail with admin credentials and id not found', async function () {
        const response = await request
            .del('/api/contacts/1000')
            .set("Authorization", `Bearer ${adminToken}`)

        expect(response.status).to.eql(404);
    });

    it('return delete contact by id should succeed with admin credentials', async function () {
        const { id } = contact
        const response = await request
            .del(`/api/contacts/${id}`)
            .set("Authorization", `Bearer ${adminToken}`)

        expect(response.status).to.eql(200);
    });


});


