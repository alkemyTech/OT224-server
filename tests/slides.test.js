const { request, expect } = require("./config");
const fs = require('fs')
const path = require('path')


let adminToken = '';
let regularToken = '';
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


describe("GET /api/slides", function () {

  it('should fail if no token is sent', async function () {
    const response = await request
      .get('/api/slides')

    expect(response.status).to.eql(400);
  });

  it('should fail if user is not admin', async function () {
    const response = await request
      .get('/api/slides')
      .set("Authorization", `Bearer ${regularToken}`)
    expect(response.status).to.eql(401);
  })

  it('returns an array with all slides if user is admin', async function () {
    const response = await request
      .get('/api/slides')
      .set("Authorization", `Bearer ${adminToken}`)
    expect(response.body).to.have.property('slides').to.be.an('array')
    expect(response.status).to.eql(200);
  })

});


describe('GET /api/slides/:id', function () {

  it('should fail if no token is sent', async function () {
    const response = await request
      .get('/api/slides/1')

    expect(response.status).to.eql(400);
  });

  it('should fail if user is not admin', async function () {
    const response = await request
      .get('/api/slides/1')
      .set("Authorization", `Bearer ${regularToken}`)
    expect(response.status).to.eql(401);
  })


  it('should respond with status 404 if invalid id is sent ', async function () {
    const response = await request
      .get('/api/slides/12324')
      .set("Authorization", `Bearer ${adminToken}`)

    expect(response.status).to.eql(404);
  })

  it('should respond with status 200 and return the correct slide ', async function () {
    const response = await request
      .get('/api/slides/1')
      .set("Authorization", `Bearer ${adminToken}`)
    expect(response.body).to.have.property('slide').to.be.an('object')
    expect(response.status).to.eql(200);
  })

})

describe('POST /api/slides', function () {

  it('should fail if no token is sent', async function () {
    const response = await request
      .post('/api/slides')

    expect(response.status).to.eql(400);
  });

  it('should fail if user is not admin', async function () {
    const response = await request
      .post('/api/slides')
      .set("Authorization", `Bearer ${regularToken}`)
    expect(response.status).to.eql(401);
  })

  /*   it('should respond with status 403 if text field content is missing in the request body' , async function () {
    const response = await request
    .post('/api/slides')
    .send({
      organizationId: 1
    })
    .set("Authorization", `Bearer ${adminToken}`) 
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Slide text cannot be empty');
    //expect(response.status).to.eql(403);
  }) 

    it('should respond with status 403 if organizationId field content is incorrect' , async function () {
    const response = await request
    .post('/api/slides')
    .send({
      text: "Some random text for a slide"
    })
    .set("Authorization", `Bearer ${adminToken}`) 
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Invalid organization id');
    //expect(response.status).to.eql(403);
  }) */

  it('should respond with status 400 if no files are being sent', async function () {
    const response = await request
      .post('/api/slides')
      .send({
        text: "Some random text for a slide",
        organizationId: 1
      })
      .set("Authorization", `Bearer ${adminToken}`)
    expect(response.body.msg).to.equal('no files were uploaded')
    expect(response.status).to.eql(400);
  })

  it('should respond with status 400 when the body is empty', async function () {

    const response = await request
      .post('/api/slides')
      .set("Authorization", `Bearer ${adminToken}`)
    expect(response.body.msg).to.equal('no files were uploaded')
    expect(response.status).to.eql(400);
  })

  it('should respond with status 200 if the slide was created', async function () {

    const response = await request
      .post('/api/slides')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set("Authorization", `Bearer ${adminToken}`)
      .field('text', 'Slide 5')
      .field('organizationId', 2)
      .attach('img', fs.readFileSync(path.join(__dirname, '../dmlsbGFmaW9yaXRv.png')), 'dmlsbGFmaW9yaXRv.png')
    expect(response.body).to.have.property('slide').to.be.an('object')
    expect(response.status).to.eql(200);
  }) 



})

describe('DELETE /api/slides/:id', function () {

  it('should fail if no token is sent', async function () {
    const response = await request
      .delete('/api/slides/1')

    expect(response.status).to.eql(400);
  });

  it('should fail if user is not admin', async function () {
    const response = await request
      .delete('/api/slides/1')
      .set("Authorization", `Bearer ${regularToken}`)
    expect(response.status).to.eql(401);
  })

  it('should return status 404 when the slide does not exist ', async function () {
    const response = await request
      .delete('/api/slides/12313')
      .set("Authorization", `Bearer ${adminToken}`)
    expect(response.body).to.have.property('msg').to.eql('Invalid slide ID')
    expect(response.status).to.eql(404);
  })

  it('should return status 200 when the slide has been succesfully removed ', async function () {
    const response = await request
      .delete('/api/slides/1')
      .set("Authorization", `Bearer ${adminToken}`)
    expect(response.body).to.have.property('msg').to.eql('Slide has been removed succesfully')
    expect(response.status).to.eql(200);
  })


})

describe('PUT /api/slides/:id', function () {


   it('should fail if no token is sent', async function () {
    const response = await request
      .put('/api/slides/1')

    expect(response.status).to.eql(400);
  });

  it('should fail if user is not admin', async function () {
    const response = await request
      .put('/api/slides/1')
      .set("Authorization", `Bearer ${regularToken}`)
    expect(response.status).to.eql(401);
  })
 
  /* it('should return status 400 when the slide does not exist ', async function () {
    const response = await request
    .put('/api/slides/12313')
    .set("Authorization", `Bearer ${adminToken}`)
    expect(response.body).to.have.property('msg').to.eql('Invalid slide id')
    expect(response.status).to.eql(400);
  }) */

  it('should return status 200 if the slide was succesfully updated', async function () {
    const response = await request
    .put('/api/slides/2')
    .set("Authorization", `Bearer ${adminToken}`)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .field('text','New text')
    .field('organizationId', 1)
    .field('order', 3)
    .attach('img', fs.readFileSync(path.join(__dirname, '../aW1hZ2VuMg==.png')), 'aW1hZ2VuMg==.png')
    expect(response.body).to.have.property('msg').to.eql('The slide was succesfully updated')
    expect(response.status).to.eql(200)
  })

})