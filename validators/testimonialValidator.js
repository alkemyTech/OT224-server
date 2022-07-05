const { check } = require("express-validator");
const { validateResult } = require("../helpers/validate");

const validateTestimonial = [
  check("name").exists().not().isEmpty()
    .withMessage('Field name can not be empty').trim().escape().isString().isLength({ min: 6 })
    .withMessage('name must contain at least 6 characters'),
  check("image").not().isEmpty()
    .withMessage('Field image can not be empty').trim(),
  check("content").exists().not().isEmpty()
    .withMessage('Field content can not be empty').trim().escape(),  
  (req, res, next)=>{
    validateResult(req, res, next)
  }
];

module.exports= { validateTestimonial }