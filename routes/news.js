const express = require("express");
const router = express();
const newsController = require('../controllers/news.controller');
const {validateNews} = require('../validators/newsValidator');

router.post('/', validateNews ,newsController.createNews);

module.exports = router;
