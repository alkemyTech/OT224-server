const Organization = require("../models").Organization;

//Create and save an organization
const createOrganization = async (req, res) => {
    const organization = await Organization.create ({
        name: req.body.name,
        image: req.body.image,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        welcomeText: req.body.welcomeText,
        aboutUsText: req.body.aboutUsText
    })
    
    try {
        if(organization){
            res.status(200).send(organization)
        }
    } catch (error) {
        res.send(error)
    }
}
// Get Organization
const getOrganization = async(req, res) => {
    const organization = await Organization.findAll({
        attributes: ['name', 'image', 'phone', 'address']
    });

    try {
        if(organization){
            res.status(200).send(organization)
        }
    } catch (error) {
        res.send(error)
    }
}

//Update organization
const updateOrganization = async (req, res) => {

    const id = req.params.id

    const organization = await Organization.findByPk(id);
    
    try {

        if(!organization){
            res.send({message: "Organización no encontrada"})
        }else{
            const updateOrganization = await Organization.update({
                name: req.body.name,
                image: req.body.image,
                address: req.body.address,
                phone: req.body.phone,
                email: req.body.email,
                welcomeText: req.body.welcomeText,
                aboutUsText: req.body.aboutUsText
            },{
                where: { id: id}
            });
            
            if(updateOrganization==1){
                res.status(200).send({message: "Organización actualizada"});
            }
        }        
    } catch (error) {
        res.send(error)
    }    
}

module.exports = {
    getOrganization,
    createOrganization,
    updateOrganization
}