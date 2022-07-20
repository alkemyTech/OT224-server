const { set } = require("../routes/news.routes");
const { request, expect } = require("./config");


let adminToken = '';
    let regularToken = '';
    let deletedTknUser;
    let orgId;
    let idUserToDelete;
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

        const responseNewUser = await request
            .post('/api/auth/register')
            .send({
                'firstName':'Emanuel',
                'lastName':'Ginobili',
                'email':'ginobili20@correo.com',
                'password':'1234567',
                'roleId': 1
            })
        deletedTknUser = responseNewUser.body.token
        idUserToDelete = responseNewUser.body.newUser.id
       

        const responseDeletedUser = await request
            .delete(`/api/users/${idUserToDelete}`)
            .set("Authorization", `Bearer ${adminToken}`)
    });



describe('POST /api/organization', function () {
    this.timeout(30000)
    it('should respond with status 403 if name field is less than 6 chars long', async function () {
        const response = await request
        .post('/api/organization/create')
        .send({
            'name':'abc',
            'image':'some random url',
            'address':'fake address 123',
            'phone':'1234556789',
            'email':'fakeemail@mail.com',
            'welcomeText':'Lorem ipsum dolor sit amet consectetur, adipiscing elit scelerisque facilisis convallis, mattis risus euismod potenti.',
            'aboutUsText':'Lorem ipsum dolor sit amet consectetur, adipiscing elit scelerisque facilisis convallis, mattis risus euismod potenti.'
        })
    
        expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Invalid value')
        expect(response.status).to.eql(403)

    })
    
    it('should respond with status 403 if image field is empty', async function () {
        const response = await request
        .post('/api/organization/create')
        .send({
            'name':'Fundacion Hermanos de Deus',
            'image':'',
            'address':'fake address 123',
            'phone':'1234556789',
            'email':'fakeemail@mail.com',
            'welcomeText':'Lorem ipsum dolor sit amet consectetur, adipiscing elit scelerisque facilisis convallis, mattis risus euismod potenti.',
            'aboutUsText':'Lorem ipsum dolor sit amet consectetur, adipiscing elit scelerisque facilisis convallis, mattis risus euismod potenti.'
        })
       
        expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Invalid value')
        expect(response.status).to.eql(403)

    })

    it('should respond with status 403 if address field is empty', async function () {
        const response = await request
        .post('/api/organization/create')
        .send({
            'name':'Fundacion Hermanos de Deus',
            'image':'some random url ',
            'phone':'1234556789',
            'email':'fakeemail@mail.com',
            'welcomeText':'Lorem ipsum dolor sit amet consectetur, adipiscing elit scelerisque facilisis convallis, mattis risus euismod potenti.',
            'aboutUsText':'Lorem ipsum dolor sit amet consectetur, adipiscing elit scelerisque facilisis convallis, mattis risus euismod potenti.'
        })
        
        expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Invalid value')
        expect(response.status).to.eql(403)

    })

    it('should respond with status 403 if phone field is empty', async function () {
        const response = await request
        .post('/api/organization/create')
        .send({
            'name':'Fundacion Hermanos de Deus',
            'image':'some random url ',
            'address':'fake address 123',
            'email':'fakeemail@mail.com',
            'welcomeText':'Lorem ipsum dolor sit amet consectetur, adipiscing elit scelerisque facilisis convallis, mattis risus euismod potenti.',
            'aboutUsText':'Lorem ipsum dolor sit amet consectetur, adipiscing elit scelerisque facilisis convallis, mattis risus euismod potenti.'
        })
        
        expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Invalid value')
        expect(response.status).to.eql(403)

    })

    it('should respond with status 403 if phone field contains letters', async function () {
        const response = await request
        .post('/api/organization/create')
        .send({
            'name':'Fundacion Hermanos de Deus',
            'image':'some random url ',
            'address':'fake address 123',
            'phone':'abcdes',
            'email':'fakeemail@mail.com',
            'welcomeText':'Lorem ipsum dolor sit amet consectetur, adipiscing elit scelerisque facilisis convallis, mattis risus euismod potenti.',
            'aboutUsText':'Lorem ipsum dolor sit amet consectetur, adipiscing elit scelerisque facilisis convallis, mattis risus euismod potenti.'
        })
        
        expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Invalid value')
        expect(response.status).to.eql(403)

    })

    it('should respond with status 403 if email field is empty', async function () {
        const response = await request
        .post('/api/organization/create')
        .send({
            'name':'Fundacion Hermanos de Deus',
            'image':'some random url ',
            'address':'fake address 123',
            'phone':'abcdes',
            'welcomeText':'Lorem ipsum dolor sit amet consectetur, adipiscing elit scelerisque facilisis convallis, mattis risus euismod potenti.',
            'aboutUsText':'Lorem ipsum dolor sit amet consectetur, adipiscing elit scelerisque facilisis convallis, mattis risus euismod potenti.'
        })
        
        expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Invalid value')
        expect(response.status).to.eql(403)

    })

    it('should respond with status 403 if email field is not an email', async function () {
        const response = await request
        .post('/api/organization/create')
        .send({
            'name':'Fundacion Hermanos de Deus',
            'image':'some random url ',
            'address':'fake address 123',
            'phone':'abcdes',
            'email':'this is not an email',
            'welcomeText':'Lorem ipsum dolor sit amet consectetur, adipiscing elit scelerisque facilisis convallis, mattis risus euismod potenti.',
            'aboutUsText':'Lorem ipsum dolor sit amet consectetur, adipiscing elit scelerisque facilisis convallis, mattis risus euismod potenti.'
        })
        
        expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Invalid value')
        expect(response.status).to.eql(403)

    })

    it('should respond with status 403 if welcomeText field is empty', async function () {
        const response = await request
        .post('/api/organization/create')
        .send({
            'name':'Fundacion Hermanos de Deus',
            'image':'some random url ',
            'address':'fake address 123',
            'phone':'abcdes',
            'email':'this is not an email',
            'aboutUsText':'Lorem ipsum dolor sit amet consectetur, adipiscing elit scelerisque facilisis convallis, mattis risus euismod potenti.'
        })
        
        expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Invalid value')
        expect(response.status).to.eql(403)

    })

    it('should respond with status 403 if welcomeText field is less than 30 chars', async function () {
        const response = await request
        .post('/api/organization/create')
        .send({
            'name':'Fundacion Hermanos de Deus',
            'image':'some random url ',
            'address':'fake address 123',
            'phone':'abcdes',
            'email':'this is not an email',
            'welcomeText':'Lorem ipsum dolor sit amet consectetur',
            'aboutUsText':'Lorem ipsum dolor sit amet consectetur, adipiscing elit scelerisque facilisis convallis, mattis risus euismod potenti.'
        })
        
        expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Invalid value')
        expect(response.status).to.eql(403)

    })

    it('should respond with status 403 if aboutUsText field is empty', async function () {
        const response = await request
        .post('/api/organization/create')
        .send({
            'name':'Fundacion Hermanos de Deus',
            'image':'some random url ',
            'address':'fake address 123',
            'phone':'abcdes',
            'email':'this is not an email',
            'welcomeText':'Lorem ipsum dolor sit amet consectetur, adipiscing elit scelerisque facilisis convallis, mattis risus euismod potenti.',
            
        })
        
        expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Invalid value')
        expect(response.status).to.eql(403)

    })

    it('should respond with status 403 if aboutUsText field is less than 30 chars long', async function () {
        const response = await request
        .post('/api/organization/create')
        .send({
            'name':'Fundacion Hermanos de Deus',
            'image':'some random url ',
            'address':'fake address 123',
            'phone':'abcdes',
            'email':'this is not an email',
            'welcomeText':'Lorem ipsum dolor sit amet consectetur, adipiscing elit scelerisque facilisis convallis, mattis risus euismod potenti.',
            'aboutUsText':'Lorem ipsum dolor sit amet consectetur'
        })
        
        expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Invalid value')
        expect(response.status).to.eql(403)

    })

     it('should respond with status 201 if the organization was created succesfully', async function () {
        const response = await request
        .post('/api/organization/create')
        .send({
            'name':'Fundacion Hermanos de Deus',
            'image':'some random url ',
            'address':'fake address 123',
            'phone':'123456878',
            'email':'fakeemail@email.com',
            'welcomeText':'Lorem ipsum dolor sit amet consectetur, adipiscing elit scelerisque facilisis convallis, mattis risus euismod potenti.',
            'aboutUsText':'Lorem ipsum dolor sit amet consectetur, adipiscing elit scelerisque facilisis convallis, mattis risus euismod potenti.'
        })
        orgId = response.body.id
        expect(response.body).to.be.an('object').to.have.all.keys('id','name','image','address','phone','email','welcomeText','aboutUsText','createdAt','updatedAt')
        expect(response.status).to.eql(201)

    })

})


