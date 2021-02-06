const { Sequelize } = require('sequelize');
const connection = new Sequelize('perguntaserespostas', 'root', '12345678', {
  host: 'localhost',
  port: '3307',
  dialect: 'mysql',
});

module.exports = connection;
