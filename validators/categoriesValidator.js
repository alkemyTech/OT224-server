const { check } = require('express-validator');
const { validateResult } = require("../helpers/validate");
const Category=require('../models').Categories;
const {Op}=require('sequelize')


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
        .custom(async (name,{req,res})=>{  
                const where = req.params.id  
                ? {name,id:{[Op.not]:req.params.id}}
                : {name};
                const isDuplicated = await Category.findOne({where, attributes:['name','id']})  
                if (isDuplicated) {
                    throw new Error('category name already exists')
                } 
            }),
    check('description')
        .isString()
        .withMessage('invalid data type'),
    check('image')
        .isString()
        .withMessage('invalid data type')
        .isURL()
        .withMessage('image must be url'),             
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCategories }