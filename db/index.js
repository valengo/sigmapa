const {migrate} = require('postgres-migrations')
const {Client} = require('pg');

const client = process.env.NODE_ENV === 'production' ? new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
}) : new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

async function main() {
    await client.connect();

    try {
        await migrate({client}, './db/migrations');
    } catch (err) {
        console.log('Migration error: ' + err);
    } finally {
        // await client.end();
    }
}

module.exports = {
    migrate: () => main(),
    client: client
}

// module.exports = {
//     query: (text, params, callback) => {
//         let query = client.query(text, params, callback)
//         client.end();
//         return query;
//     },
// }