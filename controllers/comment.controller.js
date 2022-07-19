const {
    createModel,
    getAllModels,
    getModelById,
    updateModel,
    deleteModel
} = require("./base.controller");
const CommentModel = require("../models").Comment;

const createComment = async (req, res) =>
    await createModel(res, CommentModel, req.body);

const getAllComments = async (req, res) =>
    await getAllModels(req, res, CommentModel);

const getCommentById = async (req, res) => 
    await getModelById(req, res, CommentModel);    

const updatedComment = async (req, res) =>
    await updateModel(req, res, CommentModel, req.body);

const deleteComment = async (req, res) =>
    await deleteModel(req, res, CommentModel);

module.exports = {
    createComment,
    getAllComments,
    getCommentById,
    updatedComment,
    deleteComment
}