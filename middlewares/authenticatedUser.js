const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authenticatedUser = async ( req, res, next ) =>{

    let token = req.header('Authorization');

    if( !token ){
        return res.status(403).json({
            msg: 'The request does not have a token'
        })
    }

    if (token && token.toLowerCase().startsWith('bearer')) {
        token = token.substring(7)
    } 

    try{

        const { user } = jwt.verify( token , process.env.PRIVATE_KEY);
        
        const userdb = await User.findOne({where: { email: user.email }} )
      
        if( !userdb ){
            return res.status(401).json({
                msg: 'User does not exist'
            })
        }

        req.user = userdb

        next()

    }catch( error ){
        console.log( error )
        return res.status(401).json({
            msg: 'Invalid token'
        })
        
    }
}


module.exports = {
    authenticatedUser
}