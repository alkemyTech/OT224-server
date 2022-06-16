const jwt = require('jsonwebtoken')
const User = require('../models/user');

const validarJWT = async ( req, res, next ) =>{

    const token = req.header('Authorization');

    if( !token ){
        return res.status(401).json({
            msg: 'The request does not have a token'
        })
    }

    try{

        const { uid } = jwt.verify( token , process.env.PRIVATE_KEY);

        const user = await User.findByPk( uid )

        if( !user ){
            return res.status(401).json({
                msg: 'User does not exist'
            })
        }

        req.user = user

        next()

    }catch( error ){
        console.log( error )
        return res.status(401).json({
            msg: 'Invalid token'
        })
        
    }


}


module.exports = {
    validarJWT
}