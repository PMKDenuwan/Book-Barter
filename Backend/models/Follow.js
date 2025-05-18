const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Follow = sequelize.define('Follow', {
  followerId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  followingId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
});

module.exports = Follow;
