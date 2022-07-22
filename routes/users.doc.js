/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        firstName:
 *          type: string
 *          description: the user name
 *        lastName:
 *          type: string
 *          description: the user lastName
 *        email:
 *          type: string
 *          description: the user email
 *        password:
 *          type: string
 *          description: the user password
 *        roleId:
 *          type: integer
 *          description: the user role
 *        photo:
 *          type: string
 *          description: the user photo
 *        deleteAt:
 *          type: date
 *          description: the user delete date
 *      required:
 *        - firsName
 *        - lastName
 *        - email
 *        - password
 *      example:
 *        lastName: documentationName
 *        firstName: documentationLastName
 *        email: documentation@gmail.com
 *        password: documentation123
 */

/**
 * @swagger
 * /api/users:
 *  get:
 *     security:
 *        - bearerAuth: []
 *     summary: Return all users
 *     tags: [User]
 *     responses:
 *       200:
 *          description: all users
 *          content:
 *             application/json:
 *              schemma:
 *                 type: array
 *                 $ref: '#/components/schemas/User'
 *       400:
 *          description: Bad request / request does not have a token
 *       401:
 *          description: Unauthorized
 *       500:
 *          description: Internal server error
 */    

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *     security:
 *        - bearerAuth: []
 *     summary: Returns a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: string
 *         required: true
 *         description: the user id
 *     responses:
 *       200:
 *          description: all users
 *          content:
 *             application/json:
 *              schemma:
 *                 type: object
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request / request does not have a token
 *       404:
 *         description: Not found / user not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *     security:
 *        - bearerAuth: []
 *     summary: Deletes a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: string
 *         required: true
 *         description: the user id
 *     responses:
 *       200:
 *         description: Succesful response
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request / request does not have a token
 *       404:
 *         description: Not found / user not found
 *       500:
 *         description: Internal server error
 *     
 */
/**
 * @swagger
 * /api/users/update/{id}:
 *  put:
 *     security:
 *        - bearerAuth: []
 *     summary: Updates a User
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: string
 *         required: true
 *         description: the user id
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User modified
 *       401:
 *          description: Unauthorized
 *       400:
 *          description: Bad request / request does not have a token
 *       500:
 *          description: Internal server error
 *       404:
 *          description: Not found
 */