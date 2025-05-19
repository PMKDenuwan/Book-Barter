const Post = require('../models/Post');
const Like = require('../models/Like');
const Comment = require('../models/Comment');

exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const imageUrl = req.file ? req.file.filename : null;
    const post = await Post.create({ userId: req.user.id, content, imageUrl });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ include: ['User', 'Comments'] });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ where: { userId: req.params.userId } });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.toggleLike = async (req, res) => {
  try {
    const existingLike = await Like.findOne({
      where: { userId: req.user.id, postId: req.params.id }
    });

    if (existingLike) {
      await existingLike.destroy();
      res.json({ message: 'Unliked' });
    } else {
      await Like.create({ userId: req.user.id, postId: req.params.id });
      res.json({ message: 'Liked' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const comment = await Comment.create({
      userId: req.user.id,
      postId: req.params.id,
      text
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { postId: req.params.id },
      include: ['User']
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

