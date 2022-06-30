const { check } = require('express-validator');
const { validateResult } = require('../helpers/validate');
const News = require('../models').News;
const User = require('../models').User;

const validateComments = [
    check('news_id').notEmpty().withMessage('The field cannot be empty')
        .isInt().withMessage('must be a number')
        .custom(async (news_id)=>{ 
            if(news_id){                
                const existNews_id = await News.findByPk(news_id);                
                if (existNews_id===null) {
                    throw new Error('news_id does not exist')
                }
            }
        }),

    check('user_id').notEmpty().withMessage('The field cannot be empty')
        .isInt().withMessage('must be a number')
        .custom(async (user_id)=>{ 
            if(user_id){                
                const existUser_id = await User.findByPk(user_id);                
                if (existUser_id===null) {
                    throw new Error('user_id does not exist')
                }
            }
        }),

    check('body').notEmpty().withMessage('The field cannot be empty')
        .trim().escape().isString().isLength({ min: 20 })
        .withMessage('The minimum length must be 20 characters'),    
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateComments }