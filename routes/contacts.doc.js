/**
 * @swagger 
 * components:
 *  schemas:
 *      Contacts:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: the contact id
 *              name:
 *                  type: string
 *                  description: the contact name
 *              phone:
 *                  type: text
 *                  description: the contact phone
 *              email: 
 *                  type: string
 *                  description: the contact email
 *              message: 
 *                  type: string
 *                  description: the contact message
 *              updatedAt: 
 *                  type: date
 *                  description: the contact updated date
 *              createdAt: 
 *                  type: date
 *                  description: the contact created date
 *          required:
 *              - name
 *              - email
 *          example:
 *              id: 1
 *              name: Juan
 *              phone: 9999999999
 *              email: juan@email.com
 *              message: Este es un mensaje de Juan
 *              updatedAt: 2022-07-05T03:02:09.285Z
 *              createdAt: 2022-07-05T03:02:09.285Z
 * 
 */

/**
 * @swagger
 * /api/contacts:
 *  post:
 *      security:
 *        - bearerAuth: []
 *      summary: create a new contact
 *      tags: [Contacts]
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Contacts'
 *      responses:
 *          201:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Contacts'
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
 * /api/contacts:
 *  get:
 *      security:
 *        - bearerAuth: []
 *      summary: List all contacts
 *      tags: [Contacts]
 *      parameters:
 *        []
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Contacts'
 *          500:
 *              description: Server error
 *          400:
 *              description: Bad request error
 *          401:
 *              description: Unauthorized
 *      
 */

/**
 * @swagger
 * /api/contacts/{id}:
 *  get:
 *      security:
 *        - bearerAuth: []
 *      summary: Get contact by id
 *      tags: [Contacts]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: Contact id
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Contacts'
 *          500:
 *              description: Server error
 *          400:
 *              description: Bad request error
 *          401:
 *              description: Unauthorized
 *          404:
 *              description: id 1 not found!
 *              application/json:
 *                      example: id 1 not found!
 *      
 */

/**
 * @swagger
 * /api/contacts/{id}:
 *  put:
 *      security:
 *        - bearerAuth: []
 *      summary: Update contact
 *      tags: [Contacts]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: Contact id
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Contacts'     
 *      responses:
 *          201:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Contacts'
 *          500:
 *              description: Server error
 *          403:
 *              description: Required imputs error
 *          400:
 *              description: Bad request error
 *          401:
 *              description: Unauthorized
 *          404:
 *              description: id 1 not found!
 *              content:
 *                  application/json:
 *                      example: id 1 not found!
 *      
 */


/**
 * @swagger
 * /api/contacts/{id}:
 *  delete:
 *      security:
 *        - bearerAuth: []
 *      summary: Delete contact by id
 *      tags: [Contacts]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: Contact id
 *      responses:
 *          200:
 *              description: id 1 deleted!
 *              content:
 *                  application/json:
 *                      example: id 1 deleted!
 *          500:
 *              description: Server error
 *          400:
 *              description: Bad request error
 *          401:
 *              description: Unauthorized
 *          404:
 *              description: id 1 not found!
 *              content:
 *                  application/json:
 *                      example: id 1 not found
 *      
 */