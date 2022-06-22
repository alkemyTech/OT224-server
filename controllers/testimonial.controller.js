const TestimonialModel = require("../models").Testimonial;

//Create a testimonial
const createTestimonial = async (req, res) => {
    try {
        let testimonial = req.body;
        testimonial = await TestimonialModel.create(testimonial)
        res.status(201).send(testimonial);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

//Get testimonials
const getAllTestimonials = async (req, res) => {
    res.send("Hello from GetAllTestimonials")
}
module.exports = {
    createTestimonial,
    getAllTestimonials
}
