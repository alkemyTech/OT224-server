const express = require("express");
const router = express();
const newsController = require('../controllers/news.controller');
const { validateNews } = require('../validators/newsValidator');
const { authenticatedUser } = require('../middlewares/authenticatedUser');
const { verifyIsAdmin } = require('../middlewares/user.middelware');


// Define news tags
/**
 * @swagger
 * tags:
 *   name: News
 *   description: The news API
 * 
 * components:
 *  responses: 
 *      CommentsNews:
 *          type: array
 *          items: 
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: the comment id
 *                  user_id:
 *                      type: integer
 *                      description: the user id
 *                  body:
 *                      type: text
 *                      description: the comment body
 *                  news_id: 
 *                      type: integer
 *                      description: the news id
 *                  updatedAt: 
 *                      type: date
 *                      description: the activity updated date
 *                  createdAt: 
 *                      type: date
 *                      description: the activity created date
 *                  deletedAt: 
 *                      type: date
 *                      description: the activity deleted date
 *          example:
 *            - id: 1
 *              user_id: 2
 *              body: Comentario acerca del dolar
 *              news_id: 1
 *              createdAt: 2022-07-07T20:55:30.000Z
 *              updatedAt: 2022-07-07T20:55:31.000Z
 *              deletedAt: null
 *            - id: 2
 *              user_id: 5
 *              body: Comentario acerca del dolar
 *              news_id: 3
 *              createdAt: 2022-07-07T20:55:30.000Z
 *              updatedAt: 2022-07-07T20:55:31.000Z
 *              deletedAt: null
 * 
 */

//List News

/**
 * 
 * @swagger
 * /api/news:
 *    get:
 *      tags:
 *        - News
 *      summary: "List all News"
 *      description: This endpoint is for list all news 
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
 *      summary: "Create News "
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
 *      summary: "Update News "
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
 *      description: This endpoint is for destroy a specific news 
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

// Get comments by new

/**
 * @swagger
 * /api/news/{id}/comments:
 *  get:
 *      security:
 *        - bearerAuth: []
 *      summary: Get comments by new
 *      description: This endpoint is for get a comments by specific new
 *      tags: [News]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: Comments by new
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/responses/CommentsNews'
 *          500:
 *              description: Server error
 *          400:
 *              description: Bad request error
 *          404:
 *              description: Resource not found
 *      
 */
router.get('/:id/comments', authenticatedUser , verifyIsAdmin , newsController.getAllCommentsOfNews);

module.exports = router;
