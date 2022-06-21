const { validateOrganization } = require("../validators/organizationValidator");
const organization = require("../controllers/organization.controller");
const { authenticatedUser } = require("../middlewares/authenticatedUser");
const { verifyIsAdmin } = require("../middlewares/user.middelware")

const express = require('express');
const router = express.Router();
/* POST create organization. */
router.post('/create', validateOrganization, organization.createOrganization);

router.get('/public', organization.getOrganization);
router.put('/public/:id', authenticatedUser, verifyIsAdmin, organization.updateOrganization);
module.exports = router;