const CategoryRepository = (() => {
    let _categories = [];
    let _subcategories = [];
    let _subcategoriesMap = [];

    return {
        update: (categories, subcategories) => {
            _categories = categories;
            _subcategories = subcategories;
        },
        getSubcategoryId: (id) => {
            return _subcategories.find(c => c.subcategoryId === id);
        },
        getCategoryId: () => {
            return _categories.find(c => c.categoryId === id);
        }
    };
})();