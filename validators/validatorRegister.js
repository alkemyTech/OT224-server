const { check } = require('express-validator');
const User = require('../models').User





const validateRegister = [
    check('firstName')
        .not()
        .isEmpty()
        .withMessage('Please enter your first name'),
    check('lastName')
        .not()
        .isEmpty()
        .withMessage('Please enter your last name'),
    check('email')
        .custom(async (email) => {
            if (email === '') {
                throw new Error('Please enter your email')
            } else {
                let testMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                if (!testMail.test(email)) {
                    throw new Error('Please enter a valid email')
                } else {
                    const user = await User.findOne({ where: { email: email } })
                    if (user) {
                        throw new Error('Email already registered')
                    }
                }
            }

        }),
    check('password')
        .not()
        .isEmpty()
        .withMessage('Please enter a password'),
]

module.exports = { validateRegister }