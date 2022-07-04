const expect = require("chai").expect;
const createServer = require("../server")
const app = createServer();
const request = require("supertest")(app);

module.exports = {
  request,
  expect, 
};