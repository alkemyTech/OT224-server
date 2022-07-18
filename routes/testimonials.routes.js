const express = require('express');
const router = express.Router();
const {
  getAllTestimonials,
  getTestimonialsById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} = require('../controllers/testimonials.controller');

const { authenticatedUser, verifyIsAdmin, idExists } = require("../middlewares");

const { validateTestimonial, validateUpdateTestimonial } = require('../validators');

router.use(authenticatedUser, verifyIsAdmin);

router.get('/', getAllTestimonials);

/* GET testimonial by Id*/
router.get('/:id', idExists, getTestimonialsById)
/* POST testimonial. */ 
router.post('/', validateTestimonial, createTestimonial);
/* PUT testimonial. */  
router.put('/:id', idExists, validateUpdateTestimonial, updateTestimonial);
/* DELETE testimonial. */ 
router.delete('/:id', idExists, deleteTestimonial);

module.exports = router;
