const { check } = require('express-validator');
const { validateResult } = require("../helpers/validate");

const validateMembers = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('should not be empty')
        .isString()
        .withMessage('invalid data type, should be a string')
        .trim(),
        (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateMembers }