const { DataTypes } = require('sequelize');
const connection = require('./database');

const Questions = connection.define('Questions', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

connection.sync({ force: false });

module.exports = Questions;
