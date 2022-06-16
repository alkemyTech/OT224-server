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
    res.send('hello from create member')
}

const updateMember = async (req, res) =>{
    res.send('Hello from update member')
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