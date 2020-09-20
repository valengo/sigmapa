const DatabaseService = require('../../application/contracts/database-service');
const {migrate} = require('postgres-migrations');
const {Pool} = require('pg');
const assert = require('assert')

module.exports = class PGDatabase extends DatabaseService {
    constructor() {
        super();

        this.migrationsDirectory = './details/db/migrations';

        this.pool = process.env.NODE_ENV === 'production' ? new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        }) : new Pool({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT
        });
    }

    /**
     * Make the database migration by executing the SQL scripts that are in the
     * "migrationsDirectory" folder
     *
     * This function may fail for several reasons:
     *
     * @returns {Promise<void>}
     */
    async makeMigration() {
        try {
            let client = await this.pool.connect();
            await migrate({client}, this.migrationsDirectory);
            await client.release()
        } catch (error) {
            throw new Error('Migration failed -> ' + error.message);
        }
    }

    /**
     * Make a query on the database
     *
     * @param text a string representing the query itself
     * @param params a single or a set of parameters to be replaced on the text
     *
     * @returns a promise with the query results
     */
    async query(text, params) {
        assert.ok(typeof (text) === 'string', 'query argument "text" must be a string')

        return this.pool.query(text, params);
    }

}


