const ModelMember = require('../models').Member
const { Op } = require('sequelize')
const ModelHelper = require("../helpers/modelHelper")
const modelHelper = new ModelHelper(ModelMember)

const getAllMember = async (req, res) => {

    try {
        const page = req.query.page || 1
        const members = await modelHelper.findAndPaginate(page)
        return res.status(200).json(members);
    } catch (error) {
        res.status(400).send(error)

    }
}

const createMember = async (req, res) => {
    res.send('hello from create member')
}

const updateMember = async (req, res) => {
    res.send('Hello from update member')
}

const deleteMember = async (req, res) => {
    res.send('Hello from delete member')
}


module.exports = {
    getAllMember,
    createMember,
    updateMember,
    deleteMember
}