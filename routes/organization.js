const organization = require("../controllers/OrganizationController");

var express = require('express');
var router = express.Router();
/* GET home page. */
router.post('/create', organization.create);


module.exports = router;