var express = require('express');
var router = express.Router();
const memberController = require('../controllers/members.controller')
const {validateMembers} =  require('../validators/members.validator')
const {verifyIsMemberAdmin} = require('../middlewares/member.middleware')


/* GET users listing. */
router.get('/', verifyIsMemberAdmin, memberController.getAllMember )
// create member
router.post('/', validateMembers, memberController.createMember)
//update member
router.put('/update/:id', memberController.updateMember)
//delete member
router.delete('/delete/:id',memberController.deleteMember)


module.exports = router;

