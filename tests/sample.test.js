const { request, expect } = require("./config");

describe("GET /api/users", function () {
  let adminToken = '';
  let regularToken = '';
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
  it("returns all user should fail without credentials", async function () {
    const response = await request
    .get("/api/users");

    expect(response.status).to.eql(400);
  });

  it("returns all user should fail with regular credentials", async function () {
    const response = await request
    .get("/api/users")
    .set("Authorization", `Bearer ${regularToken}`);

    expect(response.status).to.eql(401);
  });
  it("returns all user should succeed with admin credentials", async function () {
    const response = await request
    .get("/api/users")
    .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).to.eql(200);
  });

  it("returns all user should succeed with admin credentials and return users", async function () {
    const response = await request
    .get("/api/users")
    .set("Authorization", `Bearer ${adminToken}`);

    expect(response.body).to.have.lengthOf.greaterThan(0);
  });
});