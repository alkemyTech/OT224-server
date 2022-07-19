const { validateOrganization } = require("../validators");
const {
    createOrganization,
    getOrganizations,
    getOrganizationById,
    updateOrganization,
    deleteOrganization
} = require("../controllers/organization.controller");
const { authenticatedUser, verifyIsAdmin, idExists } = require("../middlewares");


const express = require('express');
const router = express.Router();


router.post('/create', validateOrganization, createOrganization);
router.get('/public/:id', idExists ,getOrganizationById);

router.use( verifyIsAdmin )

router.get('/', getOrganizations)
router.put('/public/:id', authenticatedUser, idExists ,updateOrganization);
router.delete('/:id', idExists ,deleteOrganization)

module.exports = router;
