const { Client } = require('pg');


const client = new Client ({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 5432,
    database: 'postgres'

})

module.exports = client;