/**
 * @swagger 
 * components:
 *  schemas:
 *      Comment:
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
 *              body: comentario 1
 *              news_id: 1
 *  responses: 
 *      Comment:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: the comment id
 *              user_id:
 *                  type: integer
 *                  description: the user id
 *              body:
 *                  type: text
 *                  description: the comment body
 *              news_id: 
 *                  type: integer
 *                  description: the news id
 *              updatedAt: 
 *                  type: date
 *                  description: the comment updated date
 *              createdAt: 
 *                  type: date
 *                  description: the comment created date
 *          required:
 *              - user_id
 *              - body
 *              - news_id
 *          example:
 *              "id": "3"
 *              "user_id": "30"
 *              "body": "Comentario de 20 caracteres"
 *              "news_id": "1"
 *              "updatedAt": "2022-07-16T04:49:23.914Z"
 *              "createdAt": "2022-07-16T04:49:23.914Z"
 */

/**
 * @swagger
 * /api/comments:
 *  post:
 *      security:
 *        - bearerAuth: []
 *      summary: create a new comments
 *      description: This endpoint is for create comment
 *      tags: [Comment]
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Comment'
 *      responses:
 *          201:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/responses/Comment'
 *          500:
 *              description: Server error
 *          403:
 *              description: Required imputs error
 *          400:
 *              description: Bad request error
 * 
 */


/**
 * @swagger
 * /api/comments:
 *  get:
 *      security:
 *        - bearerAuth: []
 *      summary: List all comments with pagination
 *      description: This endpoint is for list all comment with pagination
 *      tags: [Comment]
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
 *                              $ref: '#/components/responses/Comment'
 *          500:
 *              description: Server error
 *          400:
 *              description: Bad request error
 *      
 */


/**
 * @swagger
 * /api/comments/{id}:
 *  get:
 *      security:
 *        - bearerAuth: []
 *      summary: Get comment by id
 *      description: This endpoint is for get a specific comment
 *      tags: [Comment]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: comment id
 *      responses:
 *          201:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/responses/Comment'
 *          500:
 *              description: Server error
 *          400:
 *              description: Bad request error
 *          404:
 *              description: Resource not found
 *      
 */


/**
 * @swagger
 * /api/comments/{id}:
 *  put:
 *      security:
 *        - bearerAuth: []
 *      summary: Update comment by id
 *      description: This endpoint is for update comment
 *      tags: [Comment]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: comment id
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Comment'     
 *      responses:
 *          201:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      example: The comment with id 1 was updated
 *          500:
 *              description: Server error
 *          403:
 *              description: Required imputs error
 *          400:
 *              description: Bad request error
 *          404:
 *              description: Resource not found
 *      
 */


/**
 * @swagger
 * /api/comments/{id}:
 *  delete:
 *      security:
 *        - bearerAuth: []
 *      summary: Delete comment by id
 *      description: This endpoint is for destroy a specific comment
 *      tags: [Comment]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: comment id
 *      responses:
 *          204:
 *              description: comment delete successful
 *          500:
 *              description: Server error
 *          400:
 *              description: Bad request error
 *          404:
 *              description: Resource not found
 *      
 */ 