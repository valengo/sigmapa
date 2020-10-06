const express = require('express');
const ReportController = require('../controllers/report');

const reportRouter = (dependencies) => {
    const router = express.Router();
    let controller = ReportController(dependencies);

    router.route('/').post(controller.AddReport);
    router.route('/refuse/:id').put(controller.Refuse);
    router.route('/accept/:id').put(controller.Accept);


    return router;
};

module.exports = reportRouter;