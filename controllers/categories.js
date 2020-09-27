const GetAll = require('../application/use_cases/categories/get-categories');

module.exports = (dependencies) => {
    let {CategoryRepository} = dependencies;

    const GetAllCategories = (req, res, next) => {
        let GetAllCategoriesUseCase = GetAll(CategoryRepository);

        GetAllCategoriesUseCase.Perform().then(categories => {
            res.send(JSON.stringify(categories));
        }, error => {
            next(error);
        });
    }

    return {
        GetAllCategories
    }
}