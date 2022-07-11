let express = require('express');
let router = express.Router();
const testimonialController = require('../controllers/testimonial.controller');
const { authenticatedUser } = require("../middlewares/authenticatedUser");
const { verifyIsAdmin } = require('../middlewares/user.middelware');
const { validateTestimonial } = require('../validators/testimonialValidator');

/**
 * @swagger 
 * components:
 *  schemas:
 *      Testimonials:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: the member name
 *              image:
 *                  type: string
 *                  description: the facebook url
 *              content:
 *                  type: string
 *                  description: the instagram url
 *          required:
 *              - name
 *              - image
 *              - content
 *          example:
 *              name: Juan Perez
 *              image: https://lh3.googleusercontent.com/u/0/d/18Jub8i5qQnjBpuR-EsVx9Xtc0tzS2dmx=w250-h238-p-k-nu-iv2
 *              content: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
 * 
 */

/* GET testimonials listen. */
/**
 * @swagger
 * /api/testimonials:
 *  get:
 *      security:
 *        - bearerAuth: []
 *      summary: List all testimonials
 *      tags: [Testimonial]
 *      parameters: []
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Testimonials'
 *          500:
 *              description: Server error      
 */

 router.get('/', testimonialController.getAllTestimonials);

 /* GET testimonial by Id*/
 /**
  * @swagger
  * /api/testimonials/{id}:
  *  get:
  *      security:
  *        - bearerAuth: []
  *      summary: Get testimonial by id
  *      tags: [Testimonial]
  *      parameters:
  *        - in: path
  *          name: id
  *          schema:
  *              type: integer
  *          required: true
  *          description: Testimonials id
  *      requestBody: 
  *          required: true
  *          content:
  *              application/json:
  *                  schema:
  *                      type: object
  *                      $ref: '#/components/schemas/Testimonials'     
  *      responses:
  *          200:
  *              description: Get testimonial by id
  *          500:
  *              description: Server error
  *          400:
  *              description: Bad request error
  *          404:
  *              description: Resource not found
  *      
  */

router.get('/:id', authenticatedUser, verifyIsAdmin, testimonialController.getTestimonialsById)

 /* POST testimonial. */
 /**
  * @swagger
  * /api/testimonials:
  *  post:
  *      security:
  *        - bearerAuth: []
  *      summary: create a new testimonial
  *      tags: [Testimonial]
  *      requestBody: 
  *          required: true
  *          content:
  *              application/json:
  *                  schema:
  *                      type: object
  *                      $ref: '#/components/schemas/Testimonials'
  *      responses:
  *          201:
  *              description: Successful response
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/Testimonials'
  *          500:
  *              description: Server error
  *          403:
  *              description: Required inputs error
  *          400:
  *              description: Bad request error
  * 
  */
 router.post('/',authenticatedUser, verifyIsAdmin, validateTestimonial, testimonialController.createTestimonial);
 
 /* PUT testimonial. */ 
 /**
  * @swagger
  * /api/testimonials/{id}:
  *  put:
  *      security:
  *        - bearerAuth: []
  *      summary: Update testimonials by id
  *      tags: [Testimonial]
  *      parameters:
  *        - in: path
  *          name: id
  *          schema:
  *              type: integer
  *          required: true
  *          description: Testimonials id
  *      requestBody: 
  *          required: true
  *          content:
  *              application/json:
  *                  schema:
  *                      type: object
  *                      $ref: '#/components/schemas/Testimonials'     
  *      responses:
  *          200:
  *              description: Successful response
  *              content:
  *                  application/json:
  *                      example: Testimonial updated succefuly
  *          500:
  *              description: Server error
  *          403:
  *              description: Required inputs error
  *          400:
  *              description: Bad request error
  *          404:
  *              description: Resource not found
  *      
  */
 router.put('/:id', authenticatedUser, verifyIsAdmin, validateTestimonial, testimonialController.updateTestimonial);
 
 /* DELETE testimonial. */ 
 /**
  * @swagger
  * /api/testimonials/{id}:
  *  delete:
  *      security:
  *        - bearerAuth: []
  *      summary: Delete testimonials by id
  *      tags: [Testimonial]
  *      parameters:
  *        - in: path
  *          name: id
  *          schema:
  *              type: integer
  *          required: true
  *          description: Testimonials id
  *      requestBody: 
  *          required: true
  *          content:
  *              application/json:
  *                  schema:
  *                      type: object
  *                      $ref: '#/components/schemas/Testimonials'     
  *      responses:
  *          200:
  *              description: Testimonials deleted succefuly
  *          500:
  *              description: Server error
  *          400:
  *              description: Bad request error
  *          404:
  *              description: Resource not found
  *      
  */
 router.delete('/:id', authenticatedUser, verifyIsAdmin, testimonialController.deleteTestimonial);

module.exports = router;
