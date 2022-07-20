const newsModel = require('../models').News;
const commentModel = require('../models').Comment;

const { 
    getAllModels, 
    createModel,
    getModelById, 
    updateModel, 
    deleteModel 
} = require('./base.controller');


const getAllNews = async (req, res) =>{
    await getAllModels(req, res, newsModel);
}

const createNews = async (req,res) =>{
    await createModel(res, newsModel, req.body);
}

const updateNews = async (req, res) =>{
    await updateModel(req, res, newsModel, req.body);
}

const detailNews = async (req,res) =>{
    await getModelById(req, res, newsModel);
}

const deleteNews = async (req, res) =>{
    await deleteModel(req, res, newsModel);
}

const getAllCommentsOfNews = async (req, res) => {
    try{
        const n = await newsModel.findOne({ 
            where: { id: req.params.id }, 
            include: [{
                model: commentModel, as: "comments"
            }]
        })
        res.status(201).json(n.comments);
    }catch(e) {
        console.log(e)
        res.status(500).send(e.message);
    }
}

module.exports = {
    getAllNews,
    createNews,
    detailNews,
    updateNews,
    deleteNews,
    getAllCommentsOfNews,
}