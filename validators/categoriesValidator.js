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
                                ? {name,id:{[Op.not]:req.params.id}  }
                                : {name};

                const isDuplicated = await Category.findOne({where ,attributes:['name','id']})  
                console.log(isDuplicated)
                if (isDuplicated) {
                    throw new Error('category name already exists')
                } 
            }),   

            // if(req.params.id){ 
            //     const existId = await Category.findByPk(req.params.id,{attributes:['id']})          
            //     if(name && existId!==null){                                  
            //         const isDuplicated = await Category.findOne({ where: { name: name } ,attributes:['name','id']})                                                                          
            //         if (isDuplicated!==null  && isDuplicated.name===name && isDuplicated.id !==Number(req.params.id)) {
            //             throw new Error('category name already exists')
            //         } 
            //         return true 
            //     }
            // } else {
            //     if(name){
            //         const isDuplicated = await Category.findOne({ where: { name: name } ,attributes:['name']})
            //         if (isDuplicated) {
            //             throw new Error('category name already exists')
            //         }
            //         return true
            //     }
            // }
        
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCategories }