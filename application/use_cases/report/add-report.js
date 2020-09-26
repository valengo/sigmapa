module.exports = (UserRepository, MapRepository, ReportRepository) => {
    async function Perform(report, userEmail) {
        let user = await UserRepository.getUserByEmail(userEmail);
        if (user === null || user === undefined) {
            throw new Error(`Failed getting user data with email ${userEmail}. Does it exist?`);
        }

        report.userId = user.userId;

        // TODO should get from repo
        report.reportStatusId = 'N';

        // TODO for now, all maps are public
        // TODO check if map exists
        await ReportRepository.add(report);
    }

    return {
        Perform
    };
}