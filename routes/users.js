var express = require('express');
var router = express.Router();
const userController = require('../controllers/users.controllers');
const { authenticatedUser } = require('../middlewares/authenticatedUser');
const { validateRegister } = require('../validators/validatorRegister')

/* GET users listing. */
router.get('/', authenticatedUser, userController.getAllUsers )
//create user
router.post('/auth/register',validateRegister, userController.createUser)
//update user
router.put('/update/:id', userController.updateUser)
//delete user
router.delete('/auth/delete/:id',userController.deleteUser)

module.exports = router;
