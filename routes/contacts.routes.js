const { Router } = require('express')
const { createContact } = require('../controllers/contact.controller')
const { authenticatedUser } = require('../middlewares/authenticatedUser')
const { verifyIsAdmin } = require('../middlewares/user.middelware')
const { contactsValidators } = require('../validators/contactsValidators')

const router = Router()

router.post('/', authenticatedUser, verifyIsAdmin, contactsValidators, createContact)

module.exports = router