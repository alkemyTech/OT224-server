const { check } = require('express-validator');
const { validateResult } = require('../helpers/validate');

const validateNews = [
    check('name')
        .notEmpty()
        .withMessage('El campo no puede estar vacio'),

    check('image')
        .notEmpty()
        .withMessage('El campo no puede estar vacio'),
    
    check('content')
        .notEmpty()
        .withMessage('El campo no puede estar vacio'),
    
    check('type')
        .notEmpty()
        .withMessage('El campo no puede estar vacio'),

    check('categoryId')
        .notEmpty()
        .withMessage('El campo no puede estar vacio')
        .bail()
        .isInt()
        .withMessage('Debe ser un numero'),
    (req, res, next) =>{
        validateResult(req, res, next)
    }
]

module.exports = {validateNews}