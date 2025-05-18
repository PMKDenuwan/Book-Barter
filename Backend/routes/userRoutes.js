const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');

router.get('/:id', userController.getUserProfile);
router.put('/update', authenticate, userController.updateUserProfile);
router.post('/follow/:id', authenticate, userController.followUser);
router.delete('/unfollow/:id', authenticate, userController.unfollowUser);

module.exports = router;
