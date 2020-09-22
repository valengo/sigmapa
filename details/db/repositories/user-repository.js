const User = require('../../../entities/user');

module.exports = class UserRepository {
    constructor(DBSource, RemoteAuthService) {
        this.DBSource = DBSource;
        this.RemoteAuthService = RemoteAuthService;
    }

    async getUserByEmail(email) {
        let row = await this.DBSource.getUserByEmail(email);
        if (row === undefined) {
            return null;
        }
        // noinspection JSUnresolvedVariable
        return new User(row.user_id, row.role_id, row.uid, row.email, row.name);
    }

    async addUser(user) {
        await this.DBSource.add(user);
    }

    async update(user) {
        await this.DBSource.update(user);
    }

}