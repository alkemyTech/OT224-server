const OrganizationModel = require("../models").Organization;
const { Slide } = require("../models");
const baseController = require('./base.controller')


//Get All Organizations
const getOrganizations = async ( req, res ) => {
    return baseController.getAllModels( req, res, OrganizationModel )
}

//Create and save an organization
const createOrganization = async (req, res) => {  

    const { name, image, address, phone, email, welcomeText, aboutUsText } = req.body;
    const data = {
        name,
        image,
        address,
        phone,
        email,
        welcomeText,
        aboutUsText
    }

    return baseController.createModel( res, OrganizationModel, data )

}
// Get Organization
const getOrganizationById = async(req, res) => {    
    try {
        const id = req.params.id
        const organization = await OrganizationModel.findOne({
            where: { id },
            attributes: ['name', 'image', 'phone', 'address', 'facebookUrl', 'instagramUrl', 'linkedinUrl']
        });

        const slidesByOrg = await Slide.findAll({
            where:{
               organizationId: id
           },
           order:[['order','ASC']]
        })

        res.status(200).send({
            organization,
            slides: slidesByOrg
        });
               
    } catch (error) {
        res.status(500).send(error);
    }
}

//Update organization
const updateOrganization = async (req, res) => {  
    const { name, image, address, phone, email, welcomeText, aboutUsText } = req.body;

    const data = {
        name,
        image,
        address,
        phone,
        email,
        welcomeText,
        aboutUsText
    }
    return baseController.updateModel( req, res, OrganizationModel, data)
}

//Delete Organization
const deleteOrganization = async( req, res ) => {
    return baseController.deleteModel( req, res, OrganizationModel )
    
}

module.exports = {
    getOrganizationById,
    createOrganization,
    updateOrganization,
    getOrganizations,
    deleteOrganization
}