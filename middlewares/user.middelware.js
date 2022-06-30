const jwt = require('jsonwebtoken')
const { tokenParser } = require('../helpers/tokenParser')
const {ADMIN_ROLE_ID} = require('../sharedConstants')


const verifyIsAdmin = (req, res, next) =>{
    
    const token = tokenParser( req )
    
    if(token){
        try {        
            const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY)
            if(decodedToken.user.roleId === ADMIN_ROLE_ID){
                next()
            }else{
                res.status(401).send("you do not have the necessary permissions")
            }        
        } catch (error) {
            res.send(error)        
        }

    }else{
        return res.status(400).json({
            msg: 'The request does not have a token'
        })
    }
}

module.exports = {
    verifyIsAdmin,
}
