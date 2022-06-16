const Sequelize = require('sequelize');
const sequelize = require('../models/index').sequelize;

// Bring in Model
const Organization = require("../models/organization")(sequelize, Sequelize.DataTypes, Sequelize.Model);


//Create and save a organization
module.exports = {
 create(req, res) {
    return Organization
        .create ({
            name: req.body.name,
            image: req.body.image,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            welcomeText: req.body.welcomeText,
            aboutUsText: req.body.aboutUsText
        })
        .then(Organization => res.status(200).send(Organization))
        .catch(error => res.status(400).send(error))
 }
}