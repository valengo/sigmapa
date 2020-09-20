const User = require('../../../entities/user');

module.exports = (RemoteAuthService, UserRepository) => {
    async function Perform(idToken) {
        let decodedToken = await RemoteAuthService.getDecodedToken(idToken);
        let user = await UserRepository.getUserByEmail(decodedToken.email);

        if (user === undefined) {
            user = new User(null, 'U', decodedToken.uid, decodedToken.email, decodedToken.name);
            await UserRepository.addUser(user);
        }

        return user;
    }

    return {
        Perform
    };
};