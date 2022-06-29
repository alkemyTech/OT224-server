const { check } = require('express-validator');
const { validateResult } = require('../helpers/validate');

const validateComments = [
    check('news_id').notEmpty().withMessage('The field cannot be empty')
        .isInt().withMessage('must be a number'),

    check('user_id').notEmpty().withMessage('The field cannot be empty')
        .isInt().withMessage('must be a number'),

    check('body').notEmpty().withMessage('The field cannot be empty')
        .trim().escape().isString().isLength({ min: 20 })
        .withMessage('The minimum length must be 20 characters'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateComments }