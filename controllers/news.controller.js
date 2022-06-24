const newsModel = require('../models').News;


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


module.exports = {
    createNews,
}