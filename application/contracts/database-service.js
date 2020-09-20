module.exports = class DatabaseService {
    constructor() {
        this.pool = undefined;
    }

    makeMigration() {
        return Promise.reject(new Error('mandatory function was not implemented'));
    }

    query(text, params) {
        return Promise.reject(new Error('mandatory function was not implemented'));
    }
};