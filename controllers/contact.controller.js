const Contact = require('../models').Contacts


const createContact = async (req, res) => {

    try {
        const { name, phone, email, message } = req.body

        const contact = await Contact.create({
            name: name,
            phone: phone,
            email: email,
            message: message
        })

        res.status(200).json({
            newContact: contact
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

const getAllContacts = async (req, res) => {

    try {
        const contacts = await Contact.findAll()
        res.status(200).json({
            contacts: contacts
        })

    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

const deleteContact = async (req, res) => {
    try {
        const { id } = req.params

        const response = await Contact.destroy({
            where: {
                id: id
            }
        })
    
        if(!response) return res.status(404).json({
            response:response
        })
        res.status(200).json({
            response:response
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

module.exports = {
    createContact,
    getAllContacts,
    deleteContact
}