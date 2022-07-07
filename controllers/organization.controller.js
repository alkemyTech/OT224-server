const OrganizationModel = require("../models").Organization;
const { Slide } = require("../models");


//Get All Organizations
const getOrganizations = async ( req, res ) => {

    try {
        const organizations = await OrganizationModel.findAll()

        res.status(200).send({
            organizations
        })

    } catch (error) {
        console.log( error )
        res.status(500).send( error )
    }

}

//Create and save an organization
const createOrganization = async (req, res) => {    
    try {
        let organization = req.body;        
        organization = await OrganizationModel.create (organization);        
        res.status(201).send(organization);           
    } catch (error) {
        res.status(500).send(error);
    }
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

        if(!organization){
            res.status(404).send({message: "There is no information about the organization"})
        }else{            
            res.status(200).send({
                organization,
                slides: slidesByOrg
            });
        }        
    } catch (error) {
        res.status(500).send(error);
    }
}

//Update organization
const updateOrganization = async (req, res) => {  
    try {
        const id = req.params.id
        const organization = await OrganizationModel.findByPk(id);
        if(!organization){
            res.status(404).send({message: "Organization no found!"})
        }else{
            const updateOrganization = await OrganizationModel.update(req.body,{ where: { id } });
            
            if(updateOrganization==1){
                res.status(201).send({message: "Organization updated"});
            }
        }        
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }    
}

//Delete Organization
const deleteOrganization = async( req, res ) => {

    const id = req.params.id;


     try {

        const org = await OrganizationModel.findByPk(id)

        if(org === null){
            return res.status(400).send({
                msg: 'Invalid organization id'
            })
        }else{
            await OrganizationModel.destroy({
                where: { id }
            })

            res.status(200).send()
        }
        
    } catch (error) {
        console.log( error )
        res.status(500).send( error )
    }
 
}

module.exports = {
    getOrganizationById,
    createOrganization,
    updateOrganization,
    getOrganizations,
    deleteOrganization
}