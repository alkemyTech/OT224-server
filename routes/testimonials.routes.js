const express = require('express');
const router = express.Router();
const {
  getAllTestimonials,
  getTestimonialsById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} = require('../controllers/testimonial.controller');

const { authenticatedUser, verifyIsAdmin } = require("../middlewares");

const { validateTestimonial } = require('../validators');

router.use(authenticatedUser, verifyIsAdmin);

router.get('/', getAllTestimonials);

/* GET testimonial by Id*/
router.get('/:id',  getTestimonialsById)
/* POST testimonial. */ 
router.post('/', validateTestimonial, createTestimonial);
/* PUT testimonial. */  
router.put('/:id',  validateTestimonial, updateTestimonial);
/* DELETE testimonial. */ 
router.delete('/:id',  deleteTestimonial);

module.exports = router;
