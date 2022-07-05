const express = require("express");
const router = express();
const { validateCreate } = require("../validators/authValidator");
const authControllers = require("../controllers/authControllers");
const userController = require("../controllers/users.controllers");
const { authenticatedUser } = require("../middlewares/authenticatedUser");
const { validateRegister } = require("../validators/validatorRegister");

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
 *        email: prueba@gmail.com
 *        password: 123456789
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
 * api/auth/login:
 *  post:
 *    summary: login user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            type: objet
 *            $ref: '#/components/schemas/LoginCredentials'
 *    response: 
 *      201: 
 *        description: Created
 *      401:
 *        description: Unauthorized
 *      500: 
 *        description: Internal Server Error     
 */

router.post("/login", validateCreate, authControllers.login);


//register User

/**
 * @swagger
 * api/auth/register:
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
 *    response: 
 *      200: 
 *        description: Ok
 *      400:
 *        description: User not found
 *      500: 
 *        description: Internal Server Error     
 */

router.post("/register", validateRegister, userController.createUser);

// get auth user


/**
 * @swagger 
 * api/auth/me:
 *  get: 
 *    summary: user information
 *    tags: [User]
 *  response: 
 *    200: 
 */

router.get("/me", authenticatedUser, userController.findMe);

module.exports = router;
