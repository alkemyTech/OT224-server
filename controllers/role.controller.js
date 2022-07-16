const { Role } = require('../models');


const createRole = async( req, res ) => {
    try{
        let role = {name:req.body.name, 
                    description : req.body.description};
        role= await Role.create(role);
        res.status(201).json(role)
    } catch (error) {
        res.status(500).json(error);
    }
}

const getAllRoles = async( req, res ) => {
    try{
        const roles = await Role.findAll()
        res.status(200).json(roles)
    } catch (error) {
        res.status(500).json(error);
    }
}

const getRoleById = async( req, res ) => {
    try{
        const role = await Role.findByPk(req.params.id);
        if(!role) {
            res.status(404).json({msg:'Role no found!'})
        }else {
            res.status(200).json(role);
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteRole = async( req, res ) => {
    try{
        const role = await Role.findOne({
            where:{ 
                id: req.params.id
            }
        })
        if(!role) {
            res.status(404).json({msg: 'Role no found!' })
        }else {
            role.destroy(role)
            res.status(200).json({msg: 'Role delete' })
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

const updateRole = async( req, res ) => {
    try{
        const role = await Role.findByPk(req.params.id)
        if(!role){
            res.status(404).json({ msg:'Role no found!' })
        }else {
            const updateRole = await Role.update({name:req.body.name, 
                                                  description:req.body.description
                                                 },{where: { id: req.params.id}});

            if(updateRole == 1){
                const updatedRole = await Role.findByPk(req.params.id);
                res.status(201).json( updatedRole);
            }
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {createRole,
                  getAllRoles,
                  getRoleById,
                  deleteRole,
                  updateRole
                 }