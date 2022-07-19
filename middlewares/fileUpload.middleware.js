const fileUpload= require('express-fileupload')
require('dotenv').config()
const environment = process.env.NODE_ENV || 'development';
const configObject = require('../config/config');
const config = configObject[environment];

const optionsFileUpload = fileUpload({
    useTempFiles: config.useTempFiles,
    tempFileDir : config.tempFileDir,
    debug: config.debug
})

module.exports = { optionsFileUpload };