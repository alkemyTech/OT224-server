/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        firsttName:
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
 *          type: intrger
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
 *      summary: return all users
 *      tags: [Users]
 *      responses:
 *          200:
 *              description: all users
 *              content:
 *                  application/json
 *                      schema:
 *                          type: array
 *                          items:
 *                            $ref: '#/components/schemas/User'
 */
/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *      summary: return a users
 *      tags: [Users]
 *      parameters:
 *          - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: the user id
 *      responses:
 *          200:
 *              description: all users
 *              content:
 *                  application/json
 *                      schema:
 *                          type: object
 *                            $ref: '#/components/schemas/User'
 */
/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *      summary: delete user by id
 *      tags: [Users]
 *      parameters:
 *          - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: the user id
 *      responses:
 *          200:
 *              description: delete user
 *
 */

/**
 * @swagger
 * /api/users/update/{id}:
 *  put:
 *      summary: delete user by id
 *      tags: [Users]
 *      parameters:
 *          - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: the user id
 * requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  $ref: '#components/schemas/User
 *      responses:
 *          200:
 *              description: user updated
 *
 */
