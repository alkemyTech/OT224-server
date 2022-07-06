const CommentModel = require("../models").Comment;

const createComment = async (req, res) => {
    try {
        const comment = await CommentModel.create(req.body);
        return res.status(201).send(comment);

    } catch (error) {
        res.status(500).send(error);
    }
};

const getAllComents = async (req, res) => {

    try {
        const comments = await CommentModel.findAll({
            attributes:['body'],
            order: [['createdAt', 'DESC']]
        })
        res.status(200).send({ comments })
    } catch (error) {
        res.status(500).send({ error })
    }
}
module.exports = {
    createComment,
    getAllComents
}