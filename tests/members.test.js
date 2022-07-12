const { request, expect } = require("./config");

let memberAdminToken = "";
let memberRegulartoken = "";

let testMemberId = 0;
const NOT_EXISTING_ID = 0;



before(async function () {
  const responseMemberAdmin = await request.post("/api/auth/login").send({
    email: "admin@test.com",
    password: "1234test",
  });
  memberAdminToken = responseMemberAdmin.body.token;
  //regular member

  const responseMemberRegular = await request.post("/api/auth/login").send({
    email: "regular@test.com",
    password: "1234test",
  });
  memberRegulartoken = responseMemberRegular.body.token;
});

//Create member
describe("POST api/members", function () {
  it("return insert a member should fail without credential", async function () {
    const response = await request.post("/api/members").send({
      name: "NewMember",
      facebookUrl: "http://www.facebook.com/NewMember",
      instagramUrl: "http://www.isntagram.com/NewMember",
      linkedinUrl: "http://www.linkdln.com/NewMember",
      image: "https://via.placeholder.com/600/92c952",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    });
    
    expect(response.status).to.eql(400);
    
  });

  it("return insert a member should fail with regular credentials", async function () {
    const response = await request
      .post("/api/members")
      .set("Authorization", `Bearer ${memberRegulartoken}`)
      .send({
        name: "NewMember",
        facebookUrl: "http://www.facebook.com/NewMember",
        instagramUrl: "http://www.isntagram.com/NewMember",
        linkedinUrl: "http://www.linkdln.com/NewMember",
        image: "https://via.placeholder.com/600/92c952",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      });

    expect(response.status).to.eql(401);
  });

  it("return insert a member should fail with admin credentials and the field name is empty", async function () {
    const response = await request
      .post("/api/members")
      .set("Authorization", `Bearer ${memberAdminToken}`)
      .send({
        name: "",
        facebookUrl: "http://www.facebook.com/NewMember",
        instagramUrl: "http://www.isntagram.com/NewMember",
        linkedinUrl: "http://www.linkdln.com/NewMember",
        image: "https://via.placeholder.com/600/92c952",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      });

    expect(response.body.error)
      .to.have.nested.property("[0].msg")
      .to.be.equal("should not be empty");
  });

  it("return insert a member should succeed with admin credentials", async function () {
    const response = await request
      .post("/api/members")
      .set("Authorization", `Bearer ${memberAdminToken}`)
      .send({
        name: "NewMember",
        facebookUrl: "http://www.facebook.com/NewMember",
        instagramUrl: "http://www.isntagram.com/NewMember",
        linkedinUrl: "http://www.linkdln.com/NewMember",
        image: "https://via.placeholder.com/600/92c952",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      });
      
    testMemberId = response.body.member.id  

    expect(response.status).to.eql(200);
  });
});

//get all members
describe("GET /api/members", function () {
  it("return all members should fail without credentials", async function () {
    const response = await request.get("/api/members");

    expect(response.status).to.eql(400);
  });

  it("return all members should fail with regular credentials", async function () {
    const response = await request
      .get("/api/members")
      .set("Authorization", `Bearer ${memberRegulartoken}`);

    expect(response.status).to.eql(401);
  });

  it("return all members should succeed with admin credentials", async function () {
    const response = await request
      .get("/api/members")
      .set("Authorization", `Bearer ${memberAdminToken}`);

    expect(response.status).to.eql(200);
  });
});

//get member by id
describe("GET /api/members/:id", function () {
  it("return a member should fail without credentials", async function () {
    const response = await request
    .get(`/api/members/${testMemberId}`);
    expect(response.status).to.eql(400);
  });

  it("return a member should fail with regular credentials", async function () {
    const response = await request
      .get(`/api/members/${testMemberId}`)
      .set("Authorization", `Bearer ${memberRegulartoken}`);

    expect(response.status).to.eql(401);
  });

  it("return a member should fail with the admin credential and can't find the member id", async function () {
    const response = await request
      .get(`/api/members/${NOT_EXISTING_ID}`)
      .set("Authorization", `Bearer ${memberAdminToken}`);

    expect(response.status).to.eql(404);
  });

  it("return a member should succeed with admin credential", async function () {
    const response = await request
      .get(`/api/members/${testMemberId}`)
      .set("Authorization", `Bearer ${memberAdminToken}`);

    expect(response.status).to.eql(200);
  });
});

