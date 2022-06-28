var express = require('express');
var router = express.Router();
const activityController = require('../controllers/activities.controller');
const { authenticatedUser } = require('../middlewares/authenticatedUser');
const { verifyIsAdmin } = require('../middlewares/user.middelware');
const { validateActivity } = require('../validators/activity.validator');


// Get all activities
router.get('', authenticatedUser, activityController.getAllActivities)

// Create activity
router.post('', authenticatedUser, verifyIsAdmin, validateActivity, activityController.createActivity)

// Get activity by id
router.get('/:id', authenticatedUser, activityController.getActivityById)

// Update activity
router.put('/:id', authenticatedUser, verifyIsAdmin, validateActivity, activityController.updateActivity)

// Delete activity
router.delete('/:id', authenticatedUser, verifyIsAdmin, activityController.deleteActivity)

module.exports = router;

