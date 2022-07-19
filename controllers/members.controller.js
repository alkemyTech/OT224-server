const ModelMember = require('../models').Member;
const baseController = require("./base.controller")

const getAllMember = async (req, res) => {
    return baseController.getAllModels(req, res, ModelMember)
}

const getMemberById = async (req, res) => {
    return baseController.getModelById(req, res, ModelMember)
}

const createMember = async (req, res) =>{
    const {name, facebookUrl, instagramUrl, linkedinUrl, image, description} = req.body;
    const data = {name, facebookUrl, instagramUrl, linkedinUrl, image, description}
    return baseController.createModel(res, ModelMember, data)

}

const updateMember = async (req, res) =>{
    const {name, facebookUrl, instagramUrl, linkedinUrl, image, description} = req.body;
    const data = {name, facebookUrl, instagramUrl, linkedinUrl, image, description}
    return baseController.updateModel(req, res, ModelMember, data)
}

const deleteMember = async (req, res) =>{
    return baseController.deleteModel(req, res, ModelMember)
}


module.exports = {
    getAllMember,
    createMember,
    updateMember,
    deleteMember,
    getMemberById
}