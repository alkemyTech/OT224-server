const { Slide } = require('../models');
const { uploadToBucket } = require('../services/s3');
const baseController = require('./base.controller')
const { resizeImg } = require('../helpers/thumbNailConverter');
const { checkSlideOrder } = require('../helpers/checkSlideOrder');
const { decodeImgName } = require('../helpers/decodeImgName');
const sequelize = require('sequelize');




const getAllSlides = async (req, res) => {
    return baseController.getAllModels( req, res, Slide )
}

const createSlide = async (req, res) => {
    let img = req.files.img;
    let body = req.body;

    img = decodeImgName(img)

    try {

        const regularImglocation = await uploadToBucket(img);

        const resizedImg = await resizeImg(img);

        const thumbnailImgLocation = await uploadToBucket(resizedImg)

        if (!body.hasOwnProperty('order')) {
            const [lastOrder] = await Slide.findAll({
                where: { organizationId: body.organizationId },
                attributes: [[sequelize.fn('max', sequelize.col('order')), 'maxOrder']],
                raw: true
            })
            body['order'] = lastOrder.maxOrder + 1
        } else {
            await checkSlideOrder(body)
        }

        const slide = await Slide.create({
            text: body.text,
            order: body.order,
            imageUrl: regularImglocation,
            thumbnailUrl: thumbnailImgLocation,
            organizationId: body.organizationId
        })
        res.status(200).send({
            slide
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Something went wrong call the admin'
        })
    }

}

const getSlideById = async (req, res) => {
    return baseController.getModelById(req, res, Slide )
}

const updateSlide = async (req, res) => {


    const slideId = req.params.id;
    let body = req.body;


    try {
       
        if (req.files) {
            let img = req.files.img;

            img = decodeImgName(img)
            const regularImglocation = await uploadToBucket(img);

            const resizedImg = await resizeImg(img);

            const thumbnailImgLocation = await uploadToBucket(resizedImg)

            body['imageUrl'] = regularImglocation;
            body['thumbnailUrl'] = thumbnailImgLocation;
        }
        if (body.hasOwnProperty('order')) {

            await checkSlideOrder(body)
        }


        const updatedSlide = await Slide.update(body, {
            where: {
                id: slideId
            }
        })

        res.status(200).send({
            msg: 'The slide was succesfully updated'
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg: 'Something went wrong call the admin'
        })
    }
}


const deleteSlide = async (req, res) => {
    return baseController.deleteModel( req, res, Slide ) 
}

module.exports = {
    getAllSlides,
    createSlide,
    getSlideById,
    updateSlide,
    deleteSlide
}