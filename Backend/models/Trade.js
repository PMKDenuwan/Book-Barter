const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Book = require('./Book');

const Trade = sequelize.define('Trade', {
  type: {
    type: DataTypes.ENUM('exchange', 'rent', 'sell'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'declined', 'cancelled'),
    defaultValue: 'pending'
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

// Associations
Trade.belongsTo(User, { as: 'sender', foreignKey: 'senderId' });     // who sends request
Trade.belongsTo(User, { as: 'receiver', foreignKey: 'receiverId' }); // who receives request

Trade.belongsTo(Book, { as: 'senderBook', foreignKey: 'senderBookId' });   // offered book (for exchange/sell)
Trade.belongsTo(Book, { as: 'receiverBook', foreignKey: 'receiverBookId' }); // requested book

module.exports = Trade;
