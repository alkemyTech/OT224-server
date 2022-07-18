const { authenticatedUser } = require('./authenticatedUser');
const { verifyIsCommentsAdmin } = require('./commentsAdminRole');
const { isOwner } = require('./isOwner');
const { verifyIsMemberAdmin } = require('./member.middleware');
const { verifyIsAdmin } = require('./user.middelware');
const { verifyFile } = require('./verifyFile');
const { idExists } = require('./idExists.middleware');

module.exports = {
    authenticatedUser,
    verifyIsCommentsAdmin,
    isOwner,
    verifyIsMemberAdmin,
    verifyIsAdmin,
    verifyFile,
    idExists
}
