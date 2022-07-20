var express = require('express');
var router = express.Router();


const {getAllUsers, updateUser, getUserId, deleteUser}= require('../controllers/users.controllers');
const { authenticatedUser, verifyIsAdmin } = require('../middlewares');

router.use(verifyIsAdmin)


/* GET users listing. */
router.get('/', authenticatedUser, getAllUsers )
/* GET user by ID */
router.get('/:id', getUserId)
//update user
router.put('/update/:id', authenticatedUser, updateUser)
//delete user
router.delete('/:id', authenticatedUser, deleteUser)

module.exports = router;
