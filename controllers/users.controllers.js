const ModeloUser = require('../models').User;

const verifyIsAdmin = async(req, res, next) =>{
    const userData =  await ModeloUser.findOne({where: {firstname: req.body.firstname}})
    if(userData){
       if(userData.roleId === 1){
        next()
       }else{
        res.send("No tiene los permisos necesarios")
       }
    }else{
        res.send("no existe el usuario con ese nombre")
    }

    
}

const getAllUsers = async(req, res) =>{
    const users =  await ModeloUser.findAll()
    res.send(users)

}

module.exports = {
    verifyIsAdmin,
    getAllUsers
}