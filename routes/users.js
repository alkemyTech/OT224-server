var express = require('express');
var router = express.Router();
const userController = require('../controllers/users.controllers')
const verifyIsAdmin = require('../controllers/users.controllers').verifyIsAdmin


/* GET users listing. */
router.get('/', verifyIsAdmin, userController.getAllUsers)

/* verify if user is admin */

router.get('/verify', userController.verifyIsAdmin)


module.exports = router;
