const Report = require('../entities/report');
const AddNewReport = require('../application/use_cases/report/add-report');

module.exports = function (dependencies) {
    let {UserRepository} = dependencies;
    let {MapRepository} = dependencies;
    let {ReportRepository} = dependencies;

    const AddReport = (req, res, next) => {
        let AddNewReportUseCase = AddNewReport(UserRepository, MapRepository, ReportRepository);

        let report;
        let email;
        
        try {
            let {mapId} = req.body.report;
            let {subcategoryId} = req.body.report;
            let location = [req.body.report.location.lat, req.body.report.location.long];
            let {note} = req.body.note;
            email = req.session.email;

            report = new Report(null, null, mapId,
                subcategoryId, null, location, note);
        } catch (error) {
            throw new Error('Failed parsing body request');
        }

        AddNewReportUseCase.Perform(report, email)
            .then(() => {
                res.sendStatus(200);
            }).catch(next);
    }

    return {
        AddReport
    };
}