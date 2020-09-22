const express = require('express');
const MainMapController = require('../controllers/main-map');

const mainMapRouter = (dependencies, defaultValues) => {
    const router = express.Router();
    let controller = MainMapController(dependencies, defaultValues);

    router.route('/').get(controller.RenderMainMap);
    router.route('/data').get(controller.LoadMainMapData);

    return router;
};

module.exports = mainMapRouter;
