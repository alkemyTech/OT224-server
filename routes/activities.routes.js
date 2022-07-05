var express = require('express');
var router = express.Router();
const activityController = require('../controllers/activities.controller');
const { authenticatedUser } = require('../middlewares/authenticatedUser');
const { verifyIsAdmin } = require('../middlewares/user.middelware');
const { validateActivity } = require('../validators/activity.validator');



// Create activity
/**
 * @swagger 
 * components:
 *  schemas:
 *      ActivityRequest:
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
 * 
 *      ActivityResponse:
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
 *      tags: [Activity]
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/ActivityRequest'
 *      responses:
 *          201:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ActivityResponse'
 *          500:
 *              description: Server error
 *          403:
 *              description: Required imputs error
 *          400:
 *              description: Bad request error
 * 
 */
router.post('', authenticatedUser, verifyIsAdmin, validateActivity, activityController.createActivity)

// Get all activities
/**
 * @swagger
 * /api/activities:
 *  get:
 *      security:
 *        - bearerAuth: []
 *      summary: List all activities with pagination
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
 *                              $ref: '#/components/schemas/ActivityResponse'
 *          500:
 *              description: Server error
 *          400:
 *              description: Bad request error
 *      
 */
router.get('', authenticatedUser, activityController.getAllActivities)

// Get activity by id
/**
 * @swagger
 * /api/activities/{id}:
 *  get:
 *      security:
 *        - bearerAuth: []
 *      summary: Get activity by id
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
 *                          $ref: '#/components/schemas/ActivityResponse'
 *          500:
 *              description: Server error
 *          400:
 *              description: Bad request error
 *          404:
 *              description: Resource not found
 *      
 */

router.get('/:id', authenticatedUser, activityController.getActivityById)

// Update activity
/**
 * @swagger
 * /api/activities/{id}:
 *  put:
 *      security:
 *        - bearerAuth: []
 *      summary: Update activity by id
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
 *                      $ref: '#/components/schemas/ActivityRequest'     
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
router.put('/:id', authenticatedUser, verifyIsAdmin, validateActivity, activityController.updateActivity)

// Delete activity
/**
 * @swagger
 * /api/activities/{id}:
 *  delete:
 *      security:
 *        - bearerAuth: []
 *      summary: Delete activity by id
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
router.delete('/:id', authenticatedUser, verifyIsAdmin, activityController.deleteActivity)

module.exports = router;

