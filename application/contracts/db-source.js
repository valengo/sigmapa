module.exports = class DBSource {
    constructor() {
        this.db = undefined;
    }

    add(instance) {
        return Promise.reject(new Error('method "add" was not implemented'));
    }

    update(instance) {
        return Promise.reject(new Error('method "update" was not implemented'));
    }

    delete(instance) {
        return Promise.reject(new Error('method "delete" was not implemented'));
    }

    getAll() {
        return Promise.reject(new Error('method "getAll" was not implemented'));
    }

    getByColumnWithValue(columnName, value) {
        return Promise.reject(new Error('method "getByColumnWithValue" was not implemented'));
    }
};