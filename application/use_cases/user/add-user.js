const User = require('../../../entities/user');
const assert = require('assert');

module.exports = (UserRepository) => {

    /**
     *
     * @param {User} user
     * @returns {Promise<void>}
     * @constructor
     */
    async function Execute(user) {
        assert.ok(typeof (user.userId) === 'string')
        assert.ok(user.isValid(), 'User must be va');
    }
}