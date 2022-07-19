/**
 * @swagger 
 * components:
 *  schemas:
 *      Members:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: the member name
 *              facebookUrl:
 *                  type: string
 *                  description: the facebook url
 *              instagramUrl:
 *                  type: string
 *                  description: the instagram url
 *              linkedinUrl:
 *                  type: string
 *                  description: the linkedin url
 *              image: 
 *                  type: string
 *                  description: the member image
 *              description:
 *                  type: string
 *                  description: the member description
 *          required:
 *              - name
 *              - image
 *          example:
 *              name: Cecilia Mendez
 *              facebookUrl: https://www.facebook.com/CeciliaMendez
 *              instagramUrl: https://www.instagram.com/CeciliaMendez
 *              linkedinUrl: https://www.linkedin.com/CeciliaMendez
 *              image: https://lh3.googleusercontent.com/u/0/d/18Jub8i5qQnjBpuR-EsVx9Xtc0tzS2dmx=w250-h238-p-k-nu-iv2
 *              description: Cecilia Mendez es una apasionada de los idiomas y ha impartido clases de idiomas durante más de 12 años.
 * 
 */

/* GET members */
/**
 * @swagger
 * /api/members:
 *  get:
 *      security:
 *        - bearerAuth: []
 *      summary: List all members with pagination
 *      tags: [Member]
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
 *                              $ref: '#/components/schemas/Members'
 *          500:
 *              description: Server error
 *          400:
 *              description: Bad request error
 *      
 */

// Get member by id
/**
 * @swagger
 * /api/members/{id}:
 *  get:
 *      security:
 *        - bearerAuth: []
 *      summary: Get member by id
 *      tags: [Member]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: Member id
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Members'
 *          500:
 *              description: Server error
 *          400:
 *              description: Bad request error
 *          404:
 *              description: Resource not found
 *      
 */

// Create member
/**
 * @swagger
 * /api/members:
 *  post:
 *      security:
 *        - bearerAuth: []
 *      summary: create a new member
 *      tags: [Member]
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Members'
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Members'
 *          500:
 *              description: Server error
 *          403:
 *              description: Required inputs error
 *          400:
 *              description: Bad request error
 * 
 */

//Update member
/**
 * @swagger
 * /api/members/{id}:
 *  put:
 *      security:
 *        - bearerAuth: []
 *      summary: Update member by id
 *      tags: [Member]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: Member id
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Members'     
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      example: Member updated succefuly
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

//Delete member
/**
 * @swagger
 * /api/members/{id}:
 *  delete:
 *      security:
 *        - bearerAuth: []
 *      summary: Delete member by id
 *      tags: [Member]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: Member id
 *      responses:
 *          200:
 *              description: Member deleted succefuly
 *          500:
 *              description: Server error
 *          400:
 *              description: Bad request error
 *          404:
 *              description: Resource not found
 *      
 */
