const express = require('express');
const CategoriesController = require('../controllers/categories');

const categoryRouter = (dependencies) => {
    const router = express.Router();
    let controller = CategoriesController(dependencies);

    router.route('/').get(controller.GetAllCategories);

    return router;
};

module.exports = categoryRouter;