const { Pool } = require('pg');


const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'cashback_db',
  password: 'dfrstdfgrsgrd',
  port: 5432,
});

module.exports = pool;
