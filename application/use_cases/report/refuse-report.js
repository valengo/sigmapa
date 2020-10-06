const {UserRoles} = require('../../../entities/enumerations');
const {ReportStatus} = require('../../../entities/enumerations');

module.exports = (UserRepository, ReportRepository) => {
    async function Perform(reportId, userEmail) {
        let user = await UserRepository.getUserByEmail(userEmail);
        if (user === null || user === undefined) {
            throw new Error(`Failed getting user data with email ${userEmail}. Does it exist?`);
        }

        // TODO should return 401
        if (user.roleId !== UserRoles.ADMIN) {
            let error = new Error('User is not allowed to perform this action!');
            error.code = "401";
            throw error;
        }

        // TODO should check if report exists
        await ReportRepository.updateStatus(reportId, ReportStatus.REFUSED);
    }

    return {
        Perform
    };
}