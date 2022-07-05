const { Router } = require('express')
const { createContact, getAllContacts, deleteContact, updateContact } = require('../controllers/contact.controller')
const { authenticatedUser } = require('../middlewares/authenticatedUser')
const { verifyIsAdmin } = require('../middlewares/user.middelware')
const { contactsValidators } = require('../validators/contactsValidators')

const router = Router()

router.post('/',  contactsValidators, createContact)
router.get('/', authenticatedUser, verifyIsAdmin, getAllContacts)
router.delete('/:id', authenticatedUser, verifyIsAdmin, deleteContact)
router.put('/:id', authenticatedUser, verifyIsAdmin, updateContact)

module.exports = router