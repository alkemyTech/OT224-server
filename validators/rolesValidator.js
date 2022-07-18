const { check } = require('express-validator');
const { validateResult } = require('../helpers/validate');

const validateRoles = [
    check('name')
        .notEmpty()
        .withMessage('should not be empty')
        .isString()
        .withMessage('invalid data type, should be a string')
        .trim()      
        .isLength({ min: 3 })
        .withMessage('role name must contain at least 3 characters'),
    check('description')
        .notEmpty()
        .withMessage('should not be empty')
        .isString()
        .withMessage('invalid data type, should be a string')
        .trim(),

    (req, res, next) =>{
        validateResult(req, res, next)
    }
]

module.exports = {validateRoles}