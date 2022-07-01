const jwt = require('jsonwebtoken');
const { tokenParser } = require('../helpers/tokenParser');
const { COMMENTS_ADMIN_ROLE_ID, ADMIN_ROLE_ID } = require('../sharedConstants');

const verifyIsCommentsAdmin = (req, res, next) => {

    const token = tokenParser( req ) 
    
    if (token) {
        try {
            const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY)            
            if(decodedToken.user.roleId == COMMENTS_ADMIN_ROLE_ID || decodedToken.user.roleId == ADMIN_ROLE_ID){
                console.log("paso el token:" +decodedToken.user.roleId);
                next();                
            }else{
                res.status(401).send({"message":"You do not have the necessary permissions"});
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }else{
        return res.status(400).send({"message":"The request does not have a token"});
    }
}

module.exports = {
    verifyIsCommentsAdmin
}