const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');
const { authenticatedUser } = require('../middlewares/authenticatedUser');
const { validateComments } = require('../validators/commentValidator');
const { verifyIsCommentsAdmin } = require('../middlewares/commentsAdminRole');


// Create a new comment
router.post('/', authenticatedUser, verifyIsCommentsAdmin, validateComments, commentController.createComment);

module.exports = router;