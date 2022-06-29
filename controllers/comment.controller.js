const CommentModel = require("../models").Comment;

const createComment = async (req, res) => {
    try {
        let comment = req.body;
        comment = await CommentModel.create(comment);
        return res.status(201).send(comment);

    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    createComment
}