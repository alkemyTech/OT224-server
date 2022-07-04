var express = require('express');
var router = express.Router();
const userController = require('../controllers/users.controllers');
const { authenticatedUser } = require('../middlewares/authenticatedUser');
const { validateRegister } = require('../validators/validatorRegister');
const { verifyIsAdmin } = require('../middlewares/user.middelware');



/* GET users listing. */
router.get('/', authenticatedUser, verifyIsAdmin, userController.getAllUsers )
//update user
router.put('/update/:id', authenticatedUser, verifyIsAdmin, userController.updateUser)
//delete user
router.delete('/:id', authenticatedUser, verifyIsAdmin, userController.deleteUser)

module.exports = router;
