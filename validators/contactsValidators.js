const { check } = require('express-validator')
const { validateResult } = require("../helpers/validate");
const Contacts = require('../models').Contacts

const contactsValidators = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Please enter your name!'),
    check('email').custom(async (email) => {
        if (email === '') {
            throw new Error('Please enter your email')
        } else {
            let testMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
            if (!testMail.test(email)) {
                throw new Error('Please enter a valid email')
            } else {
                const contact = await Contacts.findOne({ where: { email: email } })
                if (contact) {
                    throw new Error('Email already registered')
                }
            }
        }
    }),

    (req, res, next) => {
        validateResult(req, res, next)
    }

]

module.exports = { contactsValidators }