const ModeloUser = require('../models').User;

const getAllUsers = async(req, res) =>{
    const users =  await ModeloUser.findAll()
    try {
        if(users){
            res.send(users)
        }     
    } catch (error) {
        res.send(error)        
    }
}

const createUser = async (req, res) =>{
    res.send('hello from create user')
}

const updateUser = async (req, res) =>{
    res.send('Hello from update user')
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