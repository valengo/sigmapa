const DBSource = require('../../../application/contracts/db-source');

module.exports = class MarkerPGSource extends DBSource {
    constructor(db) {
        super();

        this.db = db;
    }

    async getAllByMapId(mapId) {
        let text = 'SELECT * FROM markers WHERE map_id = $1';
        try {
            return (await this.db.query(text, [mapId])).rows;
        } catch (error) {
            throw new Error('Failed while getting markers by mapId -> ' + error.message);
        }
    }
}
