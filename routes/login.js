const express = require('express');
const LoginController = require('../controllers/login');

const loginRouter = (dependencies) => {
    let router = express.Router();
    let controller = LoginController(dependencies);

    router.route('/').post(controller.login);
    router.route('/').get((
        req,
        res) => {
        res.render('login');
    });

    return router;
};

module.exports = loginRouter;
