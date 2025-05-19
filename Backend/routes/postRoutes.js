const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authenticate = require('../middleware/authenticate');
const upload = require('../middleware/upload');

router.post('/', authenticate, upload.single('image'), postController.createPost);
router.get('/', authenticate, postController.getAllPosts);
router.get('/:userId', authenticate, postController.getUserPosts);
router.post('/:id/like', authenticate, postController.toggleLike);
router.post('/:id/comment', authenticate, postController.addComment);
router.get('/:id/comments', authenticate, postController.getComments);

module.exports = router;
