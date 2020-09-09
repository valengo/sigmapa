const {migrate} = require('postgres-migrations')
const {Pool} = require('pg');

const pool = process.env.NODE_ENV === 'production' ? new Pool({
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

async function main() {
    const client = await pool.connect();

    try {
        await migrate({client}, './db/migrations');
    } catch (err) {
        console.log('Migration error: ' + err);
    } finally {
        await client.release();
    }
}

module.exports = {
    migrate: () => main(),
    pool: pool,
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    }
}
