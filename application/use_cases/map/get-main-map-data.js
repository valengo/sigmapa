const {UserRoles} = require('../../../entities/enumerations');

module.exports = (UserRepository, MapRepository, MarkerRepository, ReportRepository) => {
    async function Perform(userEmail, mainMapId) {

        let user = await UserRepository.getUserByEmail(userEmail);
        if (user === null || user === undefined) {
            throw new Error(`Failed getting user data with email ${userEmail}. Does it exist?`);
        }

        let map = await MapRepository.getOneById(mainMapId);
        if (map === null || map === undefined) {
            throw new Error(`Failed getting main map with id ${mainMapId}. Does it exist?`);
        }

        let markers = await MarkerRepository.getAllByMapId(mainMapId);

        let reports = []
        if (user.roleId === UserRoles.ADMIN) {
            reports = await ReportRepository.getAllByMapId(mainMapId);
        } else {
            reports = await ReportRepository.getAllByUserIdAndMapId(user.userId, mainMapId);
        }
        return {user: user, map: map, markers: markers, reports: reports}
    }

    return {
        Perform
    };

}