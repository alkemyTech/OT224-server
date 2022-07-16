const { request, expect } = require("./config");


describe("POST api/auth/login",  function () {
  it("successful login", async function () {
    const response = await request
    .post("/api/auth/login")
    .send({
      'email': 'admin@test.com',
      'password': '1234test',
    });
    console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',response.body)
    expect(response.status).to.equal(200);
  });
});