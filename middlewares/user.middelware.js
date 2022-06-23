const jwt = require('jsonwebtoken')
const ADMIN_ROLE_ID = require('../sharedConstants')


const verifyIsAdmin = (req, res, next) =>{
    const token = req.headers['authorization']

    
    if (token && token.toLowerCase().startsWith('bearer')) {
        token = token.substring(7)
      }   

    if (!token) {
        return res.status(403).send('invalid or nonexistent token')
      } 
      
    try {        
        const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY)
        if(decodedToken.roleId === ADMIN_ROLE_ID){
            next()
        }else{
            res.send("you do not have the necessary permissions")
        }        
    } catch (error) {
        res.send(error)        
    }
}

module.exports = {
    verifyIsAdmin,
}
