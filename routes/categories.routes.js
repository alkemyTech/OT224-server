const express = require('express');
const router = express.Router();

const {verifyIsAdmin, idExists}=require('../middlewares');

const { validateCategories }=require('../validators')

const {getAllCategories,
       getOneCategory,
       createCategory,
       updateCategory,
       deleteCategory}=(require('../controllers/categories.controller'))

router.use(verifyIsAdmin)

router.get("/",  getAllCategories);

router.post("/", validateCategories, createCategory);

router.get("/:id", idExists, getOneCategory);

router.put("/:id", idExists, validateCategories, updateCategory);

router.delete("/:id", deleteCategory);

module.exports = router;
