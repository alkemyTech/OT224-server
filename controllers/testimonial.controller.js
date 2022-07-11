const TestimonialModel = require("../models").Testimonial;
const ModelHelper = require("../helpers/modelHelper")
const modelHelper = new ModelHelper(TestimonialModel)

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
//Get testimonials by id
const getTestimonialsById =  async (req, res) => {
    try {
        const testimonial = await TestimonialModel.findOne({where : {id: req.params.id}});
        if(testimonial){
            res.status(200).send(testimonial);
        }else{
            res.status(404).send("Testimonial does not exist");
        }
    } catch (error) {
        res.status(500).send(error)
    }
}
//Get testimonials
const getAllTestimonials = async (req, res) => {
    try {        
        const page = req.query.page || 1
        const testimonials = await modelHelper.findAndPaginate(page)
        res.status(200).send(testimonials);                
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

//Delete testimonial
const deleteTestimonial = async (req, res) => {
    try {
        const id = req.params.id;
        const testimonial = await TestimonialModel.findByPk(id);
        
        if(!testimonial) {
            res.status(404).send({message: "Testimonial no found!"});
        }else{
            await TestimonialModel.destroy({ where: { id } });
            res.status(200).send({ message: "Testimonial deleted"});
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createTestimonial,
    getTestimonialsById,
    getAllTestimonials,
    updateTestimonial,
    deleteTestimonial
}



