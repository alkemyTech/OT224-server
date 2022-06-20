const ModeloUser = require('../models').User;
const bcrypt = require('bcryptjs')

const getAllUsers = async(req, res) =>{
    try {
        const users =  await ModeloUser.findAll()
        if(!users){
            res.status(400).json({
                msg: 'users not found'
            })
        }else{
            res.status(200).send(users)
        }
    } catch (error) {
        res.status(500).send(error)       
    }
}

const createUser = async (req, res) =>{
    res.send('hello from create user')
}

const updateUser = async (req, res) =>{
    const editUser = await db.ModeloUser.findByPk(req.params.id,{
        include: [{ association: 'roles' }]
    })
    try{
        if(editUser){
            editUser.update({
                firstName: !req.body.firstName ?  editUser.firstName : req.body.firstName ,
                lastName: !req.body.lastName ? editUser.lastName :  req.body.lastName ,
                email: !req.body.email ? editUser.email : req.body.email,
                image: !req.file ?  editUser.file : req.file.filename,                
            })
        }else{
            res.status(404).json({
                msg:'No se encontro el usuario',
                status:404
            })
        }
    } catch (err) { console.log(err) }
}

const deleteUser = async (req, res) =>{
    res.send('Hello from delete user')
}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}
