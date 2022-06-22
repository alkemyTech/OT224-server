const { check } = require("express-validator");
const { validateResult } = require("../helpers/validate");

const validateTestimonial = [
  check("name").exists().not().isEmpty().trim().escape().isString().isLength({ min: 6 }),
  check("image").not().isEmpty().trim(),
  check("content").exists().not().isEmpty().trim().escape(),  
  (req, res, next)=>{
    validateResult(req, res, next)
  }
];

module.exports= { validateTestimonial }