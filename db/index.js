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

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
    if (err) {
        console.log(err);
    } else {
        for (let row of res.rows) {
            console.log(JSON.stringify(row));
        }
        client.end();
    }
});

module.exports = {
    query: (text, params, callback) => {
        let query = client.query(text, params, callback)
        client.end();
        return query;
    },
}