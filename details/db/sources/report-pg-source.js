const DBSource = require('../../../application/contracts/db-source');

module.exports = class ReportPGSource extends DBSource {
    constructor(db) {
        super();

        this.db = db;
    }

    async add(report) {
        let text = 'INSERT INTO reports(user_id, subcategory_id, report_status_id, location, note) VALUES ($1, $2, $3, $4, $5) RETURNING report_id';
        let values = [report.userId, report.subcategoryId, report.reportStatusId, report.location, report.note];
        try {
            return (await this.db.query(text, values)).rows;
        } catch (error) {
            throw new Error('Failed while adding new report -> ' + error.message);
        }
    }

    async update(report) {
        let text = 'UPDATE reports SET subcategory_id = $1, report_status_id = $2, location = $3, note = $4 WHERE report_id = $5'
        let values = [report.subcategoryId, report.reportStatusId, report.location, report.note];
        try {
            return (await this.db.query(text, values)).rows;
        } catch (error) {
            throw new Error('Failed while updating a report -> ' + error.message);
        }
    }

    async delete(report) {
        let text = 'DELETE FROM reports WHERE report_id = $1';
        try {
            return await this.db.query(text, [report.reportId])
        } catch (error) {
            throw new Error('Failed while deleting a report -> ' + error.message);
        }
    }

    async getAllByUserId(userId) {
        let text = 'SELECT * FROM reports WHERE user_id = $1';
        try {
            return (await this.db.query(text, [userId])).rows;
        } catch (error) {
            throw new Error('Failed while getting all reports by userId -> ' + error.message);
        }
    }
}