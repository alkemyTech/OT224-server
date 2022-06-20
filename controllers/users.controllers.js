const ModeloUser = require('../models').User;
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

const getAllUsers = async (req, res) => {
    try {
        const users = await ModeloUser.findAll()
        if (!users) {
            res.status(400).json({
                msg: 'users not found'
            })
        } else {
            res.status(200).send(users)
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, photo, roleId } = req.body

        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(422).json({ errors: errors.array() })
        }
        const pass = bcrypt.hashSync(password, parseInt(process.env.SALT))

        const user = await ModeloUser.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            photo: photo,
            password: pass,
            roleId: roleId
        })
        res.status(200).json({ newUser: user })
    } catch (error) {
        res.status(500).json({ error:error})
    }
}

const updateUser = async (req, res) => {
    res.send('Hello from update user')
}

const deleteUser = async (req, res) => {
    res.send('Hello from delete user')
}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}
