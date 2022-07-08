const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');
const { authenticatedUser } = require('../middlewares/authenticatedUser');
const { validateComments } = require('../validators/commentValidator');
const { verifyIsCommentsAdmin } = require('../middlewares/commentsAdminRole');


// Create a new comment
router.post('/', authenticatedUser, verifyIsCommentsAdmin, validateComments, commentController.createComment);
router.get('/', authenticatedUser, verifyIsCommentsAdmin,  commentController.getAllComents);
router.get('/:id', authenticatedUser, verifyIsCommentsAdmin, commentController.getCommentById);

module.exports = router;