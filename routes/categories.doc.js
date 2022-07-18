/**
 * @swagger
 * components:
 *   schemas :
 *     Categories:
 *       type: object
 *       properties:
 *          name:
 *              type: string
 *              description : the category name
 *          description:
 *              type: string
 *              description : the category description
 *          image:
 *              type: string
 *              description : the category image url
 *          updatedAt: 
 *              type: date
 *              description: the category updated date
 *          createdAt: 
 *              type: date
 *              description: the category created date
 *       required:
 *          - name
 *       example:
 *          name: Category demo 5
 *          description: demo natus nisi omnis corporis facere molestiae rerum in
 *          image: https://via.placeholder.com/600/f66b97
 *          updatedAt: 2022-07-05T03:02:09.285Z
 *          createdAt: 2022-07-05T03:02:09.285Z
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     summary: List all categories with pagination
 *     tags: [Categories]
 *     parameters:
 *        - in: query
 *          name: page
 *          schema:
 *              type: integer
 *          required: false
 *          description: Page for pagination
 *     responses:
 *       '200':
 *         description: return names the all categories
 *       '500':
 *         descripcion: server error
 */

/**
 * @swagger
 * /api/categories/{id} :
 *   get:
 *     security:
 *        - bearerAuth: []
 *     summary: List one category by id
 *     tags: [Categories]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: id of the category you want to see 
 *     responses:
 *       '200':
 *         description: return category
 *       '404':
 *         descripcion: the category does not exists
 *       '500':
 *         descripcion: server error
 */

/**
 * @swagger
 * /api/categories :
 *   post:
 *     security:
 *        - bearerAuth: []
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody: 
 *          required: true
 *          content:
 *            application/json :
 *               schema:
 *                 type: object
 *                 $ref: '#/components/schemas/Categories'
 *     responses:
 *       '201':
 *         description: return category
 *       '500':
 *         descripcion: server error
 */

/**
 * @swagger
 * /api/categories/{id} :
 *   put:
 *     security:
 *        - bearerAuth: []
 *     summary: Update category by id
 *     tags: [Categories]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: id of the category to be updated
 *     requestBody: 
 *          required: true
 *          content:
 *            application/json :
 *               schema:
 *                 type: object
 *                 $ref: '#/components/schemas/Categories'
 *     responses:
 *       '200':
 *         description: return updated category
 *       '404':
 *         descripcion: the category does not exists
 *       '500':
 *         descripcion: server error
 */

/**
 * @swagger
 * /api/categories/{id} :
 *   delete:
 *     security:
 *        - bearerAuth: []
 *     summary: Remove one category by id
 *     tags: [Categories]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: id of the category to be removed
 *     responses:
 *       '200':
 *         description: category {id} deleted
 *       '403':
 *         descripcion: the category has news associated, can't delete it !
 *       '404':
 *         descripcion: the category does not exists
 *       '500':
 *         descripcion: server error
 */