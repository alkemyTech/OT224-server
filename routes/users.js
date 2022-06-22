var express = require('express');
var router = express.Router();
const userController = require('../controllers/users.controllers');
const { authenticatedUser } = require('../middlewares/authenticatedUser');
const { validateRegister } = require('../validators/validatorRegister')
// eliminar para abajo
const varifyIsAdmin = require('../middlewares/user.middelware')
router.get('/', userController.getAllUsers)
// eliminar para arriba
/* GET users listing. */
// router.get('/', authenticatedUser, userController.getAllUsers ) -> esto estaba inicialmente
// create user
router.post('/auth/register',validateRegister, userController.createUser)
//update user
router.put('/update/:id', userController.updateUser)
//delete user
router.delete('/delete/:id',userController.deleteUser)

module.exports = router;
