const Report = require('../entities/report');
const AddNewReport = require('../application/use_cases/report/add-report');
const RefuseReport = require('../application/use_cases/report/refuse-report');
const AcceptReport = require('../application/use_cases/report/accept-report');


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
            let {note} = req.body.report.note;
            email = req.session.email;

            report = new Report(null, null, mapId,
                subcategoryId, null, location, note);
        } catch (error) {
            throw new Error('Failed parsing body request -> ' + error);
        }

        AddNewReportUseCase.Perform(report, email).then((report) => {
            res.send(JSON.stringify(report));
        }, error => {
            next(error);
        });
    };

    const Refuse = (req, res, next) => {
        let RefuseReportUseCase = RefuseReport(UserRepository, ReportRepository);

        let reportId;
        let userEmail;

        try {
            let {email} = req.session;
            let {id} = req.params;

            userEmail = email;
            reportId = id;

        } catch (error) {
            throw new Error('Failed parsing request -> ' + error);
        }

        RefuseReportUseCase.Perform(reportId, userEmail).then(() => {
            res.sendStatus(200);
        }, error => {
            next(error);
        });

    };

    const Accept = (req, res, next) => {
        let AcceptReportUseCase = AcceptReport(UserRepository, ReportRepository);

        let reportId;
        let userEmail;

        try {
            let {email} = req.session;
            let {id} = req.params;

            userEmail = email;
            reportId = id;

        } catch (error) {
            throw new Error('Failed parsing request -> ' + error);
        }

        AcceptReportUseCase.Perform(reportId, userEmail).then(() => {
            res.sendStatus(200);
        }, error => {
            next(error);
        });

    };

    return {
        AddReport,
        Refuse,
        Accept
    };
}