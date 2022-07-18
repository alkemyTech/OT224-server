const { validateActivity } = require('./activity.validator');
const { validateCreate } = require('./authValidator');
const { validateCategories } = require('./categoriesValidator');
const { validateComments } = require('./commentValidator');
const { contactsValidators } = require('./contactsValidators');
const { validateMembers } = require('./members.validator');
const { validateNews } = require('./newsValidator');
const { validateOrganization } = require('./organizationValidator');
const { validateRoles } = require('./rolesValidator');
const { validateSlide, validateSlideToUpdate } = require('./slideValidator');
const { validateTestimonial, validateUpdateTestimonial } = require('./testimonials.validator');
const { validateRegister } = require('./validatorRegister');

module.exports = {
    validateActivity,
    validateCreate,
    validateCategories,
    validateComments,
    contactsValidators,
    validateMembers,
    validateNews,
    validateOrganization,
    validateRoles,
    validateSlide, 
    validateSlideToUpdate,
    validateTestimonial,
    validateUpdateTestimonial,
    validateRegister
}