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

const editNews = async (req, res) =>{
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


module.exports = {
    createNews,
    detailNews,
    editNews
}