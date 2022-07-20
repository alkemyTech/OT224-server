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
 * api/users:
 *  get:
 *     security:
 *        - bearerAuth: []
 *     summary: return all users
 *     tags: [User]
 *     responses:
 *       200:
 *          description: all users
 *          content:
 *             application/json:
 *              schemma:
 *                 type: array
 *                 $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * api/users/{id}:
 *  get:
 *     security:
 *        - bearerAuth: []
 *     summary: return user
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
 */
/**
 * @swagger
 * api/users/{id}:
 *  delete:
 *     security:
 *        - bearerAuth: []
 *     summary: delete user
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
 *         description: delete users
 *         $ref: '#/components/schemas/User'
 */
/**
 * @swagger
 * api/users/update/{id}:
 *  put:
 *     security:
 *        - bearerAuth: []
 *     summary: delete user
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
 *       200:
 *         description: update users
 *         $ref: '#/components/schemas/User'
 */