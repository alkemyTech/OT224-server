const express = require("express");
const router = express();
const { validateCreate, validateRegister } = require("../validators");
const { login } = require("../controllers/authControllers");
const { findMe, createUser} = require("../controllers/users.controllers");
const { authenticatedUser } = require("../middlewares/authenticatedUser");



router.post("/login", validateCreate, login);

router.post("/register", validateRegister, createUser);

router.get("/me", authenticatedUser, findMe);

module.exports = router;
