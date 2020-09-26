const express = require('express');
const ReportController = require('../controllers/report');

const reportRouter = (dependencies) => {
    const router = express.Router();
    let controller = ReportController(dependencies);

    router.route('/').post(controller.AddReport);

    return router;
};

module.exports = reportRouter;