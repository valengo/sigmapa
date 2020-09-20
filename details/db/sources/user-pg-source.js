const DBSource = require('../../../application/contracts/db-source');

module.exports = class UserPGSource extends DBSource {
    constructor(db) {
        super();

        this.db = db;
    }

    async add(user) {
        let text = 'INSERT INTO users(role_id, uid, email, name) VALUES($1, $2, $3, $4) RETURNING user_id';
        let values = [user.roleId, user.uid, user.email, user.username]
        try {
            let res = await this.db.query(text, values);
            return res.rows
        } catch (error) {
            throw new Error('Failed while adding new user -> ' + error);
        }
    }

    async getAll() {
        let text = 'SELECT * FROM users';
        try {
            let res = await this.db.query(text);
            return res.rows;
        } catch (error) {
            throw new Error('Failed while getting users -> ' + error.message);
        }
    }

    async getUserByEmail(email) {
        let text = 'SELECT * FROM users WHERE email = $1'
        try {
            let res = await this.db.query(text, [email]);
            return res.rows[0];
        } catch (error) {
            throw new Error(`Failed while getting user with email ${email} -> ` + error.message);
        }
    }
}

