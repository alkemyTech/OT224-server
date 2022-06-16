const express = require('express');
const router = express.Router();
const categoriesController=require('../controllers/categories.controller')


router.get('/',categoriesController.getAllCategories)

router.post('/',categoriesController.createCategorie)

router.put('/:id',categoriesController.updateCategorie)

router.delete('/:id',categoriesController.deleteCategorie)

module.exports = router;