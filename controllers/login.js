const Login = require('../application/use_cases/user/login');

module.exports = function (dependencies) {
    let {RemoteAuthService} = dependencies;
    let {UserRepository} = dependencies;

    const login = (req, res, next) => {
        let LoginUseCase = Login(RemoteAuthService, UserRepository);
        let {authorization} = req.headers;

        LoginUseCase.Perform(authorization).then(user => {
            req.session.user = user;
            res.redirect('/');
        }, (error) => {
            console.log('Failed when trying to login -> ' + error.message);
            next(error);
        });
    };

    return {
        login
    };
}