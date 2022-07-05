const { Router } = require('express')
const { createContact, getAllContacts, deleteContact, updateContact } = require('../controllers/contact.controller')
const { authenticatedUser } = require('../middlewares/authenticatedUser')
const { verifyIsAdmin } = require('../middlewares/user.middelware')
const { contactsValidators } = require('../validators/contactsValidators')

const router = Router()

// Define news tags
/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: The contacts API
 */

// Create contacts

/**
 * @swagger 
 * components:
 *  schemas:
 *      Contacts:
 *          type: object
 *          properties:
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
 *          required:
 *              - name
 *              - email
 *
 *          example:
 *              name: Juan
 *              phone: 9999999999
 *              email: juan@email.com
 *              message: Este es un mensaje de Juan
 * 
 *      ContactResponse:
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
 *                  description: the activity updated date
 *              createdAt: 
 *                  type: date
 *                  description: the activity created date
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
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ContactResponse'
 *          500:
 *              description: Server error
 *          403:
 *              description: Required imputs error
 *          400:
 *              description: Bad request error
 * 
 */

router.post('/',  contactsValidators, createContact)

// List contacts
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
 *                              $ref: '#/components/schemas/ContactResponse'
 *          500:
 *              description: Server error
 *          400:
 *              description: Bad request error
 *      
 */
router.get('/', authenticatedUser, verifyIsAdmin, getAllContacts)
//Delete Contact

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
 *              description: 1
 *              content:
 *                  application/json:
 *                      example: 1
 *          500:
 *              description: Server error
 *          400:
 *              description: Bad request error
 *          404:
 *              description: 0
 *              content:
 *                  application/json:
 *                      example: 0
 *      
 */
router.delete('/:id', authenticatedUser, verifyIsAdmin, deleteContact)
//Update Contacts

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
 *          200:
 *              description: 1
 *              content:
 *                  application/json:
 *                      example: 1
 *          500:
 *              description: Server error
 *          403:
 *              description: Required imputs error
 *          400:
 *              description: Bad request error
 *          404:
 *              description: 0
 *              content:
 *                  application/json:
 *                      example: 0
 *      
 */
router.put('/:id', authenticatedUser, verifyIsAdmin, updateContact)

module.exports = router