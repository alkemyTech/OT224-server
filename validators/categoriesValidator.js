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
        .withMessage('category name must contain at least 3 characters'),
    check('description')    
        .isString()
        .withMessage('invalid data type'),
    check('image')    
        .isString()
        .withMessage('invalid data type')
        .trim(),
    (req, res, next) => {
    validateResult(req, res, next)
}
]

const validateCreateCategories = [
    check('name')
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

const validateUpdateCategories = [
    check('name')
        .custom(async (value,{req})=>{
            if(req.params.id){
                const existsValue = await Category.findByPk(req.params.id)
                if (existsValue && existsValue.name!==req.body.name){
                    const isDuplicated = await Category.findOne({ where: { name: req.body.name } })
                        if (isDuplicated) {
                            throw new Error('category name already exists')
                        }
                }
            }
        return true
        }),
]

module.exports = { validateCreateCategories, 
                   validateUpdateCategories,
                   validateCategories }