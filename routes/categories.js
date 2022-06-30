const express = require('express');
const router = express.Router();
const {verifyIsAdmin}=require('../middlewares/user.middelware')
const {validateCategories,validateCreateCategories,validateUpdateCategories}=require('../validators/categoriesValidator')
const categoriesController=require('../controllers/categories.controller');


router.get('/',verifyIsAdmin,categoriesController.getAllCategories)

router.get('/:id',verifyIsAdmin,categoriesController.getOneCategory)

router.post('/',verifyIsAdmin,validateCategories,validateCreateCategories,categoriesController.createCategory)

router.put('/:id',verifyIsAdmin,validateUpdateCategories,validateCategories,categoriesController.updateCategory)

router.delete('/:id',categoriesController.deleteCategory)

module.exports = router;