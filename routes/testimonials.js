let express = require('express');
let router = express.Router();
const controller = require('../controller/testimonials');

/* GET testimonials listen. */
router.get('/', controller.get);

module.exports = router;
