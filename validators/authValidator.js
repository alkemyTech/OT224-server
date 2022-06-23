const { check } = require("express-validator");
const { validateResult } = require("../helpers/validate");

const validateCreate = [
  check("email").exists().isEmail(),
  check("password").exists().not().isEmpty(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
];



module.exports = { validateCreate }