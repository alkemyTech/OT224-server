const jwt = require('jsonwebtoken')

const tokenGenerator = (user) => {

    const token = jwt.sign({
        user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            photo: user.photo,
            roleId: user.roleId
        }
    },
        process.env.PRIVATE_KEY,
        {
            expiresIn: process.env.EXPIRES_IN
        }
        )
    return token

}

module.exports = { tokenGenerator }