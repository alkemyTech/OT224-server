const { check } = require("express-validator");
const { validateResult } = require("../helpers/validate");
const verifyFile  = require('../middlewares/verifyFile');

const validateUpdateTestimonial = [
  check("name").exists().not().isEmpty()
    .withMessage('Field name can not be empty').trim().escape().isString().isLength({ min: 6 })
    .withMessage('name must contain at least 6 characters'),
  check("content").exists().not().isEmpty()
    .withMessage('Field content can not be empty').trim().escape(),    
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

const validateTestimonial = [
  check("name").exists().not().isEmpty()
    .withMessage('Field name can not be empty').trim().escape().isString().isLength({ min: 6 })
    .withMessage('name must contain at least 6 characters'),
  check("content").exists().not().isEmpty()
    .withMessage('Field content can not be empty').trim().escape(), 
  verifyFile, 
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports= { 
  validateTestimonial, 
  validateUpdateTestimonial 
}