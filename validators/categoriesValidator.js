const { check } = require('express-validator');
const { validateResult } = require("../helpers/validate");
const Category=require('../models').Categories;

const validateCategories = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('category name missing')
        .isString()
        .withMessage('invalid data type')
        .trim()
        .isLength({ min: 3 })
        .withMessage('category name must contain at least 3 characters')
        .custom(async (name)=>{ 
            if(name){
                const isDuplicated = await Category.findOne({ where: { name: name } })
                if (isDuplicated) {
                    throw new Error('category name already exists')
                }
            }
        }),
        (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCategories }