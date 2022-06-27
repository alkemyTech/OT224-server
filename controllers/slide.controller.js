const { Slide } = require('../models');
const { uploadToBucket } = require('../services/s3');
const sequelize = require('sequelize');
const { Op } = require('sequelize')

const getAllSlides = async ( req, res ) => {

    res.json({
        msg: 'Hello from get all slides'
    })

}

const createSlide = async ( req, res ) => {

    let img = req.files.img;
    const body = req.body;

    
    const decodedName = Buffer.from( img.name , 'base64').toString('ascii');
    img['name'] = decodedName;
    
    
    try {
        
        const location = await uploadToBucket(img);
        if( !body.hasOwnProperty('order') ){
            const [lastOrder] = await  Slide.findAll({
                where: { organizationId: body.organizationId },
                attributes: [[sequelize.fn('max', sequelize.col('order')), 'maxOrder']],
                raw: true
            })
            body['order'] = lastOrder.maxOrder + 1
        }else{
            
            const slidesByOrg  = await Slide.findAll({ where: { organizationId: body.organizationId }})
         
            const checkForRepeatedOrder = (slide) => slide.order == body.order;
            
            if(slidesByOrg.some( checkForRepeatedOrder )){
             await Slide.increment(
                'order',
                {
                    where: {
                        [Op.and]:[ { organizationId: body.organizationId }, { order:{ [Op.gte]: body.order } }]
                    }
                }
              )
            } 
        }
        
        
        const slide = await Slide.create({ 
            text: body.text,
            order: body.order,
            imageUrl: location,
            organizationId: body.organizationId
        })
        res.status(200).json({
            slide
        }) 

    } catch (error) {
        console.log( error )
        res.status(500).json({
            msg: 'Something went wrong call the admin'
        })
    }
}


const getSlideById = async ( req, res ) => {

    const id = req.params.id;

    try {

        const slide = await Slide.findByPk(id);
        if(!slide){
            return res.status(404).json({
                msg:'Invalid or nonexisting slide'
            })
        }
        res.status(200).json({
            slide
        })
        
    } catch (error) {
        console.log( error )
        res.status(500).json({
            msg: 'Something went wrong call the admin'
        })
    }
   
}

const updateSlide = async ( req, res ) => {

    res.json({
        msg: 'Hello from update slide'
    })
}


const deleteSlide = async ( req, res ) => {

    res.json({
        msg: 'Hello from delete slide'
    })

}

module.exports = {
    getAllSlides,
    createSlide,
    getSlideById,
    updateSlide,
    deleteSlide
}