const { check } = require('express-validator')
const { validateResult } = require("../helpers/validate");
const Contacts = require('../models').Contacts

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
    check('email').custom(async (email) => {
        const contact = await Contacts.findOne({
            where: {
                email: email
            }
        })
        if (contact) {
            throw new Error('Email already registered')
        }
    }),

    (req, res, next) => {
        validateResult(req, res, next)
    }

]

module.exports = { contactsValidators }