const newsModel = require('../models').News;


const createNews = async (req,res) =>{
    try{
        const getNews = await newsModel.findOne({
            where: {
                name: req.body.name
            }
        })
        if(getNews){
            res.status(400).send({
                message:'Ya existe en la base de datos', 
                status:400
            })
        }else {
        let news = req.body;
        news = await newsModel.create(news)
        res.status(201).send({
            data:news,
            status:200
        });
    }
    } catch (error) {
        res.status(500).send(error);
    }
}


module.exports = {
    createNews,
}