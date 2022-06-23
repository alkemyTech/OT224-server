var express = require('express');
var router = express.Router();
const activityController = require('../controllers/activities');
const { authenticatedUser } = require('../middlewares/authenticatedUser');


// Get all activities
router.get('/', activityController.getAllActivities)

// Create activity
router.post('/', activityController.createActivity)

// Get activity by id
router.get('/:id', activityController.getActivityById)

// Update activity
router.put('/:id', activityController.updateActivity)

// Delete activity
router.delete('/:id',activityController.deleteActivity)

module.exports = router;

