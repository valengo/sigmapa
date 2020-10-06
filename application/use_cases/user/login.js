const User = require('../../../entities/user');

module.exports = (RemoteAuthService, UserRepository) => {
    async function Perform(idToken) {
        let decodedToken = await RemoteAuthService.getDecodedToken(idToken);
        let user = await UserRepository.getUserByEmail(decodedToken.email);
        if (user === undefined || user == null) {
            // TODO: add validations
            user = new User(null, 'U', decodedToken.uid, decodedToken.email, decodedToken.name);
            await UserRepository.addUser(user);
        } else if (user.uid === null) {
            user = new User(user.userId, user.roleId, decodedToken.uid, user.email, decodedToken.name);
            // TODO: add validations
            await UserRepository.update(user);
        }
        return user;
    }

    return {
        Perform
    };
};