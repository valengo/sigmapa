const MarkerCategory = require('../../../entities/marker-category');
const MarkerSubcategory = require('../../../entities/marker-subcategory');

// noinspection JSUnresolvedVariable
module.exports = class CategoryRepository {
    constructor(categoryDBSource, subcategoryDBSource) {
        this.categoryDBSource = categoryDBSource;
        this.subcategoryDBSource = subcategoryDBSource;
    }

    async getAll() {
        let categories = [];
        let subcategories = [];

        let categoryRows = await this.categoryDBSource.getAll();
        categoryRows.forEach(row => {
            categories.push(new MarkerCategory(row.category_id, row.description))
        });

        let subcategoryRows = await this.subcategoryDBSource.getAll();
        subcategoryRows.forEach(row => {
            subcategories.push(new MarkerSubcategory(row.subcategory_id,
                row.category_id, row.description))
        });

        return {categories: categories, subcategories: subcategories};
    }
}