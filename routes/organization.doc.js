

/**
 * @swagger
 * components:
 *  schemas:
 *      Organization:
 *              type: object
 *              properties:
 *                  name:
 *                      type: String
 *                      description: The organization's name
 *                  image:
 *                      type: String
 *                      description: The organization's image
 *                  address:
 *                      type: String
 *                      description: The organization's address
 *                  phone:
 *                      type: Number
 *                      description: The organization's phone number
 *                  email:
 *                      type: String
 *                      description: The organization's email
 *                  welcomeText: 
 *                      type: String
 *                      description: The organization's welcome text
 *                  aboutUsText:
 *                      type: String    
 *                      description: The organization's about text
 *              required:
 *                  - name
 *                  - image
 *                  - address
 *                  - phone
 *                  - email
 *                  - welcomeText
 *                  - aboutUsText
 *              example:
 *                  name: Hijos de Dios
 *                  image: http://someimage.com/fakeimage123
 *                  address: Callao 222
 *                  phone: 1111111111
 *                  email: hnosdedios@correo.com
 *                  welcomeText: Lorem ipsum dolor sit amet. At sint corrupti qui odio incidunt aut quaerat ipsa sit maiores autem ea exercitationem quam
 *                  aboutUsText: Lorem ipsum dolor sit amet. At sint corrupti qui odio incidunt aut quaerat ipsa sit maiores autem ea exercitationem quam
 */

/**
 * @swagger
 * /api/organization:
 *  get:
 *      security:
 *        - bearerAuth: []
 *      summary: Lists all existing organizations
 *      tags: [Organization]
 *      parameters:
 *      - in: path
 *        name: page
 *        schema:
 *             type: integer
 *             description: The page number
 *      responses:
 *          200:
 *             description: Succesful response
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
 * /api/organization/public/{id}:
 *  get:
 *      security:
 *        - bearerAuth: []
 *      summary: Returns the organization that matches the id
 *      description: This endpoint is to get an specific organization's info
 *      tags: [Organization]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: The organization's id
 *      responses:
 *          200:
 *              description: Succesful response
 *          404:
 *              description: Not found
 *          500:
 *              description: Internal server error
 *          
 */

/**
 * @swagger
 * /api/organization/{id}:
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      summary: Delete organization by id
 *      description: This endpoint is for destroy an specific organization
 *      tags: [Organization]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                  type: integer
 *            required: true
 *            description: The organization's id
 *      responses:
 *          200:
 *              description: Succesful response
 *          401:
 *              description: Unauthorized
 *          404: 
 *              description: Not found
 *          400:
 *              description: Bad request
 *          500:
 *              description: Internal server error
 * 
 */


/**
 * @swagger
 * /api/organization/create:
 *  post:
 *      summary: Creates an organization
 *      description: This endpoint goal is to create an organization
 *      tags: [Organization]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Organization'
 *      responses:
 *          200: 
 *              description: Succesful response
 *          403:
 *              description: Forbidden
 *          201:
 *              description: Created
 *          500:
 *              description: Internal server error
 *      
 *                      
 */

/**
 * @swagger
 * /api/organization/public/{id}:
 *  put:
 *      security:
 *        - bearerAuth: []
 *      summary: Updates an organization by id
 *      description: This endpoint is to modify an existing organization
 *      tags: [Organization]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                              name:
 *                                  type: String
 *                              address:
 *                                  type: String
 *                              phone:
 *                                  type: Number
 *                      example:
 *                          name: Sons of God
 *                          address: Fake address 456, Brooklyn USA
 *                          phone: 2222222
 *                      
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                 type: integer
 *            required: true
 *            description: The organization's id
 *      responses:
 *          400:
 *              description: Bad request / missing token
 *          401:
 *              description: Unauthorized / permission denied
 *          500:
 *              description: Internal server error
 *          404:
 *              description: Not found
 *          201:
 *              description: Created / modified
 * 
 *                      
 */
