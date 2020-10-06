const {ReportStatus} = require('../../../entities/enumerations');

module.exports = (UserRepository, MapRepository, ReportRepository) => {
    async function Perform(report, userEmail) {

        let user = await UserRepository.getUserByEmail(userEmail);
        if (user === null || user === undefined) {
            throw new Error(`Failed getting user data with email ${userEmail}. Does it exist?`);
        }

        report.userId = user.userId;

        report.reportStatusId = ReportStatus.NEW;

        // TODO for now, all maps are public
        // TODO check if map exists
        return await ReportRepository.add(report);
    }

    return {
        Perform
    };
}