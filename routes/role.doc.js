
/**
 * @swagger
 * components:
 *   schemas :
 *     Role:
 *       type: object
 *       properties:
 *          name:
 *              type: string
 *              description : the role name
 *          description:
 *              type: string
 *              description : the role description
 *          updatedAt: 
 *              type: date
 *              description: the role updated date
 *          createdAt: 
 *              type: date
 *              description: the role created date
 *       required:
 *          - name
 *       example:
 *          name: Role demo
 *          description: usuario demo
 *          updatedAt: 2022-07-15T06:02:09.285Z
 *          createdAt: 2022-07-15T06:02:09.285Z
 */

/**
 * @swagger
 * /api/roles:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     summary: List all roles
 *     tags: [Role]        
 *     responses:
 *       '200':
 *         description: return all roles
 *       '500':
 *         descripcion: server error
 */

/**
 * @swagger
 * /api/roles/{id} :
 *   get:
 *     security:
 *        - bearerAuth: []
 *     summary: List one role by id
 *     tags: [Role]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: id of the role you want to see 
 *     responses:
 *       '200':
 *         description: return role
 *       '404':
 *         descripcion: the role does not exists
 *       '500':
 *         descripcion: server error
 */

/**
 * @swagger
 * /api/roles :
 *   post:
 *     security:
 *        - bearerAuth: []
 *     summary: Create a new role
 *     tags: [Role]
 *     requestBody: 
 *          required: true
 *          content:
 *            application/json :
 *               schema:
 *                 type: object
 *                 $ref: '#/components/schemas/Role'
 *     responses:
 *       '201':
 *         description: return role
 *       '500':
 *         descripcion: server error
 */

/**
 * @swagger
 * /api/roles/{id} :
 *   put:
 *     security:
 *        - bearerAuth: []
 *     summary: Update role by id
 *     tags: [Role]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: id of the role to be updated
 *     requestBody: 
 *          required: true
 *          content:
 *            application/json :
 *               schema:
 *                 type: object
 *                 $ref: '#/components/schemas/Role'
 *     responses:
 *       '200':
 *         description: return updated role
 *       '404':
 *         descripcion: the role does not exists
 *       '500':
 *         descripcion: server error
 */

/**
 * @swagger
 * /api/roles/{id} :
 *   delete:
 *     security:
 *        - bearerAuth: []
 *     summary: Remove one role by id
 *     tags: [Role]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: id of the role to be removed
 *     responses:
 *       '200':
 *         description: role {id} deleted
 *       '404':
 *         descripcion: the role does not exists
 *       '500':
 *         descripcion: server error
 */
module.exports = router;
