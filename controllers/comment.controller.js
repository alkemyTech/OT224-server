const CommentModel = require("../models").Comment;

const createComment = async (req, res) => {
    try {         
        const comment = await CommentModel.create(req.body);
        return res.status(201).send(comment);

    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    createComment
}