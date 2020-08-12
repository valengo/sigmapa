const {Client} = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

module.exports = {
    query: (text, params, callback) => {
        let query = client.query(text, params, callback)
        client.end();
        return query;
    },
}