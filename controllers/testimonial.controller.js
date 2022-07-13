const TestimonialModel = require("../models").Testimonial;
const ModelHelper = require("../helpers/modelHelper");
const modelHelper = new ModelHelper(TestimonialModel);
const BaseController = require("./base.controller");

//Create a testimonial
const createTestimonial = async (req, res) => {
    
    const inputVars = {
        name: req.body.name, 
        image: req.body.image, 
        content: req.body.content
    };
    
    return BaseController.createModel(res, TestimonialModel, inputVars);

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
    return BaseController.updateModel(req, res, TestimonialModel);
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



