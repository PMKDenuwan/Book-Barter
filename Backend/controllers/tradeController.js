const Trade = require('../models/Trade');
const Book = require('../models/Book');
const User = require('../models/User');

// @desc Create a new trade request
exports.createTrade = async (req, res) => {
  const { type, receiverId, receiverBookId, senderBookId, message } = req.body;

  try {
    // Basic validation
    if (!type || !receiverId || !receiverBookId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Prevent sending trade to self
    if (receiverId === req.user.id) {
      return res.status(400).json({ message: 'You cannot trade with yourself' });
    }

    const trade = await Trade.create({
      type,
      senderId: req.user.id,
      receiverId,
      receiverBookId,
      senderBookId: senderBookId || null,
      message
    });

    res.status(201).json(trade);
  } catch (error) {
    console.error('Trade creation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Get all trade requests related to current user
exports.getMyTrades = async (req, res) => {
  try {
    const trades = await Trade.findAll({
      where: {
        [sequelize.Op.or]: [
          { senderId: req.user.id },
          { receiverId: req.user.id }
        ]
      },
      include: [
        { model: User, as: 'sender', attributes: ['id', 'name'] },
        { model: User, as: 'receiver', attributes: ['id', 'name'] },
        { model: Book, as: 'senderBook' },
        { model: Book, as: 'receiverBook' }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(trades);
  } catch (error) {
    console.error('Get trades error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Update trade status (accept, decline, cancel)
exports.updateTradeStatus = async (req, res) => {
  const { tradeId } = req.params;
  const { status } = req.body;

  if (!['accepted', 'declined', 'cancelled'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const trade = await Trade.findByPk(tradeId);

    if (!trade) {
      return res.status(404).json({ message: 'Trade not found' });
    }

    // Only receiver can accept/decline, sender can cancel
    if (
      (status === 'cancelled' && trade.senderId !== req.user.id) ||
      (['accepted', 'declined'].includes(status) && trade.receiverId !== req.user.id)
    ) {
      return res.status(403).json({ message: 'Not authorized to update this trade' });
    }

    trade.status = status;
    await trade.save();

    res.json({ message: `Trade ${status}` });
  } catch (error) {
    console.error('Update trade error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
