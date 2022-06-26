const express = require('express');
const router = express.Router();
const {verifyIsAdmin}=require('../middlewares/user.middelware')
const {validateCategories}=require('../validators/categoriesValidator')
const categoriesController=require('../controllers/categories.controller');


router.get('/',categoriesController.getAllCategories)

router.post('/',verifyIsAdmin,validateCategories,categoriesController.createCategory)

router.put('/:id',categoriesController.updateCategory)

router.delete('/:id',categoriesController.deleteCategory)

module.exports = router;