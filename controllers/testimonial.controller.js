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
    try {        
        const testimonials = await TestimonialModel.findAll();
        if(!testimonials){
            res.status(200).send(testimonials);
        }else{            
            res.status(200).send(testimonials);
        }        
    } catch (error) {
        res.status(500).send(error);
    }
}

//Update testimonial
const updateTestimonial = async (req, res) => {
    try {
        const id = req.params.id
        const testimonial = await TestimonialModel.findByPk(id);
        
        if(!testimonial) {
            res.status(404).send({message: "Testimonial no found!"});
        }else{
            const updateTestimonial = await TestimonialModel.update(req.body, { where: { id } });

            if (updateTestimonial == 1){
                const updatedTestimonial = await TestimonialModel.findByPk(id);
                res.status(201).send(updatedTestimonial);
            }
        }

    } catch (error) {        
        res.status(500).send(error);
    }
}

module.exports = {
    createTestimonial,
    getAllTestimonials,
    updateTestimonial
}
