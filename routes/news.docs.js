/**
 * @swagger
 * tags:
 *   name: News
 *   description: The news API
 * 
 * components:
 *  schemas:
 *      News:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: the news name
 *              image: 
 *                  type: string
 *                  description: the news image
 *              content:
 *                  type: text
 *                  description: the news content
 *              categoryId:
 *                  type: integer
 *                  description: the category id
 *              type:
 *                  type: string
 *                  description: the news type
 *          required:
 *              - name
 *              - image
 *              - content
 *          example:
 *              name: Where can I get some?
 *              image: https://lh3.googleusercontent.com/u/0/d/18Jub8i5qQnjBpuR-EsVx9Xtc0tzS2dmx=w250-h238-p-k-nu-iv2
 *              content: There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour
 *              categoryId: 1
 *              type: Social
 * 
 *      Comments:
 *          type: object
 *          properties:
 *              user_id:
 *                  type: integer
 *                  description: the user id
 *              body: 
 *                  type: text
 *                  description: the comment body
 *              news_id:
 *                  type: integer
 *                  description: the news id
 *          required:
 *              - user_id
 *              - body
 *              - news_id
 *          example:
 *              user_id: 1
 *              body: It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using
 *              news_id: 1  
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
 *  get:
 *      security:
 *        - bearerAuth: []
 *      summary: List all news with pagination
 *      tags: [News]
 *      parameters:
 *        - in: query
 *          name: page
 *          schema:
 *              type: integer
 *          required: false
 *          description: Page for pagination
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/News'
 *          500:
 *              description: Server error
 *          400:
 *              description: Bad request error
 *      
 */

//Detail News

/**
 * 
 * @swagger
 * /api/news/{id}::
 *    get:
 *      security:
 *       - bearerAuth: []
 *      summary: "Display the specified News"
 *      tags: [News]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: News id       
 *      description: This endpoint is for get a specific news 
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/News'
 *          500:
 *              description: Server error
 *          400:
 *              description: Bad request error
 *          404:
 *              description: Resource not found
 */

// Create News

/**
 * 
 * @swagger
* /api/news:
 *  post:
 *      security:
 *        - bearerAuth: []
 *      summary: create a news
 *      tags: [News]
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/News'
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/News'
 *          500:
 *              description: Server error
 *          403:
 *              description: Required inputs error
 *          400:
 *              description: Bad request error
 * 
 */

//Update News

/**
 * 
 * @swagger
 * /api/news/{id}:
 *  put:
 *      security:
 *        - bearerAuth: []
 *      summary: Update a news by id
 *      tags: [News]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: News id
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/News'     
 *      responses:
 *          201:
 *              description: Successful response              
 *          500:
 *              description: Server error
 *          403:
 *              description: Required inputs error
 *          400:
 *              description: Bad request error
 *          404:
 *              description: Resource not found
 *      
 */

//Delete News

/**
 * 
 * @swagger
 * /api/news/{id}:
 *  delete:
 *      security:
 *        - bearerAuth: []
 *      summary: Delete a news by id
 *      tags: [News]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: News id
 *      responses:
 *          200:
 *              description: News deleted
 *          500:
 *              description: Server error
 *          400:
 *              description: Bad request error
 *          404:
 *              description: Resource not found
 *      
 */

// Get comments by new

/**
 * 
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