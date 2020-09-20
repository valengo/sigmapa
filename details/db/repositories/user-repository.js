module.exports = class UserRepository {
    constructor(DBSource, RemoteAuthService) {
        this.DBSource = DBSource;
        this.RemoteAuthService = RemoteAuthService;
    }

    async getUserByEmail(email) {
        return await this.DBSource.getUserByEmail(email);
    }

    async addUser(user) {
        await this.DBSource.add(user);
    }

    async update(user) {
        await this.DBSource.update(user);
    }
}