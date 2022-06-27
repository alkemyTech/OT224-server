var express = require('express');
var router = express.Router();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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

const swaggerSpec = {
  definition: {
    openapi: '3.0.2',
    info: {
      title: 'ONG Somos más API',
      description: 'API Documentation for use',
      version: '1.0.0',
    },
    servers: [
        {
            url:"http://localhost:3000"
        }
    ]
  },
  // looks for configuration in specified directories
  apis: ['./routes/*.js'],
};

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
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerSpec)));

module.exports = router;
