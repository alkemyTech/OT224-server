const { response } = require("../routes/auth");
const { request, expect } = require("./config");

describe("POST api/auth/login", function () {
  it("successful login", async function () {
    const response = await request.post("/api/auth/login").send({
      email: "admin@test.com",
      password: "1234test",
    });
    expect(response.status).to.equal(200);
  });
  it("User does not exist", async function () {
    const response = await request.post("/api/auth/login").send({
      email: "notExist@test.com",
      password: "1234test",
    });
    expect(response.body)
      .to.have.nested.property("msg")
      .to.be.equal("Unauthorized");
    expect(response.status).to.eql(401);
  });
  it("Incorrect password", async function () {
    const response = await request.post("/api/auth/login").send({
      email: "admin@test.com",
      password: "1234",
    });
    expect(response.status).to.equal(401);
    expect(response.body)
      .to.have.nested.property("msg")
      .to.be.equal("Unauthorized");
  });
});

describe("POST api/auth/register", function () {
 it("successful register", async function () {
    const response = await request.post("/api/auth/register").send({
      firstName: "nameTets",
      lastName: "lastNameTest",
      email: "emailTests@test.com",
      password: "123test",
      roleId: 1,
      photo: "photoTets.jpg",
    });
    expect(response.status).to.eq(200);
  });
  it("the user is already registered", async function () {
    const response = await request.post("/api/auth/register").send({
      firstName: "nameTets",
      lastName: "lastNameTest",
      email: "emailTests@test.com",
      password: "123test",
      roleId: 1,
      photo: "photoTets.jpg",
    });
    expect(response.body.errors[0].msg).to.be.eq('Email already registered')
    expect(response.status).to.eq(422)
  });
  it("Invalid email", async function () {
    const response = await request.post("/api/auth/register").send({
      firstName: "nameTets",
      lastName: "lastNameTest",
      email: "emailTests",
      password: "123test",
      roleId: 1,
      photo: "photoTets.jpg",
    });
    expect(response.body.errors[0].msg).to.be.eq('Please enter a valid email')
  });
});
describe('GET api/auth/me', function(){
  let userToken;
  let invalidToken= 'asfasfasfasfdfdfaF'
  beforeEach(async function(){
   const response = await request
    .post("/api/auth/login")
    .send({
      'email': 'regular@test.com',
      'password': '1234test',
    });
    userToken= response.body.token;
  })
it('Returns the user information correctly', async function(){
  const rta =  await request
  .get('/api/auth/me')
  .set("Authorization", `Bearer ${userToken}`);
  expect(rta.body.id).to.exist;
  expect(rta.status).to.eq(200)
})
it('does not return a user when the token is invalid', async function(){
  const rta =  await request
  .get('/api/auth/me')
  .set("Authorization", `Bearer ${invalidToken}`);
  expect(rta.status).to.eql(500)
  expect(rta.body.msg).to.eq('Something went wrong call the admin')
})
})