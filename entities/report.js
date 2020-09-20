module.exports = class Report {
    constructor(reportId, userId, mapId, subcategoryId, reportStatusId, location, note) {
        this.reportId = reportId;
        this.userId = userId;
        this.mapId = mapId;
        this.subcategoryId = subcategoryId;
        this.reportStatusId = reportStatusId;
        this.location = location;
        this.note = note;
    }
}