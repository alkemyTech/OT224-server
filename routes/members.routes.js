var express = require('express');
var router = express.Router();
const memberController = require('../controllers/members.controller')
const {validateMembers} =  require('../validators/members.validator')
const {verifyIsMemberAdmin} = require('../middlewares/member.middleware')


/* GET users listing. */
router.get('/', verifyIsMemberAdmin, memberController.getAllMember )
//GET member by id
router.get('/:id', verifyIsMemberAdmin, memberController.getMemberById)
// create member
router.post('/', verifyIsMemberAdmin, validateMembers, memberController.createMember)
//update member
router.put('/:id', verifyIsMemberAdmin, memberController.updateMember)
//delete member
router.delete('/:id',verifyIsMemberAdmin , memberController.deleteMember)


module.exports = router;

