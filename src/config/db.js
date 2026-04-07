const { Pool } = require('pg');
const config = require('./env');
const pool = new Pool(config.dbConfig);
module.exports = pool;