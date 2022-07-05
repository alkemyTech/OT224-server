const { Slide } = require('../models');
const sequelize = require('sequelize')
const { Op } = require('sequelize');

const checkSlideOrder = async ( data )=>{

        const slidesByOrg  = await Slide.findAll({ where: { organizationId: data.organizationId }})

        const checkForRepeatedOrder = (slide) => slide.order == data.order;

        if(slidesByOrg.some( checkForRepeatedOrder )){
         return await Slide.increment(
            'order',
            {
                where: {
                    [Op.and]:[ { organizationId: data.organizationId }, { order:{ [Op.gte]: data.order } }]
                }
            }
          )
        } 
    
}

module.exports = {
    checkSlideOrder
}