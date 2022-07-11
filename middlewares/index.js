const { authenticatedUser } = require('./authenticatedUser');
const { verifyIsCommentsAdmin } = require('./commentsAdminRole');
const { isOwner } = require('./isOwner');
const { verifyIsMemberAdmin } = require('./member.middleware');
const { verifyIsAdmin } = require('./user.middelware');
const { verifyFile } = require('./verifyFile');

module.exports = {
    authenticatedUser,
    verifyIsCommentsAdmin,
    isOwner,
    verifyIsMemberAdmin,
    verifyIsAdmin,
    verifyFile
}
