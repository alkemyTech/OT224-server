const express = require("express");
const router = express();
const { validateCreate } = require("../validators/authValidator");
const authControllers = require("../controllers/authControllers");
const userController = require("../controllers/users.controllers");
const { authenticatedUser } = require("../middlewares/authenticatedUser");

router.post("/login", validateCreate, authControllers.login);

// get auth user
router.get("/me", authenticatedUser, userController.findMe);

module.exports = router;
