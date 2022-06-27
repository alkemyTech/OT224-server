const ModeloUser = require('../models').User;
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const {welcomeEmail}=require('../services/welcomeEmail')

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

        if (!errors.isEmpty()) {
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
                
        const emailSent=await welcomeEmail(user)
        res.status(200).json({ newUser: user, emailSent})

    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const updateUser = async (req, res) => {
    const editUser = await db.ModeloUser.findByPk(req.params.id, {
        include: [{ association: 'roles' }]
    })
    try {
        if (editUser) {
            editUser.update({
                firstName: !req.body.firstName ? editUser.firstName : req.body.firstName,
                lastName: !req.body.lastName ? editUser.lastName : req.body.lastName,
                email: !req.body.email ? editUser.email : req.body.email,
                image: !req.file ? editUser.file : req.file.filename,
            })
        } else {
            res.status(404).json({
                msg: 'No se encontro el usuario',
                status: 404
            })
        }
    } catch (err) { console.log(err) }
}

const deleteUser = async (req, res) => {
    try {
        const user = await ModeloUser.findOne({where : {id : req.params.id}})
        if(user){
            await ModeloUser.destroy({
                where: {id: req.params.id}
            })
            res.status(200).send("User deleted succefuly")
        }else{
            res.status(404).send("User does not exist")
        }
     } catch (error) {
        res.status(500).send(error)
     }
}

const findMe = async (req, res) => {
    return res.status(200).json(req.user);
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    findMe,
};
