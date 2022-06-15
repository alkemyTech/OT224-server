const ModelMember = require('../models').Member;

const getAllMember = async(req, res) =>{
    const members = await ModelMember.findAll()
    try {
        members.length === 0 ? (res.send("Empty database")) : (res.send(members))        
        
    } catch (error) {
        res.status(400).send(error)
        
    }
}

module.exports = {
    getAllMember
}