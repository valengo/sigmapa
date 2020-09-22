const Login = require('../application/use_cases/user/login');

module.exports = function (dependencies) {
    let {RemoteAuthService} = dependencies;
    let {UserRepository} = dependencies;

    const login = (req, res, next) => {
        let LoginUseCase = Login(RemoteAuthService, UserRepository);
        let {authorization} = req.headers;

        LoginUseCase.Perform(authorization).then(user => {
            req.session.email = user.email;
            res.sendStatus(200);
        }, (error) => {
            console.log('Failed when trying to login -> ' + error.message);
            // TODO handle error response
            next(error);
        });
    };

    return {
        login
    };
}