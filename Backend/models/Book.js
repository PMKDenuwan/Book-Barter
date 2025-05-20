// models/Book.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  condition: {
    type: DataTypes.ENUM('new', 'like-new', 'very-good', 'good', 'acceptable'),
    allowNull: false,
  },
  action: {
    type: DataTypes.ENUM('sell', 'rent', 'exchange'),
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
  },
  rentalDuration: {
    type: DataTypes.INTEGER, // in days (optional for rent)
  },
  image: {
    type: DataTypes.STRING,
  }
});

User.hasMany(Book);
Book.belongsTo(User);

module.exports = Book;
