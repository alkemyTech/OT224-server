const ModeloUser = require('../models').User;

const getAllUsers = async(req, res) =>{
    try {
        const users =  await ModeloUser.findAll()
        if(!users){
            res.status(400).json({
                msg: 'users not found'
            })
        }else{
            res.status(200).json({
                users:users,
                success: true
            })
        }
    } catch (error) {
        res.status(500).json(error)       
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