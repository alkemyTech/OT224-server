const organization = require("../controllers/OrganizationController");

var express = require('express');
var router = express.Router();
/* POST create organization. */
router.post('/create', organization.createOrganization);

router.get('/public', organization.getOrganization);

module.exports = router;
