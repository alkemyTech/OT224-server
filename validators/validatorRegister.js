const { check } = require('express-validator');



const validateRegister = [
    check('firstName')
        .not()
        .isEmpty()
        .withMessage('Please enter your first name'),
    check('firstName')
        .isAlpha()
        .withMessage('The first name can only contain letters'),
    check('firstName')
        .isLength({ min: 3 })
        .withMessage('First name must contain 3 or more characters'),
    check('lastName')
        .not()
        .isEmpty()
        .withMessage('Please enter your last name'),
    check('lastName')
        .isAlpha()
        .withMessage('The last name can only contain letters'),
    check('lastName')
        .isLength({ min: 3 })
        .withMessage('Last name must contain 3 or more characters'),
    check('email')
        .not()
        .isEmpty()
        .withMessage('Please enter your email'),
    check('email')
        .isEmail()
        .withMessage('Enter a valid email'),
    check('password')
        .not()
        .isEmpty()
        .withMessage('Please enter a password'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('The password must contain 3 or more characters'),
]

module.exports = { validateRegister }