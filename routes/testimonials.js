let express = require('express');
let router = express.Router();
const controller = require('../controllers/testimonials.Controller');

/* GET testimonials listen. */
router.get('/', controller.get);

module.exports = router;
