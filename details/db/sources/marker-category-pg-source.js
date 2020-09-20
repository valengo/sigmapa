const DBSource = require('../../../application/contracts/db-source');

module.exports = class MakerCategoryPGSource extends DBSource {
    constructor(db) {
        super();

        this.db = db;
    }

    async getAll() {
        let text = 'SELECT * FROM marker_categories';
        try {
            let res = await this.db.query(text);
            return res.rows;
        } catch (error) {
            throw new Error('Failed while getting marker categories -> ' + error.message);
        }
    }
}