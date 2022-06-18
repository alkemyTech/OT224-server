const { check } = require('express-validator');


const validateRegister = [
    check('firstName').isAlpha()
        .isLength({ min: 3 }),
    check('lastName').isAlpha()
        .isLength({ min: 3 }),
    check('email').isEmail(),
    check('password').isAlphanumeric()
        .isLength({ min: 6 }),
]

module.exports = { validateRegister }