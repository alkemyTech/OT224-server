const { request, expect } = require("./config");

let memberAdminToken = "";
let memberRegulartoken = "";
before( async function() {
    const responseMemberAdmin = await request
    .post("/api/auth/login")
    .send({
        "email":"connorJhon@gmail.com",
        "password":"MemberAdmin2022"
    });
    memberAdminToken = responseMemberAdmin.body.token;
    //regular member

    const responseMemberRegular = await request
    .post("/api/auth/login")
    .send({
        "email":"Javonte_Rolfson45@hotmail.com",
        "password":"userStandar2022"
    });
    memberRegulartoken = responseMemberRegular.body.token;
});
//get all members

describe("GET /api/members", function () {
    it("returns all members should fail without credentials", async function () {
        const response = await request
        .get("/api/members");
    
        expect(response.status).to.eql(400);
      });
    
      it("returns all members should fail with regular credentials", async function () {
        const response = await request
        .get("/api/members")
        .set("Authorization", `Bearer ${memberRegulartoken}`);
    
        expect(response.status).to.eql(401);
      });
      it("returns all members should succeed with admin credentials", async function () {
        const response = await request
        .get("/api/members")
        .set("Authorization", `Bearer ${memberAdminToken}`);
    
        expect(response.status).to.eql(200);
      });
})
//get member by id

describe("GET /api/members/", function () {
    it("returns all members should fail without credentials", async function () {
        const response = await request
        .get("/api/members/1");
    
        expect(response.status).to.eql(400);
      });
    
      it("returns all members should fail with regular credentials", async function () {
        const response = await request
        .get("/api/members/1")
        .set("Authorization", `Bearer ${memberRegulartoken}`);
    
        expect(response.status).to.eql(401);
      });

      it("return a member should fail with the admin credential and can't find the member id", async function () {
        const response = await request
        .get("/api/members/65")
        .set("Authorization", `Bearer ${memberAdminToken}`);
    
        expect(response.status).to.eql(404);
      });

      it("returns all members should succeed with admin credentials", async function () {
        const response = await request
        .get("/api/members")
        .set("Authorization", `Bearer ${memberAdminToken}`);
    
        expect(response.status).to.eql(200);
      });
      //Create member

      describe("POST api/members", function() {
        it("returns insert members should fail without credentials", async function () {
            const response = await request
            .post("/api/members")
            .send({
                name: "Member3",
                facebookUrl: "http://www.facebook.com/member_3",
                instagramUrl: "http://www.isntagram.com/member_3",
                linkedinUrl: "http://www.linkdln.com/member_3",
                image: "https://via.placeholder.com/600/92c952",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            })
        
            expect(response.status).to.eql(400);
          });
        
          it("returns insert a member should fail with regular credentials", async function () {
            const response = await request
            .post("/api/members")
            .set("Authorization", `Bearer ${memberRegulartoken}`)
            .send({
                name: "Member3",
                facebookUrl: "http://www.facebook.com/member_3",
                instagramUrl: "http://www.isntagram.com/member_3",
                linkedinUrl: "http://www.linkdln.com/member_3",
                image: "https://via.placeholder.com/600/92c952",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            });
        
            expect(response.status).to.eql(401);
          });

          it("returns insert a member should fail with admin credentials and thr field name is empty", async function () {
            const response = await request
            .post("/api/members")
            .set("Authorization", `Bearer ${memberAdminToken}`)
            .send({
                name: "Member3",
                facebookUrl: "http://www.facebook.com/member_3",
                instagramUrl: "http://www.isntagram.com/member_3",
                linkedinUrl: "http://www.linkdln.com/member_3",
                image: "https://via.placeholder.com/600/92c952",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            });
        
            expect(response.status).to.eql(200);
          });

          it("returns insert a member should succeed with admin credentials", async function () {
            const response = await request
            .post("/api/members")
            .set("Authorization", `Bearer ${memberAdminToken}`)
            .send({
                name: "Member3",
                facebookUrl: "http://www.facebook.com/member_3",
                instagramUrl: "http://www.isntagram.com/member_3",
                linkedinUrl: "http://www.linkdln.com/member_3",
                image: "https://via.placeholder.com/600/92c952",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            });
        
            expect(response.status).to.eql(200);
          });
      })
      //Update member

      describe("UPDATE /api/members/1", function () {
        it("returns update members should fail without credentials", async function () {
            const response = await request
            .put("/api/members/1")
            .send({
                name: "Member3",
                facebookUrl: "http://www.facebook.com/member_3",
                instagramUrl: "http://www.isntagram.com/member_3",
                linkedinUrl: "http://www.linkdln.com/member_3",
                image: "https://via.placeholder.com/600/92c952",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            })
        
            expect(response.status).to.eql(400);
          });
        
          it("returns update a member should fail with regular credentials", async function () {
            const response = await request
            .put("/api/members/1")
            .set("Authorization", `Bearer ${memberRegulartoken}`)
            .send({
                name: "Member3",
                facebookUrl: "http://www.facebook.com/member_3",
                instagramUrl: "http://www.isntagram.com/member_3",
                linkedinUrl: "http://www.linkdln.com/member_3",
                image: "https://via.placeholder.com/600/92c952",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            });
        
            expect(response.status).to.eql(401);
          });

          it("returns update a member should fail with admin credentials and the field name is empty", async function () {
            const response = await request
            .put("/api/members/1")
            .set("Authorization", `Bearer ${memberAdminToken}`)
            .send({
                name: "",
                facebookUrl: "http://www.facebook.com/member_3",
                instagramUrl: "http://www.isntagram.com/member_3",
                linkedinUrl: "http://www.linkdln.com/member_3",
                image: "https://via.placeholder.com/600/92c952",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            });
        
            expect(response.status).to.eql(400);
          });

          it("returns update a member should fail with admin credentials and can't find the member id", async function () {
            const response = await request
            .put("/api/members/65")
            .set("Authorization", `Bearer ${memberAdminToken}`)
            .send({
                name: "Member3",
                facebookUrl: "http://www.facebook.com/member_3",
                instagramUrl: "http://www.isntagram.com/member_3",
                linkedinUrl: "http://www.linkdln.com/member_3",
                image: "https://via.placeholder.com/600/92c952",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            });
        
            expect(response.status).to.eql(404);
          });

          it("returns update a member should succeed with admin credentials", async function () {
            const response = await request
            .post("/api/members")
            .set("Authorization", `Bearer ${memberAdminToken}`)
            .send({
                name: "Member3",
                facebookUrl: "http://www.facebook.com/member_3",
                instagramUrl: "http://www.isntagram.com/member_3",
                linkedinUrl: "http://www.linkdln.com/member_3",
                image: "https://via.placeholder.com/600/92c952",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            });
        
            expect(response.status).to.eql(200);
          });
      })
})
