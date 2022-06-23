const { Role } = require('../models');


const isOwner = async (req, res, next) =>{

    const idUrl = req.params.id;

    const { id: idUser, roleId  } = req.user;
    
    try {
        const adminRol = await Role.findOne({where: { name: 'Admin'}})

        if( idUrl === idUser ) {
            next()
        }else if(  roleId === adminRol.id ){
            next()  
        }else{
            return res.status(403).json({
                msg: 'You do not have the permissions to do this action'
            })
        }

    } catch (error) {
        console.log( error )
        res.status(500).json({
            msg: 'Something went wrong call te admin'
        })
    }

   
    
}

module.exports = {
    isOwner
}
