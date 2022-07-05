const ModelMember = require('../models').Member;

const getAllMember = async(req, res) =>{
    const members = await ModelMember.findAll()
    try {
        if(members){
            res.send(members)
        }           
    } catch (error) {
        res.status(400).send(error)
        
    }
}

const createMember = async (req, res) =>{
    try {
        const {name, facebookUrl, instagramUrl, linkedinUrl, image, description} =  req.body;
        const member = await ModelMember.create({
            name : name,
            facebookUrl: facebookUrl,
            instagramUrl: instagramUrl,
            linkedinUrl: linkedinUrl,
            image: image,
            description: description
        })
        res.status(200).send({member})        
    } catch (error) {
       res.status(500).send(error) 
    }
}

const updateMember = async (req, res) =>{
    try {
        const member = await ModelMember.findOne({where : {id : req.params.id}})
        const {name, facebookUrl, instagramUrl, linkedinUrl, image, description} = req.body
        if(member){
            await ModelMember.update({
                name: name,
                facebookUrl: facebookUrl,
                instagramUrl: instagramUrl,
                linkedinUrl: linkedinUrl,
                image: image,
                description: description
            },
            {
                where: {id : req.params.id}
            })
            res.status(200).send(member)
        }else{
            res.status(404).send("Member does not exist")
        }        
    } catch (error) {
        res.status(500).send(error)
        
    }
}

const deleteMember = async (req, res) =>{
    res.send('Hello from delete member')
}


module.exports = {
    getAllMember,
    createMember,
    updateMember,
    deleteMember
}