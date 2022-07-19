var express = require('express');
var router = express.Router();
const {validateMembers} =  require('../validators/members.validator')
const {verifyIsMemberAdmin} = require('../middlewares/member.middleware')
const { getAllMember, getMemberById, createMember, updateMember, deleteMember} = require('../controllers/members.controller')


router.get('/', verifyIsMemberAdmin, getAllMember )
router.get('/:id', verifyIsMemberAdmin, getMemberById)
router.post('/', verifyIsMemberAdmin, validateMembers, createMember)
router.put('/:id', verifyIsMemberAdmin, validateMembers, updateMember)
router.delete('/:id',verifyIsMemberAdmin , deleteMember)


module.exports = router;

