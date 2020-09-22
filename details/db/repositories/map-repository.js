const Map = require('../../../entities/map');

module.exports = class MapRepository {
    constructor(DBSource) {
        this.DBSource = DBSource;
    }

    async getAllByUserId(userId) {
        let rows = await this.DBSource.getAllByUserId(userId);
        let maps = [];
        for (let i = 0; i < rows.length; ++i) {
            let row = rows[i];
            // noinspection JSUnresolvedVariable
            maps.push(new Map(row.map_id, row.user_id, row.center_location, row.name));
        }
        return maps;
    }

    async getOneById(mapId) {
        let row = await this.DBSource.getOneById(mapId);
        if (row === undefined) {
            return null;
        } else {
            // noinspection JSUnresolvedVariable
            return new Map(row.map_id, row.user_id, row.center_location, row.name);
        }
    }
}