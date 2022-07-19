const express = require('express');
const router = express.Router();

const { validateRoles } = require('../validators');
const { authenticatedUser,verifyIsAdmin,idExists } = require('../middlewares');

const { getAllRoles,
        getRoleById,
        createRole,
        updateRole,
        deleteRole } = require('../controllers/role.controller');

router.use(authenticatedUser , verifyIsAdmin)

router.get('/', getAllRoles);

router.get('/:id', idExists, getRoleById);

router.post('/', validateRoles , createRole);

router.put('/:id', idExists, validateRoles , updateRole);

router.delete('/:id', idExists, deleteRole);


module.exports = router;