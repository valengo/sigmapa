const express = require('express');
const LoginController = require('../controllers/login');

const loginRouter = (dependencies, defaultValues) => {
    let router = express.Router();
    let controller = LoginController(dependencies, defaultValues);

    router.route('/').post(controller.login);
    router.route('/').get((
        req,
        res) => {
        res.render('login');
    });

    return router;
};

module.exports = loginRouter;
