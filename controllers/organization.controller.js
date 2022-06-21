const OrganizationModel = require("../models").Organization;

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
const getOrganization = async(req, res) => {    
    try {
        const organization = await OrganizationModel.findOne({
            attributes: ['name', 'image', 'phone', 'address']
        });
        if(!organization){
            res.status(200).send({message: "There is no information about the organization"})
        }else{            
            res.status(200).send(organization);
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

module.exports = {
    getOrganization,
    createOrganization,
    updateOrganization
}