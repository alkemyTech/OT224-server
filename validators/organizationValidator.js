const { check } = require("express-validator");
const { validateResult } = require("../helpers/validate");

const validateOrganization = [
  check("name").not().isEmpty().trim().escape().isString().isLength({ min: 6 }),
  check("image").not().isEmpty().trim(),
  check("address").not().isEmpty().trim().escape(),
  check("phone").not().isEmpty().trim().escape().isInt(),
  check("email").not().isEmpty().trim().escape().isEmail(),
  check("welcomeText").not().isEmpty().trim().escape().isString().isLength({ min: 30 }),
  check("aboutUsText").not().isEmpty().trim().escape().isString().isLength({ min: 30 }),
  (req, res, next)=>{
    validateResult(req, res, next)
  }
];

module.exports= { validateOrganization }