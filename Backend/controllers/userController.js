const User = require('../models/User');
const Follow = require('../models/Follow');

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const { name, bio, profilePic } = req.body;
    await user.update({ name, bio, profilePic });

    res.json({ message: "Profile updated", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.followUser = async (req, res) => {
  try {
    await Follow.create({
      followerId: req.user.id,
      followingId: req.params.id
    });
    res.json({ message: "Followed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.unfollowUser = async (req, res) => {
  try {
    await Follow.destroy({
      where: {
        followerId: req.user.id,
        followingId: req.params.id
      }
    });
    res.json({ message: "Unfollowed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
