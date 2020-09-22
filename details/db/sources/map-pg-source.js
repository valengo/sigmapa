const DBSource = require('../../../application/contracts/db-source');

module.exports = class MapPGSource extends DBSource {
    constructor(db) {
        super();

        this.db = db;
    }

    async getAllByUserId(userId) {
        let text = 'SELECT * FROM maps WHERE user_id = $1';
        try {
            return (await this.db.query(text, [userId])).rows;
        } catch (error) {
            throw new Error('Failed while getting maps by userId -> ' + error.message);
        }
    }

    async getOneById(mapId) {
        let text = 'SELECT * FROM maps WHERE map_id = $1';
        try {
            return (await this.db.query(text, [mapId])).rows[0];
        } catch (error) {
            throw new Error('Failed while getting main map -> ' + error.message);
        }
    }
}