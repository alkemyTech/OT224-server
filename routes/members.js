var express = require('express');
var router = express.Router();
const memberController = require('../controllers/members.controller')


/* GET users listing. */
router.get('/', memberController.getAllMember )
// create member
router.post('/create', memberController.createMember)
//update member
router.put('/update/:id', memberController.updateMember)
//delete member
router.delete('/delete/:id',memberController.deleteMember)


module.exports = router;

