const newsModel = require('../models').News;
const commentModel = require('../models').Comment;
const ModelHelper = require('../helpers/modelHelper');

const getAllNews = async (req, res) =>{
    try{
        const modelHelper = new ModelHelper(newsModel);
        const page = req.query.page || 1;
        const news = await modelHelper.findAndPaginate(page)
        res.status(200).send(news)
    } catch (error) {
        res.status(500).send(error);
    }
}

const createNews = async (req,res) =>{
    try{
        let news = req.body;
        news = await newsModel.create(news)
        res.status(201).send({
            data:news,
            status:200
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateNews = async (req, res) =>{
    try {
        
        const news = await newsModel.findByPk(req.params.id);
        if(!news){
            res.status(404).send({
                message: 'News no found!',
                satatus: 404
            })
        }else{
            const updateNews = await newsModel.update(req.body,{ where: { id: req.params.id } });
            
            if(updateNews == 1){
                res.status(201).send( updateNews );
            }
        }        
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }   
}

const detailNews = async (req,res) =>{
    try{
        news = await newsModel.findByPk(req.params.id);
        if(!news){
            res.status(404).send({
            message: "News no found!", 
            status:404
        });
        }else {
            res.status(200).send(news); 
        }
    } catch (error) {res.status(500).send(error);}
}

const deleteNews = async (req, res) =>{
    try{
        news = await newsModel.findOne({
            where:{
                id: req.params.id
            }
        })
        if(!news){
            res.status(404).send({
                message: 'News no found!', 
                status:404
            });
        }else {
            news.destroy(news)
            res.status(200).send({ message: 'News deleted'}) 
        }
    } catch (error) { res.status(500).send(error);}
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