const jwt = require('jsonwebtoken');
const { tokenParser } = require('../helpers/tokenParser');
const { User } = require('../models');

const authenticatedUser = async ( req, res, next ) =>{

    const token = tokenParser( req )

    if(token){
        try{

            const { user } = jwt.verify( token , process.env.PRIVATE_KEY);
            
            const userdb = await User.findOne({where: { email: user.email }, attributes: { exclude: ['password']}})
          
            if( !userdb ){
                return res.status(401).json({
                    msg: 'User does not exist'
                })
            }
    
            req.user = userdb
    
            next()
    
        }catch( error ){
            
            return res.status(500).json({
            msg: 'Something went wrong call the admin'
        })
            
        }
    }else{
       return res.status(400).json({
        msg: 'The request does not have a token'
       })
    }

    
}


module.exports = {
    authenticatedUser
}