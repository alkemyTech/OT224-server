var express = require('express');
var router = express.Router();
const userController = require('../controllers/users.controllers');
const { authenticatedUser } = require('../middlewares/authenticatedUser');


/* GET users listing. */
router.get('/', authenticatedUser, userController.getAllUsers )
// create user
router.post('/create', userController.createUser)
//update user
router.put('/update/:id', userController.updateUser)
//delete user
router.delete('/delete/:id',userController.deleteUser)

module.exports = router;

