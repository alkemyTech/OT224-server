const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');
const { validateComments } = require('../validators/commentValidator');

// Create a new comment
router.post('/', validateComments, commentController.createComment);

module.exports = router;