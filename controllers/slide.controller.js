const { Slide } = require('../models');


const getAllSlides = async ( req, res ) => {

    res.json({
        msg: 'Hello from get all slides'
    })

}

const createSlide = async ( req, res ) => {

    res.json({
        msg: 'Hello from create slide'
    })

}


const getSlideById = async ( req, res ) => {

   res.json({
    msg: 'Hello from get slide by id'
   })

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