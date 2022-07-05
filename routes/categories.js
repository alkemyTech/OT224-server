const express = require('express');
const router = express.Router();
const {verifyIsAdmin}=require('../middlewares/user.middelware')
const {validateCategories}=require('../validators/categoriesValidator')
const categoriesController=require('../controllers/categories.controller');


router.get('/',verifyIsAdmin,categoriesController.getAllCategories)

router.get('/:id',verifyIsAdmin,categoriesController.getOneCategory)

router.post('/',verifyIsAdmin,validateCategories,categoriesController.createCategory)

router.put('/:id',verifyIsAdmin,validateCategories,categoriesController.updateCategory)

router.delete('/:id',verifyIsAdmin,categoriesController.deleteCategory)

module.exports = router;