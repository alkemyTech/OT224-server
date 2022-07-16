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
    /* expect(response.body.newUser).to.have.nested.property("newUser").*/
  });
  it("Username does not exist", async function () {
    const response = await request.post("/api/auth/register").send({
      firstName: "nameTets",
      lastName: "lastNameTest",
      email: "emailTests@test.com",
      password: "123test",
      roleId: 1,
      photo: "photoTets.jpg",
    });
    expect(response.status).to.eq(422);
  });
});
