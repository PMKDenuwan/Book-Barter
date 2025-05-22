const express = require('express');
const router = express.Router();
const {
  createTrade,
  getMyTrades,
  updateTradeStatus
} = require('../controllers/tradeController');
const authenticate = require('../middleware/authenticate');

// All routes require authentication
router.use(authenticate);

// @route   POST /api/trades
// @desc    Create a new trade request
router.post('/', createTrade);

// @route   GET /api/trades
// @desc    Get all trades (sent or received by the user)
router.get('/', getMyTrades);

// @route   PATCH /api/trades/:tradeId
// @desc    Update trade status (accept, decline, cancel)
router.patch('/:tradeId', updateTradeStatus);

module.exports = router;
