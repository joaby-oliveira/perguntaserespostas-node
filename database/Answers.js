const { DataTypes } = require('sequelize');
const connection = require('./database');

const Answers = connection.define('Answer', {
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  questionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Answers.sync({ force: false });

module.exports = Answers;
