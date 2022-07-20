
/**
 * @swagger
 * components: 
 *  schemas: 
 *    LoginCredentials:
 *      type: object
 *      properties:
 *       email:
 *          type: string 
 *       password: 
 *          type: string
 *      required:
 *        - email
 *        - password
 *      example:
 *        email: admin@test.com
 *        password: 1234test
 *        
 */

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
 *        lastName: juan
 *        firstName: rios
 *        email: juanrios@gmail.com
 *        password: 123456789     
 */ 


// Login user

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    summary: login user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/LoginCredentials'
 *    responses: 
 *      200: 
 *        description: Succesful response
 *      401:
 *        description: Unauthorized
 *      500: 
 *        description: Internal Server Error     
 */


//register User

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *    summary: create new user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            type: objet
 *            $ref: '#/components/schemas/User'
 *    responses: 
 *      200: 
 *        description: Ok
 *      500: 
 *        description: Internal Server Error     
 */


// get auth user


/**
 * @swagger 
 * /api/auth/me:
 *  get: 
 *    security:
 *        - bearerAuth: []
 *    summary: Returns the user information
 *    description: This endpoint returns the user's information
 *    tags: [User]
 *    responses: 
 *      200: 
 *          description: Succesful response
 *      401:
 *          description: Unauthorized
 *      400:
 *          description: Bad request / request does not have a token
 *      500:
 *          description: Internal server error
 */