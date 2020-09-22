const envDevDescription = 'dev'
let env = process.env.NODE_ENV || envDevDescription
if (env === envDevDescription) {
    require('dotenv-safe').config();
}

const db = new (require('../details/db/database-pg'))();
const RemoteAuthService = new (require('../details/remote-auth-firebase'))();
const UserDBSource = new (require('../details/db/sources/user-pg-source'))(db);
const MapDBSource = new (require('../details/db/sources/map-pg-source'))(db);
const MarkerDBSource = new (require('../details/db/sources/marker-pg-source'))(db);
const ReportDBSource = new (require('../details/db/sources/report-pg-source'))(db);
const UserRepository = require('../details/db/repositories/user-repository');
const MapRepository = require('../details/db/repositories/map-repository');
const MarkerRepository = require('../details/db/repositories/marker-repository');
const ReportRepository = require('../details/db/repositories/report-repository');


module.exports = (() => {
    return {
        DatabaseService: db,
        RemoteAuthService: RemoteAuthService,
        UserDBSource: UserDBSource,
        UserRepository: new UserRepository(UserDBSource, RemoteAuthService),
        MapRepository: new MapRepository(MapDBSource),
        MarkerRepository: new MarkerRepository(MarkerDBSource),
        ReportRepository: new ReportRepository(ReportDBSource)
    };
})();