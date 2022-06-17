const jwt = require('jsonwebtoken')

const verifyIsAdmin = (req, res, next) =>{
    const token = req.headers['authorization']

    if (!token) {
        return res.status(403).send('invalid or nonexistent token')
      } 
      
    try {        
        const decodedToken = jwt.verify(token, process.env.PALABRA_SECRETA)
        if(decodedToken.rol === 1){
            next()
        }else{
            res.send("you do not have the necessary permissions")
        }        
    } catch (error) {
        res.send(error)        
    }
}

module.exports = verifyIsAdmin
