const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/role.controller');
const { validateRoles } = require('../validators/rolesValidator');
const { authenticatedUser } = require('../middlewares/authenticatedUser');
const { verifyIsAdmin } = require('../middlewares/user.middelware');


//Get all Roles
router.get('/', authenticatedUser , verifyIsAdmin , rolesController.getAllRoles);

//Detail Roles
router.get('/:id', authenticatedUser , verifyIsAdmin , rolesController.getRoleById);

//Create Roles
router.post('/', authenticatedUser , verifyIsAdmin , validateRoles ,rolesController.createRole);

//Update Roles
router.put('/:id', authenticatedUser , verifyIsAdmin , validateRoles ,rolesController.updateRole);

// Delete Roles
router.delete('/:id', authenticatedUser , verifyIsAdmin , rolesController.deleteRole);


module.exports = router;