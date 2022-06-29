const { Router } = require('express')
const { createContact, getAllContacts } = require('../controllers/contact.controller')
const { authenticatedUser } = require('../middlewares/authenticatedUser')
const { verifyIsAdmin } = require('../middlewares/user.middelware')
const { contactsValidators } = require('../validators/contactsValidators')

const router = Router()

router.post('/',  contactsValidators, createContact)
router.get('/', authenticatedUser, verifyIsAdmin, getAllContacts)

module.exports = router