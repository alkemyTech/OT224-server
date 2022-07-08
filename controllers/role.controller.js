const { Role } = require('../models');


const createRole = async( req, res ) => {
    try{
        let roles = req.body;
        roles = await Role.create(roles);
        res.status(201).send({
            data: roles,
            status:201
        })
    } catch (error) {
        res.status(500).send(error);
    }
}

const getAllRoles = async( req, res ) => {
    try{
        const roles = await Role.findAll()
        res.status(200).send(roles)
    } catch (error) {
        res.status(500).send(error);
    }
}

const getRoleById = async( req, res ) => {
    try{
        const role = await Role.findByPk(req.params.id);
        if(!role) {
            res.status(404).send({
                message:'Role no found!',
                status:404
            })
        }else {
            res.status(200).send(role);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteRole = async( req, res ) => {
    try{
        const roles = await Role.findOne({
            where:{
                id: req.params.id
            }
        })
        if(!roles) {
            res.status(404).send({
                message:'Role no found!',
                status:404
            })
        }else {
            roles.destroy(roles)
            res.status(200).send({ message:'Role delete' })
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateRole = async( req, res ) => {
    try{
        const role = await Role.findByPk(req.params.id)
        if(!role){
            res.status(404).send({
                message:'Role no found!',
                status:404
            })
        }else {
            const updateRole = await Role.update(req.body,{where: { id: req.params.id}});

            if(updateRole == 1){
                const updatedRole = await Role.findByPk(req.params.id);
                res.status(201).send( updatedRole);
            }
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createRole,
    getAllRoles,
    getRoleById,
    deleteRole,
    updateRole
}