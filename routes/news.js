const express = require("express");
const router = express();
const newsController = require('../controllers/news.controller');
const { validateNews } = require('../validators/newsValidator');
const { authenticatedUser } = require('../middlewares/authenticatedUser');
const { verifyIsAdmin } = require('../middlewares/user.middelware');

// Create News
router.post('/', authenticatedUser , verifyIsAdmin , validateNews ,newsController.createNews);


//Update News
router.put('/:id', authenticatedUser , verifyIsAdmin , validateNews, newsController.editNews);

module.exports = router;
