const { check } = require("express-validator");
const { validateResult } = require("../helpers/validate");

const validateActivity = [
    check("name")
        .exists().withMessage('is required')
        .not().isEmpty().withMessage('should not be empty')
        .isString().withMessage('should be a string')
        .trim()
        .isLength({ min: 6 }).withMessage('should has 6 characters'),
    check("content")
        .exists().withMessage('is required')
        .not().isEmpty().withMessage('should not be empty')
        .isString().withMessage('should be a string'),
    check("image")
        .exists().withMessage('is required')
        .not().isEmpty().withMessage('should not be empty')
        .trim()
        .isURL().withMessage('should be an url'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

module.exports = { validateActivity }