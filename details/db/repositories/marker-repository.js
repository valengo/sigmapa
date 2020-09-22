const Marker = require('../../../entities/marker');

module.exports = class MarkerRepository {
    marker_id;
    map_id;
    subcategory_id;
    constructor(DBSource) {
        this.DBSource = DBSource;
    }

    async getAllByMapId(mapId) {
        let rows = await this.DBSource.getAllByMapId(mapId);
        let markers = [];

        for (let i = 0; i < rows.length; ++i) {
            let row = rows[i];
            markers.push(new Marker(row.marker_id, row.map_id, row.subcategory_id, row.location));
        }
        return markers;
    }
}