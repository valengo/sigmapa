const Report = require('../../../entities/report');

module.exports = class ReportRepository {
    report_id;
    report_status_id;

    constructor(DBSource) {
        this.DBSource = DBSource;
    }

    async getAllByUserIdAndMapId(userId, mapId) {
        let rows = await this.DBSource.getAllByUserIdAndMapId(userId, mapId);
        let reports = [];

        for (let i = 0; i < rows.length; ++i) {
            let row = rows[i];
            reports.push(new Report(row.report_id, row.user_id, row.map_id, row.subcategory_id,
                row.report_status_id, row.location, row.note))
        }
        return reports;
    }

    async add(report) {
        await this.DBSource.add(report);
    }


}