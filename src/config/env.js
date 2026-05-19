require('dotenv').config();
module.exports = {
  port: 3000,
  dbConfig: {
    user: 'postgres',
    host: 'localhost',
    database: 'quitanda_db',
    password: 'sua_senha',
    port: 5432
  }
};