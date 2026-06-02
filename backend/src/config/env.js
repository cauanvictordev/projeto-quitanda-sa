require('dotenv').config();
module.exports = {
  port: 3000,
  dbConfig: {
    user: 'postgres',
    host: 'localhost',
    database: 'quitanda',
    password: 'senai',
    port: 5432
  }
};