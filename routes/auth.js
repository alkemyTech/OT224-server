const express = require("express");
const router = express();
const { validateCreate } = require("../validators/authValidator");
const authControllers = require("../controllers/authControllers");
const userController = require("../controllers/users.controllers");
const { authenticatedUser } = require("../middlewares/authenticatedUser");
const { validateRegister } = require('../validators/validatorRegister')


router.post("/login", validateCreate, authControllers.login);

//create user
router.post('/register', validateRegister, userController.createUser)

// get auth user
router.get("/me", authenticatedUser, userController.findMe);

module.exports = router;
