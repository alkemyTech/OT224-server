const express = require("express");
const router = express();
const newsController = require('../controllers/news.controller');
const { validateNews } = require('../validators/newsValidator');
const { authenticatedUser } = require('../middlewares/authenticatedUser');
const { verifyIsAdmin } = require('../middlewares/user.middelware');


//List News

/**
 * 
 * @swagger
 * /api/news:
 *    get:
 *      tags:
 *        - News
 *      summary: "List all News"
 *      description: This endpoint is for list all News 
 *      parameters: []
 *      responses:
 *        '200':
 *          description: Return all News.
 *        '400':
 *          description: Bad request.
 *      security:
 *       - bearerAuth: []
 */
router.get('/', newsController.getAllNews);

//Detail News

/**
 * 
 * @swagger
 * /api/news/{id}::
 *    get:
 *      tags:
 *        - News
 *      summary: "Display the specified News"
 *      description: This endpoint is for get a specific news 
 *      parameters: []
 *      responses:
 *        '200':
 *          description: Return news by.
 *        '400':
 *          description: Bad request.
 *      security:
 *       - bearerAuth: []
 */
router.get('/:id', authenticatedUser , verifyIsAdmin , newsController.detailNews);

// Create News

/**
 * 
 * @swagger
 * /api/news:
 *    post:
 *      tags:
 *        - News
 *      summary: "Create news "
 *      description: This endpoint is for create news 
 *      parameters: []
 *      responses:
 *        '200':
 *          description: Return news created .
 *        '400':
 *          description: Bad request.
 *      security:
 *       - bearerAuth: []
 */
router.post('/', authenticatedUser , verifyIsAdmin , validateNews ,newsController.createNews);

//Update News

/**
 * 
 * @swagger
 * /api/news:
 *    put:
 *      tags:
 *        - News
 *      summary: "Update news "
 *      description: This endpoint is for update news 
 *      parameters: []
 *      responses:
 *        '200':
 *          description: Successful response .
 *        '400':
 *          description: Bad request.
 *      security:
 *       - bearerAuth: []
 */
router.put('/:id', authenticatedUser , verifyIsAdmin , validateNews, newsController.updateNews);

//Delete News

/**
 * 
 * @swagger
 * /api/news:
 *    delete:
 *      tags:
 *        - News
 *      summary: "Remove the specified News "
 *      description: This endpoint is for destroy a specific News 
 *      parameters: []
 *      responses:
 *        '200':
 *          description: Successful response .
 *        '400':
 *          description: Bad request.
 *      security:
 *       - bearerAuth: []
 */
router.delete('/:id', authenticatedUser , verifyIsAdmin , newsController.deleteNews);


module.exports = router;
