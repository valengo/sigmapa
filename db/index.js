const {Client} = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
    if (err) {
        console.log(err);
    }
    else {
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