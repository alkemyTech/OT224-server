const { check } = require('express-validator')

const contactsValidators = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Please enter your name!'),
    check('email')
        .not()
        .isEmpty()
        .withMessage('Please enter your email!')
        .isEmail()
        .withMessage('Please enter a valid email!')
]

module.exports = { contactsValidators }