//Update member
describe("UPDATE /api/members/:id", function () {
  it("return update members should fail without credentials", async function () {
    const response = await request
    .put(`/api/members/${testMemberId}`)
    .send({
      name: "MemberUpdated",
      facebookUrl: "http://www.facebook.com/memberUpdated",
      instagramUrl: "http://www.isntagram.com/memberUpdated",
      linkedinUrl: "http://www.linkdln.com/memberUpdated",
      image: "https://via.placeholder.com/600/92c952",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    });

    expect(response.status).to.eql(400);
  });

  it("return update a member should fail with regular credentials", async function () {
    const response = await request
      .put(`/api/members/${testMemberId}`)
      .set("Authorization", `Bearer ${memberRegulartoken}`)
      .send({
        name: "MemberUpdated",
        facebookUrl: "http://www.facebook.com/memberUpdated",
        instagramUrl: "http://www.isntagram.com/memberUpdated",
        linkedinUrl: "http://www.linkdln.com/memberUpdated",
        image: "https://via.placeholder.com/600/92c952",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      });

    expect(response.status).to.eql(401);
  });

  it("return update a member should fail with admin credentials and the field name is empty", async function () {
    const response = await request
      .put(`/api/members/${testMemberId}`)
      .set("Authorization", `Bearer ${memberAdminToken}`)
      .send({
        name: "",
        facebookUrl: "http://www.facebook.com/memberUpdated",
        instagramUrl: "http://www.isntagram.com/memberUpdated",
        linkedinUrl: "http://www.linkdln.com/memberUpdated",
        image: "https://via.placeholder.com/600/92c952",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      });

    expect(response.body.error)
      .to.have.nested.property("[0].msg")
      .to.be.equal("should not be empty");
  });

  it("return update a member should fail with admin credentials and can't find the member id", async function () {
    const response = await request
      .put(`/api/members/${NOT_EXISTING_ID}`)
      .set("Authorization", `Bearer ${memberAdminToken}`)
      .send({
        name: "MemberUpdated",
        facebookUrl: "http://www.facebook.com/memberUpdated",
        instagramUrl: "http://www.isntagram.com/memberUpdated",
        linkedinUrl: "http://www.linkdln.com/memberUpdated",
        image: "https://via.placeholder.com/600/92c952",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      });

    expect(response.status).to.eql(404);
  });

  it("return update a member should succeed with admin credentials", async function () {
    const response = await request
      .put(`/api/members/${testMemberId}`)
      .set("Authorization", `Bearer ${memberAdminToken}`)
      .send({
        name: "MemberUpdated",
        facebookUrl: "http://www.facebook.com/memberUpdated",
        instagramUrl: "http://www.isntagram.com/memberUpdated",
        linkedinUrl: "http://www.linkdln.com/memberUpdated",
        image: "https://via.placeholder.com/600/92c952",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      });

    expect(response.status).to.eql(200);
  });
});

//Delete member
describe("DELETE api/members/:id", function () {
  it("return delete a member should fail without credentials", async function () {
    const response = await request
    .del(`/api/members/${testMemberId}`);

    expect(response.status).to.eql(400);
  });

  it("return delete a member should fail with regular credentials", async function () {
    const response = await request
      .del(`/api/members/${testMemberId}`)
      .set("Authorization", `Bearer ${memberRegulartoken}`);

    expect(response.status).to.eql(401);
  });

  it("return delete a member should fail with admin credentials and can't find the member id", async function () {
    const response = await request
      .del(`/api/members/${NOT_EXISTING_ID}`)
      .set("Authorization", `Bearer ${memberAdminToken}`);

    expect(response.status).to.eql(404);
  });

  it("return delete a member should succeed with admin credentials", async function () {
    const response = await request
      .del(`/api/members/${testMemberId}`)
      .set("Authorization", `Bearer ${memberAdminToken}`);

    expect(response.status).to.eql(200);
  });
});
