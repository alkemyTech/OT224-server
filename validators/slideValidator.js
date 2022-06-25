const { Organization } = require('../models')
const { check } = require('express-validator');
const { validateResult } = require('../helpers/validate');
const verifyFile  = require('../middlewares/verifyFile');
const { verifyIsAdmin } = require('../middlewares/user.middelware');


const validateSlide = [
    verifyIsAdmin,
    check('text','Slide text cannot be empty').not().isEmpty(),
    check('organizationId').custom( async(id) => {

    const existsOrganization = await Organization.findByPk(id);
    if(!existsOrganization){
        throw new Error('Invalid organization id')
    }
    }),
    verifyFile,
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = {
    validateSlide
}