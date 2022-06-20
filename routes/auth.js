const express = require("express");
const router = express();
const { validateCreate } = require("../validators/authValidator");
const authControllers = require("../controllers/authControllers");

router.post("/login", validateCreate, authControllers.login);

module.exports = router;
