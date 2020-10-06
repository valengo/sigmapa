const Report = require('../../../entities/report');

module.exports = class ReportRepository {
    report_id;
    report_status_id;

    constructor(DBSource) {
        this.DBSource = DBSource;
    }

    async getAllByUserIdAndMapId(userId, mapId) {
        let rows = await this.DBSource.getAllByUserIdAndMapId(userId, mapId);
        return this._mapReports(rows);
    }

    async getAllByMapIdAndStatusId(mapId, statusId) {
        let rows = await this.DBSource.getAllByMapIdAndStatusId(mapId, statusId);
        return this._mapReports(rows);
    }

    async getAllByMapId(mapId) {
        let rows = await this.DBSource.getAllByMapId(mapId);
        return this._mapReports(rows);
    }

    async add(report) {
        let added_report = await this.DBSource.add(report);
        return new Report(added_report.report_id, added_report.user_id, added_report.map_id, added_report.subcategory_id,
            added_report.report_status_id, added_report.location, added_report.note)
    }

    async updateStatus(reportId, statusId) {
        await this.DBSource.updateStatusForReportId(reportId, statusId);
    }

    _mapReports(rows) {
        let reports = [];

        for (let i = 0; i < rows.length; ++i) {
            let row = rows[i];
            reports.push(new Report(row.report_id, row.user_id, row.map_id, row.subcategory_id,
                row.report_status_id, row.location, row.note))
        }
        return reports;
    }
}