const ModeloUser = require('../models').User;

const getAllUsers = async(req, res) =>{
    const users =  await ModeloUser.findAll()
    res.send(users)

}

module.exports = {
    getAllUsers
}