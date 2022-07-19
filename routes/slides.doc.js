
/**
 * @swagger
 * components: 
 *  schemas:
 *      Slides:
 *          type: object
 *          properties: 
 *              text: 
 *                  type: String
 *                  description: The slide text
 *              organizationId: 
 *                  type: Number
 *                  description: A valid organization id
 *              order: 
 *                  type: String
 *                  description: The slide order
 *              imageUrl:
 *                  type: String
 *                  description: The url where the image is stored
 *              thumbnailUrl:
 *                  type: String
 *                  description: The url where the thumbnail image is stored
 *              createdAt:
 *                  type: Date
 *                  description: The creation date
 *              updatedAt:
 *                  type: Date
 *                  description: The updated date
 *              deletedAt:
 *                  type: Date
 *                  description: The deleted date
 *          required:
 *              - text
 *              - organizationId
 *          example:
 *              text: Slide text
 *              organizationId: 1
 *  responses:
 *      Slide:
 *         type: object
 *         properties:
 *              id: 
 *                  type: integer
 *                  description: The slide id
 *              text:
 *                  type: String
 *                  description: The slide text
 *              order: 
 *                  type: String
 *                  description: The slide order
 *              organizationId:
 *                      type: Number
 *                      description: A valid organization id
 *              imageUrl: 
 *                  type: String
 *                  description: The url where the image is stored
 *              thumnailUrl: 
 *                  type: String
 *                  description: The url where the thumbnail is stored
 *              createdAt:
 *                  type: date
 *                  description: The slide created date
 *              updatedAt:
 *                  type: date
 *                  description: The slide updated date
 *              deletedAt: 
 *                  type: date
 *                  description: The slide deteled date
 *         required:
 *                  - text
 *                  - organizationId
 *         example:
 *             id: 2,
 *             text: New text,
 *             order: 3,
 *             imageUrl: https://cohorte-junio-a192d78b.s3.amazonaws.com/imagen2,
 *             thumbnailUrl: https://cohorte-junio-a192d78b.s3.amazonaws.com/imagen2,
 *             organizationId: 1,
 *             createdAt: 2022-07-01T17:46:16.000Z,
 *             updatedAt: 2022-07-10T20:41:41.000Z,
 *             deletedAt: null
 *              
 *          
 *                  
 */         



/**
 * @swagger
 * /api/slides:
 *  get:
 *      security:
 *        - bearerAuth: []
 *      summary: List all the slides
 *      description: This endpoint is for list all the slides
 *      tags: [Slides]
 *      responses:
 *          200:
 *              description: A list of slides
 *              content:
 *                  application/json:
 *                      schema:
 *                        type: array
 *                        items:
 *                          type: object
 *                          properties:
 *                              id:
 *                                 type: integer
 *                              thumbnailUrl:
 *                                 type: string
 *                              order:
 *                                 type: number
 *          500:
 *              description: Internal Server error
 *          400:
 *              description: Bad request error
 *          401:
 *              description: Unauthorized
 *      
 */


/**
 * @swagger
 * /api/slides/{id}:
 *  get:
 *      security:
 *        - bearerAuth: []
 *      summary: Returns the corresponding slide
 *      description: This endpoint is to get an specific slide
 *      tags: [Slides]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: Slide id
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/responses/Slide'
 *          500:
 *              description: Internal Server error
 *          400:
 *              description: Bad request error / token requested
 *          401:
 *              description: Unauthorized / admin privileges
 *          404:
 *              description: Not found / Invalid or nonexisting slide id
 *      
 */


/**
 * @swagger
 * /api/slides/{id}:
 *  delete:
 *      security:
 *        - bearerAuth: []
 *      summary: Delete slide by id
 *      description: This endpoint is for destroy a specific slide
 *      tags: [Slides]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: Slide id
 *      responses:
 *          200:
 *              description: Successful response
 *          400: 
 *              description: Bad request 
 *          401:
 *              description: Unauthorized
 *          500:
 *              description: Internal server error
 *      
 */

/**
 * @swagger
 * /api/slides:
 *  post:
 *      security:
 *        - bearerAuth: []
 *      summary: Creates a Slide
 *      description: This endpoint is to create an slide
 *      tags: [Slides]
 *      requestBody: 
 *          required: true
 *          content:
 *               multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          text:
 *                               type: String
 *                          organizationId:
 *                               type: Number
 *                          order:
 *                                type: Number
 *                          img:
 *                              type: string
 *                              format: binary
 *                                
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/responses/Slide'
 *          500:
 *              description: Internal Server error
 *          400:
 *              description: Bad request error / token requested
 *          401:
 *              description: Unauthorized / admin privileges
 *          404:
 *              description: Not found / Invalid or nonexisting slide id
 *      
 */


/**
 * @swagger
 * /api/slides/{id}:
 *  put:
 *      security:
 *        - bearerAuth: []
 *      summary: Update slide by id
 *      description: This endpoint is for update a specific slide
 *      tags: [Slides]
 *      requestBody: 
 *          required: true
 *          content:
 *               multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          text:
 *                               type: String
 *                          order:
 *                               type: Number
 *                          organizationId:
 *                               type: Number     
 *                          img:
 *                              type: string
 *                              format: binary                         
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: Slide id
 *      responses:
 *          200:
 *              description: Successful response
 *          400: 
 *              description: Bad request 
 *          401:
 *              description: Unauthorized
 *          500:
 *              description: Internal server error
 *          403:
 *              description: Forbidden
 *      
 */