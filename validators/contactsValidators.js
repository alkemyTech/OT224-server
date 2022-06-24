const { check } = require('express-validator')
const { validateResult } = require("../helpers/validate");

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
        .withMessage('Please enter a valid email!'),

    (req, res, next) => {
        validateResult(req, res, next)
    }

]

module.exports = { contactsValidators }