const ModeloUser = require('../models').User

const verifyIsAdmin = async(req, res, next) =>{
    const userData =  await ModeloUser.findOne({where: {firstname: req.body.firstname}})
    if(userData){
       if(userData.roleId === 1){
        next()
       }else{
        res.send("You do not have the necessary permissions")
       }
    }else{
        res.send("The user with that name does not exist")
    }

    
}

module.exports={
    verifyIsAdmin
}

