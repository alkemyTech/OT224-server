let express = require('express');
let router = express.Router();
const testimonialController = require('../controllers/testimonial.controller');
const { authenticatedUser } = require("../middlewares/authenticatedUser");
const { verifyIsAdmin } = require('../middlewares/user.middelware');
const { validateTestimonial } = require('../validators/testimonialValidator');

/* GET testimonials listen. */
router.get('/', testimonialController.getAllTestimonials);

/* POST testimonial. */
router.post('/',authenticatedUser, verifyIsAdmin, validateTestimonial, testimonialController.createTestimonial);

module.exports = router;
