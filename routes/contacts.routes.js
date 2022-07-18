const { Router } = require('express')
const {
    createContact,
    getAllContacts,
    getContactById,
    updateContact,
    deleteContact,
} = require('../controllers/contact.controller')
const {
    authenticatedUser,
    verifyIsAdmin
} = require('../middlewares')
const { contactsValidators } = require('../validators')

const router = Router()


router.post('/', contactsValidators, createContact)
router.get('/', authenticatedUser, verifyIsAdmin, getAllContacts)
router.get('/:id', authenticatedUser, verifyIsAdmin, getContactById)
router.put('/:id', authenticatedUser, verifyIsAdmin, updateContact)
router.delete('/:id', authenticatedUser, verifyIsAdmin, deleteContact)

module.exports = router