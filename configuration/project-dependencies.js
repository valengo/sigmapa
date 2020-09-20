const envDevDescription = 'dev'
let env = process.env.NODE_ENV || envDevDescription
if (env === envDevDescription) {
    require('dotenv-safe').config();
}

const db = new (require('../details/db/database-pg'))();
const RemoteAuthService = new (require('../details/remote-auth-firebase'))();
const UserDBSource = new (require('../details/db/sources/user-pg-source'))(db);
const UserRepository = require('../details/db/repositories/user-repository');


module.exports = (() => {
    return {
        DatabaseService: db,
        RemoteAuthService: RemoteAuthService,
        UserDBSource: UserDBSource,
        UserRepository: new UserRepository(UserDBSource, RemoteAuthService)
    };
})();