const ModelRole = require('../models').Role;
const baseController = require("./base.controller")

const createRole = async( req, res ) => {
    const {name,description}=req.body
    const inputVars={name,description}
return baseController.createModel( res, ModelRole, inputVars) 
}

const getAllRoles = async( req, res ) => {
    return baseController.getAllModels(req, res, ModelRole)
}

const getRoleById = async( req, res ) => {
    return baseController.getModelById(req, res, ModelRole)
}

const deleteRole = async( req, res ) => {
    return baseController.deleteModel(req, res, ModelRole)
}

const updateRole = async( req, res ) => {
    const {name,description}=req.body
    const inputVars={name,description}
    return baseController.updateModel(req, res, ModelRole, inputVars) 
}

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  deleteRole,
  updateRole
 };
