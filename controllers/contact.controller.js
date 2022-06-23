const Contact = require('../models').Contacts


const createContact = async (req,res)=>{

    try {
        const { name, phone, email, message } = req.body 

        const contact = await Contact.create({
            name:name,
            phone:phone,
            email:email,
            message:message
        })

        res.status(200).json({newContact:contact})
    } catch (error) {
        res.status(500).json({
            msg:error
        })
    }
}

module.exports = {
    createContact
}