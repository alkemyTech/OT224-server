/**
 * @swagger 
 * components:
 *  schemas:
 *      Testimonials:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: the member name
 *              image:
 *                  type: string
 *                  description: the facebook url
 *              content:
 *                  type: string
 *                  description: the instagram url
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
 *              - name
 *              - image
 *              - content
 *          example:
 *              name: Juan Perez
 *              image: https://lh3.googleusercontent.com/u/0/d/18Jub8i5qQnjBpuR-EsVx9Xtc0tzS2dmx=w250-h238-p-k-nu-iv2
 *              content: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
 *              createdAt: 2022-07-01T17:46:16.000Z,
 *              updatedAt: 2022-07-10T20:41:41.000Z,
 *              deletedAt: null
 * 
 */

/* GET testimonials listen. */
/**
 * @swagger
 * /api/testimonials:
 *  get:
 *      security:
 *        - bearerAuth: []
 *      summary: List all testimonials
 *      tags: [Testimonials]
 *      parameters: []
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Testimonials'
 *          500:
 *              description: Server error
 *          400:
 *              description: Bad request error
 *          401:
 *              description: Unauthorized      
 */

/* GET testimonial by Id*/
/**
  * @swagger
  * /api/testimonials/{id}:
  *  get:
  *      security:
  *        - bearerAuth: []
  *      summary: Get testimonial by id
  *      tags: [Testimonials]
  *      parameters:
  *        - in: path
  *          name: id
  *          schema:
  *              type: integer
  *          required: true
  *          description: Testimonials id
  *      responses:
  *          200:
  *              description: Get testimonial by id
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/Testimonials'
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

/* POST testimonial. */

/**
  * @swagger
  * /api/testimonials:
  *  post:
  *      security:
  *        - bearerAuth: []
  *      summary: create a new testimonial
  *      tags: [Testimonials]
  *      requestBody: 
  *          required: true
  *          content:
  *               multipart/form-data:
  *                  schema:
  *                      type: object
  *                      properties:
  *                          name:
  *                              type: String
  *                              
  *                          image:
  *                              type: Number
  *                              format: binary
  *                               
  *                          content:
  *                              type: text
  *      responses:
  *          201:
  *              description: Successful response
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/Testimonials'
  *          400:
  *              description: Bad request error
  *          401:
  *              description: Unauthorized / admin privileges  
  *          403:
  *              description: Required inputs error
  *          500:
  *              description: Server error
  
  * 
  */

/* PUT testimonial. */ 
/**
  * @swagger
  * /api/testimonials/{id}:
  *  put:
  *      security:
  *        - bearerAuth: []
  *      summary: Update testimonials by id
  *      tags: [Testimonials]
  *      parameters:
  *        - in: path
  *          name: id
  *          schema:
  *              type: integer
  *          required: true
  *          description: Testimonials id
  *      requestBody: 
  *          required: true
  *          content:
  *              application/json:
  *                  schema:
  *                      type: object
  *                      $ref: '#/components/schemas/Testimonials'     
  *      responses:
  *          200:
  *              description: Successful response
  *              content:
  *                  application/json:
  *                      example: Testimonial updated succefuly
  *          400:
  *              description: Bad request error
  *          403:
  *              description: Required inputs error
  *          404:
  *              description: Resource not found
  *          500:
  *              description: Server error
  *      
  */

/* DELETE testimonial. */ 
 /**
  * @swagger
  * /api/testimonials/{id}:
  *  delete:
  *      security:
  *        - bearerAuth: []
  *      summary: Delete testimonials by id
  *      tags: [Testimonials]
  *      parameters:
  *        - in: path
  *          name: id
  *          schema:
  *              type: integer
  *          required: true
  *          description: Testimonials id
  *      responses:
  *          200:
  *              description: Successful response
  *          400: 
  *              description: Bad request 
  *          401:
  *              description: Unauthorized
  *          404:
  *              description: Resource not found
  *          500:
  *              description: Internal server error
  *      
  */