describe('GET /api/organization/public/:id', function () {

    it('should respond with status code 404 if there is no organization with the id sent', async function () {
        const response = await request
        .get('/api/organization/public/0')
        expect(response.status).to.eql(404)

    })

       it('should respond with status code 200 & return an object with the organization and his slides', async function () {
        const response = await request
        .get(`/api/organization/public/${orgId}`)
       
        expect( response.body ).to.be.an('object').to.have.all.keys('organization', 'slides')
        expect( response.body.slides ).to.be.an('array')
        expect( response.body.organization ).to.be.an('object').to.have.all.keys('name','image','phone','address','facebookUrl','instagramUrl','linkedinUrl')
        expect(response.status).to.eql(200)

    })

})

describe('GET /api/organizations', function () {

    it('should return with status code 400 if no token is sent in the request', async function () {
        const response = await request
        .get('/api/organization')
       
        expect( response.body ).to.be.an('object').to.have.property('msg').to.be.eql('The request does not have a token')
        expect(response.status).to.eql(400)

    })

    it('should return with status code 401 if user is not admin', async function () {
        const response = await request
        .get('/api/organization')
        .set("Authorization", `Bearer ${regularToken}`)
        expect(response.status).to.eql(401)

    })

 

    it('should respond with status code 200 & return an array with all the existing organizations', async function () {
        const response = await request
        .get('/api/organization')
        .set("Authorization", `Bearer ${adminToken}`)
        expect( response.body ).to.be.an('object').to.have.all.keys('previousPage','currentPage','nextPage','totalPages','total','limit','data')
        expect( response.body.data ).to.be.an('array')
    
        expect(response.status).to.eql(200)

    })

})


