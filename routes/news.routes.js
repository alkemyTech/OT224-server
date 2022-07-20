const express = require("express");
const router = express();

const { 
    getAllNews, 
    detailNews,
    createNews,
    updateNews,
    deleteNews,
    getAllCommentsOfNews,
} = require('../controllers/news.controller');

const { verifyIsAdmin, idExists } = require('../middlewares');
const { validateNews } = require('../validators');

router.use( verifyIsAdmin )

router.get('/', getAllNews);
router.get('/:id', detailNews);

router.post('/' , validateNews, createNews);
router.put('/:id' , idExists ,validateNews, updateNews);
router.delete('/:id', idExists ,deleteNews);
router.get('/:id/comments', idExists ,getAllCommentsOfNews);

module.exports = router;