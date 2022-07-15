const TestimonialModel = require("../models").Testimonial;
const { uploadToBucket } = require('../services/s3');
const BaseController = require("./base.controller");

//Create a testimonial
const createTestimonial = async (req, res) => {

    let img = req.files.image;
    let regularImglocation;

    try {
        regularImglocation = await uploadToBucket(img);
        const inputVars = {
            name: req.body.name, 
            image: regularImglocation, 
            content: req.body.content
        };
        
        return BaseController.createModel(res, TestimonialModel, inputVars);
    } catch (error) {        
        res.status(500).send(error);
    }
}
//Get testimonials by id
const getTestimonialsById =  async (req, res) => {
    return BaseController.getModelById(req, res, TestimonialModel)
}
//Get testimonials
const getAllTestimonials = async (req, res) => {
    return BaseController.getAllModels(req, res, TestimonialModel);
}

//Update testimonial
const updateTestimonial = async (req, res) => {
    
    const testimonialId = req.params.id;
    let regularImglocation;
    
    try {
        const editTestimonial = await TestimonialModel.findByPk(testimonialId)

        if (!editTestimonial) {
            return res.status(404).send({
                msg: 'Invalid testimonial id'
            })
        }

        if( req.files){
            let img = req.files.image;

            regularImglocation = await uploadToBucket(img);
        }
        
        const updatedTestimonial = await TestimonialModel.update({
            name: req.body.name,                                
            image: regularImglocation,
            content: req.body.content   
        }, {
            where: {
                id: testimonialId
            }
        })

        res.status(201).send({
            msg: 'The testimonial was succesfully updated'
        })
    } catch (error) {
        res.status(500).send(error);
        console.log(error)
    }
}

//Delete testimonial
const deleteTestimonial = async (req, res) => {
    return BaseController.deleteModel(req, res, TestimonialModel);
}

module.exports = {
    createTestimonial,
    getTestimonialsById,
    getAllTestimonials,
    updateTestimonial,
    deleteTestimonial
}