describe('PUT /api/organization/public/:id', function () {

    it('should respond with status code 400 if there is no token in the request', async function () {
        const response = await request
        .put(`/api/organization/public/${orgId}`)
        expect( response.status ).to.be.eql(400)
    })

    it('should respond with status code 401 if the token belongs to invalid user', async function () {
        const response = await request
        .put(`/api/organization/public/${orgId}`)
        .set("Authorization", `Bearer ${deletedTknUser}`)
        console.log( response.body )
        expect( response.body ).to.have.property('msg').to.be.eql('User does not exist')
        expect( response.status ).to.be.eql(401)
    })

    it('should respond with status code 401 if the user is not admin', async function () {
        const response = await request
        .put(`/api/organization/public/${orgId}`)
        .set("Authorization", `Bearer ${regularToken}`)
        expect( response.status ).to.be.eql(401)
    })

    it('should respond with status code 404 if there is no organization with the id sent', async function () {
        const response = await request
        .put('/api/organization/public/0')
        .set("Authorization", `Bearer ${adminToken}`)
        expect( response.status ).to.be.eql(404)
    })

    it('should respond with status code 201 if the organization has been updated', async function () {
        const response = await request
        .put(`/api/organization/public/${orgId}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
            'name':'Fundacion hermanos de Dios',
            'address':'Updated address 123'
        })
        expect( response.status ).to.be.eql(201)
    })
})

describe('DELETE /api/organization/:id', function () {

    it('should respond with status code 400 if no token is sent' , async function () {
        const response = await request
        .delete(`/api/organization/${orgId}`)
        expect( response.status ).to.be.eql(400)

    })

    it('should respond with status code 401 if user is not admin' , async function () {
        const response = await request
        .delete(`/api/organization/${orgId}`)
        .set("Authorization", `Bearer ${regularToken}`)
        expect( response.status ).to.be.eql(401)

    })

    it('should respond with status code 404 if the id sent does not match any existing organization ' , async function () {
        const response = await request
        .delete('/api/organization/2131313')
        .set("Authorization", `Bearer ${adminToken}`)
        expect( response.status ).to.be.eql(404)

    })

    it('should respond with status code 200 if the organization has been removed' , async function () {
        const response = await request
        .delete(`/api/organization/${orgId}`)
        .set("Authorization", `Bearer ${adminToken}`)
        expect( response.body ).to.be.an('object').to.have.property('message').to.eql(`id ${orgId} deleted!`)
        expect( response.status ).to.be.eql(200)

    })
})


