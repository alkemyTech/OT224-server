

const tokenParser = ( req ) => {

    let token = req.headers['authorization'] || false

    if(!token){
        return false
    }
    
    if (token && token.toLowerCase().startsWith('bearer')) {
        token = token.substring(7)
    } 

    return token
}

module.exports = {
    tokenParser
}