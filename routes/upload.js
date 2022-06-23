const express= require('express');
const router = express();
const uploadControllers= require('../controllers/upload.controller')
const verifyFile = require('../middlewares/verifyFile')

router.post('/',verifyFile, uploadControllers)

module.exports= router