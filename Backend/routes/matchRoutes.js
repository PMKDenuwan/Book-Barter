const express = require('express');
const router = express.Router();
const { getMatches } = require('../controllers/matchController');
const authenticate = require('../middleware/authenticate');

router.get('/', authenticate, getMatches);

module.exports = router;
