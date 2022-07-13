const { request, expect } = require("./config");

describe("POST /api/auth/login", function(){
  it('Existing user ', async function (){
    const response = await request
    .post('api/auth/login')
    .send({
      'email': 'test@test.com',
      'password': '1234',
    });
    expect(response.status).to.eql(200);
    expect(response.body.token).to.exist()
  })
  it('No existing user', async function(){
    const response= await request
    .post('api/auth/login')
    .send({
      'email': 'noExistUser@test.com',
      'password': '1234test',
    });
    expect(response.status).to.eql(401)
    expect(response.msg).to.eql('Unauthorized')
  })
  it("the user's password is incorrect", async function(){
    const response = await request
    .post('api/auth/login')
    .send({
      'email': 'test@test.com',
      'password': '1234',
    });
    expect(response.status).to.eql(401)
    expect(response.msg).to.eql('Unauthorized')
  })
})
describe("GET user information", function(){
  it('FindMe', async function(){
    const response = await request
    .get("GET /api/auth/me");
  expect(response.status).to.eql(200)
  })
})
describe("Register user", function(){
it('register non-existing user in the database', async function(){
  const response = await request
  .post('api/auth/login')
  .send({
    'email': 'createTestUser@test.com',
    'password': '1234',
    'firstName': 'userTest',
    'lastName': 'test',
    'password': '123456'
  });
  expect(response.status).to.eql(200)
  expect(response.newUser).to.exist()
  expect(response.token).to.exist()
})
it('invalid email', async function(){
  const response = await request
  .post('api/auth/login')
  .send({
    'email': 'createTestUser',
    'password': '1234',
    'firstName': 'userTest',
})
expect(response.status).to.eql(422)
})
})