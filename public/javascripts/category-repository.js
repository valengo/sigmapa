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
        getCategoryId: (subcategoryId) => {
            return _subcategories.find(c => c.subcategoryId === subcategoryId).categoryId;
        },
        getSubcategories: (categoryId) => {
            return _subcategories.filter(c => c.categoryId === categoryId);
        },
        getAllCategories: () => {
            return _categories;
        },
        getSubcategory: (subcategoryId) => {
            return _subcategories.find(c => c.subcategoryId === subcategoryId);
        }
    };
})();