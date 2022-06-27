var express = require('express');
var router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swagger = require('../documentation/swagger');

const usersRouter = require('./users');
const organizationRouter = require('./organizations.routes');
const testimonialsRouter = require('./testimonials.routes');
const newsRouter = require('./news');
const categoriesRouter = require('./categories');
const authRouter = require('./auth')
const membersRouter = require('./members')
const rolesRouter = require('./role');
const activitiesRouter = require('./activities');
const slidesRouter = require('./slides');
const contactRoutes = require('./contacts.routes');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', usersRouter);
router.use('/organization', organizationRouter);
router.use('/testimonials',testimonialsRouter)
router.use('/news', newsRouter);
router.use('/categories', categoriesRouter);
router.use('/auth', authRouter);
router.use('/members', membersRouter )
router.use('/roles', rolesRouter);
router.use('/activities', activitiesRouter);
router.use('/slides', slidesRouter);
router.use('/contacts',contactRoutes);
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swagger));

module.exports = router;
