
/**
 * @swagger 
 * components:
 *  schemas:
 *      Activity:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: the activity name
 *              content:
 *                  type: text
 *                  description: the activity content
 *              image: 
 *                  type: string
 *                  description: the activity image
 *          required:
 *              - name
 *              - content
 *              - image
 *          example:
 *              name: Apoyo Escolar Para El Nivel Primario
 *              content: El espacio de apoyo es el corazón del área educativa
 *              image: https://busytoddler.com/wp-content/uploads/2020/03/bigkid-activities.jpg
 *  responses: 
 *      Activity:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: the activity id
 *              name:
 *                  type: string
 *                  description: the activity name
 *              content:
 *                  type: text
 *                  description: the activity content
 *              image: 
 *                  type: string
 *                  description: the activity image
 *              updatedAt: 
 *                  type: date
 *                  description: the activity updated date
 *              createdAt: 
 *                  type: date
 *                  description: the activity created date
 *          required:
 *              - name
 *              - content
 *              - image
 *          example:
 *              id: 16
 *              name: Apoyo Escolar Para El Nivel Primario
 *              content: El espacio de apoyo es el corazón del área educativa
 *              image: https://busytoddler.com/wp-content/uploads/2020/03/bigkid-activities.jpg
 *              updatedAt: 2022-07-05T03:02:09.285Z
 *              createdAt: 2022-07-05T03:02:09.285Z
 * 
 */


/**
 * @swagger
 * /api/activities:
 *  post:
 *      security:
 *        - bearerAuth: []
 *      summary: create a new activity
 *      description: This endpoint is for create activity
 *      tags: [Activity]
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Activity'
 *      responses:
 *          201:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/responses/Activity'
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
 * /api/activities:
 *  get:
 *      security:
 *        - bearerAuth: []
 *      summary: List all activities with pagination
 *      description: This endpoint is for list all activity with pagination
 *      tags: [Activity]
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
 *                              $ref: '#/components/responses/Activity'
 *          500:
 *              description: Server error
 *          400:
 *              description: Bad request error
 *      
 */


/**
 * @swagger
 * /api/activities/{id}:
 *  get:
 *      security:
 *        - bearerAuth: []
 *      summary: Get activity by id
 *      description: This endpoint is for get a specific activity
 *      tags: [Activity]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: Activity id
 *      responses:
 *          201:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/responses/Activity'
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
 * /api/activities/{id}:
 *  put:
 *      security:
 *        - bearerAuth: []
 *      summary: Update activity by id
 *      description: This endpoint is for update activity
 *      tags: [Activity]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: Activity id
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Activity'     
 *      responses:
 *          201:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      example: The activity with id 7 was updated
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
 * /api/activities/{id}:
 *  delete:
 *      security:
 *        - bearerAuth: []
 *      summary: Delete activity by id
 *      description: This endpoint is for destroy a specific activity
 *      tags: [Activity]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: Activity id
 *      responses:
 *          204:
 *              description: Activity delete successful
 *          500:
 *              description: Server error
 *          400:
 *              description: Bad request error
 *          404:
 *              description: Resource not found
 *      
 */