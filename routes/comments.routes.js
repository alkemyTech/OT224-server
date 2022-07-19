const express = require('express');
const router = express.Router();
const {
    createComment,
    getAllComments,
    getCommentById,
    updatedComment,
    deleteComment
} = require('../controllers/comment.controller');

const { authenticatedUser, verifyIsCommentsAdmin, idExists} = require('../middlewares');
const { validateComments } = require('../validators');
router.use(authenticatedUser)

router.post('', verifyIsCommentsAdmin, validateComments, createComment)
router.get('', getAllComments)
router.get('/:id', idExists, getCommentById)
router.put('/:id', verifyIsCommentsAdmin, idExists, validateComments, updatedComment)
router.delete('/:id', verifyIsCommentsAdmin, idExists, deleteComment)

module.exports = router;