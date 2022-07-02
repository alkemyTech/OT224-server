const express = require("express");
const router = express();
const newsController = require('../controllers/news.controller');
const { validateNews } = require('../validators/newsValidator');
const { authenticatedUser } = require('../middlewares/authenticatedUser');
const { verifyIsAdmin } = require('../middlewares/user.middelware');


//List News
router.get('/', newsController.getAllNews);

//Detail News
router.get('/:id', authenticatedUser , verifyIsAdmin , newsController.detailNews);

// Create News
router.post('/', authenticatedUser , verifyIsAdmin , validateNews ,newsController.createNews);

//Update News
router.put('/:id', authenticatedUser , verifyIsAdmin , validateNews, newsController.updateNews);

//Delete News
router.delete('/:id', authenticatedUser , verifyIsAdmin , newsController.deleteNews);

module.exports = router;
