const { request, expect } = require("./config");


describe('TEST USERS', function(){

    let adminToken = "";
    let regularToken = "";
    before(async function () {
      const responseAdmin = await request.post("/api/auth/login").send({
        email: "admin@test.com",
        password: "1234test",
      });
      adminToken = responseAdmin.body.token;
  
      const responseRegular = await request.post("/api/auth/login").send({
        email: "regular@test.com",
        password: "1234test",
      });
      regularToken = responseRegular.body.token;
    });

describe("GET /api/users", function () {
  
  it("returns all user should fail without credentials", async function () {
    const response = await request.get("/api/users");
    expect(response.text).to.eq('{"msg":"The request does not have a token"}');
    expect(response.status).to.eql(400);
  });

  it("returns all user should fail with regular credentials", async function () {
    const response = await request
      .get("/api/users")
      .set("Authorization", `Bearer ${regularToken}`);
    expect(response.text).to.eq("you do not have the necessary permissions");
    expect(response.status).to.eql(401);
  });

  it("returns all user should succeed with admin credentials and return users", async function () {
    const response = await request
      .get("/api/users")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(response.body).to.have.lengthOf.greaterThan(0);
  });
});

describe("DELETE /api/user/:id", function () {
  
  it("Successfully delete a user if the requester is an admin", async function () {
    const response = await request
      .delete("/api/users/20")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(response.status).to.eq(200);
  });
  it("with non-admin credentials you can't delete a user", async function () {
    const response = await request
      .delete("/api/users/25")
      .set("Authorization", `Bearer ${regularToken}`);

    expect(response.status).to.eq(401);
    expect(response.text).to.eq("you do not have the necessary permissions");
  });
});

describe("GET /api/users/:id", function () {
 
  it("returns all user should fail without credentials", async function () {
    const response = await request.get("/api/users");
    expect(response.text).to.eq('{"msg":"The request does not have a token"}');
    expect(response.status).to.eql(400);
  });

  it("returns all user should fail with regular credentials", async function () {
    const response = await request
      .get("/api/users")
      .set("Authorization", `Bearer ${regularToken}`);
    expect(response.text).to.eq("you do not have the necessary permissions");
    expect(response.status).to.eql(401);
  });

  it("returns all user should succeed with admin credentials and return users", async function () {
    const response = await request
      .get("/api/users")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(response.body).to.have.lengthOf.greaterThan(0);
  });
});

describe("DELETE /api/user/:id", function () {
  

  it("returns the user with success if the request is made with administrator credentials", async function () {
    const response = await request
      .get("/api/users/2")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(response.status).to.eq(200);
    expect(response.body.id).to.exist;
  });
  it("fails if the one making the request is not an administrator", async function () {
    const response = await request
      .get("/api/users/20")
      .set("Authorization", `Bearer ${regularToken}`);
    expect(response.status).to.eq(401);
    expect(response.text).to.eq("you do not have the necessary permissions");
  });
  it("fails if no token exists", async function () {
    const response = await request.get("/api/users/20");
    expect(response.status).to.eq(400);
    expect(response.text).to.eq('{"msg":"The request does not have a token"}');
  });

})


  describe("PUT /api/users/update/:id", function () {
  
    xit("update a user with admin credentials", async function ( done) {
   const response = await request
        .put("/api/users/update/19")
        .send({
          firstName: "anda",
          lastName: "anda",
        })
        .set("Authorization", `Bearer ${adminToken}`)
        
        console.log(response)
    });
    it('fails if the one making the request is not an administrator', async function(){
        const response = await request
        .put("/api/users/update/19")
        .send({
          firstName: "anda",
          lastName: "anda",
        })
        .set("Authorization", `Bearer ${regularToken}`)
        expect(response.status).to.eq(401)
        expect(response.text).to.eq('you do not have the necessary permissions')
    })
    it('fails if no token exists', async function(){
        const response= await request
        .put("/api/users/update/19")
        .send({
          firstName: "anda",
          lastName: "anda",
        })
        expect(response.status).to.eq(400)
        expect(response.text).to.eq('{"msg":"The request does not have a token"}')
    })
  });


})

