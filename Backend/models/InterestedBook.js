const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const InterestedBook = sequelize.define('InterestedBook', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

User.hasMany(InterestedBook);
InterestedBook.belongsTo(User);

module.exports = InterestedBook;
