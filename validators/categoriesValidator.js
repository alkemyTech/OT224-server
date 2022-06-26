const { check } = require('express-validator')
const { validateResult } = require("../helpers/validate");

const validateCategories = [
    check('name')
        .not()
        .isEmpty()
        .isString()
        .isLength({ min: 3 })
        .trim()
        .withMessage('category name is missing or invalid data type or with less than 3 letters'),

    (req, res, next) => {
        validateResult(req, res, next)
    }

]

module.exports = { validateCategories }